# A Kansai Scroll — generator

A static, horizontally-scrolling *meisho-e* travelogue, generated from plain text files.
You add a photo + a short text file per activity, run one script, and get a single
`dist/index.html` you can drop on GitHub Pages.

## Run it

Needs **Python 3.11+** and **Pillow** (`pip install pillow`).

```bash
python build.py            # builds ./dist
python build.py --serve    # builds, then serves http://localhost:8000
```

Then open `dist/index.html` (or the served URL). Scroll right; tap a card to turn it.

## Add an activity

Drop a photo in `pictures/` and a file in `content/` (e.g. `07-kiyomizu.md`):

```toml
+++
start = "2024-08-11T15:00:00+09:00"   # required. use +09:00 (Japan), not -00:00
end   = "2024-08-11T17:00:00+09:00"   # optional
city  = "Kyoto"                        # required — drives sections + mist transitions
cartouche = "清水寺"                   # optional — the short red title slip (JP looks best)
title = "The Stage Over the Valley"    # required — the headline (front)
place = "Kiyomizu-dera"                # optional — shows in the facts ledger (back)
transit = "Keihan → Kiyomizu-Gojō"     # optional
picture = "pictures/IMG_8101.jpg"      # or:  pictures = ["a.jpg","b.jpg"]  (first = hero)
description = "..."                     # optional — the historical note (back, serif)
personal = "..."                        # optional — your line (front, italic). the keeper.
+++
```

Re-run `python build.py`. That's the whole loop.

### Field rules
- **Required:** `title`, `start`, `city`. Missing any → the file is skipped (with a warning).
- **Everything else is optional** and simply omitted when absent (empty ledger rows are dropped;
  a missing photo renders an indigo placeholder card).
- **Order** is by `start` time. A new city = a new scene with a mist band before it. The same
  city appearing twice (Kyoto → Nara → Kyoto) makes two scenes, auto-labelled Ⅰ / Ⅱ.
- Long prose can go in triple-quoted TOML strings, or as body text after the closing `+++`.

## Restyle it

All design lives in `build.py`, top to bottom in order of how often you'll touch it:
- `TOKENS` / `FONTS` — palette hex + the three typefaces. Change the whole look here.
- `CSS_BODY` — layout and components (one plain string).
- `render_*` functions — the HTML structure of cards, mist, plates.
- `trip.toml` — the title, intro line, and Japanese city names on the cover.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` is included: push to `main`, it builds and publishes `dist/`.
In the repo: **Settings → Pages → Source: GitHub Actions**. Done.

Keep an eye on the Pages limits (≈1 GB site, 100 MB/file, ≈100 GB/month bandwidth) — the build
already downscales photos to 1600 px; host video on YouTube/Vimeo and embed rather than committing
it.

## Known nice-to-haves (left for you to iterate)
- Multiple photos per card (`pictures = [...]` is parsed; only the hero renders today — a gallery
  on the back is the obvious next feature).
- `srcset` for true responsive images (one optimised width is emitted now; see `process_image`).
- Real public-domain *meisho-e* scans behind each city instead of the CSS gradient sky.
