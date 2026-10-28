"""Monthly black & white duty sheet for 2675 boul. Poirier: periods, jobs, house rules, QR.
Usage: python tools/make_pdf.py 2026-10 [out.pdf] [en|fr]   -> print/2026-10.pdf (fr: print/2026-10-fr.pdf)
All settings come from config.json (see tools/rotation.py).
"""
import sys, calendar, datetime as dt
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.utils import simpleSplit
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

from rotation import Rules, ROOT, month_bounds, tr

L10N = {
    "en": {
        "title": "{address} Calendar",
        "months": list(calendar.month_name),
        "abbr": list(calendar.month_abbr),
        "unit": "Unit", "period": "Period",
        "covers": "Let's do our part:",
        "qr": "More details and calendar",
        "url": "{site}",
    },
    "fr": {
        "title": "Calendrier du {address}",
        "months": ["", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août",
                   "Septembre", "Octobre", "Novembre", "Décembre"],
        "abbr": ["", "janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        "unit": "Unité", "period": "Période",
        "covers": "Faisons notre part :",
        "qr": "Plus de détails et calendrier",
        "url": "{site}/?lang=fr",
    },
}


def build(year, month, out, R=None, lang="en"):
    R = R or Rules(); T = L10N[lang]
    def fmt(d): return f"{T['abbr'][d.month]} {d.day}" if lang == "en" else f"{d.day} {T['abbr'][d.month]}"
    W, H = letter; M = 40; gw = W - 2 * M
    INK = black; MUTED = HexColor("#555555"); LIGHT = HexColor("#e6e6e6")
    SH = [white, LIGHT]
    title = T["title"].format(address=R.address); mname = f"{T['months'][month]} {year}"
    c = canvas.Canvas(str(out), pagesize=letter)
    c.setTitle(f"{title} - {mname}")

    y = H - M
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 22); c.drawString(M, y - 8, title)
    c.setFont("Helvetica-Bold", 14); c.drawRightString(W - M, y - 8, mname)
    y -= 28

    # periods: who has which job, for every period overlapping the month
    cx = [M + 8, M + 128, M + 228, M + 338, M + 428]
    c.setFillColor(INK); c.rect(M, y - 18, gw, 18, stroke=0, fill=1); c.setFillColor(white); c.setFont("Helvetica-Bold", 9)
    for x, h in zip(cx, [T["period"]] + [R.job_name(j, lang) for j in R.jobs]): c.drawString(x, y - 12, h)
    y -= 18
    first, last = month_bounds(year, month)
    for b in R.periods_overlapping(first, last):
        s, e = R.period_range(b)
        ry = y - 24
        c.setFillColor(SH[b % 2]); c.setStrokeColor(INK); c.setLineWidth(0.8); c.rect(M, ry, gw, 24, stroke=1, fill=1)
        c.setFillColor(INK); c.setFont("Helvetica-Bold", 9.5); c.drawString(cx[0], ry + 8, f"{fmt(s)} - {fmt(e)}")
        for k, u in enumerate(R.team(b)):
            t = T["unit"] + " " + u; tw = c.stringWidth(t, "Helvetica-Bold", 10.5) + 14
            c.setFillColor(white); c.setStrokeColor(INK); c.setLineWidth(1)
            c.roundRect(cx[k + 1], ry + 3.5, tw, 17, 3, stroke=1, fill=1)
            c.setFillColor(INK); c.setFont("Helvetica-Bold", 10.5); c.drawString(cx[k + 1] + 7, ry + 8, t)
        y -= 24
    y -= 26

    # what each job covers, everyone's recycling, house rules (left) + QR (right)
    qsize = 78; tx_w = gw - qsize - 20
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 12); c.drawString(M, y, T["covers"])
    qtop = y + 4
    y -= 17; s = R.season(month)
    rows = [(R.job_name(j, lang), R.text(j, "print", s, lang)) for j in R.jobs]
    if R.everyone: rows.append((tr(R.everyone["name"], lang), tr(R.everyone["long"], lang)))
    for name, text in rows:
        lines = simpleSplit(text, "Helvetica", 9, tx_w - 85)
        c.setFont("Helvetica-Bold", 9); c.drawString(M, y, name)
        c.setFont("Helvetica", 9)
        for ln in lines: c.drawString(M + 85, y, ln); y -= 12
        y -= 3
    # house rules, as one more row: only the first `print_count` are printed; the website shows all of them
    rules = R.living["items"][:R.living.get("print_count", 0)]
    if rules:
        c.setFont("Helvetica-Bold", 9); c.drawString(M, y, tr(R.living["title"], lang))
        c.setFont("Helvetica", 9)
        rw = (gw if y < qtop - qsize - 34 else tx_w) - 95   # full width once below the QR caption
        for item in rules:
            for i, ln in enumerate(simpleSplit(tr(item, lang), "Helvetica", 9, rw)):
                if i == 0: c.drawString(M + 85, y, "•")
                c.drawString(M + 95, y, ln); y -= 12
    url = T["url"].format(site=R.site_url)
    w = qr.QrCodeWidget(url); bx = w.getBounds(); bw, bh = bx[2] - bx[0], bx[3] - bx[1]
    dr = Drawing(qsize, qsize, transform=[qsize / bw, 0, 0, qsize / bh, 0, 0]); dr.add(w)
    qx = W - M - qsize; renderPDF.draw(dr, c, qx, qtop - qsize)
    c.setFont("Helvetica-Bold", 8); c.drawCentredString(qx + qsize / 2, qtop - qsize - 9, T["qr"])
    c.setFont("Helvetica", 7); c.setFillColor(MUTED)
    c.drawRightString(W - M, qtop - qsize - 20, R.site_url.replace("https://", ""))
    c.showPage(); c.save()
    return min(y, qtop - qsize - 20)   # lowest point drawn, so callers can check the page fits


if __name__ == "__main__":
    ym = sys.argv[1] if len(sys.argv) > 1 else dt.date.today().strftime("%Y-%m")
    lang = sys.argv[3] if len(sys.argv) > 3 else "en"
    yr, mo = map(int, ym.split("-"))
    out = sys.argv[2] if len(sys.argv) > 2 else ROOT / "print" / f"{yr}-{mo:02d}{'' if lang == 'en' else '-' + lang}.pdf"
    build(yr, mo, out, lang=lang); print(out)
