"""Draw the site and ceremony plans for every wedding, in the Terra & Tent plan style.

Maja & Oliver use the original drawings in gen_plans.py. The other three venues
are drawn here with the same symbols, colours and label rules (PLAN-METHOD.md).

Writes public/plans/<slug>-site.svg and public/plans/<slug>-ceremony.svg with the
labels as live text, set in the site's Outfit font when the SVG is inlined.

Run: python3 scripts/plans/build_plans.py
"""
import math
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import gen_plans as g  # noqa: E402
from gen_plans import CLAY, CREAM, INK, TAN, Doc, bench, birch, f, north, scale_bar, spruce, tuft  # noqa: E402

OUT = os.path.join(HERE, "..", "..", "public", "plans")
W, H = g.W, g.H


# ---------- extra symbols ----------

def fruit_tree(d, x, y, r):
    """Orchard or garden tree: soft clay crown with a scalloped edge."""
    n = max(10, int(r / 3))
    pts = []
    for i in range(n * 2):
        a = i * math.pi / n
        rr = r if i % 2 == 0 else r * (0.86 if r < 40 else 0.95)
        pts.append((x + math.cos(a) * rr, y + math.sin(a) * rr))
    path = "M" + "L".join(f"{f(px)} {f(py)}" for px, py in pts) + "Z"
    d.add(f'<path d="{path}" fill="{CLAY}" fill-opacity="0.45" stroke="{INK}" stroke-width="0.8" stroke-linejoin="round"/>')
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="1.4" fill="{INK}"/>')


def palm(d, x, y, r, rng):
    """Palm crown: fronds as curved strokes from a dark centre."""
    n = 8
    rot = rng.uniform(0, math.pi)
    segs = []
    for i in range(n):
        a = rot + i * 2 * math.pi / n
        ex, ey = x + math.cos(a) * r, y + math.sin(a) * r
        cx, cy = x + math.cos(a + 0.35) * r * 0.6, y + math.sin(a + 0.35) * r * 0.6
        segs.append(f"M{f(x)} {f(y)}Q{f(cx)} {f(cy)} {f(ex)} {f(ey)}")
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{CLAY}" fill-opacity="0.2"/>')
    d.add(f'<path d="{"".join(segs)}" stroke="{INK}" stroke-width="0.9" fill="none" stroke-linecap="round"/>')
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="2.2" fill="{INK}"/>')


def building(d, x, y, w, h, wall=6, doors=(), windows=(), timber=False):
    """Thick-walled building. doors: (side, offset, width); windows: (side, offset, width)."""
    d.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{CREAM}"/>')
    d.add(f'<path fill-rule="evenodd" fill="{INK}" d="M{x} {y}H{x + w}V{y + h}H{x}Z '
          f'M{x + wall} {y + wall}H{x + w - wall}V{y + h - wall}H{x + wall}Z"/>')
    if timber:  # half-timbered frame: diagonal braces inside the walls
        segs = []
        for k in range(1, 4):
            bx = x + w * k / 4
            segs.append(f"M{f(bx)} {y + wall}V{y + h - wall}")
        segs.append(f"M{x + wall} {y + wall}L{f(x + w / 4)} {y + h - wall}")
        segs.append(f"M{f(x + w * 3 / 4)} {y + wall}L{x + w - wall} {y + h - wall}")
        d.add(f'<path d="{"".join(segs)}" stroke="{INK}" stroke-width="0.4" opacity="0.45"/>')

    def gap(side, off, width, fill=CREAM):
        if side == "top":
            d.add(f'<rect x="{x + off}" y="{y - 0.5}" width="{width}" height="{wall + 1}" fill="{fill}"/>')
        elif side == "bottom":
            d.add(f'<rect x="{x + off}" y="{y + h - wall - 0.5}" width="{width}" height="{wall + 1}" fill="{fill}"/>')
        elif side == "left":
            d.add(f'<rect x="{x - 0.5}" y="{y + off}" width="{wall + 1}" height="{width}" fill="{fill}"/>')
        else:
            d.add(f'<rect x="{x + w - wall - 0.5}" y="{y + off}" width="{wall + 1}" height="{width}" fill="{fill}"/>')

    for side, off, width in windows:
        gap(side, off, width)
        if side in ("top", "bottom"):
            yy = y if side == "top" else y + h - wall
            d.add(f'<rect x="{x + off}" y="{yy}" width="{width}" height="{wall}" fill="none" stroke="{INK}" stroke-width="0.6"/>')
        else:
            xx = x if side == "left" else x + w - wall
            d.add(f'<rect x="{xx}" y="{y + off}" width="{wall}" height="{width}" fill="none" stroke="{INK}" stroke-width="0.6"/>')
    for side, off, width in doors:
        gap(side, off, width)
        if side == "bottom":
            d.add(f'<path d="M{x + off} {y + h - wall}A{width} {width} 0 0 1 {x + off + width} {y + h - wall - width}" fill="none" stroke="{INK}" stroke-width="0.6"/>')
            d.add(f'<path d="M{x + off + width} {y + h - wall}V{y + h - wall - width}" stroke="{INK}" stroke-width="0.8"/>')
        elif side == "left":
            d.add(f'<path d="M{x + wall} {y + off}A{width} {width} 0 0 1 {x + wall + width} {y + off + width}" fill="none" stroke="{INK}" stroke-width="0.6"/>')
            d.add(f'<path d="M{x + wall} {y + off + width}H{x + wall + width}" stroke="{INK}" stroke-width="0.8"/>')


def chair(d, x, y, s=7):
    d.add(f'<rect x="{f(x)}" y="{f(y)}" width="{s}" height="{s}" fill="{CREAM}" stroke="{INK}" stroke-width="0.8"/>')
    d.add(f'<path d="M{f(x)} {f(y + 1.6)}H{f(x + s)}" stroke="{INK}" stroke-width="1.4"/>')


def chair_rows(d, x0, y0, cols, rows, s=7, gx=3, gy=8):
    for r in range(rows):
        for c in range(cols):
            chair(d, x0 + c * (s + gx), y0 + r * (s + gy), s)


def long_table(d, x, y, w, h, seats_each_side, seat=5):
    d.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
    d.add(f'<path d="M{x + 4} {f(y + h / 2)}H{x + w - 4}" stroke="{TAN}" stroke-width="2"/>')
    step = w / seats_each_side
    for i in range(seats_each_side):
        cx = x + step * (i + 0.5)
        d.add(f'<circle cx="{f(cx)}" cy="{f(y - seat - 1)}" r="{seat / 2 + 0.6}" fill="{CREAM}" stroke="{INK}" stroke-width="0.7"/>')
        d.add(f'<circle cx="{f(cx)}" cy="{f(y + h + seat + 1)}" r="{seat / 2 + 0.6}" fill="{CREAM}" stroke="{INK}" stroke-width="0.7"/>')


def festoon(d, x0, y0, x1, y1, sag=10, bulbs=9):
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2 + sag
    d.add(f'<path d="M{x0} {y0}Q{f(mx)} {f(my)} {x1} {y1}" stroke="{INK}" stroke-width="0.6" fill="none" stroke-dasharray="1 2"/>')
    for i in range(1, bulbs):
        t = i / bulbs
        bx = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mx + t * t * x1
        by = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * my + t * t * y1
        d.add(f'<circle cx="{f(bx)}" cy="{f(by)}" r="1.5" fill="{TAN}" stroke="{INK}" stroke-width="0.4"/>')


def lantern(d, x, y):
    d.add(f'<circle cx="{x}" cy="{y}" r="4" fill="{CREAM}" stroke="{INK}" stroke-width="0.8"/>')
    d.add(f'<circle cx="{x}" cy="{y}" r="1.5" fill="{TAN}"/>')


def flower_pot(d, x, y, r=4.5):
    d.add(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{CREAM}" stroke="{INK}" stroke-width="0.8"/>')
    for dx, dy in ((0, -1.6), (-1.5, 1), (1.5, 1)):
        d.add(f'<circle cx="{f(x + dx)}" cy="{f(y + dy)}" r="1.3" fill="{CLAY}"/>')


def path_band(d, path, w=19.5):
    d.add(f'<path d="{path}" fill="none" stroke="{INK}" stroke-width="{w}" stroke-linecap="butt" stroke-linejoin="round"/>')
    d.add(f'<path d="{path}" fill="none" stroke="{CREAM}" stroke-width="{w - 1.9}" stroke-linecap="butt" stroke-linejoin="round"/>')


def gravel(d, rng, cx, cy, rx, ry, n=70):
    dots = "".join(f'<circle cx="{f(cx + rx * r * math.cos(a))}" cy="{f(cy + ry * r * math.sin(a))}" r="0.7"/>'
                   for a, r in [(rng.uniform(0, 6.28), rng.uniform(0.1, 0.95)) for _ in range(n)])
    d.add(f'<g fill="{INK}" opacity="0.5">{dots}</g>')


def zone(d, x, y, w, h, rx=30):
    d.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{CLAY}" fill-opacity="0.22" stroke="{INK}" stroke-width="0.8" stroke-dasharray="3 3"/>')


def grass(d, rng, n, x0, x1, y0, y1, s=2.2):
    ticks = "".join(tuft(rng.uniform(x0, x1), rng.uniform(y0, y1), s) for _ in range(n))
    d.add(f'<path d="{ticks}" stroke="{TAN}" stroke-width="0.6" fill="none" opacity="0.55"/>')


def dim_h(d, x0, x1, y, tick=4):
    d.add(f'<path d="M{x0} {y}H{x1}M{x0} {y - tick}V{y + tick}M{x1} {y - tick}V{y + tick}" stroke="{INK}" stroke-width="0.7"/>')


def dim_v(d, x, y0, y1, tick=4):
    d.add(f'<path d="M{x} {y0}V{y1}M{x - tick} {y0}H{x + tick}M{x - tick} {y1}H{x + tick}" stroke="{INK}" stroke-width="0.7"/>')


# =====================================================================
# Maria & Israel: farmhouse garden and barn, Alsace
# =====================================================================

def farm_site():
    d, rng = Doc(), random.Random(21)
    grass(d, rng, 190, 20, 594, 20, 605)

    # gravel drive from the lane to the yard
    drive = "M300 625 L300 560 C300 520 270 500 240 470"
    d.add(f'<path d="{drive}" fill="none" stroke="{TAN}" stroke-width="26" stroke-opacity="0.35"/>')
    d.add(f'<path d="{drive}" fill="none" stroke="{INK}" stroke-width="0.8" stroke-dasharray="4 3"/>')
    gravel(d, rng, 230, 450, 60, 34, 90)

    # farmhouse (half-timbered) with terrace
    building(d, 52, 96, 170, 104, wall=6, timber=True,
             doors=(("bottom", 70, 22),), windows=(("top", 24, 16), ("top", 120, 16), ("left", 34, 16)))
    d.add(f'<rect x="64" y="200" width="146" height="34" fill="{CREAM}" stroke="{INK}" stroke-width="1"/>')
    d.add('<path d="' + "".join(f"M{64 + k * 8} 200V234" for k in range(1, 18)) + f'" stroke="{INK}" stroke-width="0.35"/>')

    # barn for the dancing
    building(d, 392, 70, 180, 124, wall=7,
             doors=(("left", 42, 34),), windows=(("top", 30, 18), ("top", 132, 18)))
    d.add(f'<rect x="430" y="98" width="104" height="66" fill="{CLAY}" fill-opacity="0.3" stroke="{INK}" stroke-width="0.6" stroke-dasharray="2 2"/>')

    # garden lawn ceremony
    zone(d, 250, 260, 236, 150, rx=40)
    chair_rows(d, 286, 316, 6, 4, s=6, gx=3)
    chair_rows(d, 382, 316, 6, 4, s=6, gx=3)
    d.add(f'<rect x="352" y="276" width="34" height="14" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
    d.add(f'<rect x="364" y="276" width="10" height="14" fill="{CLAY}"/>')
    fruit_tree(d, 369, 252, 34)  # the old tree over the ceremony table
    d.add(f'<rect x="352" y="276" width="34" height="14" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
    d.add(f'<rect x="364" y="276" width="10" height="14" fill="{CLAY}"/>')

    # lantern tree between house and barn
    fruit_tree(d, 300, 150, 24)
    for lx, ly in ((290, 142), (310, 146), (298, 160), (308, 132)):
        lantern(d, lx, ly)

    # orchard rows
    for row in range(3):
        for col in range(5):
            fruit_tree(d, 70 + col * 44 + (row % 2) * 20, 300 + row * 52, 13)

    # reception tables on the lawn by the barn
    long_table(d, 470, 450, 100, 14, 8)
    long_table(d, 470, 500, 100, 14, 8)
    festoon(d, 462, 436, 580, 436, 8)

    # boundary hedges with birches
    for x, y, r in [(30, 40, 14), (110, 30, 12), (250, 28, 13), (600, 240, 13), (590, 330, 15),
                    (40, 560, 16), (100, 600, 13), (540, 600, 14), (600, 560, 12), (36, 470, 13)]:
        spruce(d, x, y, r, rng)
    for x, y, r in [(520, 230, 5), (560, 250, 6), (200, 560, 5), (420, 580, 6)]:
        birch(d, x, y, r)

    north(d, 566, 566)
    scale_bar(d, 466, 606, 15, 4)

    d.label(137, 150, "FARMHOUSE", "DRESSING ROOMS")
    d.label(137, 246, "TERRACE", None, size=6.2)
    d.label(482, 134, "THE BARN", "DANCE FLOOR")
    d.label(300, 186, "LANTERN TREE", None, size=6.2)
    d.label(369, 426, "GARDEN LAWN", "18 M X 12 M")
    d.label(140, 420, "ORCHARD", None, size=6.5)
    d.label(520, 538, "SUPPER TABLES", None, size=6.5)
    d.label(232, 404, "", None)
    d.label(196, 452, "GRAVEL YARD", None, size=6.2, anchor="end")
    d.label(312, 612, "ARRIVAL", None, size=6.2, anchor="start")
    d.label(466, 620, "0", None, size=5.5, spacing=0.5)
    d.label(526, 620, "20 M", None, size=5.5, spacing=0.5)
    d.label(566, 546, "N", None, size=6.5)
    return d


def farm_ceremony():
    d, rng = Doc(), random.Random(23)
    grass(d, rng, 230, 10, 604, 10, 615, 2.4)

    # the old tree canopy over the table
    fruit_tree(d, 307, 150, 96)
    d.add(f'<circle cx="307" cy="150" r="9" fill="{TAN}" stroke="{INK}" stroke-width="1.2"/>')
    for lx, ly in ((258, 116), (356, 110), (236, 172), (378, 176), (300, 86), (330, 206)):
        lantern(d, lx, ly)

    # ceremony table with runner and urns
    tx, ty, tw, th = 257, 236, 100, 34
    d.add(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{th}" fill="{CREAM}" stroke="{INK}" stroke-width="1.4"/>')
    d.add(f'<rect x="{tx + 38}" y="{ty - 4}" width="24" height="{th + 8}" fill="{CLAY}" stroke="{INK}" stroke-width="0.8"/>')
    for ux in (tx - 18, tx + tw + 18):
        flower_pot(d, ux, ty + 17, 9)

    # aisle and chairs: 6 rows of 6 each side
    d.add(f'<rect x="282" y="300" width="50" height="325" fill="{CREAM}" stroke="{INK}" stroke-width="0.9"/>')
    for r in range(6):
        y = 318 + r * 46
        for c in range(6):
            chair(d, 112 + c * 26, y, 18)
            chair(d, 352 + c * 26, y, 18)
        flower_pot(d, 274, y + 9, 5)
        flower_pot(d, 340, y + 9, 5)

    dim_h(d, 282, 332, 612)
    dim_v(d, 560, 236, 300)

    for x, y, r in [(26, 40, 22), (588, 40, 22), (20, 300, 18), (596, 320, 18), (40, 600, 20), (586, 600, 20)]:
        spruce(d, x, y, r, rng)

    north(d, 40, 520, 0.9)
    scale_bar(d, 500, 610, 12, 4)

    d.label(307, 30, "THE OLD PEAR TREE", "LANTERNS IN THE BRANCHES")
    d.label(307, 290, "CEREMONY TABLE", "2 M X 0.7 M", size=6.8)
    d.label(196, 306, "LEFT ROWS", "36 CHAIRS", size=6.8)
    d.label(430, 306, "RIGHT ROWS", "36 CHAIRS", size=6.8)
    d.label(307, 470, "GRASS AISLE", None, size=6.8)
    d.label(307, 607, "1.5 M", None, size=6)
    d.label(572, 272, "1.8 M", None, size=6, anchor="start")
    d.label(40, 501, "N", None, size=6.5)
    d.label(500, 624, "0", None, size=5.5, spacing=0.5)
    d.label(548, 624, "5 M", None, size=5.5, spacing=0.5)
    d.label(92, 250, "FLOWER URNS", None, size=6.2, anchor="start")
    return d


# =====================================================================
# Amara & James: palm-lined hillside lawn, Madeira
# =====================================================================

def palm_site():
    d, rng = Doc(), random.Random(31)

    # hillside contours falling towards the sea view at the top
    for k in range(7):
        y = 40 + k * 26
        p = f"M0 {y} C150 {y - 18} 300 {y + 22} 460 {y - 6} C540 {y - 18} 590 {y + 4} 614 {y - 4}"
        d.add(f'<path d="{p}" stroke="{TAN}" stroke-width="0.8" fill="none" opacity="0.7"/>')
    grass(d, rng, 160, 20, 594, 210, 605)

    # quinta house
    building(d, 46, 420, 150, 96, wall=6, doors=(("bottom", 60, 22),), windows=(("top", 20, 18), ("top", 110, 18)))
    d.add(f'<rect x="56" y="516" width="130" height="26" fill="{CREAM}" stroke="{INK}" stroke-width="1"/>')

    # farm track and palm avenue
    track = "M330 625 L330 470 C330 420 340 380 352 344"
    path_band(d, track)
    for y in range(600, 380, -44):
        palm(d, 300, y, 15, rng)
        palm(d, 362, y, 15, rng)

    # ceremony lawn with benches facing the view
    zone(d, 216, 214, 280, 120, rx=40)
    for r in range(4):
        bench(d, 252, 272 + r * 14, 80, 7, 3)
        bench(d, 380, 272 + r * 14, 80, 7, 3)
    d.add(f'<rect x="336" y="236" width="40" height="12" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
    d.add(f'<path d="M332 230 V254 M380 230 V254 M326 236 L386 248" stroke="{INK}" stroke-width="1.6"/>')

    # paddock fence
    d.add(f'<path d="M480 360 H600 V560" stroke="{INK}" stroke-width="0.9" fill="none"/>')
    d.add('<path d="' + "".join(f"M{x} 356V364" for x in range(480, 601, 16)) + "".join(f"M596 {y}H604" for y in range(360, 561, 16)) + f'" stroke="{INK}" stroke-width="1"/>')

    # long reception tables under festoons
    long_table(d, 410, 400, 60, 12, 5)
    long_table(d, 410, 440, 60, 12, 5)
    festoon(d, 400, 386, 480, 386, 6, 7)

    for x, y in [(150, 260), (110, 300), (520, 250), (560, 300), (200, 360), (480, 300)]:
        palm(d, x, y, 14, rng)
    for x, y, r in [(30, 600, 15), (120, 600, 12), (560, 600, 14), (240, 590, 12)]:
        spruce(d, x, y, r, rng)

    north(d, 566, 566)
    scale_bar(d, 466, 606, 15, 4)

    d.label(307, 70, "THE VALLEY", "VIEW TOWARDS THE SEA")
    d.label(356, 226, "TIMBER ARCH", None, size=6.2)
    d.label(492, 224, "CEREMONY LAWN", "20 M X 9 M", anchor="start")
    d.label(121, 474, "QUINTA", "DRESSING ROOMS")
    d.label(440, 476, "LONG TABLES", None, size=6.2)
    d.label(540, 340, "PADDOCK", None, size=6.2)
    d.label(386, 560, "PALM AVENUE", "80 M", anchor="start")
    d.label(342, 614, "ARRIVAL", None, size=6.2, anchor="start")
    d.label(466, 620, "0", None, size=5.5, spacing=0.5)
    d.label(526, 620, "20 M", None, size=5.5, spacing=0.5)
    d.label(566, 546, "N", None, size=6.5)
    return d


def palm_ceremony():
    d, rng = Doc(), random.Random(33)
    grass(d, rng, 230, 10, 604, 160, 615, 2.4)

    # the slope dropping away beyond the lawn edge
    edge = "M0 150 C120 140 220 160 307 152 C400 144 500 160 614 148"
    d.add(f'<path d="M0 0 H614 V148 C500 160 400 144 307 152 C220 160 120 140 0 150 Z" fill="{CREAM}"/>')
    for k in range(5):
        y = 30 + k * 24
        d.add(f'<path d="M0 {y} C200 {y - 10} 400 {y + 10} 614 {y}" stroke="{TAN}" stroke-width="0.8" fill="none" opacity="0.7"/>')
    d.add(f'<path d="{edge}" fill="none" stroke="{INK}" stroke-width="3" stroke-dasharray="10 4"/>')

    # timber cross arch with ribbons
    d.add(f'<path d="M232 200 L382 236 M232 236 L382 200" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>')
    d.add(f'<path d="M232 200 L382 236 M232 236 L382 200" stroke="{CREAM}" stroke-width="3" stroke-linecap="round"/>')
    for px in (232, 382):
        d.add(f'<circle cx="{px}" cy="218" r="6" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
    d.add(f'<path d="M300 214 q8 12 -2 26 M312 222 q-8 12 4 24" stroke="{INK}" stroke-width="0.7" fill="none"/>')

    # table
    d.add(f'<rect x="272" y="252" width="70" height="26" fill="{CREAM}" stroke="{INK}" stroke-width="1.3"/>')
    for cx in (290, 324):
        flower_pot(d, cx, 265, 5)

    # aisle of white flowers and benches
    d.add(f'<rect x="282" y="300" width="50" height="325" fill="{CREAM}" stroke="{INK}" stroke-width="0.9"/>')
    for r in range(5):
        y = 316 + r * 56
        bench(d, 104, y, 160, 20, 5)
        bench(d, 350, y, 160, 20, 5)
        flower_pot(d, 276, y + 10, 6)
        flower_pot(d, 338, y + 10, 6)

    dim_h(d, 282, 332, 612)
    dim_v(d, 560, 200, 300)

    for x, y in [(40, 200), (574, 200), (40, 420), (574, 420), (40, 590), (574, 590)]:
        palm(d, x, y, 22, rng)

    north(d, 40, 120, 0.9)
    scale_bar(d, 500, 610, 12, 4)

    d.label(307, 96, "THE SLOPE", "OPEN VIEW TO THE VALLEY")
    d.label(220, 214, "TIMBER ARCH", "3.4 M SPAN", size=6.8, anchor="end")
    d.label(307, 292, "TABLE", None, size=6.8)
    d.label(184, 306, "BENCHES 01 TO 05", None, size=6.8)
    d.label(430, 306, "BENCHES 06 TO 10", None, size=6.8)
    d.label(307, 470, "FLOWER AISLE", None, size=6.8)
    d.label(307, 607, "1.5 M", None, size=6)
    d.label(572, 254, "3.5 M", None, size=6, anchor="start")
    d.label(40, 101, "N", None, size=6.5)
    d.label(500, 624, "0", None, size=5.5, spacing=0.5)
    d.label(548, 624, "5 M", None, size=5.5, spacing=0.5)
    return d


# =====================================================================
# Sofia & Henry: waterfall glade, Asturias
# =====================================================================

def falls_site():
    d, rng = Doc(), random.Random(41)
    grass(d, rng, 170, 20, 594, 250, 605)

    # river winding down from the falls into a pool
    river = ("M400 0 C392 40 420 70 410 110 C400 150 360 160 330 190 C300 220 250 228 220 250 "
             "C180 280 120 290 60 320 C40 330 20 336 0 340")
    d.add(f'<path d="{river}" fill="none" stroke="{INK}" stroke-width="30" stroke-linecap="round"/>')
    d.add(f'<path d="{river}" fill="none" stroke="{CREAM}" stroke-width="26.5" stroke-linecap="round"/>')
    d.add(f'<path d="{river}" fill="none" stroke="{INK}" stroke-width="0.5" stroke-dasharray="10 6" opacity="0.4"/>')
    pool = "M300 150 C340 120 410 120 430 160 C448 196 410 236 360 236 C310 236 270 200 300 150 Z"
    d.add(f'<path d="{pool}" fill="{CREAM}" stroke="{TAN}" stroke-width="7" stroke-opacity="0.5"/>')
    d.defs.append(f'<clipPath id="poolclip"><path d="{pool}"/></clipPath>')
    g.water_hatch(d, "poolclip", 290, 120, 450, 240, step=8)
    d.add(f'<path d="{pool}" fill="none" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    # the falls: short stacked strokes where the river drops into the pool
    falls = "".join(f"M{388 + k * 5} {108 + (k % 2) * 4}V{128 + (k % 3) * 4}" for k in range(7))
    d.add(f'<path d="{falls}" stroke="{INK}" stroke-width="0.9"/>')

    # footbridge
    d.add(f'<rect x="200" y="226" width="22" height="46" fill="{CREAM}" stroke="{INK}" stroke-width="1.3" transform="rotate(-28 211 249)"/>')

    # ceremony glade beside the pool
    zone(d, 330, 262, 200, 120, rx=40)
    chair_rows(d, 352, 316, 5, 3, s=6, gx=3)
    chair_rows(d, 446, 316, 5, 3, s=6, gx=3)
    d.add(f'<rect x="414" y="276" width="34" height="12" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')

    # path from the car park
    path_band(d, "M120 625 L120 560 C120 500 220 470 300 430 C340 410 380 398 420 388")

    # reception under a canopy near the cabin
    d.add(f'<rect x="420" y="440" width="150" height="90" fill="{CREAM}" stroke="{INK}" stroke-width="1" stroke-dasharray="4 2"/>')
    long_table(d, 440, 464, 110, 12, 8)
    long_table(d, 440, 500, 110, 12, 8)
    building(d, 40, 400, 110, 74, wall=5, doors=(("bottom", 44, 20),), windows=(("top", 20, 14), ("top", 76, 14)))
    gravel(d, rng, 110, 600, 40, 18, 60)

    for x, y, r in [(30, 40, 16), (100, 30, 14), (180, 60, 15), (250, 30, 13), (520, 30, 16), (590, 80, 15),
                    (580, 180, 16), (560, 250, 13), (40, 200, 15), (90, 380, 12), (240, 330, 13),
                    (300, 560, 14), (380, 600, 16), (600, 600, 14), (520, 600, 12), (230, 520, 12)]:
        spruce(d, x, y, r, rng)

    north(d, 566, 566)
    scale_bar(d, 466, 606, 15, 4)

    d.label(370, 182, "THE POOL", "BELOW THE FALLS")
    d.label(440, 100, "WATERFALL", None, size=6.2, anchor="start")
    d.label(150, 300, "THE RIVER", None, size=6.2)
    d.label(244, 214, "FOOTBRIDGE", None, size=6.2, anchor="start")
    d.label(430, 400, "CEREMONY GLADE", "16 M X 10 M")
    d.label(495, 548, "SUPPER CANOPY", None, size=6.2)
    d.label(95, 494, "CABIN", "DRESSING ROOM")
    d.label(250, 452, "WOODLAND PATH", "120 M", anchor="end")
    d.label(160, 612, "CAR PARK", None, size=6.2, anchor="start")
    d.label(466, 620, "0", None, size=5.5, spacing=0.5)
    d.label(526, 620, "20 M", None, size=5.5, spacing=0.5)
    d.label(566, 546, "N", None, size=6.5)
    return d


def falls_ceremony():
    d, rng = Doc(), random.Random(43)
    grass(d, rng, 230, 10, 604, 200, 615, 2.4)

    # pool edge across the top, falls at the back
    shore = ("M0 0 H614 V150 C560 168 500 150 440 170 C380 188 320 176 260 182 C190 188 120 170 60 180 C40 184 20 178 0 176 Z")
    d.defs.append(f'<clipPath id="fpool"><path d="{shore}"/></clipPath>')
    d.add(f'<path d="{shore}" fill="{CREAM}"/>')
    g.water_hatch(d, "fpool", 0, 10, 614, 190, step=10)
    falls = "".join(f"M{250 + k * 12} {20 + (k % 3) * 4}V{60 + (k % 2) * 8}" for k in range(10))
    d.add(f'<path d="{falls}" stroke="{INK}" stroke-width="1.1"/>')
    edge = "M0 176 C20 178 40 184 60 180 C120 170 190 188 260 182 C320 176 380 188 440 170 C500 150 560 168 614 150"
    d.add(f'<path d="{edge}" fill="none" stroke="{TAN}" stroke-width="14" stroke-opacity="0.45"/>')
    d.add(f'<path d="{edge}" fill="none" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')

    # wooden altar with posts of white flowers
    d.add(f'<rect x="272" y="226" width="70" height="30" fill="{CREAM}" stroke="{INK}" stroke-width="1.4"/>')
    for px in (248, 366):
        d.add(f'<rect x="{px - 4}" y="216" width="8" height="50" fill="{TAN}" stroke="{INK}" stroke-width="0.9"/>')
        for k in range(4):
            flower_pot(d, px + (8 if k % 2 else -8), 220 + k * 12, 4)

    # cross-back chairs, aisle edged with potted flowers
    d.add(f'<rect x="282" y="290" width="50" height="335" fill="{CREAM}" stroke="{INK}" stroke-width="0.9"/>')
    for r in range(6):
        y = 306 + r * 48
        for c in range(5):
            chair(d, 120 + c * 30, y, 20)
            d.add(f'<path d="M{120 + c * 30} {y}L{140 + c * 30} {y + 20}M{140 + c * 30} {y}L{120 + c * 30} {y + 20}" stroke="{INK}" stroke-width="0.5"/>')
            chair(d, 354 + c * 30, y, 20)
            d.add(f'<path d="M{354 + c * 30} {y}L{374 + c * 30} {y + 20}M{374 + c * 30} {y}L{354 + c * 30} {y + 20}" stroke="{INK}" stroke-width="0.5"/>')
        flower_pot(d, 274, y + 10, 5)
        flower_pot(d, 340, y + 10, 5)

    dim_h(d, 282, 332, 612)
    dim_v(d, 560, 182, 290)

    for x, y, r in [(26, 230, 22), (588, 230, 22), (20, 440, 18), (596, 440, 18), (40, 600, 20), (586, 600, 20)]:
        spruce(d, x, y, r, rng)

    north(d, 40, 120, 0.9)
    scale_bar(d, 500, 610, 12, 4)

    d.label(307, 112, "THE POOL", "FALLS BEHIND")
    d.label(307, 274, "WOODEN ALTAR", "1.8 M", size=6.8)
    d.label(196, 296, "LEFT ROWS", "30 CHAIRS", size=6.8)
    d.label(426, 296, "RIGHT ROWS", "30 CHAIRS", size=6.8)
    d.label(307, 470, "FERN AISLE", None, size=6.8)
    d.label(307, 607, "1.5 M", None, size=6)
    d.label(572, 240, "3 M", None, size=6, anchor="start")
    d.label(40, 101, "N", None, size=6.5)
    d.label(500, 624, "0", None, size=5.5, spacing=0.5)
    d.label(548, 624, "5 M", None, size=5.5, spacing=0.5)
    d.label(220, 206, "FLOWER POSTS", None, size=6.2, anchor="end")
    return d


# ---------- output ----------

def web_svg(doc, prefix):
    """The drawing with live labels set in the page's Outfit font."""
    doc.labels = [L for L in doc.labels if L["text"]]
    svg = doc.svg(True)
    svg = svg.replace('font-family="Outfit, Helvetica, Arial"',
                      'style="font-family: var(--font-outfit), Helvetica, Arial, sans-serif"')
    # keep clip-path ids unique when two plans sit on one page
    for cid in ("lakeclip", "wclip", "poolclip", "fpool"):
        svg = svg.replace(f'id="{cid}"', f'id="{prefix}-{cid}"').replace(f"url(#{cid})", f"url(#{prefix}-{cid})")
    svg = svg.replace("<svg ", '<svg role="img" ', 1)
    return svg


def main():
    os.makedirs(OUT, exist_ok=True)
    plans = {
        "maja-and-oliver": (g.site_plan, g.detail_plan),
        "maria-and-israel": (farm_site, farm_ceremony),
        "amara-and-james": (palm_site, palm_ceremony),
        "sofia-and-henry": (falls_site, falls_ceremony),
    }
    for slug, (site, ceremony) in plans.items():
        for kind, fn in (("site", site), ("ceremony", ceremony)):
            path = os.path.join(OUT, f"{slug}-{kind}.svg")
            with open(path, "w") as fh:
                fh.write(web_svg(fn(), f"{slug}-{kind}"))
            print(path, os.path.getsize(path))


if __name__ == "__main__":
    main()
