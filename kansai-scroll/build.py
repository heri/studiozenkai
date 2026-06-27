#!/usr/bin/env python3
"""
build.py - generate "A Kansai Scroll" (a meisho-e horizontal handscroll travelogue)
from a folder of TOML-front-matter activity files.

    python build.py            # build into ../kansai  (repo's deployed folder)
    python build.py --serve    # build, then serve ../kansai at http://localhost:8000

Layout it expects (all relative to this file):
    trip.toml          site-level config (title, intro, city JP names, end plate)
    content/*.md       one file per activity, TOML front-matter between +++ fences
    pictures/          source photos referenced by `picture` / `pictures`
    -> ../kansai/index.html + ../kansai/assets/   (served at studiozenkai.com/kansai/)

ACTIVITY SCHEMA (front-matter keys)
    required:  title, start, city
    optional:  end, cartouche, place, transit, description, personal,
               picture (str)  OR  pictures (list[str], first = hero),
               video (url), order (int, tie-breaker when start is missing)

Design is data-driven and lives in three places, each easy to edit:
    TOKENS / FONTS   - palette + typefaces (restyle here)
    CSS              - layout & components (one plain string, literal braces ok)
    render_* funcs   - the HTML structure
"""

import argparse
import html
import os
import re
import shutil
import sys
from datetime import datetime

try:
    import tomllib  # py3.11+
except ModuleNotFoundError:
    try:
        import tomli as tomllib  # pip install tomli (backport for py3.10)
    except ModuleNotFoundError:
        sys.exit("Need Python 3.11+, or: pip install tomli")

try:
    from PIL import Image, ImageOps
    HAVE_PIL = True
except Exception:
    HAVE_PIL = False  # generator still runs; images are copied as-is, orientation guessed

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(ROOT, "content")
PICTURES_DIR = os.path.join(ROOT, "pictures")
DIST = os.path.join(ROOT, "..", "kansai")
ASSETS = os.path.join(DIST, "assets")
MAX_EDGE = 1600          # longest image edge in px (keeps GitHub Pages happy)
JPEG_QUALITY = 82

# --------------------------------------------------------------------------- #
# DESIGN TOKENS  - edit these to restyle the whole page                        #
# --------------------------------------------------------------------------- #
TOKENS = {
    "sumi":          "#1c1b17",
    "indigo-1":      "#102a44",
    "indigo-2":      "#27537b",
    "indigo-3":      "#5d8bb0",
    "haze":          "#9fb9cf",
    "washi":         "#ece0c4",
    "washi-2":       "#f5ecd6",
    "washi-edge":    "#d8c9a6",
    "vermilion":     "#b23a2e",
    "vermilion-deep":"#86271d",
    "gold":          "#a9842f",
    "sage":          "#6f8a5f",
    "ink-soft":      "#39362c",
}
FONTS = {
    # role -> (google family query, css font-family stack)
    "mincho": ("Shippori+Mincho+B1:wght@500;700;800",
               '"Shippori Mincho B1","Hiragino Mincho ProN","Yu Mincho",serif'),
    "serif":  ("Newsreader:ital,opsz,wght@0,16..72,300;0,16..72,400;0,16..72,500;1,16..72,300;1,16..72,400",
               '"Newsreader",Georgia,"Hiragino Mincho ProN",serif'),
    "mono":   ("Spline+Sans+Mono:wght@400;500",
               '"Spline Sans Mono",ui-monospace,Menlo,monospace'),
}
# Fallback Japanese city labels; override per-trip in trip.toml [cities].
CITY_JP_DEFAULT = {"Osaka": "大阪", "Kyoto": "京都", "Nara": "奈良", "Tokyo": "東京"}

# Category metadata: key -> (emoji, kanji stamp, rating label)
CATEGORIES = {
    "food":      ("🍜", "食", "taste"),
    "heritage":  ("⛩️", "雅", "wonder"),
    "play":      ("🎮", "遊", "fun"),
    "intensity": ("🌀", "力", "intensity"),
}


# --------------------------------------------------------------------------- #
# PARSING                                                                      #
# --------------------------------------------------------------------------- #
FENCE = re.compile(r"^\+\+\+\s*$", re.M)

def parse_activity(path):
    """Read one activity file. Front-matter between +++ fences (TOML).
    Any prose after the closing fence becomes `description` if none was set."""
    raw = open(path, encoding="utf-8").read()
    parts = FENCE.split(raw, maxsplit=2)
    if len(parts) >= 3:
        _, fm, body = parts[0], parts[1], parts[2]
    else:                       # no fences -> treat whole file as TOML
        fm, body = raw, ""
    data = tomllib.loads(fm)
    data.setdefault("slug", os.path.splitext(os.path.basename(path))[0])
    body = body.strip()
    if body and not data.get("description"):
        data["description"] = body
    # normalise media: accept `picture` (str) or `pictures` (list); hero = first
    pics = data.get("pictures") or ([data["picture"]] if data.get("picture") else [])
    data["pictures"] = [p for p in pics if p]
    return data


def load_activities():
    if not os.path.isdir(CONTENT_DIR):
        sys.exit("No content/ folder found at %s" % CONTENT_DIR)
    acts = []
    for name in sorted(os.listdir(CONTENT_DIR)):
        if not name.endswith((".md", ".toml", ".txt")):
            continue
        a = parse_activity(os.path.join(CONTENT_DIR, name))
        missing = [k for k in ("title", "start", "city") if not a.get(k)]
        if missing:
            print("  ! %s is missing %s - skipping" % (name, ", ".join(missing)))
            continue
        acts.append(a)
    # order: by start datetime, then optional `order`, then filename
    def sort_key(a):
        dt = parse_dt(a.get("start"))
        return (dt or datetime.max, a.get("order", 0), a["slug"])
    acts.sort(key=sort_key)
    return acts


def parse_dt(s):
    if not s:
        return None
    try:
        return datetime.fromisoformat(str(s))
    except ValueError:
        return None


def fmt_date(s):
    dt = parse_dt(s)
    return dt.strftime("%Y · %m · %d") if dt else ""


def fmt_hours(start, end):
    a, b = parse_dt(start), parse_dt(end)
    if a and b:
        return "%s – %s" % (a.strftime("%H:%M"), b.strftime("%H:%M"))
    if a:
        return a.strftime("%H:%M")
    return ""


# --------------------------------------------------------------------------- #
# IMAGES                                                                       #
# --------------------------------------------------------------------------- #
def process_image(rel_path, slug, idx):
    """Optimise one source photo into dist/assets/ and report its dimensions.
    Returns (web_rel_path, width, height, orientation) or None if not found."""
    src = rel_path if os.path.isabs(rel_path) else os.path.join(ROOT, rel_path)
    if not os.path.exists(src):
        print("  ! picture not found: %s" % rel_path)
        return None
    os.makedirs(ASSETS, exist_ok=True)
    out_name = "%s-%d.jpg" % (slug, idx)
    out_path = os.path.join(ASSETS, out_name)
    if HAVE_PIL:
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        w, h = im.size
        scale = min(1.0, MAX_EDGE / max(w, h))
        if scale < 1.0:
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        im.save(out_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        w, h = im.size
    else:
        shutil.copy(src, out_path)
        w, h = 1200, 1600  # unknown; assume portrait-ish
    orient = "land" if w >= h else "port"
    return ("assets/" + out_name, w, h, orient)


# --------------------------------------------------------------------------- #
# CSS  (plain string - literal braces are fine here, do not f-string it)       #
# --------------------------------------------------------------------------- #
def build_css():
    root_vars = "\n".join("  --%s:%s;" % (k, v) for k, v in TOKENS.items())
    root_vars += "\n  --mincho:%s;\n  --serif:%s;\n  --mono:%s;" % (
        FONTS["mincho"][1], FONTS["serif"][1], FONTS["mono"][1])
    return ":root{\n" + root_vars + "\n}\n" + CSS_BODY


CSS_BODY = r"""
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:var(--indigo-1);color:var(--sumi);
  font-family:var(--serif);-webkit-font-smoothing:antialiased}
body{overflow:hidden}

#track{height:100vh;height:100dvh;overflow-x:auto;overflow-y:hidden;white-space:nowrap;
  display:flex;align-items:stretch;scroll-behavior:smooth;scrollbar-width:none;
  background:linear-gradient(180deg,var(--indigo-1) 0%,var(--indigo-2) 52%,
    var(--haze) 74%,#cdd9d0 86%,#bcae8c 100%)}
#track::-webkit-scrollbar{display:none}

.scene{position:relative;display:inline-flex;align-items:center;flex:0 0 auto;
  padding:0 clamp(28px,6vw,110px);min-width:max-content}
.mountains{position:absolute;left:0;right:0;bottom:0;height:34%;z-index:0;pointer-events:none}
.mountains svg{width:100%;height:100%}
.mt-far{fill:#3f6486;opacity:.55}.mt-near{fill:#2c4f72;opacity:.7}
.cards{position:relative;z-index:2;display:flex;align-items:center;
  gap:clamp(26px,4vw,64px);padding:8vh 0}

.mist{position:relative;flex:0 0 auto;width:clamp(180px,18vw,340px);align-self:stretch;
  display:flex;align-items:center;justify-content:center}
.kasumi{position:absolute;inset:0;width:100%;height:100%}
.kasumi rect{fill:var(--washi)}
.mist-label{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;
  gap:.5rem;padding:18px 14px;border-radius:50%;
  background:radial-gradient(closest-side,rgba(236,224,196,.96),rgba(236,224,196,.55) 70%,rgba(236,224,196,0))}
.ml-jp{font-family:var(--mincho);font-weight:800;font-size:clamp(34px,5vw,62px);
  color:var(--vermilion-deep);writing-mode:vertical-rl;letter-spacing:.12em}
.ml-en{font-family:var(--mono);font-size:11px;letter-spacing:.42em;color:var(--ink-soft);
  text-transform:uppercase;writing-mode:vertical-rl}

.card{position:relative;flex:0 0 auto;cursor:pointer;outline:none;white-space:normal;
  box-shadow:0 28px 60px -28px rgba(8,18,30,.7),0 4px 14px -6px rgba(8,18,30,.5)}
.card.port{width:clamp(280px,26vw,360px);height:clamp(420px,62vh,560px)}
.card.land{width:clamp(380px,40vw,560px);height:clamp(300px,46vh,420px)}
.card-inner{position:relative;width:100%;height:100%;perspective:1600px}
.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  border-radius:2px;overflow:hidden;will-change:transform;
  transition:transform .85s cubic-bezier(.4,.05,.2,1),visibility 0s}
.card.flipped .front{transform:rotateY(-180deg);visibility:hidden;
  transition:transform .85s cubic-bezier(.4,.05,.2,1),visibility 0s .425s}
.card.flipped .back{transform:rotateY(0deg);visibility:visible;
  transition:transform .85s cubic-bezier(.4,.05,.2,1),visibility 0s}

.front{background:#0c1722;border:1px solid rgba(255,255,255,.10)}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.front::after{content:"";position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(8,14,22,0) 38%,rgba(8,14,22,.18) 56%,rgba(8,14,22,.86) 100%)}
.no-photo{background:radial-gradient(120% 80% at 30% 0%,var(--indigo-2),var(--indigo-1))}
.cartouche{position:absolute;top:14px;right:14px;z-index:3;background:var(--vermilion);
  padding:12px 9px 14px;box-shadow:0 6px 16px -8px rgba(0,0,0,.6)}
.cart-jp{font-family:var(--mincho);font-weight:700;color:var(--washi-2);font-size:18px;
  writing-mode:vertical-rl;letter-spacing:.16em;line-height:1.1}
.front-foot{position:absolute;left:0;right:0;bottom:0;z-index:3;padding:20px 22px 24px}
.title{margin:0 0 .5rem;font-family:var(--mincho);font-weight:700;color:var(--washi-2);
  font-size:clamp(21px,2.4vw,27px);line-height:1.18}
.feeling{margin:0;font-family:var(--serif);font-style:italic;font-weight:300;
  color:rgba(245,236,214,.94);font-size:clamp(14px,1.45vw,16.5px);line-height:1.5;
  max-width:42ch;text-wrap:pretty}
.seal{position:absolute;bottom:16px;right:16px;z-index:4;width:34px;height:34px;border-radius:50%;
  border:1.5px solid rgba(245,236,214,.8);color:rgba(245,236,214,.92);background:rgba(178,58,46,.72);
  display:flex;align-items:center;justify-content:center;font-family:var(--mincho);font-size:15px;
  box-shadow:0 2px 8px rgba(0,0,0,.35);transition:transform .3s,background .3s}
.card:hover .seal,.card:focus-visible .seal{transform:scale(1.12);background:var(--vermilion)}
.hanko{position:absolute;top:14px;left:14px;z-index:3;background:rgba(178,58,46,.68);
  padding:8px 7px 10px;box-shadow:0 4px 12px -6px rgba(0,0,0,.55)}
.hanko-jp{font-family:var(--mincho);font-weight:700;color:var(--washi-2);font-size:15px;
  writing-mode:vertical-rl;letter-spacing:.16em;line-height:1.1;display:block}

.back{transform:rotateY(180deg);visibility:hidden;
  transition:transform .85s cubic-bezier(.4,.05,.2,1),visibility 0s .425s;
  border:1px solid var(--washi-edge);padding:clamp(22px,2.4vw,30px);display:flex;flex-direction:column;
  background:radial-gradient(120% 80% at 20% 0%,var(--washi-2),var(--washi) 60%,var(--washi-edge) 100%)}
.back::before{content:"";position:absolute;inset:10px;border:1px solid rgba(134,39,29,.28);pointer-events:none}
.back-head{display:flex;align-items:baseline;gap:12px;border-bottom:2px solid var(--vermilion-deep);
  padding-bottom:10px;margin-bottom:14px}
.back-cart{font-family:var(--mincho);font-weight:700;color:var(--vermilion-deep);font-size:18px;flex:0 0 auto}
.back-title{margin:0;font-family:var(--mincho);font-weight:500;color:var(--sumi);
  font-size:clamp(17px,1.8vw,21px);line-height:1.2}
.desc{margin:0 0 auto;font-family:var(--serif);font-weight:400;color:var(--ink-soft);
  font-size:clamp(13.5px,1.4vw,15.5px);line-height:1.62;text-wrap:pretty;overflow:auto}
.meta{margin-top:18px;border-top:1px solid rgba(134,39,29,.3);padding-top:12px;display:grid;gap:7px}
.m-row{display:grid;grid-template-columns:5.2em 1fr;gap:10px;align-items:baseline}
.m-k{font-family:var(--mono);font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.m-v{font-family:var(--mono);font-size:12px;color:var(--sumi);line-height:1.35}
.dots{color:var(--vermilion);letter-spacing:.06em}
.seal-back{border-color:var(--vermilion-deep);color:var(--vermilion-deep);background:transparent}

.plate{align-items:center}
.frontis{position:relative;z-index:2;max-width:min(78vw,440px);text-align:center;white-space:normal;
  color:var(--washi-2);padding:0 8px}
.fr-rule{height:1px;background:linear-gradient(90deg,transparent,rgba(245,236,214,.5),transparent);margin:18px 0}
.fr-cart{display:inline-block;background:var(--vermilion);color:var(--washi-2);font-family:var(--mincho);
  font-weight:800;font-size:30px;padding:14px 12px;writing-mode:vertical-rl;letter-spacing:.2em;margin-bottom:8px}
.end-cart{background:var(--vermilion-deep)}
.fr-title{font-family:var(--mincho);font-weight:800;font-size:clamp(34px,5vw,58px);margin:.2em 0;
  line-height:1.05;color:var(--washi-2)}
.fr-sub{font-family:var(--mono);font-size:12px;letter-spacing:.34em;text-transform:uppercase;
  color:var(--haze);margin:.4em 0 1.4em}
.fr-note{font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(15px,1.6vw,17px);
  line-height:1.6;color:rgba(245,236,214,.88);text-wrap:pretty}
.end-link{display:inline-block;margin-top:18px;font-family:var(--mono);font-size:11px;
  letter-spacing:.28em;text-transform:uppercase;color:var(--washi-2);
  border-bottom:1px solid rgba(245,236,214,.4);padding-bottom:2px;text-decoration:none;
  transition:color .25s,border-color .25s}
.end-link:hover{color:var(--vermilion);border-color:var(--vermilion)}

#rail{position:fixed;left:0;right:0;bottom:0;z-index:40;height:56px;display:flex;align-items:center;
  gap:18px;padding:0 22px;background:linear-gradient(180deg,rgba(16,42,68,0),rgba(12,23,34,.78));
  backdrop-filter:blur(3px)}
#rail .seg{position:relative;display:flex;align-items:center;gap:8px;background:none;border:none;
  cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:.28em;text-transform:uppercase;
  color:rgba(245,236,214,.55);padding:6px 2px;transition:color .3s}
#rail .seg .jp{font-family:var(--mincho);font-size:15px;letter-spacing:.1em}
#rail .seg:hover,#rail .seg.active{color:var(--washi-2)}
#rail .seg.active::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--vermilion)}
.copy{margin-left:auto;font-family:var(--mono);font-size:9px;letter-spacing:.18em;
  color:rgba(245,236,214,.28);white-space:nowrap;pointer-events:none}
#bar{position:fixed;left:0;bottom:56px;height:2px;background:var(--vermilion);z-index:41;width:0;transition:width .12s linear}
.nav{position:fixed;top:50%;transform:translateY(-50%);z-index:42;width:46px;height:46px;border-radius:50%;
  border:1px solid rgba(245,236,214,.32);background:rgba(12,23,34,.5);color:var(--washi-2);font-size:20px;
  cursor:pointer;backdrop-filter:blur(3px);transition:background .25s}
.nav:hover{background:rgba(178,58,46,.7)}
#prev{left:16px}#next{right:16px}
.hint{position:fixed;top:18px;left:50%;transform:translateX(-50%);z-index:42;font-family:var(--mono);
  font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:rgba(245,236,214,.7);
  background:rgba(12,23,34,.5);padding:8px 16px;border:1px solid rgba(245,236,214,.18);
  transition:opacity .6s;pointer-events:none}

@media (max-width:680px){
  .nav{display:none}
  .card.port{width:78vw;height:64vh}.card.land{width:84vw;height:52vh}
  #rail{gap:10px;padding:0 12px}#rail .seg{letter-spacing:.16em;font-size:10px}
  .hint{font-size:10px;letter-spacing:.18em}
}
@media (prefers-reduced-motion:reduce){
  #track{scroll-behavior:auto}.card-inner{transition:none}
}
"""


# --------------------------------------------------------------------------- #
# HTML RENDERERS                                                               #
# --------------------------------------------------------------------------- #
def esc(s):
    return html.escape(str(s)) if s else ""


def render_card(a):
    hero = a.get("_hero")  # (path, w, h, orient) or None
    orient = hero[3] if hero else "port"
    cartouche = a.get("cartouche") or a.get("place") or a.get("city") or ""
    title = esc(a.get("title"))
    feeling = esc(a.get("personal"))
    desc = esc(a.get("description")) or "<span class='muted'>—</span>"

    if hero:
        photo = ('<img class="photo" data-src="%s" width="%d" height="%d" '
                 'alt="%s">') % (hero[0], hero[1], hero[2], title)
        front_cls = "face front"
    else:
        photo = ""
        front_cls = "face front no-photo"

    # Category stamp (front, top-left) and rating row (back, ledger)
    cat_key = str(a.get("category", "")).lower()
    cat_data = CATEGORIES.get(cat_key)
    hanko_html = ""
    rating_html = ""
    if cat_data:
        emoji, kanji, label = cat_data
        hanko_html = '<div class="hanko"><span class="hanko-jp">%s</span></div>' % kanji
        raw_rating = a.get("rating")
        if raw_rating is not None:
            filled = max(0, min(int(raw_rating), 5))
            dots = "●" * filled + "○" * (5 - filled)
            rating_html = ('<div class="m-row"><span class="m-k">%s</span>'
                           '<span class="m-v">%s <span class="dots">%s</span></span></div>'
                           % (label, emoji, dots))

    meta_pairs = [
        ("date", fmt_date(a.get("start"))),
        ("hours", fmt_hours(a.get("start"), a.get("end"))),
        ("place", esc(a.get("place"))),
        ("transit", esc(a.get("transit"))),
    ]
    meta_rows = "".join(
        '<div class="m-row"><span class="m-k">%s</span><span class="m-v">%s</span></div>' % (k, v)
        for k, v in meta_pairs if v)
    meta_rows += rating_html

    feeling_html = '<p class="feeling">%s</p>' % feeling if feeling else ""

    return """
    <article class="card %s" tabindex="0" aria-label="%s. Tap to turn the card.">
      <div class="card-inner">
        <div class="%s">
          %s
          %s
          <div class="cartouche"><span class="cart-jp">%s</span></div>
          <div class="front-foot"><h2 class="title">%s</h2>%s</div>
          <div class="seal" aria-hidden="true">裏</div>
        </div>
        <div class="face back">
          <div class="back-head"><span class="back-cart">%s</span><h3 class="back-title">%s</h3></div>
          <p class="desc">%s</p>
          <div class="meta">%s</div>
          <div class="seal seal-back" aria-hidden="true">表</div>
        </div>
      </div>
    </article>""" % (orient, title, front_cls, photo, hanko_html,
                     esc(cartouche), title, feeling_html,
                     esc(cartouche), title, desc, meta_rows)


KASUMI_RECTS = [
    (30, 70, 360, 50, 1.0), (190, 150, 380, 46, .82), (0, 244, 300, 50, .9),
    (150, 330, 330, 44, .7), (70, 560, 320, 44, .7), (210, 648, 350, 50, .9),
    (20, 742, 300, 46, .82), (160, 826, 360, 50, 1.0),
]

def render_mist(jp, en):
    rects = "".join(
        '<rect x="%d" y="%d" width="%d" height="%d" rx="%d" opacity="%s"/>'
        % (x, y, w, h, h // 2, o) for (x, y, w, h, o) in KASUMI_RECTS)
    return """
    <div class="mist" aria-hidden="false">
      <svg class="kasumi" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice"><g>%s</g></svg>
      <div class="mist-label"><span class="ml-jp">%s</span><span class="ml-en">%s</span></div>
    </div>""" % (rects, esc(jp), esc(en))


MOUNTAINS = """
    <div class="mountains" aria-hidden="true">
      <svg viewBox="0 0 1400 300" preserveAspectRatio="none">
        <path class="mt-far"  d="M0,300 L0,150 Q180,60 360,130 Q560,210 760,120 Q980,40 1180,140 Q1300,180 1400,140 L1400,300 Z"/>
        <path class="mt-near" d="M0,300 L0,210 Q220,150 420,205 Q640,250 840,195 Q1060,150 1260,210 Q1340,235 1400,215 L1400,300 Z"/>
      </svg>
    </div>"""

def render_scene(city, cards_html):
    return '<section class="scene" data-city="%s">%s<div class="cards">%s</div></section>' % (
        esc(city), MOUNTAINS, cards_html)


def render_frontis(trip):
    return """
  <section class="scene plate">
    <div class="frontis">
      <div class="fr-rule"></div>
      <div class="fr-cart"><span>%s</span></div>
      <h1 class="fr-title">%s</h1>
      <p class="fr-sub">%s</p>
      <p class="fr-note">%s</p>
      <div class="fr-rule"></div>
    </div>
  </section>""" % (esc(trip.get("seal", "関西")), esc(trip.get("title", "A Scroll")),
                   esc(trip.get("subtitle", "")), esc(trip.get("intro", "")))


def render_end(trip, count):
    note = trip.get("end_note", "").format(count=count)
    link_url = trip.get("end_link_url", "")
    link_text = trip.get("end_link_text", "Read the full story")
    link_html = ('\n      <a class="end-link" href="%s">%s →</a>'
                 % (esc(link_url), esc(link_text))) if link_url else ""
    return """
  <section class="scene plate end">
    <div class="frontis">
      <div class="fr-cart end-cart"><span>%s</span></div>
      <h1 class="fr-title">%s</h1>
      <p class="fr-note">%s</p>%s
    </div>
  </section>""" % (esc(trip.get("end_seal", "結")), esc(trip.get("end_title", "To be continued")),
                   esc(note), link_html)


def render_page(trip, body):
    families = "&family=".join(FONTS[r][0] for r in ("mincho", "serif", "mono"))
    return """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=%s&display=swap" rel="stylesheet">
<style>%s</style>
</head>
<body>
<div class="hint" id="hint">Scroll →&nbsp;&nbsp;·&nbsp;&nbsp;Tap a card to turn it</div>
<div id="track">%s</div>
<div id="bar"></div>
<nav id="rail" aria-label="Journey"></nav>
<button class="nav" id="prev" aria-label="Back">‹</button>
<button class="nav" id="next" aria-label="Forward">›</button>
<script>%s</script>
</body>
</html>""" % (esc(trip.get("title", "A Scroll")), families, build_css(), body, PAGE_JS)


PAGE_JS = r"""
const track=document.getElementById('track'),bar=document.getElementById('bar'),rail=document.getElementById('rail');
track.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){track.scrollLeft+=e.deltaY;e.preventDefault();}},{passive:false});
document.querySelectorAll('.card').forEach(c=>{const f=()=>c.classList.toggle('flipped');
  c.addEventListener('click',f);
  c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f();}});});
const segScenes=[...document.querySelectorAll('.scene[data-city]:not(.plate)')];
const segs=[];const seen={};
segScenes.forEach(sc=>{const city=sc.dataset.city;seen[city]=(seen[city]||0)+1;
  const jp=sc.dataset.jp||'';const en=seen[city]>1?city+' '+'Ⅰ Ⅱ Ⅲ Ⅳ'.split(' ')[seen[city]-1]:city;
  const b=document.createElement('button');b.className='seg';b.innerHTML='<span class="jp">'+jp+'</span>'+en;
  b.addEventListener('click',()=>track.scrollTo({left:sc.offsetLeft-60,behavior:'smooth'}));
  rail.appendChild(b);segs.push({el:b,sc});});
const copy=document.createElement('span');copy.className='copy';copy.textContent='© Heri Rakotomalala';rail.appendChild(copy);
const stops=[...document.querySelectorAll('.scene,.mist')];
function go(d){const x=track.scrollLeft+10;const pts=stops.map(s=>s.offsetLeft).sort((a,b)=>a-b);
  let t=d>0?pts.find(p=>p>x+40):[...pts].reverse().find(p=>p<x-40);
  if(t==null)t=d>0?track.scrollWidth:0;track.scrollTo({left:Math.max(0,t-60),behavior:'smooth'});}
document.getElementById('next').onclick=()=>go(1);
document.getElementById('prev').onclick=()=>go(-1);
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(-1);});
function sync(){const m=track.scrollWidth-track.clientWidth;bar.style.width=(m>0?track.scrollLeft/m*100:0)+'%';
  const x=track.scrollLeft+track.clientWidth*0.4;let a=0;segs.forEach((s,i)=>{if(s.sc.offsetLeft<=x)a=i;});
  segs.forEach((s,i)=>s.el.classList.toggle('active',i===a));}
track.addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync);sync();
let hid=false;const fade=()=>{if(hid)return;hid=true;const h=document.getElementById('hint');if(h){h.style.opacity=0;setTimeout(()=>h.remove(),700);}};
track.addEventListener('scroll',fade,{passive:true});setTimeout(fade,6000);
(function(){const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const img=e.target;img.src=img.dataset.src;io.unobserve(img);}});},{root:track,rootMargin:'0px 800px 0px 400px',threshold:0});document.querySelectorAll('.photo[data-src]').forEach(img=>io.observe(img));})();
"""


# --------------------------------------------------------------------------- #
# BUILD                                                                        #
# --------------------------------------------------------------------------- #
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--serve", action="store_true", help="serve dist/ after building")
    args = ap.parse_args()

    trip = {}
    trip_path = os.path.join(ROOT, "trip.toml")
    if os.path.exists(trip_path):
        trip = tomllib.loads(open(trip_path, encoding="utf-8").read())
    city_jp = {**CITY_JP_DEFAULT, **trip.get("cities", {})}

    acts = load_activities()
    if not acts:
        sys.exit("No valid activities found in content/.")

    # fresh output
    if os.path.exists(DIST):
        shutil.rmtree(DIST)
    os.makedirs(ASSETS, exist_ok=True)

    # process hero images
    for a in acts:
        a["_hero"] = None
        if a["pictures"]:
            a["_hero"] = process_image(a["pictures"][0], a["slug"], 0)

    # walk activities in order; open a new scene whenever the city changes,
    # inserting a kasumi mist transition before each scene.
    parts = [render_frontis(trip)]
    prev_city = None
    scene_cards = []

    def flush(city):
        if scene_cards:
            sc = render_scene(city, "".join(scene_cards))
            # stash JP label on the section for the rail (via data-jp)
            sc = sc.replace('data-city="%s"' % esc(city),
                            'data-city="%s" data-jp="%s"' % (esc(city), esc(city_jp.get(city, ""))))
            parts.append(sc)

    for a in acts:
        city = a["city"]
        if city != prev_city:
            flush(prev_city)
            scene_cards = []
            parts.append(render_mist(city_jp.get(city, ""), city))
            prev_city = city
        scene_cards.append(render_card(a))
    flush(prev_city)
    parts.append(render_end(trip, len(acts)))

    html_out = render_page(trip, "\n".join(parts))
    out_file = os.path.join(DIST, "index.html")
    open(out_file, "w", encoding="utf-8").write(html_out)
    print("Built %d activities -> %s (%d KB)" % (
        len(acts), out_file, len(html_out) // 1024))

    if args.serve:
        import http.server, socketserver, functools
        os.chdir(DIST)
        h = functools.partial(http.server.SimpleHTTPRequestHandler)
        with socketserver.TCPServer(("", 8000), h) as s:
            print("Serving http://localhost:8000  (Ctrl-C to stop)")
            s.serve_forever()


if __name__ == "__main__":
    main()
