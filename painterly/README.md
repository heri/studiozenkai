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

## Paintings

By default the app looks each painting up on Wikipedia the first time it's shown.
For a self-contained site, run this once on your computer and commit the result:

    python3 fetch_paintings.py

It saves the images to `img/` plus an `img/index.json`, and the app uses those first.
Look through them: if a lookup picked the wrong image, replace that `img/<card-id>.jpg`
with one you prefer.

## Offline

Open "Conditions" and tap "Save all paintings for offline use" once on Wi-Fi. After that
the whole deck works without signal. Sun times are computed on the phone.

## Editing cards

Everything is in `cards.js`. Each card is one object; copy one to make a new recipe.
The tags at the top of the file drive the Conditions filters.
Checkmarks and kept cards are stored on the phone only.
