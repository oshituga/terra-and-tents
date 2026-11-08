"""Generate two outdoor plan drawings (site plan + ceremony detail) for Maja & Oliver.

Outputs (in this folder):
  site.svg / detail.svg            full preview (with text labels)
  site_shapes.svg / detail_shapes.svg   shapes only (labels become Figma text)
  labels.json                      label positions for Figma text nodes
"""
import json
import math
import os
import random

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 614, 625
INK = "#2D211C"
CREAM = "#FAF7F2"
OAT = "#EADBC2"
CLAY = "#D9B48C"
TAN = "#C99A6B"


def f(v):
    return f"{v:.1f}".rstrip("0").rstrip(".")


class Doc:
    def __init__(self):
        self.parts = []
        self.labels = []
        self.defs = []

    def add(self, s):
        self.parts.append(s)

    def label(self, x, y, text, sub=None, size=7.5, anchor="middle", weight=500, color=INK, spacing=1.3):
        self.labels.append(dict(x=x, y=y, text=text, sub=sub, size=size, anchor=anchor, weight=weight, color=color, spacing=spacing))

    def svg(self, with_text):
        out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
        if self.defs:
            out.append("<defs>" + "".join(self.defs) + "</defs>")
        out.append(f'<rect width="{W}" height="{H}" fill="{OAT}"/>')
        out += self.parts
        if with_text:
            for L in self.labels:
                out.append(
                    f'<text x="{f(L["x"])}" y="{f(L["y"])}" font-family="Outfit, Helvetica, Arial" font-size="{L["size"]}" '
                    f'font-weight="{L["weight"]}" letter-spacing="{L["spacing"]}" text-anchor="{L["anchor"]}" fill="{L["color"]}">{L["text"]}</text>')
                if L["sub"]:
                    out.append(
                        f'<text x="{f(L["x"])}" y="{f(L["y"] + L["size"] + 2)}" font-family="Outfit, Helvetica, Arial" font-size="{L["size"] - 1.5}" '
                        f'letter-spacing="1" text-anchor="{L["anchor"]}" fill="{L["color"]}" opacity="0.7">{L["sub"]}</text>')
        out.append("</svg>")
        return "\n".join(out)


# ---------- shared symbols ----------

def spruce(d, x, y, r, rng):
    """Spruce canopy: soft clay disc, outline, radial branches."""
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{CLAY}" fill-opacity="0.45" stroke="{INK}" stroke-width="0.9"/>')
    n = 9 if r > 12 else 7
    rot = rng.uniform(0, math.pi)
    segs = []
    for i in range(n):
        a = rot + i * 2 * math.pi / n
        segs.append(f"M{f(x)} {f(y)}L{f(x + math.cos(a) * r * 0.82)} {f(y + math.sin(a) * r * 0.82)}")
    d.add(f'<path d="{"".join(segs)}" stroke="{INK}" stroke-width="0.6" fill="none"/>')
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="1.4" fill="{INK}"/>')


def birch(d, x, y, r):
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(r)}" fill="{CREAM}" stroke="{INK}" stroke-width="0.8" stroke-dasharray="2 1.5"/>')
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="1.6" fill="none" stroke="{INK}" stroke-width="0.8"/>')


def tuft(x, y, s=3.2):
    return (f"M{f(x - s * 0.6)} {f(y)}L{f(x - s * 0.2)} {f(y - s)}"
            f"M{f(x)} {f(y)}L{f(x)} {f(y - s * 1.2)}"
            f"M{f(x + s * 0.6)} {f(y)}L{f(x + s * 0.2)} {f(y - s)}")


def water_hatch(d, clip_id, x0, y0, x1, y1, step=9, opacity=0.28):
    lines = []
    y = y0
    i = 0
    while y < y1:
        # broken, slightly offset dashes like drawn water lines
        off = (i % 3) * 7
        lines.append(f'<path d="M{f(x0)} {f(y)}H{f(x1)}" stroke="{INK}" stroke-width="0.6" stroke-dasharray="{14 + (i % 4) * 4} {6 + (i % 3) * 3}" stroke-dashoffset="{off}"/>')
        y += step
        i += 1
    d.add(f'<g clip-path="url(#{clip_id})" opacity="{opacity}" fill="none">' + "".join(lines) + "</g>")


def bench(d, x, y, w, h, slats=4):
    d.add(f'<rect x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}" fill="{CREAM}" stroke="{INK}" stroke-width="1.3"/>')
    segs = "".join(f"M{f(x)} {f(y + h * k / slats)}H{f(x + w)}" for k in range(1, slats))
    d.add(f'<path d="{segs}" stroke="{INK}" stroke-width="0.45" fill="none"/>')


def north(d, x, y, s=1.0):
    d.add(f'<circle cx="{f(x)}" cy="{f(y)}" r="{f(11 * s)}" fill="none" stroke="{INK}" stroke-width="0.8"/>')
    d.add(f'<path d="M{f(x)} {f(y - 15 * s)}L{f(x + 4 * s)} {f(y + 3 * s)}L{f(x)} {f(y)}Z" fill="{INK}"/>')
    d.add(f'<path d="M{f(x)} {f(y - 15 * s)}L{f(x - 4 * s)} {f(y + 3 * s)}L{f(x)} {f(y)}Z" fill="none" stroke="{INK}" stroke-width="0.7"/>')


def scale_bar(d, x, y, unit_px, n=4):
    for i in range(n):
        fill = INK if i % 2 == 0 else CREAM
        d.add(f'<rect x="{f(x + i * unit_px)}" y="{f(y)}" width="{f(unit_px)}" height="4" fill="{fill}" stroke="{INK}" stroke-width="0.7"/>')


# =====================================================================
# 1. SITE PLAN
# =====================================================================

def site_plan():
    d = Doc()
    rng = random.Random(7)

    lake = ("M74 70 C150 34 300 40 420 44 C522 48 576 82 569 140 C563 190 522 204 472 214 "
            "C432 230 402 228 362 227 C322 226 292 232 260 222 C220 209 176 214 136 198 "
            "C92 180 56 152 58 114 C60 92 63 80 74 70 Z")
    d.defs.append(f'<clipPath id="lakeclip"><path d="{lake}"/></clipPath>')

    # meadow: very light grass ticks scattered on the open ground
    ticks = []
    for _ in range(170):
        x, y = rng.uniform(40, 575), rng.uniform(235, 600)
        ticks.append(tuft(x, y, 2.2))
    d.add(f'<path d="{"".join(ticks)}" stroke="{TAN}" stroke-width="0.6" fill="none" opacity="0.55"/>')

    # lake
    d.add(f'<path d="{lake}" fill="{CREAM}"/>')
    water_hatch(d, "lakeclip", 40, 52, 590, 240)
    # shingle shore: dotted offset line inside the heavy edge
    d.add(f'<path d="{lake}" fill="none" stroke="{TAN}" stroke-width="7" stroke-opacity="0.5"/>')
    d.add(f'<path d="{lake}" fill="none" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round"/>')

    # landing jetty
    d.add(f'<rect x="478" y="162" width="16" height="50" fill="{CREAM}" stroke="{INK}" stroke-width="1.4"/>')
    d.add('<path d="' + "".join(f"M478 {162 + k * 5}H494" for k in range(1, 10)) + f'" stroke="{INK}" stroke-width="0.4"/>')
    d.add(f'<rect x="474" y="208" width="24" height="5" fill="{INK}"/>')

    # ceremony lawn (soft boundary)
    d.add(f'<rect x="286" y="236" width="152" height="104" rx="38" fill="{CLAY}" fill-opacity="0.22" stroke="{INK}" stroke-width="0.8" stroke-dasharray="3 3"/>')

    # grass path from arrival to the ceremony
    path = "M362 276 L362 352 C362 420 262 440 222 492 C200 520 182 532 176 546"
    d.add(f'<circle cx="172" cy="560" r="26" fill="{TAN}" fill-opacity="0.32" stroke="{INK}" stroke-width="0.9"/>')
    d.add(f'<path d="{path}" fill="none" stroke="{INK}" stroke-width="19.5" stroke-linecap="butt"/>')
    d.add(f'<path d="{path}" fill="none" stroke="{CREAM}" stroke-width="17.6" stroke-linecap="butt"/>')
    # wild grass tufts along the path edges
    tufts = []
    for t in [i / 28 for i in range(29)]:
        # sample along a simple param of the path by piecewise approximation
        pass
    edge_pts = [(350, 290), (374, 300), (350, 318), (374, 330), (348, 362), (378, 372), (330, 402), (372, 396),
                (300, 420), (338, 426), (262, 444), (298, 452), (236, 470), (262, 482), (210, 496), (236, 510),
                (190, 522), (212, 536)]
    for x, y in edge_pts:
        tufts.append(tuft(x, y, 3.4))
    d.add(f'<path d="{"".join(tufts)}" stroke="{INK}" stroke-width="0.8" fill="none" stroke-linecap="round"/>')

    # benches (2 rows x 2 sides), facing the water
    for by in (290, 312):
        bench(d, 310, by, 40, 8, 3)
        bench(d, 374, by, 40, 8, 3)

    # candle table + runner + candles
    d.add(f'<rect x="349" y="257" width="26" height="11" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
    d.add(f'<rect x="358" y="257" width="8" height="11" fill="{CLAY}"/>')
    d.add(f'<circle cx="354" cy="262.5" r="1.8" fill="{INK}"/><circle cx="370" cy="262.5" r="1.8" fill="{INK}"/>')

    # birch arch: poles + beam + hanging flowers
    d.add(f'<rect x="334" y="243.5" width="56" height="4" fill="{CREAM}" stroke="{INK}" stroke-width="1"/>')
    for px in (334, 390):
        d.add(f'<circle cx="{px}" cy="245.5" r="3.6" fill="{INK}"/>')
    for hx in (346, 356, 368, 378):
        d.add(f'<circle cx="{hx}" cy="245.5" r="1.5" fill="{TAN}"/>')

    # lakeside cabin (thick walls, porch facing the lake)
    cx, cy, cw, ch = 64, 392, 132, 78
    d.add(f'<rect x="{cx}" y="{cy - 26}" width="{cw}" height="26" fill="{CREAM}" stroke="{INK}" stroke-width="1"/>')  # porch deck
    d.add('<path d="' + "".join(f"M{cx + k * 6} {cy - 26}V{cy}" for k in range(1, cw // 6)) + f'" stroke="{INK}" stroke-width="0.35"/>')
    d.add(f'<rect x="{cx}" y="{cy}" width="{cw}" height="{ch}" fill="{CREAM}"/>')
    wall = 6
    # outer walls drawn as filled bands with a door gap on the porch side and a gap facing the path
    d.add(f'<path fill-rule="evenodd" fill="{INK}" d="M{cx} {cy}H{cx + cw}V{cy + ch}H{cx}Z '
          f'M{cx + wall} {cy + wall}H{cx + cw - wall}V{cy + ch - wall}H{cx + wall}Z"/>')
    # door openings (cut with oat-coloured gaps then door swing)
    d.add(f'<rect x="{cx + 54}" y="{cy - 0.5}" width="20" height="{wall + 1}" fill="{CREAM}"/>')
    d.add(f'<path d="M{cx + 54} {cy + wall}A20 20 0 0 0 {cx + 74} {cy + wall + 20}" fill="none" stroke="{INK}" stroke-width="0.6"/>')
    d.add(f'<path d="M{cx + 74} {cy + wall}V{cy + wall + 20}" stroke="{INK}" stroke-width="0.8"/>')
    d.add(f'<rect x="{cx + cw - wall - 0.5}" y="{cy + 40}" width="{wall + 1}" height="18" fill="{CREAM}"/>')
    # interior partition with gap
    d.add(f'<rect x="{cx + 88}" y="{cy + wall}" width="4" height="34" fill="{INK}"/>')
    d.add(f'<rect x="{cx + 88}" y="{cy + 58}" width="4" height="{ch - wall - 58}" fill="{INK}"/>')
    # windows on the walls: thin breaks
    for wx in (cx + 18, cx + 104):
        d.add(f'<rect x="{wx}" y="{cy}" width="14" height="{wall}" fill="{CREAM}" stroke="{INK}" stroke-width="0.6"/>')
    # furniture: dressing table + chairs, sofa
    d.add(f'<rect x="{cx + 50}" y="{cy + 54}" width="30" height="12" fill="none" stroke="{INK}" stroke-width="0.8"/>')
    d.add(f'<circle cx="{cx + 58}" cy="{cy + 48}" r="3" fill="none" stroke="{INK}" stroke-width="0.7"/>')
    d.add(f'<circle cx="{cx + 72}" cy="{cy + 48}" r="3" fill="none" stroke="{INK}" stroke-width="0.7"/>')
    d.add(f'<rect x="{cx + 98}" y="{cy + 12}" width="22" height="12" fill="none" stroke="{INK}" stroke-width="0.8"/>')

    # crew store shed
    sx, sy, sw, sh = 462, 420, 66, 46
    d.add(f'<rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" fill="{CREAM}"/>')
    d.add(f'<path fill-rule="evenodd" fill="{INK}" d="M{sx} {sy}H{sx + sw}V{sy + sh}H{sx}Z M{sx + 5} {sy + 5}H{sx + sw - 5}V{sy + sh - 5}H{sx + 5}Z"/>')
    d.add(f'<rect x="{sx - 0.5}" y="{sy + 14}" width="6" height="16" fill="{CREAM}"/>')
    d.add(f'<path d="M{sx + 9} {sy + 9}H{sx + sw - 9}M{sx + 9} {sy + 15}H{sx + sw - 9}" stroke="{INK}" stroke-width="0.5"/>')

    # forest track + arrival
    d.add(f'<path d="M158 625 V566 M186 625 V566" stroke="{INK}" stroke-width="0.9" stroke-dasharray="4 3"/>')
    dots = "".join(f'<circle cx="{f(172 + r * math.cos(a))}" cy="{f(560 + r * math.sin(a))}" r="0.7"/>'
                   for a, r in [(rng.uniform(0, 6.28), rng.uniform(4, 23)) for _ in range(60)])
    d.add(f'<g fill="{INK}" opacity="0.55">{dots}</g>')

    # trees: spruce along the edges, birch near the shore
    spruces = [(28, 40, 16), (24, 92, 13), (30, 236, 18), (22, 290, 14), (34, 334, 15), (22, 500, 16), (40, 548, 14),
               (24, 600, 17), (78, 604, 13), (110, 520, 12), (296, 572, 13), (338, 606, 15),
               (410, 590, 17), (446, 548, 13), (600, 604, 12), (590, 496, 14), (580, 280, 16),
               (590, 330, 13), (560, 380, 15), (596, 230, 12), (596, 30, 14), (560, 22, 11), (200, 22, 12),
               (250, 18, 10), (120, 24, 13), (470, 350, 12), (236, 280, 11)]
    for x, y, r in spruces:
        spruce(d, x, y, r, rng)
    for x, y, r in [(262, 262, 6), (440, 248, 6), (418, 262, 5), (222, 240, 5), (500, 236, 5),
                    (120, 220, 6), (96, 248, 5)]:
        birch(d, x, y, r)

    # north + scale
    north(d, 566, 566)
    scale_bar(d, 466, 606, 15, 4)

    # labels
    d.label(318, 128, "THE LAKE", "STILL WATER")
    d.label(486, 146, "JETTY", None, size=6.5)
    d.label(328, 248, "BIRCH ARCH", None, size=6.2, anchor="end")
    d.label(446, 296, "CEREMONY LAWN", "14 M X 10 M", anchor="start")
    d.label(130, 488, "LAKESIDE CABIN", "DRESSING ROOMS")
    d.label(130, 360, "PORCH", None, size=6.2)
    d.label(495, 482, "CREW STORE", None, size=6.5)
    d.label(282, 470, "GRASS PATH", "60 M", anchor="middle")
    d.label(214, 566, "ARRIVAL", None, anchor="start")
    d.label(198, 612, "FOREST TRACK", None, size=6.2, anchor="start")
    d.label(466, 620, "0", None, size=5.5, anchor="middle", spacing=0.5)
    d.label(526, 620, "20 M", None, size=5.5, anchor="middle", spacing=0.5)
    d.label(566, 546, "N", None, size=6.5, anchor="middle")
    return d


# =====================================================================
# 2. CEREMONY DETAIL (enlarged)
# =====================================================================

def detail_plan():
    d = Doc()
    rng = random.Random(11)
    shore = ("M0 0 H614 V176 C560 186 520 170 470 182 C420 194 380 188 330 192 "
             "C280 196 240 186 190 190 C140 194 90 180 40 188 C24 190 10 186 0 184 Z")
    d.defs.append(f'<clipPath id="wclip"><path d="{shore}"/></clipPath>')

    # grass ticks on the lawn
    ticks = "".join(tuft(rng.uniform(10, 604), rng.uniform(210, 615), 2.4) for _ in range(220))
    d.add(f'<path d="{ticks}" stroke="{TAN}" stroke-width="0.6" fill="none" opacity="0.55"/>')

    # water
    d.add(f'<path d="{shore}" fill="{CREAM}"/>')
    water_hatch(d, "wclip", 0, 12, 614, 200, step=10)
    # reflection of the arch on the water (dashed ghost)
    d.add(f'<path d="M222 150 H392" stroke="{INK}" stroke-width="0.8" stroke-dasharray="2 3" opacity="0.5"/>')
    # shingle band
    shore_line = ("M0 184 C10 186 24 190 40 188 C90 180 140 194 190 190 C240 186 280 196 330 192 "
                  "C380 188 420 194 470 182 C520 170 560 186 614 176")
    d.add(f'<path d="{shore_line}" fill="none" stroke="{TAN}" stroke-width="16" stroke-opacity="0.45"/>')
    pebbles = "".join(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(rng.uniform(1.2, 2.6))}" ry="{f(rng.uniform(0.9, 1.8))}"/>'
                      for x, y in [(rng.uniform(0, 614), 0) for _ in range(150)] for y in [0])
    # place pebbles roughly along the shore band
    peb = []
    for _ in range(170):
        x = rng.uniform(0, 614)
        # approximate shoreline y via interpolation of key points
        pts = [(0, 184), (40, 188), (190, 190), (330, 192), (470, 182), (614, 176)]
        for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
            if x0 <= x <= x1:
                y = y0 + (y1 - y0) * (x - x0) / (x1 - x0)
                break
        y += rng.uniform(1, 9)
        peb.append(f'<ellipse cx="{f(x)}" cy="{f(y)}" rx="{f(rng.uniform(1, 2.4))}" ry="{f(rng.uniform(0.8, 1.6))}"/>')
    d.add(f'<g fill="none" stroke="{INK}" stroke-width="0.5" opacity="0.6">{"".join(peb)}</g>')
    d.add(f'<path d="{shore_line}" fill="none" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')

    # mown aisle
    d.add(f'<rect x="272" y="326" width="70" height="299" fill="{CREAM}" stroke="{INK}" stroke-width="1"/>')
    mow = "".join(f"M272 {y}H342" for y in range(340, 625, 14))
    d.add(f'<path d="{mow}" stroke="{INK}" stroke-width="0.35" opacity="0.5"/>')

    # wild grass beds lining the aisle start
    beds = []
    for x0 in (256, 350):
        for y in range(338, 600, 16):
            beds.append(tuft(x0 + (4 if (y // 16) % 2 else 0), y, 4))
    d.add(f'<path d="{"".join(beds)}" stroke="{INK}" stroke-width="0.8" fill="none" stroke-linecap="round"/>')

    # benches: 4, two rows either side of the aisle
    for by in (352, 428):
        bench(d, 104, by, 140, 22, 5)
        bench(d, 370, by, 140, 22, 5)
        # bench legs marks
        for bx in (104, 370):
            d.add(f'<path d="M{bx + 10} {by + 22}V{by + 26}M{bx + 130} {by + 22}V{by + 26}" stroke="{INK}" stroke-width="1.6"/>')

    # candle table with lace edge
    tx, ty, tw, th = 262, 250, 90, 40
    scallops = "".join(f'<circle cx="{f(tx + 4 + i * 8)}" cy="{f(ty)}" r="4"/>' for i in range(11))
    scallops += "".join(f'<circle cx="{f(tx + 4 + i * 8)}" cy="{f(ty + th)}" r="4"/>' for i in range(11))
    d.add(f'<g fill="{CREAM}" stroke="{INK}" stroke-width="0.6">{scallops}</g>')
    d.add(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{th}" fill="{CREAM}" stroke="{INK}" stroke-width="1.4"/>')
    d.add(f'<rect x="{tx + 31}" y="{ty - 4}" width="28" height="{th + 8}" fill="{CLAY}" stroke="{INK}" stroke-width="0.8"/>')
    paisley = "".join(f'<circle cx="{f(tx + 38 + (i % 2) * 14)}" cy="{f(ty + 2 + i * 5)}" r="1.6"/>' for i in range(8))
    d.add(f'<g fill="none" stroke="{INK}" stroke-width="0.5" opacity="0.7">{paisley}</g>')
    for cxp in (tx + 18, tx + 72):
        d.add(f'<circle cx="{cxp}" cy="{ty + 20}" r="7" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
        d.add(f'<circle cx="{cxp}" cy="{ty + 20}" r="2" fill="{TAN}"/>')

    # birch arch: tripod poles, beam, bindings, hanging flowers, trailing greenery
    d.add(f'<rect x="204" y="219" width="206" height="9" fill="{CREAM}" stroke="{INK}" stroke-width="1.3"/>')
    d.add(f'<path d="M208 223.5 H406" stroke="{INK}" stroke-width="0.4" stroke-dasharray="6 4"/>')
    for px in (212, 402):
        for dx, dy in ((-6, -4), (6, -4), (0, 6)):
            d.add(f'<circle cx="{px + dx}" cy="{223.5 + dy}" r="4.2" fill="{CREAM}" stroke="{INK}" stroke-width="1.2"/>')
            d.add(f'<circle cx="{px + dx}" cy="{223.5 + dy}" r="1" fill="{INK}"/>')
        d.add(f'<rect x="{px - 9}" y="219" width="18" height="9" fill="{TAN}" fill-opacity="0.8" stroke="{INK}" stroke-width="0.8"/>')
    for hx in (262, 290, 324, 352):
        d.add(f'<path d="M{hx} 228 V238" stroke="{INK}" stroke-width="0.6"/>')
        for dx, dy in ((0, 241), (-3, 244), (3, 244), (0, 247)):
            d.add(f'<circle cx="{hx + dx}" cy="{dy}" r="2" fill="{CLAY}" stroke="{INK}" stroke-width="0.5"/>')
    leaves = []
    for i in range(30):
        x = 222 + i * 6.2
        y = 219 if i % 2 else 228
        s = -1 if i % 2 else 1
        leaves.append(f"M{f(x)} {f(y)} q3 {f(s * 5)} 6 0")
    d.add(f'<path d="{"".join(leaves)}" stroke="{INK}" stroke-width="0.6" fill="{CLAY}" fill-opacity="0.5"/>')

    # dimension lines
    def dim_h(x0, x1, y, tick=4):
        d.add(f'<path d="M{x0} {y}H{x1}M{x0} {y - tick}V{y + tick}M{x1} {y - tick}V{y + tick}" stroke="{INK}" stroke-width="0.7"/>')

    def dim_v(x, y0, y1, tick=4):
        d.add(f'<path d="M{x} {y0}V{y1}M{x - tick} {y0}H{x + tick}M{x - tick} {y1}H{x + tick}" stroke="{INK}" stroke-width="0.7"/>')

    dim_h(272, 342, 612)
    dim_v(560, 228, 352)

    # trees at the edges
    for x, y, r in [(20, 230, 22), (40, 290, 16), (14, 560, 24), (60, 612, 18), (598, 240, 22), (604, 384, 14),
                    (604, 560, 22), (470, 612, 16), (46, 470, 14), (580, 470, 14)]:
        spruce(d, x, y, r, rng)
    for x, y, r in [(92, 214, 8), (128, 230, 7), (480, 214, 8), (512, 232, 7), (70, 250, 6), (536, 254, 6)]:
        birch(d, x, y, r)

    north(d, 40, 82, 0.9)
    scale_bar(d, 500, 610, 12, 4)

    # labels
    d.label(307, 112, "THE LAKE", "WATER'S EDGE")
    d.label(196, 222, "BIRCH ARCH", "3.6 M SPAN", size=6.8, anchor="end")
    d.label(307, 312, "CANDLE TABLE", "1.8 M X 0.8 M", size=6.8)
    d.label(174, 342, "BENCH 01", "2.8 M", size=6.8)
    d.label(440, 342, "BENCH 02", "2.8 M", size=6.8)
    d.label(174, 418, "BENCH 03", "2.8 M", size=6.8)
    d.label(440, 418, "BENCH 04", "2.8 M", size=6.8)
    d.label(307, 520, "MOWN AISLE", None, size=6.8)
    d.label(307, 607, "1.5 M", None, size=6)
    d.label(572, 293, "3 M", None, size=6, anchor="start")
    d.label(300, 160, "", None)
    d.label(40, 63, "N", None, size=6.5)
    d.label(500, 624, "0", None, size=5.5, spacing=0.5)
    d.label(548, 624, "5 M", None, size=5.5, spacing=0.5)
    d.label(110, 600, "WILD GRASS EDGE", None, size=6.2, anchor="start")
    return d


def main():
    out = {}
    for name, fn in (("site", site_plan), ("detail", detail_plan)):
        doc = fn()
        doc.labels = [L for L in doc.labels if L["text"]]
        with open(os.path.join(HERE, f"{name}.svg"), "w") as fh:
            fh.write(doc.svg(True))
        with open(os.path.join(HERE, f"{name}_shapes.svg"), "w") as fh:
            fh.write(doc.svg(False))
        out[name] = doc.labels
    with open(os.path.join(HERE, "labels.json"), "w") as fh:
        json.dump(out, fh)
    for name in ("site", "detail"):
        print(name, os.path.getsize(os.path.join(HERE, f"{name}_shapes.svg")), "bytes")


if __name__ == "__main__":
    main()
