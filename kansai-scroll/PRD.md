# Design Brief — "A Kansai Scroll"
### A private, hand-scroll travelogue in the spirit of Japanese woodblock prints

> The plan never survives the trip. This is not the plan. This is the keepsake —
> the feeling first, the facts behind it, built to be unrolled twenty years from now.

---

## 1. Why this exists (read this first)

A family travels often, and the trips rarely go as written. A printed, meticulously
researched itinerary gets undone by a rerouted flight, a 7 a.m. arrival instead of an
afternoon one, a rained-out morning, a blister, a cancelled ferry. The lesson the author
finally took from this is not "plan harder" or "build a better planning app." It is the
opposite: **the value of a trip is not in the plan, it is in what you keep of it afterward** —
and the disruptions are often the best part of the story.

So this project is not a tool. It is a **keepsake**: a beautiful, private web page that lets
you unroll a journey at leisure, one stop at a time, and feel it again. It is made for the
family and a small circle of friends — not for a marketplace, not for SEO, not for scale.
That gift-for-a-circle intent is important; it is the license to over-invest in craft and to
ignore mass-market conventions entirely.

**The single job of the page:** let someone move through the journey and, at each stop,
*feel it first and learn the facts second.*

**What success looks like:** opened in twenty years, it still moves the family — and a
stranger with taste would assume it was made by a design studio, not assembled from a template.

---

## 2. What we are making

A single, long, **horizontally-scrolling web page** — an unrolling handscroll — that presents
a trip as a sequence of illustrated "place cards." The visual language is **meisho-e** (the
"famous-places" genre of Japanese woodblock prints): flat planes of color, a limited palette
grounded in indigo, mist bands separating scenes, red title slips.

- **Medium:** static HTML/CSS/JS. No backend, no framework required. Hosted on GitHub Pages.
- **Source of truth:** a folder of activities written in Markdown + a folder of photos. A small
  build script reads them and emits the page. Adding an activity = adding a Markdown file and
  images, then re-running the script.
- **Not** a mobile app, not an itinerary planner, not a social network. (A richer web app is a
  possible *future*, explicitly out of scope now.)

---

## 3. The governing idea: feeling first, facts behind

Every stop is a **card with two sides**, and which content goes on which side is the heart of
the whole design — do not flatten it.

- **Front = the feeling.** The photograph, the place name on a red slip, and one short, personal,
  literary line. This is the face you want to meet again decades later. It is emotional, specific,
  unhurried.
- **Back = the record that roots the feeling.** The descriptive/historical note plus the hard
  logistics — date, time, address, nearest transit. This is what makes the feeling *real* and
  locatable rather than a vague glow.

The card **physically turns** from front to back, like an **ema** (the wooden shrine votive
plaque: an image on the front, a private inscription on the back). The turn is the core
interaction. The reader chooses to go from poetry to record.

This duality must also live in the **typography**: the feeling side is set in a literary serif
with italics; the facts side is set in **monospace**, like a ledger or a museum label. A reader
should sense the shift from *memory* to *record* without being told.

---

## 4. The cultural grammar (and why each piece is used)

These are not decoration or theme-dressing. Each concept earns its place by mapping to a real
structural need. A designer should understand the mapping so the references stay meaningful.

- **Meisho-e (名所絵)** — the "famous places" print genre. *Sets the entire visual world:* flat
  color, indigo ground, stylized landscape, the overall composition language.
- **Surimono (摺物)** — privately commissioned deluxe prints, made as gifts among a circle, pairing
  a refined image with a personal verse. *This is the project's true ancestor:* a beautiful image
  married to a personal text, made for friends, craft turned all the way up. Each card is a surimono.
- **Cartouche (the red title slips, tanzaku-shaped)** — the woodblock device for affixing a label
  to a scene. *Houses every title and place-name.* This is the page's primary structural marker;
  it replaces generic UI labels and numbered markers.
- **Kyōka (狂歌) / personal verse** — the witty, personal text that shared the sheet with a surimono
  image. *Models the voice of the "feeling" line:* personal, a little wry, never a caption.
- **Ema (絵馬)** — votive plaque, image front / inscription back. *Models the card flip:* feeling on
  the front, the rooted facts on the back. Thematically apt because the trip visited shrines.
- **Kasumi / suyari-gasumi (霞)** — the stylized horizontal mist bands of ukiyo-e. *Separates the
  cities.* Each city change is a band of mist with the city's name resting in a clearing. This is
  the transition device — authentic, and it hides the seams between sections.
- **Bokashi (ぼかし)** — the graded color wash of woodblock skies and water. *Defines the sky and
  ground gradients,* indigo at the top fading to a pale horizon.
- **Sugoroku / dōchū-sugoroku (道中双六)** — illustrated journey board-games where each square is a
  place along a route. *Justifies the whole structure:* a trip as a sequence of illustrated stops
  you advance through.
- **Emaki (絵巻)** — the horizontal handscroll. *Justifies the horizontal scroll itself,* a journey
  literally unrolled. (Note: classical emaki read right-to-left; we read **left-to-right** as a
  deliberate concession to non-Japanese-reading friends. Keep it L→R.)
- **Karuta (かるた)** — Japanese playing cards pairing image and text. *The mental model for the
  "collection":* a set of place-cards, the author's own affectionate "Pokémon-card" instinct, made
  tasteful.

---

## 5. The card model

Every activity has a **title** and **metadata**; the prose blocks are **optional** (not every
stop earns a paragraph). Fields and the side they live on:

**Front (feeling):**
- Photograph — shown honest and untouched (see §9). Fills the card.
- Place name — in a red cartouche, set in the display mincho. May carry a short Japanese form
  (e.g. 伏見稲荷) and/or the English title.
- Feeling line — one or two sentences, personal, literary, italic. *Optional but usually present.*
- A small seal/affordance hinting the card turns.

**Back (facts):**
- Descriptive note — the historical/contextual paragraph. Serif prose. *Optional.*
- Meta block — a monospace ledger of: **Date · Hours · Place (address) · Nearest transit.**
  Any field may be empty.

Cards come in two footprints driven by photo orientation — **portrait** (~3:4) and **landscape**
(~4:3) — and sit at a gentle vertical stagger within each city scene, the way elements sit in a
print composition rather than a rigid grid.

---

## 6. Visual direction — design tokens

The freedom on the open axes is **not** to be spent on the current AI-design defaults (cream +
high-contrast serif + terracotta; or near-black + single acid accent). The direction here is an
**indigo-grounded ukiyo-e world** with washi-paper cards and a vermilion cartouche system. Derive
every color and type decision from the tokens below.

**Palette (named hex):**
- `sumi` (ink) `#1c1b17`
- `indigo-1` (deep sky) `#102a44`
- `indigo-2` (mid sky) `#27537b`
- `indigo-3` / `haze` (horizon) `#5d8bb0` / `#9fb9cf`
- `washi` (paper) `#ece0c4` · `washi-2` (light) `#f5ecd6` · `washi-edge` `#d8c9a6`
- `vermilion` (cartouche / torii) `#b23a2e` · `vermilion-deep` `#86271d`
- `gold` (hairlines, data labels — used sparingly) `#a9842f`
- `sage` (occasional foliage) `#6f8a5f`

**Typography (three roles):**
- *Display & cartouche* — **Shippori Mincho B1** (a mincho serif covering Japanese + Latin),
  heavy weights, often set **vertically** in the red slips.
- *Body & feeling* — **Newsreader** (a literary Latin serif with a real italic), for descriptive
  prose and the personal feeling lines.
- *Facts & labels* — **Spline Sans Mono** (monospace), for the meta ledger and small letterspaced
  uppercase labels. The mono is conceptual, not just stylistic: it *is* the "record" voice.

**The signature element** (spend boldness here, keep everything else quiet): the **red cartouche
system + the card that turns from feeling to facts**, set inside an **indigo handscroll whose
cities are divided by kasumi mist**. If one image had to represent the page, it is a vermilion
title slip over a photograph, with a mist band and a vertical city name beside it.

**Motion:** restrained and meaningful. The card turn (a ~0.85s 3-D flip). A gentle parallax of
distant mountains behind the scroll. Smooth scroll between stops. Nothing decorative beyond this;
extra animation reads as machine-made. Respect `prefers-reduced-motion`.

---

## 7. Layout & interaction

- **Horizontal handscroll.** The page is a single horizontal scroll container, full viewport
  height. Background is a bokashi sky (indigo → pale horizon) over a stylized ground/sea, with the
  hue shifting subtly by city.
- **City sections** in order: **Osaka → Kyoto → Nara → Kyoto.** Between each, a **kasumi mist band**
  carrying the city name (Japanese vertical + Latin) in a clearing.
- **A frontispiece** opens the scroll (series title, dates, a one-line invitation) and an **end
  plate** closes it. These echo the title sheet of a print series.
- **Wayfinding** (this matters — long horizontal scrolls disorient): a slim progress bar, plus a
  clickable city rail naming the four segments and marking the current one. Provide ‹ › buttons and
  arrow-key navigation that jump stop-to-stop.
- **Input:** native horizontal touch-swipe on mobile; mouse-wheel mapped to horizontal on desktop;
  drag works via native scroll. The flip is a click/tap on the card (and Enter/Space when focused).
- **Reading direction: left-to-right** (deliberate, see §4).
- **Responsive:** on phones, one card roughly fills the viewport with the next peeking to invite the
  swipe; the side nav buttons hide; the city rail compresses. Must be excellent on a phone — that is
  where it will most often be shared and viewed.
- **Quality floor:** visible keyboard focus, reduced-motion honored, legible contrast on every text
  surface (give labels a washi clearing when they sit over busy mist).

---

## 8. Voice & copy

Three registers, kept distinct:
- **Feeling line (front):** first-person, specific, a little wry; the thing you'd want to read again
  in twenty years. Never a caption ("Us at the temple"), never a brochure ("a must-see landmark").
- **Descriptive note (back):** calm, informative, a few sentences of real context — what the place is,
  why it mattered that day. It may name the children and small true moments.
- **Meta (back):** terse, factual, lowercase-or-mono register. Just the record.

Copy is design material here, not filler. A generic line will make the whole card feel templated,
exactly as a generic layout would.

---

## 9. The craft bar — how this succeeds or fails

The gap between "real woodblock craft" and "vaguely Japanese template" is enormous and nearly
invisible until you are standing in it. Protect against it:

**Do**
- Treat the **photographs as honest**. The print aesthetic lives in the **frame** — cartouche,
  border, washi, palette, mist — not in filtering the photos to fake a woodblock. Real snapshots,
  framed by craft.
- Keep a **consistent frame across all cards** (like a trading-card set) so tonally different photos
  read as one series. Vary the picture; never vary the chrome.
- Where backgrounds or ornaments are needed, prefer **genuine public-domain meisho-e** scans
  (Hiroshige and lineage; the Met Open Access, MFA Boston, Library of Congress) over fabricated
  "Japanese-style" graphics.
- Spend boldness in one place (§6) and keep everything else disciplined and quiet.

**Don't**
- Don't run photos through a paint/woodblock filter to "match" the art — it always reads as costume.
- Don't reach for the AI-design defaults (cream+terracotta+serif; black+acid accent; hairline
  broadsheet). This brief pins indigo + washi + vermilion cartouche for a reason.
- Don't add numbered markers, generic icons, or decorative motion that encode nothing.
- Don't let the page become an itinerary tool. Logistics live quietly on the back of a card.

**The test:** *Would a stranger mistake this for a generic travel template?* If yes, it has failed,
regardless of how polished it looks.

---

## 10. Architecture & constraints

- **Static site**, generated: a `content/` folder of per-activity Markdown (front-matter for the
  fields in §5, body prose for the descriptive note), an `images/` folder, and a build script
  (Python/Ruby/Go — implementer's choice) that emits the HTML/CSS/JS. Deploy via a GitHub Action on
  push to GitHub Pages.
- **Photos:** generate responsive, downscaled sizes and lazy-load aggressively. Do **not** ship full
  camera-resolution files. "Infinitely scrollable" means *long and generous*, not literally infinite;
  a finite long page with lazy-loading is correct — no DOM virtualization unless cards reach the
  hundreds.
- **Video:** host on an unlisted YouTube/Vimeo and embed; do **not** self-host video on Pages.
- **GitHub Pages limits to respect:** ~1 GB site, 100 MB/file, ~100 GB/month soft bandwidth — a
  media-heavy trip can brush all three, which is why responsive images and off-host video are
  required, not optional.
- **Fonts:** the three families load from Google Fonts for now; self-hosting them is the more robust
  choice for a permanent keepsake and is encouraged.

---

## Appendix — references & first content

- **Primary visual reference:** a period meisho-e pilgrimage triptych (Hiroshige lineage) — flat
  indigo planes, red cartouches labeling each site, mist bands, stylized cedar and mountains. That
  print *is* the target world.
- **Route for the first edition:** Osaka (Universal Studios; an indoor "rain-plan" stop) → Kyoto
  (Nijō Castle garden; Yanagi-kōji lane) → Nara (the deer of Nara Park) → Kyoto again
  (Fushimi Inari's gates) → closing plate.
- **Tone anchor for content:** include the things that went *wrong* — the reroute, the brutal early
  arrival, the rain, the blister. A handscroll is a narrative form, and the detours are what make a
  travelogue feel alive rather than like a brochure. The plan that "didn't survive the first morning"
  should become the best story on the scroll.