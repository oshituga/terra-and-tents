/**
 * Terra & Tent — interactive location map.
 *
 * Dependency-free ES module. Renders the vector map (location-map.svg) with
 * pan, zoom, fixed-size labels, a dominant studio pin, a live scale bar,
 * compass and attribution.
 *
 *   import { createLocationMap } from "./location-map.js";
 *   const map = await createLocationMap(document.querySelector("#map"), {
 *     svgUrl: "/map/location-map.svg",
 *     dataUrl: "/map/map-data.json",
 *   });
 *   // map.zoomIn(); map.zoomOut(); map.reset(); map.destroy();
 *
 * Interaction
 *  - Mouse/pen: drag to move, Ctrl/Cmd + wheel (or trackpad pinch) to zoom,
 *    double-click to zoom in. Plain wheel scrolls the page and shows a hint.
 *  - Touch: one finger scrolls the page (hint shown), two fingers move and pinch-zoom.
 *  - Keyboard (map focused): arrows move, + / - zoom, 0 returns to the studio.
 *  - Buttons: zoom in, zoom out, back to studio.
 */

const DEFAULTS = {
  svgUrl: "location-map.svg",
  dataUrl: "map-data.json",
  data: null,              // pass the parsed JSON instead of dataUrl if preferred
  svgMarkup: null,         // pass the SVG string instead of svgUrl if preferred
  minZoom: 1,              // 1 = map exactly covers the container
  maxZoom: 6,
  initialZoom: 1.8,        // opens centred on the studio at this zoom
  cooperativeGestures: true, // plain wheel / one-finger scroll the page, not the map
  showLabels: true,
  directionsLink: true,
  ariaLabel: "Map showing the Terra & Tent studio near Chipping Campden",
  // zoom level (relative to minZoom fit) at which each label kind appears
  labelThresholds: { town: 0, village: 0, hamlet: 1.3, hill: 1.3, road: 1.6, wood: 1.9, water: 1.9, spot: 2.2 },
};

const STYLE_ID = "tt-location-map-styles";
const CSS = `
.tt-map{--tt-ink:#2D211C;--tt-cream:#FAF7F2;--tt-oat:#EADBC2;--tt-clay:#D9B48C;--tt-tan:#C99A6B;
  position:relative;overflow:hidden;background:var(--tt-oat);touch-action:pan-y;user-select:none;-webkit-user-select:none;
  cursor:grab;outline:none;font-family:inherit;color:var(--tt-ink);isolation:isolate}
.tt-map:focus-visible{box-shadow:inset 0 0 0 2px var(--tt-ink)}
.tt-map.is-dragging{cursor:grabbing}
.tt-map__stage{position:absolute;left:0;top:0;transform-origin:0 0}
.tt-map__stage.is-moving{will-change:transform}
.tt-map__stage svg{display:block}
.tt-map__overlay{position:absolute;inset:0;pointer-events:none;z-index:2}
.tt-map__label{position:absolute;left:0;top:0;white-space:nowrap;line-height:1;text-transform:uppercase;
  text-shadow:0 0 2px var(--tt-cream),0 0 3px var(--tt-cream),1px 1px 0 var(--tt-cream),-1px -1px 0 var(--tt-cream),1px -1px 0 var(--tt-cream),-1px 1px 0 var(--tt-cream);
  transition:opacity .25s ease}
.tt-map__label[data-kind=town]{font-weight:600}
.tt-map__label[data-kind=village],.tt-map__label[data-kind=hamlet]{font-weight:500}
.tt-map__label.is-hidden{opacity:0 !important}
.tt-map__spot{position:absolute;left:0;top:0;font-size:10px;font-weight:500;letter-spacing:.1em;white-space:nowrap;opacity:.8;
  text-shadow:0 0 2px var(--tt-cream),0 0 3px var(--tt-cream);transition:opacity .25s ease}
.tt-map__spot::before{content:"";display:inline-block;width:0;height:0;margin-right:5px;vertical-align:0;
  border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:7px solid var(--tt-ink)}
.tt-map__spot.is-hidden{opacity:0}
.tt-map__pin{position:absolute;left:0;top:0;width:0;height:0;z-index:3}
.tt-map__pin-dot{position:absolute;left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;background:var(--tt-ink);
  border:3.5px solid var(--tt-cream);box-sizing:border-box;box-shadow:0 4px 10px rgba(45,33,28,.35)}
.tt-map__pin-dot::after{content:"";position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:var(--tt-cream)}
.tt-map__pin-pulse{position:absolute;left:-22px;top:-22px;width:44px;height:44px;border-radius:50%;border:2px solid var(--tt-ink);
  animation:tt-map-pulse 2.4s ease-out infinite}
@keyframes tt-map-pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.6);opacity:0}}
.tt-map__tag{position:absolute;left:34px;top:0;transform:translateY(-50%);background:var(--tt-ink);color:var(--tt-cream);
  padding:10px 14px;border-radius:3px;white-space:nowrap;box-shadow:0 4px 10px rgba(45,33,28,.3);pointer-events:auto;cursor:default}
.tt-map__tag-name{display:block;font-size:14px;font-weight:600;letter-spacing:.14em}
.tt-map__tag-address{display:block;margin-top:4px;font-size:9px;letter-spacing:.14em;opacity:.72;text-transform:uppercase}
.tt-map__tag a{display:inline-block;margin-top:7px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--tt-cream);
  text-decoration:none;border-bottom:1px solid rgba(250,247,242,.5);padding-bottom:1px}
.tt-map__tag a:hover,.tt-map__tag a:focus-visible{border-bottom-color:var(--tt-cream);outline:none}
.tt-map__controls{position:absolute;right:16px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;z-index:4}
.tt-map__btn{all:unset;box-sizing:border-box;width:40px;height:40px;display:grid;place-items:center;background:var(--tt-cream);
  color:var(--tt-ink);border:1px solid rgba(45,33,28,.25);border-radius:3px;cursor:pointer;box-shadow:0 2px 6px rgba(45,33,28,.15);
  font-size:20px;line-height:1;transition:background .15s ease}
.tt-map__btn:hover{background:var(--tt-oat)}
.tt-map__btn:focus-visible{outline:2px solid var(--tt-ink);outline-offset:2px}
.tt-map__btn:disabled{opacity:.4;cursor:default}
.tt-map__btn svg{width:18px;height:18px}
.tt-map__compass{position:absolute;right:20px;top:18px;width:54px;height:72px;z-index:4;pointer-events:none}
.tt-map__scale{position:absolute;right:20px;bottom:18px;z-index:4;pointer-events:none;font-size:10px;font-weight:500;letter-spacing:.1em;
  text-shadow:0 0 2px var(--tt-cream),0 0 3px var(--tt-cream)}
.tt-map__scale-bar{height:7px;margin-top:4px;border:1px solid var(--tt-ink);box-sizing:border-box;
  background:repeating-linear-gradient(90deg,var(--tt-ink) 0 25%,var(--tt-cream) 25% 50%);transition:width .15s ease}
.tt-map__attribution{position:absolute;left:0;bottom:0;z-index:4;font-size:10px;padding:4px 8px;background:rgba(250,247,242,.85);
  border-top-right-radius:3px}
.tt-map__attribution a{color:var(--tt-ink);text-decoration:none}
.tt-map__attribution a:hover{text-decoration:underline}
.tt-map__hint{position:absolute;inset:0;display:grid;place-items:center;z-index:5;pointer-events:none;background:rgba(45,33,28,.45);
  color:var(--tt-cream);font-size:15px;letter-spacing:.04em;opacity:0;transition:opacity .25s ease;text-align:center;padding:24px}
.tt-map__hint.is-visible{opacity:1}
.tt-map__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.tt-map__pin.is-below .tt-map__tag{left:0;top:34px;transform:translateX(-50%)}
.tt-map__pin.is-left .tt-map__tag{left:auto;right:34px}
.tt-map.is-compact .tt-map__controls{top:auto;bottom:52px;right:12px;transform:none}
.tt-map.is-compact .tt-map__btn{width:36px;height:36px}
.tt-map.is-compact .tt-map__compass{right:12px;top:12px;width:40px;height:54px}
.tt-map.is-compact .tt-map__scale{right:12px;bottom:12px}
.tt-map.is-compact .tt-map__tag{padding:8px 11px}
.tt-map.is-compact .tt-map__tag-name{font-size:12px}
.tt-map.is-compact .tt-map__pin-dot,.tt-map.is-compact .tt-map__pin-pulse{left:-18px;top:-18px;width:36px;height:36px}
.tt-map.is-compact .tt-map__pin-dot::after{width:11px;height:11px;margin:-5.5px 0 0 -5.5px}
@media (prefers-reduced-motion:reduce){.tt-map__pin-pulse{animation:none;display:none}.tt-map__label,.tt-map__hint,.tt-map__scale-bar{transition:none}}
`;

const ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_MINUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>';
const ICON_HOME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>';
const COMPASS = '<svg viewBox="0 0 54 72" fill="none"><text x="27" y="11" text-anchor="middle" font-size="12" font-weight="600" fill="#2D211C" font-family="inherit">N</text><circle cx="27" cy="44" r="21" stroke="#2D211C" stroke-width="1.2"/><circle cx="27" cy="44" r="16" stroke="#2D211C" stroke-width="1.2"/><path d="M27 16L33 44L27 40L21 44Z" fill="#2D211C"/><path d="M27 72L33 44L27 48L21 44Z" fill="#FAF7F2" stroke="#2D211C" stroke-width="1.2"/></svg>';

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export async function createLocationMap(container, userOptions = {}) {
  const o = { ...DEFAULTS, ...userOptions, labelThresholds: { ...DEFAULTS.labelThresholds, ...(userOptions.labelThresholds || {}) } };
  injectStyles();

  const [data, svgText] = await Promise.all([
    o.data ? Promise.resolve(o.data) : fetch(o.dataUrl).then((r) => { if (!r.ok) throw new Error(`map data ${r.status}`); return r.json(); }),
    o.svgMarkup ? Promise.resolve(o.svgMarkup) : fetch(o.svgUrl).then((r) => { if (!r.ok) throw new Error(`map svg ${r.status}`); return r.text(); }),
  ]);
  const W = data.map.width, H = data.map.height;

  // ---------- DOM ----------
  container.classList.add("tt-map");
  container.setAttribute("tabindex", "0");
  container.setAttribute("role", "region");
  container.setAttribute("aria-label", o.ariaLabel);
  container.innerHTML = "";

  const descId = `tt-map-desc-${Math.random().toString(36).slice(2, 8)}`;
  const desc = el("p", "tt-map__sr");
  desc.id = descId;
  desc.textContent = `${data.studio.name}, ${data.studio.address}. Use arrow keys to move the map, plus and minus to zoom, and 0 to return to the studio.`;
  container.setAttribute("aria-describedby", descId);

  const stage = el("div", "tt-map__stage");
  stage.innerHTML = svgText;
  const svg = stage.querySelector("svg");
  svg.setAttribute("width", W);
  svg.setAttribute("height", H);
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const overlay = el("div", "tt-map__overlay");
  const labelEls = [];
  if (o.showLabels) {
    for (const L of data.labels) {
      const e = el("span", "tt-map__label");
      e.textContent = L.text;
      e.dataset.kind = L.kind;
      e.style.fontSize = `${L.size}px`;
      e.style.letterSpacing = `${L.tracking / 100}em`;
      e.style.opacity = L.opacity;
      overlay.appendChild(e);
      labelEls.push({ e, L, threshold: o.labelThresholds[L.kind] ?? 1.5 });
    }
    for (const S of data.spotHeights || []) {
      const e = el("span", "tt-map__spot");
      e.textContent = S.text.toUpperCase();
      overlay.appendChild(e);
      labelEls.push({ e, L: { ...S, angle: 0 }, threshold: o.labelThresholds.spot, spot: true });
    }
  }

  const pin = el("div", "tt-map__pin");
  pin.innerHTML = `<span class="tt-map__pin-pulse"></span><span class="tt-map__pin-dot"></span>`;
  const tag = el("div", "tt-map__tag");
  const dirHref = `https://www.google.com/maps/dir/?api=1&destination=${data.studio.lat},${data.studio.lon}`;
  tag.innerHTML = `<span class="tt-map__tag-name"></span><span class="tt-map__tag-address"></span>` +
    (o.directionsLink ? `<a target="_blank" rel="noopener" href="${dirHref}">Get directions</a>` : "");
  tag.querySelector(".tt-map__tag-name").textContent = data.studio.name.toUpperCase();
  tag.querySelector(".tt-map__tag-address").textContent = data.studio.address;
  pin.appendChild(tag);
  overlay.appendChild(pin);

  const controls = el("div", "tt-map__controls");
  const bIn = button(ICON_PLUS, "Zoom in");
  const bOut = button(ICON_MINUS, "Zoom out");
  const bHome = button(ICON_HOME, "Back to the studio");
  controls.append(bIn, bOut, bHome);

  const compass = el("div", "tt-map__compass");
  compass.innerHTML = COMPASS;
  compass.setAttribute("aria-hidden", "true");

  const scale = el("div", "tt-map__scale");
  scale.setAttribute("aria-hidden", "true");
  scale.innerHTML = `<span class="tt-map__scale-text"></span><div class="tt-map__scale-bar"></div>`;
  const scaleText = scale.firstElementChild, scaleBar = scale.lastElementChild;

  const attribution = el("div", "tt-map__attribution");
  attribution.innerHTML = (data.attribution || []).map((a) => `<a href="${a.href}" target="_blank" rel="noopener">${escapeHtml(a.text)}</a>`).join(" · ");

  const hint = el("div", "tt-map__hint");
  hint.setAttribute("aria-hidden", "true");

  container.append(desc, stage, overlay, controls, compass, scale, attribution, hint);

  // ---------- state ----------
  let cw = 0, ch = 0, fit = 1, compact = false, tagW = 0, tagH = 0;
  let z = o.initialZoom, s = 1, tx = 0, ty = 0;
  let drawnS = 0; // scale the SVG is currently laid out at (strokes stay constant width at this scale)
  let anim = null, animTarget = null, settleTimer = null, hintTimer = null;

  function measure() {
    const r = container.getBoundingClientRect();
    cw = Math.max(1, r.width);
    ch = Math.max(1, r.height);
    fit = Math.max(cw / W, ch / H);
    compact = cw < 600;
    container.classList.toggle("is-compact", compact);
    tagW = tag.offsetWidth;
    tagH = tag.offsetHeight;
  }

  function clampPan() {
    tx = clamp(tx, cw - W * s, 0);
    ty = clamp(ty, ch - H * s, 0);
  }

  function setView(nz, ntx, nty) {
    z = clamp(nz, o.minZoom, o.maxZoom);
    s = fit * z;
    tx = ntx;
    ty = nty;
    clampPan();
    render();
  }

  function centreOn(mx, my, nz) {
    const ns = fit * clamp(nz, o.minZoom, o.maxZoom);
    setView(nz, cw / 2 - mx * ns, ch / 2 - my * ns);
  }

  function zoomAt(nz, sx, sy) {
    nz = clamp(nz, o.minZoom, o.maxZoom);
    const mx = (sx - tx) / s, my = (sy - ty) / s;
    const ns = fit * nz;
    setView(nz, sx - mx * ns, sy - my * ns);
  }

  function render() {
    // While moving, scale the already-drawn SVG with a cheap GPU transform. Once still,
    // re-lay the SVG out at the real scale so it is crisp and strokes keep a constant width.
    if (!drawnS) settle();
    stage.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${s / drawnS})`;
    stage.classList.add("is-moving");
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settle, 160);

    const small = cw < 480 ? 0.62 : cw < 720 ? 0.8 : 1;
    for (const item of labelEls) {
      const { e, L, threshold } = item;
      const sx = L.x * s + tx, sy = L.y * s + ty;
      const onScreen = sx > -200 && sx < cw + 200 && sy > -60 && sy < ch + 60;
      const show = onScreen && z >= threshold;
      e.classList.toggle("is-hidden", !show);
      if (!onScreen) continue;
      if (item.spot) {
        e.style.transform = `translate(${sx}px,${sy}px) translate(-4px,-50%)`;
      } else {
        e.style.transform = `translate(${sx}px,${sy}px) translate(-50%,-50%) rotate(${L.angle}deg) scale(${small})`;
      }
    }
    const px = data.studio.x * s + tx, py = data.studio.y * s + ty;
    pin.style.transform = `translate(${px}px,${py}px)`;
    // keep the studio tag on screen and clear of the controls
    const controlsW = compact ? 0 : 72;
    const fitsRight = px + 34 + tagW <= cw - controlsW - 8;
    const fitsLeft = px - 34 - tagW >= 8;
    const fitsBelow = py + 34 + tagH <= ch - 40 && px - tagW / 2 >= 8 && px + tagW / 2 <= cw - 8;
    pin.classList.toggle("is-left", !fitsRight && fitsLeft && !(compact && fitsBelow));
    pin.classList.toggle("is-below", (compact && fitsBelow) || (!fitsRight && !fitsLeft));

    // scale bar: largest round distance that fits in ~140px
    const mPerScreenPx = data.map.metresPerPx / s;
    const steps = [25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
    let dist = steps[0];
    for (const d of steps) if (d / mPerScreenPx <= 140) dist = d;
    scaleBar.style.width = `${Math.round(dist / mPerScreenPx)}px`;
    scaleText.textContent = dist >= 1000 ? `${dist / 1000} KM` : `${dist} M`;

    bIn.disabled = z >= o.maxZoom - 1e-3;
    bOut.disabled = z <= o.minZoom + 1e-3;
  }

  function settle() {
    if (drawnS !== s) {
      drawnS = s;
      svg.setAttribute("width", W * s);
      svg.setAttribute("height", H * s);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    }
    stage.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    stage.classList.remove("is-moving");
  }

  // ---------- animation ----------
  function animateTo(targetZ, mx, my, ms = 480) {
    cancelAnim();
    const startZ = z;
    const startCx = (cw / 2 - tx) / s, startCy = (ch / 2 - ty) / s;
    if (reducedMotion() || ms === 0) { centreOn(mx, my, targetZ); return; }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms), k = easeInOut(t);
      const iz = startZ * Math.pow(targetZ / startZ, k);
      centreOn(startCx + (mx - startCx) * k, startCy + (my - startCy) * k, iz);
      if (t < 1) anim = requestAnimationFrame(step); else anim = null;
    };
    anim = requestAnimationFrame(step);
  }
  function animateZoomAt(targetZ, sx, sy, ms = 260) {
    cancelAnim();
    targetZ = clamp(targetZ, o.minZoom, o.maxZoom);
    if (reducedMotion()) { zoomAt(targetZ, sx, sy); return; }
    const startZ = z, t0 = performance.now();
    animTarget = targetZ;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms), k = easeInOut(t);
      zoomAt(startZ * Math.pow(targetZ / startZ, k), sx, sy);
      if (t < 1) anim = requestAnimationFrame(step); else { anim = null; animTarget = null; }
    };
    anim = requestAnimationFrame(step);
  }
  function cancelAnim() { if (anim) cancelAnimationFrame(anim); anim = null; animTarget = null; }
  // rapid clicks/keys build on where the zoom is heading, not where it is mid-animation
  const zoomBase = () => (animTarget ?? z);

  function showHint(text) {
    hint.textContent = text;
    hint.classList.add("is-visible");
    clearTimeout(hintTimer);
    hintTimer = setTimeout(() => hint.classList.remove("is-visible"), 1300);
  }

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  // ---------- mouse / pen drag ----------
  let drag = null;
  function onPointerDown(e) {
    if (e.pointerType === "touch" || e.button !== 0) return;
    if (e.target.closest(".tt-map__controls, .tt-map__tag, .tt-map__attribution")) return;
    cancelAnim();
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, tx, ty };
    container.setPointerCapture(e.pointerId);
    container.classList.add("is-dragging");
  }
  function onPointerMove(e) {
    if (!drag || e.pointerId !== drag.id) return;
    setView(z, drag.tx + (e.clientX - drag.x), drag.ty + (e.clientY - drag.y));
  }
  function onPointerUp(e) {
    if (!drag || e.pointerId !== drag.id) return;
    drag = null;
    container.classList.remove("is-dragging");
  }

  // ---------- wheel ----------
  function onWheel(e) {
    const wantsZoom = !o.cooperativeGestures || e.ctrlKey || e.metaKey;
    if (!wantsZoom) {
      showHint(isMac ? "Use ⌘ + scroll to zoom the map" : "Use Ctrl + scroll to zoom the map");
      return; // let the page scroll
    }
    e.preventDefault();
    cancelAnim();
    const r = container.getBoundingClientRect();
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    const factor = Math.exp(-delta * (e.ctrlKey && Math.abs(delta) < 50 ? 0.01 : 0.0025));
    zoomAt(z * factor, e.clientX - r.left, e.clientY - r.top);
  }

  function onDblClick(e) {
    if (e.target.closest(".tt-map__controls, .tt-map__tag, .tt-map__attribution")) return;
    const r = container.getBoundingClientRect();
    animateZoomAt(z * (e.shiftKey ? 0.5 : 2), e.clientX - r.left, e.clientY - r.top);
  }

  // ---------- touch (two fingers = map, one finger = page) ----------
  let pinch = null;
  function touchInfo(t, r) {
    const a = t[0], b = t[1];
    return { mx: (a.clientX + b.clientX) / 2 - r.left, my: (a.clientY + b.clientY) / 2 - r.top, d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY) };
  }
  function onTouchStart(e) {
    if (e.touches.length >= 2) {
      cancelAnim();
      const r = container.getBoundingClientRect();
      const i = touchInfo(e.touches, r);
      pinch = { ...i, z, tx, ty, r };
      e.preventDefault();
    }
  }
  function onTouchMove(e) {
    if (e.touches.length >= 2 && pinch) {
      e.preventDefault();
      const i = touchInfo(e.touches, pinch.r);
      const nz = clamp(pinch.z * (i.d / pinch.d), o.minZoom, o.maxZoom);
      const ps = fit * pinch.z, ns = fit * nz;
      const mx = (pinch.mx - pinch.tx) / ps, my = (pinch.my - pinch.ty) / ps;
      setView(nz, i.mx - mx * ns, i.my - my * ns);
    } else if (e.touches.length === 1 && o.cooperativeGestures && !pinch) {
      showHint("Use two fingers to move the map");
    }
  }
  function onTouchEnd(e) { if (e.touches.length < 2) pinch = null; }

  // ---------- keyboard ----------
  function onKey(e) {
    if (e.target !== container) return;
    const step = 90;
    let handled = true;
    switch (e.key) {
      case "ArrowLeft": cancelAnim(); setView(z, tx + step, ty); break;
      case "ArrowRight": cancelAnim(); setView(z, tx - step, ty); break;
      case "ArrowUp": cancelAnim(); setView(z, tx, ty + step); break;
      case "ArrowDown": cancelAnim(); setView(z, tx, ty - step); break;
      case "+": case "=": zoomIn(); break;
      case "-": case "_": zoomOut(); break;
      case "0": reset(); break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
  }

  // ---------- public ----------
  function zoomIn() { animateZoomAt(zoomBase() * 1.6, cw / 2, ch / 2); }
  function zoomOut() { animateZoomAt(zoomBase() / 1.6, cw / 2, ch / 2); }
  function reset() { animateTo(o.initialZoom, data.studio.x, data.studio.y, 650); }

  bIn.addEventListener("click", zoomIn);
  bOut.addEventListener("click", zoomOut);
  bHome.addEventListener("click", reset);
  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerUp);
  container.addEventListener("wheel", onWheel, { passive: false });
  container.addEventListener("dblclick", onDblClick);
  container.addEventListener("touchstart", onTouchStart, { passive: false });
  container.addEventListener("touchmove", onTouchMove, { passive: false });
  container.addEventListener("touchend", onTouchEnd);
  container.addEventListener("touchcancel", onTouchEnd);
  container.addEventListener("keydown", onKey);

  const ro = new ResizeObserver(() => {
    const cx = (cw / 2 - tx) / s, cy = (ch / 2 - ty) / s;
    const had = cw > 1;
    measure();
    if (had) centreOn(cx, cy, z); else centreOn(data.studio.x, data.studio.y, z);
  });
  ro.observe(container);

  measure();
  centreOn(data.studio.x, data.studio.y, o.initialZoom);

  function destroy() {
    cancelAnim();
    ro.disconnect();
    clearTimeout(settleTimer);
    clearTimeout(hintTimer);
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerup", onPointerUp);
    container.removeEventListener("pointercancel", onPointerUp);
    container.removeEventListener("wheel", onWheel);
    container.removeEventListener("dblclick", onDblClick);
    container.removeEventListener("touchstart", onTouchStart);
    container.removeEventListener("touchmove", onTouchMove);
    container.removeEventListener("touchend", onTouchEnd);
    container.removeEventListener("touchcancel", onTouchEnd);
    container.removeEventListener("keydown", onKey);
    container.innerHTML = "";
    container.classList.remove("tt-map", "is-dragging");
  }

  return { zoomIn, zoomOut, reset, destroy, get zoom() { return z; } };
}

function el(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}
function button(icon, label) {
  const b = el("button", "tt-map__btn");
  b.type = "button";
  b.innerHTML = icon;
  b.setAttribute("aria-label", label);
  b.title = label;
  return b;
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
