"""Monthly black & white duty calendar for 2675 boul. Poirier.
Usage: python tools/make_pdf.py 2026-10 [out.pdf]   -> print/2026-10.pdf
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

from rotation import Rules, ROOT, month_bounds


def fmt(d): return d.strftime("%b %-d")


def build(year, month, out, R=None):
    R = R or Rules()
    W, H = letter; M = 40; gw = W - 2 * M
    INK = black; MUTED = HexColor("#555555"); LIGHT = HexColor("#e6e6e6"); OUT = HexColor("#f2f2f2")
    SH = [white, LIGHT]
    c = canvas.Canvas(str(out), pagesize=letter)
    c.setTitle(f"{R.address} Calendar - {calendar.month_name[month]} {year}")
    def dot(x, y): c.setFillColor(INK); c.circle(x, y, 3.2, stroke=0, fill=1)
    def sq(x, y):  c.setFillColor(INK); c.rect(x - 3.2, y - 3.2, 6.4, 6.4, stroke=0, fill=1)
    MARK = {"recycling_compost": dot, "garbage": sq}

    y = H - M
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 22); c.drawString(M, y - 8, f"{R.address} Calendar")
    c.setFont("Helvetica-Bold", 14); c.drawRightString(W - M, y - 8, f"{calendar.month_name[month]} {year}")
    c.setFont("Helvetica", 9.5); c.setFillColor(MUTED)
    c.drawString(M, y - 25, "Bins go to the curb at 7pm the evening before pickup and come back in at 7pm on pickup day.")
    y -= 44
    dot(M + 4, y + 3); c.setFillColor(INK); c.setFont("Helvetica", 9)
    t1 = "Recycling & Compost (pickup every Tuesday)"; c.drawString(M + 12, y, t1)
    x2 = M + 12 + c.stringWidth(t1, "Helvetica", 9) + 30
    sq(x2 + 4, y + 3); c.setFillColor(INK); c.drawString(x2 + 12, y, "Garbage (pickup every other Friday)")
    y -= 12

    weeks = calendar.Calendar(0).monthdatescalendar(year, month)
    cw = gw / 7; rh = 66 if len(weeks) <= 5 else 61
    c.setFillColor(INK); c.rect(M, y - 18, gw, 18, stroke=0, fill=1)
    c.setFillColor(white); c.setFont("Helvetica-Bold", 9.5)
    for i, d in enumerate(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]):
        c.drawCentredString(M + cw * i + cw / 2, y - 13, d)
    y -= 18; gtop = y
    for wk in weeks:
        for i, d in enumerate(wk):
            x = M + cw * i; b = R.period_index(d); inm = d.month == month
            c.setFillColor(SH[b % 2] if (b is not None and inm) else OUT)
            c.setStrokeColor(HexColor("#999999")); c.setLineWidth(0.6); c.rect(x, y - rh, cw, rh, stroke=1, fill=1)
            if not inm: continue
            c.setFillColor(INK); c.setFont("Helvetica-Bold", 12); c.drawString(x + 5, y - 15, str(d.day))
            if b is not None:
                lab = "Bins " + R.team(b)[0]; tw = c.stringWidth(lab, "Helvetica-Bold", 7.5) + 8
                c.setStrokeColor(INK); c.setLineWidth(0.8); c.setFillColor(white)
                c.roundRect(x + cw - 5 - tw, y - 16, tw, 11, 2, stroke=1, fill=1)
                c.setFillColor(INK); c.setFont("Helvetica-Bold", 7.5); c.drawString(x + cw - 1 - tw, y - 13, lab)
            items = R.actions(d)
            ty = y - 29
            for a in items:
                MARK[a["stream"]](x + 8, ty + 3)
                c.setFillColor(INK); c.setFont("Helvetica-Bold", 7.5); c.drawString(x + 14, ty, "7pm:")
                pw = c.stringWidth("7pm: ", "Helvetica-Bold", 7.5)
                words = a["text"].split(); first = ""
                while words and c.stringWidth((first + " " + words[0]).strip(), "Helvetica", 7.5) <= cw - 18 - pw:
                    first = (first + " " + words.pop(0)).strip()
                c.setFont("Helvetica", 7.5); c.drawString(x + 14 + pw, ty, first)
                for ln in (simpleSplit(" ".join(words), "Helvetica", 7.5, cw - 18) if words else []):
                    ty -= 9; c.drawString(x + 14, ty, ln)
                ty -= 12
                # holiday / exception note, shown on pickup day only
                if a["note"] and a["kind"] == "back":
                    c.setFont("Helvetica-Oblique", 6.5); ty += 3
                    for ln in simpleSplit(a["note"], "Helvetica-Oblique", 6.5, cw - 18):
                        c.drawString(x + 14, ty, ln); ty -= 8
        y -= rh
    c.setStrokeColor(INK); c.setLineWidth(1); c.rect(M, y, gw, gtop - y, stroke=1, fill=0)
    y -= 22

    c.setFillColor(INK); c.setFont("Helvetica-Bold", 12); c.drawString(M, y, "Who does what"); y -= 8
    cx = [M + 8, M + 128, M + 228, M + 338, M + 428]
    c.setFillColor(INK); c.rect(M, y - 18, gw, 18, stroke=0, fill=1); c.setFillColor(white); c.setFont("Helvetica-Bold", 9)
    for x, h in zip(cx, ["Period"] + R.jobs): c.drawString(x, y - 12, h)
    y -= 18
    first, last = month_bounds(year, month)
    for b in R.periods_overlapping(first, last):
        s, e = R.period_range(b)
        ry = y - 24
        c.setFillColor(SH[b % 2]); c.setStrokeColor(INK); c.setLineWidth(0.8); c.rect(M, ry, gw, 24, stroke=1, fill=1)
        c.setFillColor(INK); c.setFont("Helvetica-Bold", 9.5); c.drawString(cx[0], ry + 8, f"{fmt(s)} - {fmt(e)}")
        for k, u in enumerate(R.team(b)):
            t = "Unit " + u; tw = c.stringWidth(t, "Helvetica-Bold", 10.5) + 14
            c.setFillColor(white); c.setStrokeColor(INK); c.setLineWidth(1)
            c.roundRect(cx[k + 1], ry + 3.5, tw, 17, 3, stroke=1, fill=1)
            c.setFillColor(INK); c.setFont("Helvetica-Bold", 10.5); c.drawString(cx[k + 1] + 7, ry + 8, t)
        y -= 24
    y -= 22

    # definitions (left) + QR (right)
    qsize = 78; tx_w = gw - qsize - 20
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 12); c.drawString(M, y, "What each job covers this month")
    qtop = y + 4
    y -= 17; s = R.season(month)
    for name in R.jobs:
        lines = simpleSplit(R.text(name, "print", s), "Helvetica", 9, tx_w - 85)
        c.setFont("Helvetica-Bold", 9); c.drawString(M, y, name)
        c.setFont("Helvetica", 9)
        for ln in lines: c.drawString(M + 85, y, ln); y -= 12
        y -= 3
    w = qr.QrCodeWidget(R.site_url); bx = w.getBounds(); bw, bh = bx[2] - bx[0], bx[3] - bx[1]
    dr = Drawing(qsize, qsize, transform=[qsize / bw, 0, 0, qsize / bh, 0, 0]); dr.add(w)
    qx = W - M - qsize; renderPDF.draw(dr, c, qx, qtop - qsize)
    c.setFont("Helvetica-Bold", 8); c.drawCentredString(qx + qsize / 2, qtop - qsize - 9, "Your unit's schedule")
    c.setFont("Helvetica", 7.5); c.drawCentredString(qx + qsize / 2, qtop - qsize - 19, "+ add to your calendar")
    c.setFont("Helvetica", 7); c.setFillColor(MUTED)
    c.drawRightString(W - M, qtop - qsize - 30, R.site_url.replace("https://", ""))
    c.showPage(); c.save()


if __name__ == "__main__":
    ym = sys.argv[1] if len(sys.argv) > 1 else dt.date.today().strftime("%Y-%m")
    yr, mo = map(int, ym.split("-"))
    out = sys.argv[2] if len(sys.argv) > 2 else ROOT / "print" / f"{yr}-{mo:02d}.pdf"
    build(yr, mo, out); print(out)
