#!/usr/bin/env python3
"""Download every card's images into img/ so the site doesn't depend on Wikipedia or Unsplash.

Usage (from the repo folder):  python3 fetch_paintings.py
Then commit img/ and push. Standard library only, plus `node` to read cards.js.

Cards with `images` get each entry saved to img/<file>. Older cards with a single
`painting` are saved to img/<card-id>.jpg and listed in img/index.json.
Existing files are kept; delete one to fetch it again.
On macOS, downloads are resized to 1600 px and recompressed with `sips`.
"""
import json, shutil, subprocess, sys, time, urllib.parse, urllib.request
from pathlib import Path

UA = {"User-Agent": "PainterlyFieldCards/1.0 (https://studiozenkai.com/painterly/; personal photography guide)"}
ROOT = Path(__file__).parent
OUT = ROOT / "img"
OUT.mkdir(exist_ok=True)

def get_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.load(r)

def wiki_url(titles, commons=None):
    if commons and commons.startswith("File:"):
        # An exact Wikimedia Commons file: no guessing.
        q = urllib.parse.urlencode({"action": "query", "format": "json", "titles": commons,
                                    "prop": "imageinfo", "iiprop": "url", "iiurlwidth": 1600})
        for page in get_json("https://commons.wikimedia.org/w/api.php?" + q).get("query", {}).get("pages", {}).values():
            info = (page.get("imageinfo") or [{}])[0]
            if info.get("thumburl"):
                return info["thumburl"]
        return None
    for title in titles or []:
        q = urllib.parse.urlencode({"action": "query", "format": "json", "redirects": 1, "prop": "pageimages",
                                    "piprop": "thumbnail", "pithumbsize": 1600, "titles": title})
        pages = get_json("https://en.wikipedia.org/w/api.php?" + q).get("query", {}).get("pages", {})
        for page in pages.values():
            if page.get("thumbnail", {}).get("source"):
                return page["thumbnail"]["source"]
    if commons:
        q = urllib.parse.urlencode({"action": "query", "format": "json", "generator": "search", "gsrnamespace": 6, "gsrlimit": 1,
                                    "gsrsearch": commons + " filetype:bitmap", "prop": "imageinfo", "iiprop": "url", "iiurlwidth": 1600})
        pages = get_json("https://commons.wikimedia.org/w/api.php?" + q).get("query", {}).get("pages", {})
        for page in pages.values():
            info = page.get("imageinfo", [{}])[0]
            if info.get("thumburl"):
                return info["thumburl"]
    return None

def unsplash_url(photo_id):
    # The public download link redirects to the image CDN and counts as a download for the photographer.
    return f"https://unsplash.com/photos/{photo_id}/download?w=1600"

def download(url, dest):
    dest.parent.mkdir(parents=True, exist_ok=True)
    if shutil.which("curl"):
        # Unsplash's bot check turns urllib away but lets curl through.
        subprocess.run(["curl", "-sSfL", "-A", UA["User-Agent"], "-o", str(dest), url], check=True, timeout=120)
    else:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
            dest.write_bytes(r.read())
    if shutil.which("sips"):
        subprocess.run(["sips", "-Z", "1600", "-s", "format", "jpeg", "-s", "formatOptions", "80", str(dest)],
                       check=False, capture_output=True)

cards = json.loads(subprocess.run(
    ["node", "-e", "global.window={};require('./cards.js');process.stdout.write(JSON.stringify(window.CARDS))"],
    cwd=ROOT, check=True, capture_output=True, text=True).stdout)

def fetch(name, dest, find):
    """Download one image unless it's already there. Returns True when the file exists afterwards."""
    if dest.exists():
        return True
    time.sleep(1)   # Wikimedia rate-limits bursts
    try:
        url = find()
        if not url:
            print(f"  not found: {name}"); return False
        download(url, dest)
        print(f"  saved {name}")
        return True
    except Exception as e:
        dest.unlink(missing_ok=True)
        print(f"  failed {name}: {e}", file=sys.stderr)
        return False

saved, missing = [], 0
for c in cards:
    if c.get("images"):
        for im in c["images"]:
            find = (lambda im=im: unsplash_url(im["unsplash"])) if im.get("unsplash") else (lambda im=im: wiki_url(im.get("wiki"), im.get("commons")))
            missing += not fetch(im["file"], OUT / im["file"], find)
    elif fetch(c["id"], OUT / f"{c['id']}.jpg", lambda c=c: wiki_url(c["painting"].get("wiki"), c["painting"].get("commons"))):
        saved.append(c["id"])
    else:
        missing += 1

(OUT / "index.json").write_text(json.dumps(saved, indent=1))
print(f"Done, {missing} missing. Check the images by eye, then commit img/.")
