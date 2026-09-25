# Painterly field cards

A swipeable deck of shoot guides for painterly portraits and landscapes on the GFX 100S.
Each card pairs a public-domain painting with timing, location, posing, wardrobe, light,
kit, camera settings, illusion-breakers and the editing workflow.

## Put it on GitHub Pages

1. Create a new repository (for example `painterly`) and push this folder to it.
2. In the repository, open Settings, then Pages. Under "Build and deployment", choose
   "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
3. After a minute the site is at `https://<your-username>.github.io/painterly/`.
4. On the iPhone, open it in Safari, tap Share, then "Add to Home Screen".

## Images

Each card lists its `images`: public-domain paintings and a couple of Unsplash
photographs, alternating. The viewer taps the left or right half of the image to flip
through them. Each image is named exactly (a Wikipedia article, a Wikimedia Commons
file, or an Unsplash photo id), so choosing them is a human job; the script only
downloads what the cards name:

    python3 fetch_paintings.py

It saves anything missing to `img/<card-id>/`, resized to 1400 px, and keeps what's
already there. It needs `node` and `curl`. Look at new images before committing.

A card can still use a single `painting` with a Wikipedia lookup instead of `images`;
the script saves that to `img/<card-id>.jpg` and lists it in `img/index.json`.

## Setup diagrams

A card with a `plan` gets a top-down drawing of camera, subject, light and reflectors
in its "Posing and direction" section. The format is described at the top of `cards.js`.

## Offline

Open "Conditions" and tap "Save all images for offline use" (about 40 MB) once on Wi-Fi. After that
the whole deck works without signal. Sun times are computed on the phone.

## Editing cards

Everything is in `cards.js`. Each card is one object; copy one to make a new recipe.
The tags at the top of the file drive the Conditions filters.
Checkmarks and kept cards are stored on the phone only.
