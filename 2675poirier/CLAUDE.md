# 2675 boul. Poirier — Building Duty Calendar

## Goal

2675 boul. Poirier (Saint-Laurent, Montreal) is a 6-unit co-ownership (condo syndicate).
Day-to-day chores weren't getting done (bins overflowing, burnt bulbs, loose door handle),
mostly because nobody knew whose turn it was. The syndicate president warned that if this
continued, the building would hire a management firm, which would raise everyone's costs.

The fix, approved by all owners in the building WhatsApp group (Oct 2026):

1. A **printed black & white calendar**, posted in the entrance and shared on WhatsApp every month.
2. A **static website** at `https://studiozenkai.com/2675poirier`, reached by a QR code on the printout.
   It shows the calendar in color, lets each unit see its own tasks, gives an iCal feed per unit,
   and has a FAQ.

The maintainer is Heri (Unit 302). Keep everything simple, cheap, and low-maintenance: one
config file, one generator, regenerate once a month.

---

## Building facts

| Item | Value |
|---|---|
| Address | 2675 boul. Poirier, Saint-Laurent (Montreal), QC |
| Units | 101, 102, 201, 202, 301, 302 |
| Rotation order | `302, 102, 101, 202, 201, 301` (fixed, agreed) |
| Borough / sector | Saint-Laurent, **Sector 1** |
| Timezone | `America/Toronto` (Montreal) |

### Collections (Saint-Laurent 2026, Sector 1)

| Stream | When | Bins out | Bins back |
|---|---|---|---|
| Recycling + Compost | Every **Tuesday** | Monday 7pm | Tuesday 7pm |
| Garbage (black bin) | Every **other Friday**, anchored on **2026-10-02** (so Oct 16, Oct 30, Nov 13, Nov 27, Dec 11, Dec 25…) | Thursday 7pm | Friday 7pm |
| Large items | 1st Friday of the month | Not part of the rotation; each owner handles their own | — |

- City rule: bins may only be at the curb from **7pm the evening before** to **7am on pickup day**.
  "Bring back at 7pm on pickup day" is our building rule.
- **Holidays**: Dec 25, 2026 is a garbage Friday. Mark it as "confirm" unless the city's Info-Collecte
  says otherwise. Each year, check https://montreal.ca/info-collectes (or call 311) and the new
  Saint-Laurent "Cahier des collectes" for date shifts. Put any shift in `exceptions` in the config.
- Leaves go in **paper bags or reusable containers** and out with the compost (no plastic bags).

---

## The rotation (core logic)

- Work happens in **2-week periods**, Monday to Sunday, starting **Monday 2026-10-05** (period 0).
- Each period has **4 jobs**, each assigned to a different unit. The other 2 units are off.
- Each new period, every unit **moves one job to the right**, and a new unit enters "Bins".
  Formula (`k` = job index 0..3, `b` = period index):

  ```
  unit(b, k) = ORDER[(k - b) mod 6]
  ORDER = ["302","102","101","202","201","301"]
  JOBS  = ["Bins", "Front & snow", "Back yard", "Repairs"]
  ```

- Verified first periods (these were printed and approved, so the logic must reproduce them exactly):

  | Period | Bins | Front & snow | Back yard | Repairs |
  |---|---|---|---|---|
  | Oct 5 – Oct 18 | 302 | 102 | 101 | 202 |
  | Oct 19 – Nov 1 | 301 | 302 | 102 | 101 |
  | Nov 2 – Nov 15 | 201 | 301 | 302 | 102 |
  | Nov 16 – Nov 29 | 202 | 201 | 301 | 302 |
  | Nov 30 – Dec 13 | 101 | 202 | 201 | 301 |

- Over 6 periods (12 weeks), every unit does every job exactly once, so the load is fair.
- **Swaps**: residents swap informally and write it on the printed calendar. If a swap should show
  on the website and iCal, add it to `overrides` in the config: `{period_index, job, unit}`.
- Months don't line up with periods. A month shows every period that overlaps it (2 to 4 rows).

### Jobs and seasons

Seasons by month: **Fall = Oct–Nov**, **Winter = Dec–Mar**, **Spring/Summer = Apr–Sep**.
Snow can fall in Nov or Apr; the Front & snow unit handles any snowfall in any month.

| Job | Short (printout) | All year | Fall | Winter | Spring/Summer |
|---|---|---|---|---|---|
| **Bins** | Garbage, recycling & compost | Take bins out at 7pm the evening before pickup, bring them back at 7pm on pickup day. Keep the garbage area clean: no bags on the ground, lids closed, never leave bags beside a full bin. | | | |
| **Front & snow** | Front yard & entrance | | Rake front leaves (paper bags, out with compost). Shovel and salt if it snows. | After every snowfall: shovel the entrance and stairs, then salt. Keep bins reachable on pickup days. | Front garden maintenance: weeding, tidying, **watering**. |
| **Back yard** | Back yard & garden | | Rake back-yard leaves. | No regular task (open question below). | Back garden maintenance: weeding, tidying, **watering**. |
| **Repairs** | Small fixes | Main door lock and handle, light bulbs (entrance, hallways), stairs, other small fixes. Post what you fixed (and any receipt) in the WhatsApp group. | | | |

Major work (snow plowing the driveway, basement renovation, etc.) is done by a hired company and is
**not** part of the rotation.

---

## Recommended repo layout

GitHub Pages, no database, no build framework. If `studiozenkai.com` is the custom domain of the user or
org Pages site, a repo named `2675poirier` publishes automatically at `studiozenkai.com/2675poirier`.

```
2675poirier/
├── index.html            # single page: calendar, unit picker, FAQ
├── styles.css
├── app.js                # vanilla JS, reads schedule.json
├── schedule.json         # GENERATED: next 3 months of days, events, periods
├── ics/
│   ├── unit-101.ics      # GENERATED, one per unit
│   └── ...
├── print/
│   └── 2026-10.pdf       # GENERATED monthly printout (also linked from the site)
├── config.json           # SINGLE SOURCE OF TRUTH (see below)
└── tools/
    ├── generate.py       # builds schedule.json + ics/*.ics + print/YYYY-MM.pdf (current month + 2)
    ├── make_pdf.py       # B&W PDF renderer (provided, see below)
    └── rotation.py       # shared rules (rotation, pickups, exceptions, seasons) read from config.json
```

Exception forms in `config.json`: `{date, stream, note}` keeps the pickup and shows the note ("confirm"),
`{date, stream, cancelled: true}` drops it, `{date, stream, moved_to: "YYYY-MM-DD", note}` moves it
(the take-out moves to the evening before the new date). Job texts live in `job_info` (`print` = PDF one-liners,
`long` = website + iCal), keyed by season or `all`. The website also accepts `?unit=302` to preselect a unit.

### `config.json` (single source of truth)

```json
{
  "address": "2675 boul. Poirier",
  "site_url": "https://studiozenkai.com/2675poirier",
  "timezone": "America/Toronto",
  "units": ["302", "102", "101", "202", "201", "301"],
  "start": "2026-10-05",
  "period_days": 14,
  "jobs": ["Bins", "Front & snow", "Back yard", "Repairs"],
  "collections": {
    "recycling_compost": { "weekday": "TU" },
    "garbage": { "weekday": "FR", "every_weeks": 2, "anchor": "2026-10-02" },
    "time": "19:00"
  },
  "seasons": { "fall": [10, 11], "winter": [12, 1, 2, 3], "spring_summer": [4, 5, 6, 7, 8, 9] },
  "exceptions": [
    { "date": "2026-12-25", "stream": "garbage", "note": "Christmas Day, confirm on Info-Collecte" }
  ],
  "overrides": [],
  "unit_colors": {
    "302": ["#dbeafe", "#1d4ed8"], "102": ["#dcfce7", "#15803d"], "101": ["#fef3c7", "#a16207"],
    "202": ["#fce7f3", "#be185d"], "201": ["#ede9fe", "#6d28d9"], "301": ["#ffedd5", "#c2410c"]
  }
}
```

Job descriptions (short and long, per season) can live in `config.json` too, so the PDF, website and
iCal all use the same text.

---

## Website spec (`index.html`)

Plain HTML/CSS/JS, mobile first (most people arrive by scanning the QR code with a phone), and bilingual-ready
(English now; keep strings in one object so French can be added).

1. **Calendar, front and center, in color**
   - One month visible at a time, with previous/next buttons limited to the **3 generated months**.
   - It opens on the current month.
   - Each day cell shows the bins duty unit and that day's bin actions:
     - Monday: "7pm: Take Recycling & Compost bins out"
     - Tuesday: "7pm: Bring back Recycling & Compost bins"
     - Thursday before a garbage Friday: "7pm: Take Garbage bin out"
     - Garbage Friday: "7pm: Bring back Garbage bin"
   - Period background colored by the Bins unit's color. A "Who does what" table under the calendar
     shows each period overlapping the visible month, with colored unit chips.
   - Don't rely on color alone: always show unit numbers as text.

2. **"My unit" picker**
   - A dropdown with 101, 102, 201, 202, 301, 302, remembered in `localStorage`.
   - It shows that unit's assignments for the 3 generated months: period dates, job, the season-specific
     task description, and for Bins every exact 7pm action date.
   - It shows the unit's iCal links:
     - `webcal://studiozenkai.com/2675poirier/ics/unit-XXX.ics` (Apple Calendar / iOS: one tap subscribe)
     - an https link plus a "Copy link" button, with short instructions for Google Calendar
       (Other calendars → From URL) and Outlook.
     - Note on the page: Google may take up to a day to refresh subscribed calendars.

3. **FAQ** (accordion, at the bottom)
   - **Can't do your job?** Swap with another unit and write the swap on the printed calendar in the entrance.
   - **What exactly does each job involve?** Long descriptions for Bins, Front & snow, Back yard and Repairs,
     by season (use the table above).
   - **I'm a tenant. Does this apply to me?** Every unit is responsible when it's assigned, whether
     the work is done by the tenant or the owner. Tenants: check with your unit's owner. Owners stay
     responsible for making sure their unit's job gets done.
   - **Why do we need to do all this?** We have a company for major work such as snow plowing the
     driveway or renovating the basement. To keep costs down, it's our collective duty to take care
     of the small things. Everyone participates; otherwise a management firm will be brought in.
   - Collection rules: 7pm the evening before to 7am on pickup day, bring bins back at 7pm, leaves in paper bags.
   - Link to this month's printable PDF (`print/YYYY-MM.pdf`).

---

## iCal feeds (`ics/unit-XXX.ics`)

- Static files, regenerated monthly. They cover **the first day of the current month through the end of month +2**.
  Subscribed calendars therefore run out if regeneration stops, so keep the monthly routine (or automate it, below).
- RFC 5545: `VCALENDAR` with `PRODID`, `X-WR-CALNAME:2675 Poirier – Unit XXX`, `X-WR-TIMEZONE:America/Toronto`,
  a `VTIMEZONE` for America/Toronto, and `DTSTART;TZID=America/Toronto:...`.
- **Stable UIDs** so re-generation updates events instead of duplicating them, e.g.
  `2675poirier-<unit>-<yyyymmdd>-<kind>@studiozenkai.com`. Use CRLF line endings and fold lines over 75 octets.
- Events:
  - **Bins** periods: timed 19:00 events (15 min, with a `VALARM` 30 min before) for each take-out and bring-back action.
  - **Front & snow / Back yard / Repairs** periods: one all-day multi-day event covering the period
    ("On duty: Front & snow"), `DTEND` exclusive (the Monday after the period ends), with the season's description.
  - Optional: an all-day "Bins duty" event spanning the period, for context.
- Serve as `text/calendar`. GitHub Pages infers the type from the `.ics` extension.

---

## Monthly printable PDF (black & white)

Heri prints this on a **black & white laser printer** at the start of each month, posts it in the entrance,
and shares it in the WhatsApp group. The design was approved by everyone, so **don't redesign it**.

### How to generate

```bash
pip install reportlab
python tools/make_pdf.py 2026-11 print/2026-11.pdf     # YYYY-MM [output path]
```

`tools/make_pdf.py` is the working reference implementation (provided alongside this file). It currently has
its config at the top of the file. Refactor it to read `config.json` (units, start, anchor, overrides,
exceptions, descriptions) **without changing the output**, then call it from `generate.py`.
After the refactor, run it for 2026-10 and 2026-11 and compare against the approved output.

### Design rules (must hold)

- **Letter portrait, one page**, 40pt margins, Helvetica only.
- **No color.** Grayscale only, so nothing depends on color:
  - Period shading alternates **white / light grey (#e6e6e6)** by period index. Days outside the month
    or before the start date are #f2f2f2 with no label.
  - Recycling & Compost actions use a **filled circle** marker; Garbage actions use a **filled square**.
  - Unit numbers are **bold text in outlined rounded boxes**.
- Header: "2675 boul. Poirier Calendar" (left), "Month YYYY" (right), one line about bin timing, and a legend.
- Month grid: Monday-first, 7 columns, dark header row. Rows are 66pt for 5-week months and 61pt for 6-week months.
  - Each day in a period gets a "Bins XXX" tag at the top right.
  - Cell text is exactly `7pm: Take Recycling & Compost bins out`, `7pm: Bring back Recycling & Compost bins`,
    `7pm: Take Garbage bin out`, `7pm: Bring back Garbage bin`. "7pm:" is bold and inline, and the text wraps to the cell.
- "Who does what": a table of every period overlapping the month (Period | Bins | Front & snow | Back yard | Repairs).
- "What each job covers this month": **season-specific** one-liners for the 4 jobs.
- A **QR code** to `https://studiozenkai.com/2675poirier` at the bottom right (~78pt), captioned
  "Your unit's schedule / + add to your calendar", with the URL in small text below.
- **Don't include**: the city-calendar source footnote, the "white = first period" note, the leaves/paper-bag note,
  or the "Can't do your job?" line. These were removed on request; the FAQ on the website covers them.
- After generating, render to PNG (`pdftoppm -r 70 -gray`) and check that no cell text overflows,
  especially in 6-week months.

### Monthly routine

1. Check Info-Collecte for holiday shifts in the next 3 months, and update `exceptions`.
2. Add any agreed swaps to `overrides`.
3. `python tools/generate.py` regenerates `schedule.json`, `ics/*.ics`, and `print/YYYY-MM.pdf` for the current month.
4. Commit and push (GitHub Pages deploys).
5. Print the PDF in B&W, post it in the entrance, and share it in WhatsApp.

Optional: a GitHub Action on `cron: "0 10 1 * *"` (1st of the month) that runs `generate.py` and commits
the result, so the website and iCal never go stale. Printing stays manual.

---

## Decisions log

- Weekly turns were rejected. With garbage every other Friday and 6 units, weekly turns meant 3 units would never do garbage.
  **2-week periods** give every unit both streams fairly.
- One unit doing bins and leaves for 2 weeks was too much, so the work is split into **4 jobs across 4 units** per period, with 2 units off.
- Unit 302 (Heri) was placed on Front & snow for Oct 19 – Nov 1, which defined the "shift one job to the right" rule.
- Bins come back at **7pm** on pickup day (building rule, chosen for people who work days).
- The printout is black & white only (B&W laser printer). The website is in color.
- Large items aren't in the rotation; owners handle their own.
- Major work (driveway plowing, renovations) is done by a hired company.
- Static hosting only (GitHub Pages): no backend, no database, no login. Swaps are made on paper, or in `overrides` by the maintainer.

## Open questions

- Back yard in **winter**: is there any regular task (e.g. clearing a back exit or stairs)? It is currently "no regular task".
- Exact season boundaries (e.g. should leaves continue into early December?).
- The **2027** collection calendar: confirm the Sector 1 garbage Fridays when Saint-Laurent publishes it, and re-anchor if needed.
- French version of the printout and website?
