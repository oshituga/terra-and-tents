# Terra & Tent: how the wedding plans are drawn

Reference: Maja & Oliver details page, TT file (qWJbWiaeJJVEM21w33rBTR), section "The shore, mapped out" (Frame 88, 329:2218).
Panels: "Site plan" (359:586) and "Ceremony plan" (359:605). Indoor originals hidden beside them as backups.

## The two panels
1. Site plan (left): the whole venue. Main landscape feature, approach route, path to the ceremony, ceremony area, any buildings, trees.
2. Ceremony plan (right): an enlarged close-up of the ceremony setting with every styled piece, numbered and measured.

## Size and colour
- Each panel 614 x 625, oat background #EADBC2, clip content, sits in the row as FILL width / FIXED height.
- Ink #2D211C: walls, edges, outlines, labels, heavy shorelines (3 to 4px).
- Cream #FAF7F2: surfaces (water, paths, decks, tables, benches, rooms).
- Clay #D9B48C: tree canopies (45% opacity), lawns (22%), runners, flowers.
- Tan #C99A6B: grass ticks, shingle bands, gravel, bindings.
- No other colours.

## Drawing language (imitates the reference floor plan, adapted for outdoors)
- Buildings: thick ink walls (5 to 6px) as an evenodd band, door gaps with quarter-circle swings, window breaks, a few furniture outlines inside. Porches/decks as cream with thin plank lines.
- Water: cream fill, broken dashed horizontal hatch at 28% opacity, heavy ink shoreline over a soft tan band (shingle). Pebbles as tiny ellipses on close-ups.
- Paths: ink stroke ~19.5px under a cream stroke ~17.6px (gives two fine edges); wild grass tufts (three short strokes) along the edges.
- Lawns/zones: rounded rect, clay at 22%, thin dashed ink edge.
- Trees: spruce = clay disc + ink outline + 7 to 9 radial branch lines + centre dot; birch = small cream circle with dashed outline and ring.
- Ground: sparse tan grass ticks scattered at ~55% opacity.
- Furniture: benches as cream rects with slat lines; tables with lace scallops, runner and candle circles on close-ups; arches as beam + pole clusters + bindings + hanging flower clusters + leaf strokes.
- Dimension lines with end ticks on the close-up; north arrow and alternating scale bar on both.

## Labels
- Real Figma text, not baked into the SVG: Outfit Medium 6 to 7.5px, uppercase, letter spacing 1.3px, ink.
- Optional sub line (dimensions or role): Outfit Regular, 1.5px smaller, 70% opacity, 2px below.
- Grouped as "Labels" inside each panel. Keep labels clear of trees and lines.

## Build steps
1. Edit gen_plans.py (site_plan() and detail_plan()) for the new venue: change shapes, positions, labels.
2. Run it: writes site.svg / detail.svg (preview with labels), *_shapes.svg (no text) and labels.json.
3. Render a preview with Playwright, check for collisions, fix, re-render.
4. Upload *_shapes.svg with Figma upload_assets (POST multipart to the submit URL) so they import as editable vectors.
5. In use_figma: create the panel frame in place of each image, move the drawing in at 0,0, add labels from labels.json, hide the old image as backup.
6. Screenshot the section to check.

## Still to do
Three more weddings need their own pair of plans in this style (Elena & Tom hilltop marquee, Amara & James orchard, Sofia & Henry coast, or whichever three are chosen).
