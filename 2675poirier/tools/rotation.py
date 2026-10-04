"""Shared rules for 2675 boul. Poirier: rotation, collections, seasons, job texts.
Everything reads config.json, so the PDF, website and iCal always agree.
"""
import json, calendar, datetime as dt
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WEEKDAYS = {"MO": 0, "TU": 1, "WE": 2, "TH": 3, "FR": 4, "SA": 5, "SU": 6}
ACTION_TEXT = {
    ("recycling_compost", "out"):  "Take Recycling & Compost bins out",
    ("recycling_compost", "back"): "Bring back Recycling & Compost bins",
    ("garbage", "out"):  "Take Garbage bin out",
    ("garbage", "back"): "Bring back Garbage bin",
}


def date(s): return dt.date.fromisoformat(s)


class Rules:
    def __init__(self, path=ROOT / "config.json"):
        self.cfg = cfg = json.loads(Path(path).read_text())
        self.address, self.site_url, self.tz = cfg["address"], cfg["site_url"], cfg["timezone"]
        self.order, self.jobs = cfg["units"], cfg["jobs"]
        self.start, self.period = date(cfg["start"]), cfg["period_days"]
        col = cfg["collections"]
        self.time = col.get("time", "19:00")
        self.rc_weekday = WEEKDAYS[col["recycling_compost"]["weekday"]]
        g = col["garbage"]
        self.g_weekday, self.g_every, self.g_anchor = WEEKDAYS[g["weekday"]], 7 * g.get("every_weeks", 2), date(g["anchor"])
        self.seasons = {m: name for name, months in cfg["seasons"].items() for m in months}
        self.overrides = {(o["period_index"], self._job_index(o["job"])): str(o["unit"]) for o in cfg.get("overrides", [])}
        self.exceptions = cfg.get("exceptions", [])
        self.job_info = cfg["job_info"]
        self.colors = cfg["unit_colors"]

    def _job_index(self, job):
        return job if isinstance(job, int) else self.jobs.index(job)

    # ---- periods ----
    def period_index(self, d): return None if d < self.start else (d - self.start).days // self.period

    def period_range(self, b):
        s = self.start + dt.timedelta(days=self.period * b)
        return s, s + dt.timedelta(days=self.period - 1)

    def team(self, b):
        n = len(self.order)
        return [self.overrides.get((b, k), self.order[(k - b) % n]) for k in range(len(self.jobs))]

    def periods_overlapping(self, first, last):
        b = max(self.period_index(first) or 0, 0)
        while True:
            s, e = self.period_range(b)
            if s > last: return
            if e >= first: yield b
            b += 1

    # ---- seasons & texts ----
    def season(self, month): return self.seasons[month]

    def period_season(self, b):
        """Season of a period = season at its midpoint (a Nov 30 - Dec 13 period is winter)."""
        s, _ = self.period_range(b)
        return self.season((s + dt.timedelta(days=self.period // 2)).month)

    def text(self, job, kind, season):
        t = self.job_info[job][kind]
        return t.get(season, t.get("all", ""))

    # ---- collections ----
    def _regular(self, stream, d):
        if stream == "recycling_compost": return d.weekday() == self.rc_weekday
        return d.weekday() == self.g_weekday and (d - self.g_anchor).days % self.g_every == 0

    def pickup(self, stream, d):
        """(is_pickup, note) for a stream on date d, after applying exceptions.
        Exception forms: {date, stream, note} (keep, show note), {..., cancelled: true},
        {..., moved_to: "YYYY-MM-DD"} (pickup moves to another day)."""
        if d < self.start: return False, None
        hit, note = self._regular(stream, d), None
        for ex in self.exceptions:
            if ex.get("stream") != stream: continue
            if ex["date"] == d.isoformat():
                note = ex.get("note")
                if ex.get("cancelled") or ex.get("moved_to"): hit = False
            if ex.get("moved_to") == d.isoformat():
                hit, note = True, ex.get("note")
        return hit, note

    def actions(self, d):
        """Bin actions on day d, in display order: list of dicts {stream, kind, text, pickup, note}."""
        nxt = d + dt.timedelta(days=1); out = []
        for stream in ("recycling_compost", "garbage"):
            p, note = self.pickup(stream, nxt)
            if p: out.append({"stream": stream, "kind": "out", "pickup": nxt, "note": note})
            p, note = self.pickup(stream, d)
            if p: out.append({"stream": stream, "kind": "back", "pickup": d, "note": note})
        for a in out: a["text"] = ACTION_TEXT[(a["stream"], a["kind"])]
        return out

    def bins_unit_for(self, action):
        """The pickup's period is responsible for both its take-out and bring-back."""
        return self.team(self.period_index(action["pickup"]))[0]


def month_bounds(year, month):
    return dt.date(year, month, 1), dt.date(year, month, calendar.monthrange(year, month)[1])


def add_months(year, month, n):
    m = year * 12 + (month - 1) + n
    return m // 12, m % 12 + 1
