"""Shared rules for 2675 boul. Poirier: rotation, collections, seasons, job texts.
Everything reads config.json, so the PDF, website and iCal always agree.
Bilingual: every user-facing text exists in "en" and "fr".
"""
import json, calendar, datetime as dt
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LANGS = ("en", "fr")
WEEKDAYS = {"MO": 0, "TU": 1, "WE": 2, "TH": 3, "FR": 4, "SA": 5, "SU": 6}
STREAM_ORDER = ("compost", "recycling", "garbage")

# Calendar text (shared calendar, printout, website). "own" = wording for a unit's own feed / list.
ACTION_TEXT = {
    "en": {
        ("compost", "out"): "Take Compost bin out",       ("compost", "back"): "Bring back Compost bin",
        ("recycling", "out"): "Everyone: Recycling out",  ("recycling", "back"): "Everyone: Recycling back",
        ("garbage", "out"): "Take Garbage bin out",       ("garbage", "back"): "Bring back Garbage bin",
    },
    "fr": {
        ("compost", "out"): "Sortir le bac brun",         ("compost", "back"): "Rentrer le bac brun",
        ("recycling", "out"): "Recyclage (tous) : sortir", ("recycling", "back"): "Recyclage (tous) : rentrer",
        ("garbage", "out"): "Sortir le bac à ordures",    ("garbage", "back"): "Rentrer le bac à ordures",
    },
}
OWN_TEXT = {
    "en": {("recycling", "out"): "Take your Recycling bin out", ("recycling", "back"): "Bring back your Recycling bin"},
    "fr": {("recycling", "out"): "Sortir votre bac de recyclage", ("recycling", "back"): "Rentrer votre bac de recyclage"},
}


def date(s): return dt.date.fromisoformat(s)


def tr(v, lang):
    """A config value that is either a plain string or {"en": ..., "fr": ...}."""
    if isinstance(v, dict): return v.get(lang) or v.get("en")
    return v


class Rules:
    def __init__(self, path=ROOT / "config.json"):
        self.cfg = cfg = json.loads(Path(path).read_text())
        self.address, self.site_url, self.tz = cfg["address"], cfg["site_url"], cfg["timezone"]
        self.order, self.jobs = cfg["units"], cfg["jobs"]
        self.start, self.period = date(cfg["start"]), cfg["period_days"]
        col = cfg["collections"]
        self.time = col.get("time", "19:00")
        self.streams = {}
        for name in STREAM_ORDER:
            s = col[name]
            self.streams[name] = {
                "weekday": WEEKDAYS[s["weekday"]], "every": 7 * s.get("every_weeks", 1),
                "anchor": date(s["anchor"]) if "anchor" in s else None, "per_unit": bool(s.get("per_unit")),
            }
        self.seasons = {m: name for name, months in cfg["seasons"].items() for m in months}
        self.overrides = {(o["period_index"], self._job_index(o["job"])): str(o["unit"]) for o in cfg.get("overrides", [])}
        self.exceptions = cfg.get("exceptions", [])
        self.job_info = cfg["job_info"]
        self.everyone = cfg.get("everyone", {})
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

    def job_name(self, job, lang): return tr(self.job_info[job]["name"], lang)

    def text(self, job, kind, season, lang="en"):
        t = self.job_info[job][kind][lang]
        return t.get(season, t.get("all", ""))

    # ---- collections ----
    def _regular(self, stream, d):
        s = self.streams[stream]
        if d.weekday() != s["weekday"]: return False
        return s["anchor"] is None or (d - s["anchor"]).days % s["every"] == 0

    def pickup(self, stream, d):
        """(is_pickup, note) for a stream on date d, after applying exceptions.
        Exception forms: {date, stream, note} (keep, show note), {..., cancelled: true},
        {..., moved_to: "YYYY-MM-DD"} (pickup moves to another day). Notes may be {"en", "fr"}."""
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
        """Bin actions on day d, in display order: dicts {stream, kind, pickup, note, per_unit}."""
        nxt = d + dt.timedelta(days=1); out = []
        for stream in STREAM_ORDER:
            per_unit = self.streams[stream]["per_unit"]
            p, note = self.pickup(stream, nxt)
            if p: out.append({"stream": stream, "kind": "out", "pickup": nxt, "note": note, "per_unit": per_unit})
            p, note = self.pickup(stream, d)
            if p: out.append({"stream": stream, "kind": "back", "pickup": d, "note": note, "per_unit": per_unit})
        return out

    def action_text(self, a, lang, own=False):
        key = (a["stream"], a["kind"])
        return (OWN_TEXT[lang].get(key) if own else None) or ACTION_TEXT[lang][key]

    def bins_unit_for(self, action):
        """Shared streams: the pickup's period is responsible for both take-out and bring-back.
        Per-unit streams (recycling) belong to every unit: returns None."""
        if action["per_unit"]: return None
        return self.team(self.period_index(action["pickup"]))[0]


def month_bounds(year, month):
    return dt.date(year, month, 1), dt.date(year, month, calendar.monthrange(year, month)[1])


def add_months(year, month, n):
    m = year * 12 + (month - 1) + n
    return m // 12, m % 12 + 1
