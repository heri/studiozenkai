# Painterly: iOS app spec

A native iPhone app that helps people take painting-like photos: Old masters,
Impressionism and Pointillism. It starts as a personal learning project (Apple
Intelligence, pure SwiftUI, a first App Store release). Sales are a bonus, not a goal.

- **Free** (first): for iPhone photographers on the go. Starts with a photo.
- **Pro** (much later): for photographers with a dedicated camera who plan their shoots.
  Starts with a card.

No back-end: everything runs and is stored on the phone.

---

## 1. Product

### 1.1 Editions

| | Free | Pro |
|---|---|---|
| Who | People photographing their kids, partner or friends right now. Not hunting for the picture | Photographers who plan: they time the session, go where the light is right, change clothing, props and kit |
| Camera | The iPhone | A dedicated body: medium format, or full frame with pro lenses. The iPhone is the scouting camera |
| Starts with | A photo | A card |
| Promise | "Level up the photo you're taking right now" | "Plan the shoot, perfect it on site, and learn for the next one" |
| Advice | What can be done in the next minute: move, turn the subject, get closer, change the background, switch the phone's lens | Everything in Free, plus wardrobe, props, timing, camera settings, lens choice, light modifiers |
| Loop | Retake until good, then done | A learning loop across sessions: objective, practice, feedback, learn, next objective (8.4) |
| Details | Section 7 | Section 8 |

### 1.2 Principles

- **Works offline.** Nothing needs a signal, including the AI.
- **Private.** Photos, often of children, never leave the phone by default.
- **Show, don't tell.** Reference images and a setup diagram before paragraphs.
- **Measure, don't guess.** The AI never estimates what the phone can measure (4.1).
- **Honest sources.** Every painting and photo is credited.
- **Fast in the field.** One thumb, big targets, no typing.

---

## 2. Starting point: the web app

A personal web app (this folder) already exists and supplies the content and logic
the iOS app reuses. It stays live as a personal tool until the iOS app replaces it.

| Reused | From |
|---|---|
| 26 cards in 3 styles (13 Old masters, 10 Impressionism, 4 Pointillism) | `cards.js` |
| 112 gallery images, 1400 px, about 40 MB | `img/<card-id>/` |
| Sun position and phases | `sunAlt`, `phaseOf` in `index.html` |
| Setup diagram drawing and label placement | `planSVG`, `planLabel` in `index.html` |
| Image downloads | `fetch_paintings.py` |

**Sun phases:** day above 6°, golden from 6° to −4°, blue from −4° to −8°, night below.

**Image script:** `python3 fetch_paintings.py` loads `cards.js` through `node` and
downloads any missing image named in a card. Sources are an exact Wikipedia article,
Wikimedia Commons file or Unsplash photo id. It downloads with `curl` and resizes with
`sips` to 1400 px. Choosing images is a human job; the script only downloads.

**Known content gaps:**

- Blue Hour Lantern photos have no children.
- Rembrandt Forest Edge includes a photo of a subject smiling at the camera.
- Misty Valley Dawn photos lack a figure seen from behind.
- Apple Harvest in Dots has one painting.
- Golden Fairytale's text uses a clock where 12 is the camera; the diagram uses
  camera-at-6.

---

## 3. Content model

Cards become JSON bundled with the app, converted from `cards.js` (10.3).

### 3.1 Card

| Field | Notes |
|---|---|
| `id` | Stable slug; also the image folder name. Never rename |
| `title`, `kind` | `kind` is `Portrait` or `Landscape` |
| `images` | Gallery in order, paintings and photos alternating (3.2) |
| `mood`, `palette` | One line; five hex colours |
| `tags` | style, subject, place, light, weather, season (3.4) |
| `plan` | Top-down setup diagram (3.3) |
| `glance` | `{ when, lens, exposure }` |
| `steal` | "What to take from the painting" |
| `when`, `where` | |
| `direction` | `{ pose, prompts[] }`: what to say to the subject, or what to look for |
| `wardrobe`, `props`, `breakers` | Checklists |
| `light` | `{ direction, ratio, notes }` |
| `kit`, `settings`, `post` | Lenses and why; camera settings; editing steps. **Pro only** |
| `criteria` | What a successful photo of this card shows, used for scoring. **Pro only**, new (8.4) |
| `fallback`, `duration` | |
| `phone`, `now` | **Free only**, new (3.5) |

### 3.2 Image

```js
{ kind: "painting", file, title, artist, year, museum, wiki: ["Article_title"] }
{ kind: "painting", file, title, artist, year, museum, commons: "File:<exact name>" }
{ kind: "photo",    file, unsplash: "<photo id>", by: "<photographer>" }
{ kind: "own",      file, ... }   // our GFX photos (section 9)
```

Paintings are public domain. Unsplash photos are free ones (not Unsplash+), credited
with links to the photographer and Unsplash.

### 3.3 Plan (setup diagram)

Positions are clock hours around the subject as drawn: camera always at 6, 12 behind the
subject, 9 frame left, 3 frame right. Distances in metres.

```js
plan: {
  camera:  { dist, label? },
  subject: { facing, label? },                     // clock hour the face points to
  lights:  [{ kind: "window"|"sky"|"sun"|"lantern", at, dist, label }],
  mods:    [{ kind: "black"|"white"|"gold", at, dist, label }],
  zones:   [{ at, label }]                         // what lies in that direction
}
```

Drawing rules, to port to a SwiftUI Canvas:

- Radius is schematic: `min(118, 34 + 34·√dist)` in a 360 × 290 drawing. The sun sits on
  the rim. True distances are in the labels.
- The field-of-view wedge comes from the lens focal length and the sensor width.
- The angle between the lens axis and the first light is drawn and labelled.
- **Automatic label placement:** each label tries beside its icon, then above, then below.
  It takes the first spot that stays inside the drawing and doesn't overlap a label
  already placed. This matters most for beginners, so it is in v0.1.

### 3.4 Tags

| Group | Values |
|---|---|
| style | `masters`, `impressionism`, `pointillism` |
| subject | `kids`, `adults`, `family`, `none` |
| place | `water`, `street`, `farm`, `hills`, `forest`, `garden`, `indoors` |
| light | `golden`, `blue`, `day`, `night` |
| weather | `clear`, `overcast`, `fog`, `snow`, `storm` |
| season | `spring`, `summer`, `autumn`, `winter` |

Pro filters on these. Within a group, choices are OR; across groups, AND.

### 3.5 Free blocks: `phone` and `now`

Written in plain words, with no camera jargon. `now` is what the AI uses to judge whether a
style is reachable from a photo.

```js
phone: {
  lens: "Main camera (1x); step back rather than zoom",
  tips: ["Tap her face, then drag the sun icon down until the window isn't white"],
  quick: ["Stand her one step from the window, facing it", "Close the curtain on the other side"]
},
now: {
  light: "Soft side light from one opening: window, doorway, or open shade on one side",
  works_when: ["indoors by a window", "doorway", "overcast outdoors next to a wall"],
  not_when: ["direct sun on the face", "light from several directions"]
}
```

---

## 4. How advice works

### 4.1 Measure what can be measured, ask the AI only for judgement

| Advice | Source |
|---|---|
| Sun height and direction, golden and blue hour | Sun calculation (2), in Swift |
| Which way the camera faces, tilt | CoreLocation (compass), CoreMotion |
| "Turn a quarter-circle left" | Heading versus sun direction versus the card's `plan` (4.2) |
| Face turn, body pose, horizon tilt, subject placement | Vision framework |
| Background clutter, distracting objects, clothing, expression, which styles are reachable | Foundation Models, given the photo and the cards |
| Weather forecast (Pro) | WeatherKit, optional |

Everything runs on the phone.

### 4.2 Live sun and compass diagram

The card's diagram is drawn with the real sun and the phone's heading, plus one arrow
saying where to go.

With the phone's heading `H` (the direction the camera points) and the sun's azimuth `A`,
both clockwise from north:

```
relative = (A − H) mod 360           // 0 = straight ahead, behind the subject
sunHour  = (relative / 30) mod 12    // 0 is drawn as 12; 90° → 3 (frame right); 180° → 6 (behind you)
```

- The target is the clock position of the card's sun or sky light (`plan.lights[0].at`).
- `(target − sunHour) × 30°` is how far photographer and subject turn together around
  the subject. It is shown as one sentence: "Walk a quarter-circle to your left, and
  turn her with you."
- Below the horizon, or under full overcast (detected from the photo), the sun arrow is
  hidden; the diagram says the light is soft and direction matters less.
- For window cards, the target is relative to the window. The user points the phone at
  the window once to record its bearing.

### 4.3 Analysis flow

1. Take a photo with the iPhone, downscaled to about 1024 px.
2. Measure: GPS, heading, tilt, time, sun height and direction, Vision results.
3. Give the model the image, the measured facts, and:
   - **Free:** a summary of every style card (tags, `steal`, target light, `phone`, `now`);
   - **Pro:** the selected card's full recipe.

   The facts are for the model to put into words, not to recompute.
4. Typed output:

```json
{
  "mode": "free | pro",
  "verdict": "not yet | close | good",
  "styles": [
    { "card": "golden-fairytale-child", "reach": "now | move | not today",
      "why": "Low sun behind the trees on your left; turn so it's behind her." }
  ],
  "fixes": [
    {
      "category": "sun | position | distance | background | pose | phone | wardrobe | props | timing | settings | modifiers",
      "priority": 1,
      "instruction": "Step two metres to your right so the bright car leaves the background.",
      "evidence": "Red car behind her left shoulder.",
      "confidence": 0.8,
      "source": "ai | measured"
    }
  ],
  "wait_until": null
}
```

   - `styles`: Free only. Up to three cards ranked by how reachable they are now.
     Tapping one makes it the target for the next round.
   - Categories: Free uses sun, position, distance, background, pose and phone.
     Pro adds wardrobe, props, timing, settings and modifiers.
   - `wait_until`: always empty in Free (open question 11.3).
5. Merge measured and AI fixes. On sun or position, the measured fix wins.
   The user can dismiss any fix.
6. **Retake and compare** is the loop: the new photo is analysed against the same target,
   shown next to the previous one, with fixes marked done or still open. Repeat until
   "good".

Rules for the model:

- only fixes allowed for the edition, and within the target card's checklists;
- every fix cites visible evidence;
- low-confidence fixes are asked as questions ("Is that a logo on the cap?");
- nothing about the subject's body, looks or identity beyond pose and clothing.

---

## 5. AI: Apple Intelligence

**Foundation Models framework** (iOS 27, announced at WWDC 2026):

- On-device model that accepts **images with text**. Guided generation returns typed Swift
  structures. Tool calling lets the model ask app code for facts. Vision tools are
  available to it.
- Two on-device models: a 3-billion-parameter core model, and a larger one (20B sparse,
  1 to 4B active per request) on Apple's most capable devices.
- **Private Cloud Compute (PCC):** Apple's larger server models through the same API.
  Free for apps in the App Store Small Business Program with fewer than 2 million
  first-year downloads. Apple states it does not store the data.
- **Dynamic Profiles** switch between on-device and PCC within a session.
- **Evaluations** framework scores a model against a fixed test set.

**Use:**

1. **Default: on-device.** Offline, free, the photo stays on the phone.
2. **PCC as an opt-in escalation** when the on-device result is weak (low confidence,
   busy scene, groups) and there is signal. Ask the user the first time.

AI advice needs an Apple Intelligence iPhone (iPhone 15 Pro and later).

**To check in Xcode:** exact Swift names for image prompts; the on-device context window;
which iPhones get the larger model (the iPhone 18 Pro Max is expected to); PCC terms for
image analysis.

### 5.1 Decision test

A small test app on the iPhone 18 Pro Max: pick a photo, run Free mode against the six
v0.1 cards (10.5), show the JSON.

1. **Test set:** about 20 everyday phone photos of people.
   - Situations: indoors by a window, low sun, open shade, dappled shade, hard midday sun.
   - Each with one known, fixable-now problem: cluttered background, bright object behind
     the head, harsh sun on the face, subject too far, wrong side of the window,
     tilted horizon.
   - Write down the expected styles and fixes before running anything.
2. Run on-device and PCC with the same instructions and schema.
3. Score with the Evaluations framework:
   - suggested a sensible reachable style;
   - found the known problem;
   - invented nothing;
   - gave no advice Free doesn't allow (waiting, changing clothes);
   - instructions are specific and doable in a minute;
   - latency.
4. Decide whether on-device alone is enough, or PCC escalation is needed.

---

## 6. Architecture

### 6.1 Building blocks

- **Interface:** SwiftUI.
- **Camera:** system camera and photo picker in v0.1; AVFoundation later.
- **Position and direction:** CoreLocation, CoreMotion.
- **On-device analysis:** Vision, Foundation Models.
- **Storage:** SwiftData (Pro).
- **Weather:** WeatherKit (Pro, optional).
- **Shared logic:** the `PainterlyCore` Swift package, with no UI frameworks (10.3).
- **Diagram:** SwiftUI Canvas, fed by `plan`, the live sun and the heading.

### 6.2 No back-end

| Piece | Where |
|---|---|
| Cards, tags, diagrams, images | Bundled in the app |
| Free state | Nothing beyond the current retake loop |
| Pro state: session plans, checklists, filters, kit, session history (8.4) | SwiftData on the phone |
| Sun, compass, lens matching, live diagram | Computed on the phone |
| AI advice | Foundation Models on the phone (PCC opt-in) |

- New cards, images and AI instructions ship as app updates.
- App Store privacy label: **"Data Not Collected"**, as long as no analytics are added
  and PCC stays opt-in.
- Running cost: the $99/year Apple Developer Program membership.
- Optional later: iCloud sync of Pro data through SwiftData and CloudKit.

---

## 7. Free edition

### 7.1 Flow: three screens

1. **Camera.** Take a photo, or pick one just taken.
2. **Advice.**
   - Up to three styles within reach here and now, each with one line on why.
   - The fixes for the chosen style, in order.
   - The live sun and compass diagram.
   - **Retake**, compared with the previous photo. Repeat until it's good.
3. **Style.** The card as inspiration: gallery, "what to take from the painting",
   diagram, phone tips.

### 7.2 Rules

| | |
|---|---|
| Advice allowed | Where to stand, sun direction, subject position and pose, distance, background, which of the phone's lenses, tap-to-focus and exposure lock, portrait mode |
| Advice not given | Waiting for better light, changing clothes, buying props, camera settings, light modifiers |
| Cards | A small set covering common everyday light. No browsing list, no filters, no saved list |
| Images | Public-domain paintings and free Unsplash photos |
| Price | Free, no ads, no account |

---

## 8. Pro edition

### 8.1 Flow

1. **Choose a card** from a filtered list (3.4, plus "my bag" lenses).
2. **Plan.** The card's required conditions, each marked met, not met or unknown: time
   and light, weather, place, wardrobe and props, kit. Iterate until met; save the plan.
3. **On site.** Take sample photos with the iPhone; advice includes settings, lens choice
   and modifiers. Retake until good, then shoot on the real camera.
4. **After.** Import the finished camera photo. It is scored against the card's criteria,
   the session is saved to the history, and the app suggests the next session (8.4).

### 8.2 Content and images

- Everything in today's cards: kit and why, camera settings (ISO, aperture, shutter,
  white balance, film simulation), light modifiers and ratios, editing workflow.
- Our own GFX 100S photos replace the Unsplash photos (section 9). Paintings stay.

### 8.3 My kit and lens roles

Cards ask for **lens roles** as focal ranges in full-frame equivalents, not lens models:

```js
lenses: [
  { role: "lead",   efl: [100, 120], maxAperture: 2.8, character: ["vivid"] },
  { role: "alt",    efl: [60, 70] },
  { role: "detail", efl: [160, 240] }
]
```

- The user's kit is stored on the phone: bodies with a crop factor (GFX 0.79, full frame
  1.0, APS-C 1.5 or 1.6) and lenses with a focal range, aperture and character.
- A lens matches a role when `[focalMin, focalMax] × crop` overlaps the role's range.
  Aperture and character rank matches rather than exclude them.
- Card text fills in the matched lens name: `"{lead} wide open"` becomes
  "Contax 645 140mm f/2.8 wide open".

**Reference kit** (the one today's cards are written for), on a GFX 100S:

| Lens | Full-frame equivalent | Character |
|---|---|---|
| Contax Zeiss 645 35mm f/3.5 | about 28mm | Vivid, painterly Zeiss colour |
| Fujifilm GF 80mm f/1.7 | about 63mm | Sharp, clinical; suits old-master looks |
| Canon 135mm f/2L | about 107mm | In between |
| Contax Zeiss 645 140mm f/2.8 | about 111mm | Vivid, painterly |
| Contax Zeiss 645 210mm f/4 | about 166mm | Vivid; flattens depth |
| Canon 300mm f/2.8L | about 237mm | Compression, distant figures, mist |

### 8.4 Learning loop

Pro turns single shoots into deliberate practice:

```
objective (card + plan) → practice (on site, retake) → feedback (score) → learn (history) → clearer objective
```

| Stage | In the app |
|---|---|
| Objective | A card, and its plan: required conditions met before going out (8.1) |
| Practice | On site: sample photos with the iPhone, retake and compare until good |
| Feedback | The finished camera photo, scored against the card's own criteria |
| Learn | A session record kept on the phone, and progress per skill over time |
| Clearer objective | A suggested next session: the same card with one change, or a related card that trains the weak point |

**Why it matters.** Existing apps cover one stage each:

- PhotoPills plans around the sun but doesn't coach.
- FotoCraft and Klick coach composition live, but have no goal you choose and no planning.
- PicSpeak and SkillFrame (web only) score photos and track progress, but against general
  "good photo" rules.

None plans against real conditions, coaches toward a chosen style, and scores against that
same goal. A free-form chat with Claude or Gemini can do each step, but doesn't keep the
objective, the scoring grid or the history from one session to the next.

#### Criteria: scoring against the card, not general taste

Each card gets a `criteria` list, written from its `steal`, `plan`, `light` and `breakers`.
The same list is used on every attempt, so scores are comparable across sessions.

```js
criteria: [   // Vermeer Window Portrait
  { id: "side-light",  skill: "light",     check: "ai",       text: "Light from one side, slightly in front" },
  { id: "one-source",  skill: "light",     check: "self",     text: "Every other door, curtain and lamp closed or off" },
  { id: "wall-graded", skill: "light",     check: "ai",       text: "Wall behind lit, brighter near the window" },
  { id: "task",        skill: "subject",   check: "ai",       text: "Subject busy with a task, eyes down, unaware of the camera" },
  { id: "hands",       skill: "subject",   check: "ai",       text: "Hands visible and doing something" },
  { id: "palette",     skill: "styling",   check: "ai",       text: "Ochre and blue against a cool room; nothing printed or synthetic" },
  { id: "no-modern",   skill: "styling",   check: "ai",       text: "No switches, outlets, modern frames or plastic" },
  { id: "ratio",       skill: "technical", check: "measured", text: "About 2 stops between the lit and the shadow side of the face" }
]
```

- Skills are shared across cards: `light`, `composition`, `subject` (pose, expression,
  direction), `styling` (wardrobe, props, background), `technical` (focus, exposure,
  ratio). This is what lets progress carry from one card to another.
- Each criterion is scored **met**, **partly** or **not met**, with the visible evidence,
  like a fix in 4.3. The headline is "5 of 7 met", not a score out of 100.
- `check` says how it is judged:
  - `ai`: the model judges it from the photo;
  - `measured`: computed on the phone, for example the light ratio from the brightness of
    the two sides of the face (Vision finds the face), the sun's direction, or the shutter
    speed read from the photo's metadata;
  - `self`: the photographer ticks it, for things a photo can't show.
- The photographer can correct a score. The correction is what the history keeps.

#### Session record

Kept in SwiftData on the phone:

- card, date, coarse location;
- conditions on the day: sun height and direction, weather, and the plan's checklist state;
- the iPhone sample photos from the retake loop (small copies);
- the finished photo: **a reference to the Photos library item plus a small preview**, not
  a copy, so 100 MB camera files aren't duplicated;
- camera, lens and settings read from the photo's metadata;
- the score per criterion, with corrections;
- the photographer's notes: what went right, what went wrong.

#### Progress and the next objective

- **Progress** is shown per skill across sessions, in plain words: "Side light: met in 4 of
  your last 5 sessions. Backgrounds: met in 1 of 5."
- **Next session**, worked out on the phone from the history:
  - **Retry** the same card, targeting its weakest criterion with one concrete change:
    "Retry Rembrandt Forest Edge: bring the black flag, arrive 30 minutes earlier."
  - **Transfer** the weak skill to another card: "Vermeer Window practises the same side
    light indoors, with no weather to wait for."
  - **Stretch** once a card's criteria are all met: a card from another style, or the same
    card in harder conditions.
- The rule picks the suggestion; the AI only puts it into words.

**Free** keeps only the short version of the loop (retake until good), with no criteria,
history or suggestions.

### 8.5 How Pro is sold

- **Recommended:** one app with a one-time in-app purchase ("Unlock Pro", StoreKit 2).
- Needs the Paid Apps agreement and tax and banking forms in App Store Connect.
- Join the App Store Small Business Program first: 15% commission, and the condition for
  free PCC.
- Price open; $1.99 was the first idea.

---

## 9. GFX photo library

- **Goal:** one or two of our own photos per card, made by following the card. Pro ships
  when every card in it has its own photos.
- **Why:** it proves the recipe works, removes the Unsplash licensing question in a paid
  product, and gives Pro its own look.
- **Model releases:** any recognisable person in a photo used in a sold app needs a signed
  release; for children, from a parent or guardian.
- **Record per image:** card id, date, coarse location, body, lens, settings, release
  reference.
- Stored in `img/<card-id>/` as `{ kind: "own", ... }` images. The fetch script leaves
  them alone.

---

## 10. Development path

### 10.1 Constraints

- **No Mac mini at first.** It comes much later.
- Image input to Foundation Models needs the **iOS 27 SDK**, so **Xcode 27**, which runs
  **only on Apple silicon Macs** with macOS Tahoe 26.6 or later.
- The work MacBook is not used for this app.
- A personal Apple Developer Program membership ($99/year) from day one.

### 10.2 Machines

| Machine | Used for |
|---|---|
| Intel MacBook Pro (Sonoma) | Editing code and content, AI instructions, docs. Building and testing `PainterlyCore` with the newest Xcode that runs on Sonoma (Xcode 16.x) |
| Rented cloud Mac (Apple silicon; 24-hour minimum rental) | Creating the Xcode 27 project, signing, setting up Xcode Cloud |
| Xcode Cloud (included with the membership) | Building on every push and delivering to TestFlight |
| iPhone 18 Pro Max | Running TestFlight builds, including the on-device model |
| Mac mini (later) | Everything, with live previews and direct debugging |

### 10.3 Before the Mac mini

```
Intel MacBook (edit) → git push → Xcode Cloud (build) → TestFlight → iPhone 18 Pro Max
```

- Each loop takes tens of minutes: batch changes.
- Keep this phase to logic and AI work; SwiftUI screen design waits for live previews.

**Week 1:**

1. **Intel Mac:**
   - enrol in the Apple Developer Program; create a Git repository;
   - convert the six v0.1 cards to `cards.json`; write their `phone` and `now` blocks;
   - write the Free-mode AI instructions and schema (4.3);
   - start **`PainterlyCore`**: sun position and phases, card decoding, live diagram
     geometry (4.2), label placement as pure geometry, merging of fixes.
2. **One cloud Mac day:** create the Xcode 27 project with `PainterlyCore`; build the
   test app (5.1); set up signing and Xcode Cloud (push to `main` → TestFlight); upload.
3. **iPhone 18 Pro Max:** install from TestFlight; run the decision test (5.1).

Until the Mac mini, keep going on the TestFlight loop. Rent a cloud Mac again only for
Xcode-only jobs (signing, capabilities, a broken Xcode Cloud build).

### 10.4 Phases

| # | Phase | Needs |
|---|---|---|
| 0 | Week 1: `PainterlyCore`, test app, decision test | Intel Mac, cloud Mac day, Xcode Cloud |
| 1 | Core logic and AI instructions tuned on real photos | Intel Mac, Xcode Cloud |
| 2 | **v0.1**: the three Free screens (10.5) | Mac mini |
| 3 | More Free styles, each with `phone` and `now` | Any machine |
| 4 | Free release: TestFlight with one or two photographers, then the App Store | Mac mini |
| 5 | GFX photo library (9) | GFX 100S |
| 6 | Pro: card list and filters, planning, My kit, full content, on-site advice, in-app purchase | Mac mini |
| 7 | Pro learning loop (8.4): `criteria` for every card, scoring the finished photo, session history, progress per skill, next-session suggestions | Mac mini |

### 10.5 v0.1 scope

**In:**

- Camera, Advice and Style screens (7.1).
- Photo from the system camera or photo picker.
- Free-mode analysis: up to three reachable styles, and fixes.
- Retake and compare, repeated until "good".
- Live sun and compass diagram with automatic label placement.
- One-line sun header ("Golden hour in 1 h 20").
- Location from the phone; Montréal if permission is refused.

**Six cards, two per style,** covering everyday light. All six have diagrams.

| Style | Card | Covers |
|---|---|---|
| Old masters | Vermeer Window Portrait | Indoors by a window |
| Old masters | Golden Fairytale Child | Low sun outdoors |
| Impressionism | Reading in the Garden | Open shade, overcast |
| Impressionism | Riverside Boating Party | Dappled light under trees, groups |
| Pointillism | Sunday on the Riverbank | Hard midday sun |
| Pointillism | Divisionist Window Portrait | Window light, strong colour |

**Out:** card list and filters, saved state, the other 20 cards, custom viewfinder,
WeatherKit, iCloud, iPad, other languages.

### 10.6 Rules

- No code for this app on the work laptop.
- `PainterlyCore` stays free of UI frameworks, so it builds on the Intel Mac and in
  Xcode Cloud.
- `cards.js` is the source of truth until the JSON conversion.

---

## 11. Open questions

1. **Six v0.1 cards:** confirm the choice in 10.5. It favours portraits of children in
   everyday light.
2. **Older iPhones:** offer Free without photo analysis (live diagram and style cards
   only), or require an Apple Intelligence iPhone?
3. **Waiting in Free:** allow one exception when better light is very close, for example
   golden hour within 15 minutes?
4. **PCC consent:** one consent at first use, or ask every time a photo shows children?
5. **Photo retention:** keep retake-loop photos only while on the Advice screen, or offer
   to save the before-and-after pair to Photos?
6. **Content source of truth:** keep editing `cards.js` and generating JSON, or switch to
   `cards.json` and retire the web app?
7. **Pro content coverage:** wait until every card has our own photos, or ship fewer cards
   and add the rest in updates?
8. **Pro lens filter:** match cards whose *lead* lens role fits, or any role?
9. **Several bodies:** pick "today's body", or match against all?
10. **Zoom lenses:** may one zoom fill several roles at once?
11. **Lens character:** user-declared, from a bundled lens list, or both?
12. **When the learning loop ships:** with the first Pro release (phases 6 and 7 together),
    or as a Pro update afterwards? Shipping together makes the loop the main Pro pitch;
    shipping later gets Pro out sooner.
13. **Progress display:** plain history and per-skill counts only, or also streaks and
    badges as FotoCraft does? Plain fits the audience; game features add motivation.
14. **Self-checked criteria:** how many `self` criteria per card is acceptable before
    scoring feels like filling in a form?
