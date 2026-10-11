"""Regenerate everything for 2675 boul. Poirier from config.json.
Usage: python tools/generate.py [YYYY-MM]      (default: current month)
Writes, for that month and the next two:
  schedule.json                 data for the website (both languages)
  ics/unit-XXX.ics              English feed per unit;  ics/unit-XXX-fr.ics  French feed
  print/YYYY-MM.pdf             English printout;       print/YYYY-MM-fr.pdf French printout
"""
import sys, re, json, datetime as dt

from rotation import Rules, ROOT, LANGS, ACTION_TEXT, OWN_TEXT, month_bounds, add_months, tr
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
ICS = {
    "en": {
        "calname": "2675 Poirier – Unit {unit}",
        "caldesc": "Building duties for unit {unit} at {address}. {url}",
        "on_duty": "On duty: {job}",
        "swap": "Can't do it? Swap with another unit and write it on the calendar in the entrance.",
        "curb": "Bins may be at the curb from 7pm the evening before to 7am on pickup day.",
        "confirm": " (confirm date)",
        "abbr": ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    "fr": {
        "calname": "2675 Poirier – Unité {unit}",
        "caldesc": "Tâches de l'unité {unit} au {address}. {url}/?lang=fr",
        "on_duty": "De service : {job}",
        "swap": "Empêché? Échangez avec une autre unité et notez-le sur le calendrier de l'entrée.",
        "curb": "Les bacs peuvent être au bord de la rue de 19 h la veille jusqu'à 7 h le jour de la collecte.",
        "confirm": " (date à confirmer)",
        "abbr": ["", "janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
    },
}


def iso(d): return d.isoformat()
def ymd(d): return d.strftime("%Y%m%d")
def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def note_dict(note):
    return None if not note else {l: tr(note, l) for l in LANGS}


# ---------------- schedule.json ----------------
def build_schedule(R, months, first, last, generated):
    periods = []
    for b in R.periods_overlapping(first, last):
        s, e = R.period_range(b)
        periods.append({"index": b, "start": iso(s), "end": iso(e), "season": R.period_season(b),
                        "team": dict(zip(R.jobs, R.team(b)))})
    days = {}
    d = first
    while d <= last:
        b = R.period_index(d)
        acts = [{"stream": a["stream"], "kind": a["kind"], "unit": R.bins_unit_for(a), "note": note_dict(a["note"])}
                for a in R.actions(d)]
        if b is not None or acts:
            days[iso(d)] = {"period": b, "bins": R.team(b)[0] if b is not None else None, "actions": acts}
        d += dt.timedelta(days=1)
    action_text = {l: {f"{s}.{k}": t for (s, k), t in ACTION_TEXT[l].items()} for l in LANGS}
    own_text = {l: {f"{s}.{k}": t for (s, k), t in OWN_TEXT[l].items()} for l in LANGS}
    return {
        "generated": generated,
        "address": R.address, "site_url": R.site_url, "timezone": R.tz,
        "units": sorted(R.order), "jobs": R.jobs, "unit_colors": R.colors,
        "months": [f"{y}-{m:02d}" for y, m in months],
        "range": {"from": iso(first), "to": iso(last)},
        "job_info": {j: {k: R.job_info[j][k] for k in ("name", "short", "long")} for j in R.jobs},
        "everyone": R.everyone,
        "action_text": action_text, "own_text": own_text,
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


def build_ics(R, unit, sched, stamp, lang):
    T = ICS[lang]
    hh, mm = map(int, R.time.split(":"))
    url = R.site_url + ("/?lang=fr" if lang == "fr" else "")
    def short(d): return f"{T['abbr'][d.month]} {d.day}" if lang == "en" else f"{d.day} {T['abbr'][d.month]}"
    lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//studiozenkai.com//2675 Poirier duty calendar//EN",
             "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
             "X-WR-CALNAME:" + T["calname"].format(unit=unit), f"X-WR-TIMEZONE:{R.tz}",
             "X-WR-CALDESC:" + T["caldesc"].format(unit=unit, address=R.address, url=R.site_url),
             "REFRESH-INTERVAL;VALUE=DURATION:PT12H", "X-PUBLISHED-TTL:PT12H"] + VTIMEZONE
    for p in sched["periods"]:
        s, e = dt.date.fromisoformat(p["start"]), dt.date.fromisoformat(p["end"])
        for job, u in p["team"].items():
            if u != unit: continue
            desc = f"{short(s)} – {short(e)} : " if lang == "fr" else f"{short(s)} – {short(e)}: "
            desc += R.text(job, "long", p["season"], lang) + f"\n\n{T['swap']}\n{url}"
            lines += event(f"2675poirier-{unit}-{ymd(s)}-duty-{slug(job)}@studiozenkai.com", stamp,
                           T["on_duty"].format(job=R.job_name(job, lang)), desc, s, e + dt.timedelta(days=1), timed=False)
    for day, info in sched["days"].items():
        d = dt.date.fromisoformat(day)
        for a in info["actions"]:
            if a["unit"] not in (unit, None): continue          # None = every unit (own recycling bin)
            text = R.action_text(a, lang, own=True)
            start = dt.datetime(d.year, d.month, d.day, hh, mm)
            note = a["note"][lang] if a["note"] else None
            desc = text + "." + (f"\n{note}" if note else "") + f"\n{T['curb']}\n{url}"
            lines += event(f"2675poirier-{unit}-{ymd(d)}-{a['stream']}-{a['kind']}@studiozenkai.com", stamp,
                           text + (T["confirm"] if note else ""), desc, start, start + dt.timedelta(minutes=15),
                           timed=True, alarm=True)
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
        for lang in LANGS:
            name = f"unit-{unit}{'' if lang == 'en' else '-' + lang}.ics"
            (ROOT / "ics" / name).write_bytes(build_ics(R, unit, sched, stamp, lang).encode())
    for yy, mm in months:
        for lang in LANGS:
            build_pdf(yy, mm, ROOT / "print" / f"{yy}-{mm:02d}{'' if lang == 'en' else '-' + lang}.pdf", R, lang)
    print(f"schedule.json, ics/ ({len(R.order)} units × {len(LANGS)} languages), print/ "
          + ", ".join(f"{yy}-{mm:02d}" for yy, mm in months) + " (en + fr)"
          + f"  [{first} → {last}]")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else None)
