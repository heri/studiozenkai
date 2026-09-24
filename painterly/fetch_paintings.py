#!/usr/bin/env python3
"""Download every card's painting into img/ so the site doesn't depend on Wikipedia.

Usage (from the repo folder):  python3 fetch_paintings.py
Then commit img/ and push. Standard library only.
"""
import json, re, sys, urllib.parse, urllib.request
from pathlib import Path

UA = {"User-Agent": "PainterlyFieldCards/1.0 (personal photography guide)"}
ROOT = Path(__file__).parent
OUT = ROOT / "img"
OUT.mkdir(exist_ok=True)

def get_json(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.load(r)

def find(card):
    p = card["painting"]
    for title in p.get("wiki", []):
        q = urllib.parse.urlencode({"action": "query", "format": "json", "redirects": 1, "prop": "pageimages",
                                    "piprop": "thumbnail", "pithumbsize": 1600, "titles": title})
        pages = get_json("https://en.wikipedia.org/w/api.php?" + q).get("query", {}).get("pages", {})
        for page in pages.values():
            if page.get("thumbnail", {}).get("source"):
                return page["thumbnail"]["source"]
    q = urllib.parse.urlencode({"action": "query", "format": "json", "generator": "search", "gsrnamespace": 6, "gsrlimit": 1,
                                "gsrsearch": p["commons"] + " filetype:bitmap", "prop": "imageinfo", "iiprop": "url", "iiurlwidth": 1600})
    pages = get_json("https://commons.wikimedia.org/w/api.php?" + q).get("query", {}).get("pages", {})
    for page in pages.values():
        info = page.get("imageinfo", [{}])[0]
        if info.get("thumburl"):
            return info["thumburl"]
    return None

# cards.js is JavaScript; strip the wrapper and parse it with a light touch.
src = (ROOT / "cards.js").read_text(encoding="utf-8")
blocks = re.split(r'\n\{\n', src)[1:]
cards = []
for b in blocks:
    cid = re.search(r'id:\s*"([^"]+)"', b).group(1)
    wiki = re.findall(r'"([^"]+)"', re.search(r'wiki:\s*\[([^\]]*)\]', b).group(1))
    commons = re.search(r'commons:\s*"([^"]+)"', b).group(1)
    cards.append({"id": cid, "painting": {"wiki": wiki, "commons": commons}})

saved = []
for c in cards:
    try:
        url = find(c)
        if not url:
            print(f"  not found: {c['id']}"); continue
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
            (OUT / f"{c['id']}.jpg").write_bytes(r.read())
        saved.append(c["id"])
        print(f"  saved {c['id']}")
    except Exception as e:
        print(f"  failed {c['id']}: {e}", file=sys.stderr)

(OUT / "index.json").write_text(json.dumps(saved, indent=1))
print(f"{len(saved)} of {len(cards)} paintings in img/. Check them by eye, then commit img/.")
