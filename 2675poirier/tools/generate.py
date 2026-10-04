"""Regenerate everything for 2675 boul. Poirier from config.json.
Usage: python tools/generate.py [YYYY-MM]      (default: current month)
Writes schedule.json, ics/unit-XXX.ics and print/YYYY-MM.pdf for that month and the next two.
"""
import sys, re, json, datetime as dt

from rotation import Rules, ROOT, month_bounds, add_months
from make_pdf import build as build_pdf

MONTHS = 3
VTIMEZONE = [
    "BEGIN:VTIMEZONE", "TZID:America/Toronto", "X-LIC-LOCATION:America/Toronto",
    "BEGIN:DAYLIGHT", "TZOFFSETFROM:-0500", "TZOFFSETTO:-0400", "TZNAME:EDT",
    "DTSTART:19700308T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU", "END:DAYLIGHT",
    "BEGIN:STANDARD", "TZOFFSETFROM:-0400", "TZOFFSETTO:-0500", "TZNAME:EST",
    "DTSTART:19701101T020000", "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU", "END:STANDARD",
    "END:VTIMEZONE",
]


def iso(d): return d.isoformat()
def ymd(d): return d.strftime("%Y%m%d")
def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


# ---------------- schedule.json ----------------
def build_schedule(R, months, first, last, generated):
    periods = []
    for b in R.periods_overlapping(first, last):
        s, e = R.period_range(b); season = R.period_season(b)
        periods.append({
            "index": b, "start": iso(s), "end": iso(e), "season": season,
            "team": dict(zip(R.jobs, R.team(b))),
            "tasks": {j: R.text(j, "long", season) for j in R.jobs},
        })
    days = {}
    d = first
    while d <= last:
        b = R.period_index(d)
        acts = [{"stream": a["stream"], "kind": a["kind"], "time": R.time, "text": a["text"],
                 "unit": R.bins_unit_for(a), "note": a["note"]} for a in R.actions(d)]
        if b is not None or acts:
            days[iso(d)] = {"period": b, "bins": R.team(b)[0] if b is not None else None, "actions": acts}
        d += dt.timedelta(days=1)
    return {
        "generated": generated,
        "address": R.address, "site_url": R.site_url, "timezone": R.tz,
        "units": sorted(R.order), "jobs": R.jobs, "unit_colors": R.colors,
        "months": [f"{y}-{m:02d}" for y, m in months],
        "range": {"from": iso(first), "to": iso(last)},
        "job_info": {j: {"short": R.job_info[j]["short"], "long": R.job_info[j]["long"]} for j in R.jobs},
        "periods": periods, "days": days,
    }


# ---------------- iCal ----------------
def esc(s): return s.replace("\\", "\\\\").replace(";", "\\;").replace(",", "\\,").replace("\n", "\\n")


def fold(line):
    """RFC 5545: lines over 75 octets are folded with CRLF + space, never splitting a UTF-8 character."""
    out, cur = [], b""
    for ch in line:
        enc = ch.encode()
        if len(cur) + len(enc) > (75 if not out else 74):
            out.append(cur); cur = b""
        cur += enc
    out.append(cur)
    return "\r\n ".join(p.decode() for p in out)


def event(uid, stamp, summary, desc, start, end, timed, alarm=False):
    tz = "TZID=America/Toronto"
    lines = ["BEGIN:VEVENT", f"UID:{uid}", f"DTSTAMP:{stamp}"]
    if timed:
        lines += [f"DTSTART;{tz}:{start.strftime('%Y%m%dT%H%M%S')}", f"DTEND;{tz}:{end.strftime('%Y%m%dT%H%M%S')}"]
    else:
        lines += [f"DTSTART;VALUE=DATE:{ymd(start)}", f"DTEND;VALUE=DATE:{ymd(end)}", "TRANSP:TRANSPARENT"]
    lines += [f"SUMMARY:{esc(summary)}", f"DESCRIPTION:{esc(desc)}"]
    if alarm:
        lines += ["BEGIN:VALARM", "ACTION:DISPLAY", f"DESCRIPTION:{esc(summary)}", "TRIGGER:-PT30M", "END:VALARM"]
    return lines + ["END:VEVENT"]


def build_ics(R, unit, sched, stamp):
    hh, mm = map(int, R.time.split(":"))
    url = R.site_url
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//studiozenkai.com//2675 Poirier duty calendar//EN",
             "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
             f"X-WR-CALNAME:2675 Poirier – Unit {unit}", f"X-WR-TIMEZONE:{R.tz}",
             f"X-WR-CALDESC:Building duties for unit {unit} at {R.address}. {url}",
             "REFRESH-INTERVAL;VALUE=DURATION:PT12H", "X-PUBLISHED-TTL:PT12H"] + VTIMEZONE
    for p in sched["periods"]:
        s, e = dt.date.fromisoformat(p["start"]), dt.date.fromisoformat(p["end"])
        dates = f"{s.strftime('%b %-d')} – {e.strftime('%b %-d')}"
        for job, u in p["team"].items():
            if u != unit: continue
            desc = f"{dates}: {p['tasks'][job]}\n\nCan't do it? Swap with another unit and write it on the calendar in the entrance.\n{url}"
            lines += event(f"2675poirier-{unit}-{ymd(s)}-duty-{slug(job)}@studiozenkai.com", stamp,
                           f"On duty: {job}", desc, s, e + dt.timedelta(days=1), timed=False)
    for day, info in sched["days"].items():
        d = dt.date.fromisoformat(day)
        for a in info["actions"]:
            if a["unit"] != unit: continue
            start = dt.datetime(d.year, d.month, d.day, hh, mm)
            desc = a["text"] + "." + (f"\n{a['note']}" if a["note"] else "") + \
                "\nBins may be at the curb from 7pm the evening before to 7am on pickup day." + f"\n{url}"
            summary = a["text"] + (" (confirm date)" if a["note"] else "")
            lines += event(f"2675poirier-{unit}-{ymd(d)}-{a['stream'].replace('_', '-')}-{a['kind']}@studiozenkai.com",
                           stamp, summary, desc, start, start + dt.timedelta(minutes=15), timed=True, alarm=True)
    lines.append("END:VCALENDAR")
    return "\r\n".join(fold(l) for l in lines) + "\r\n"


# ---------------- main ----------------
def main(ym=None):
    today = dt.date.today()
    y, m = map(int, ym.split("-")) if ym else (today.year, today.month)
    months = [add_months(y, m, i) for i in range(MONTHS)]
    first = month_bounds(*months[0])[0]; last = month_bounds(*months[-1])[1]
    R = Rules()
    now = dt.datetime.now(dt.timezone.utc)
    sched = build_schedule(R, months, first, last, now.isoformat(timespec="seconds"))
    (ROOT / "schedule.json").write_text(json.dumps(sched, indent=1, ensure_ascii=False) + "\n")
    (ROOT / "ics").mkdir(exist_ok=True); (ROOT / "print").mkdir(exist_ok=True)
    stamp = now.strftime("%Y%m%dT%H%M%SZ")
    for unit in R.order:
        (ROOT / "ics" / f"unit-{unit}.ics").write_bytes(build_ics(R, unit, sched, stamp).encode())
    for yy, mm in months:
        build_pdf(yy, mm, ROOT / "print" / f"{yy}-{mm:02d}.pdf", R)
    print(f"schedule.json, ics/ ({len(R.order)} units), print/ "
          + ", ".join(f"{yy}-{mm:02d}.pdf" for yy, mm in months)
          + f"  [{first} → {last}]")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
