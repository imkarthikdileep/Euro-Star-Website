# GLITCH-CRT PRELOADER — IMPLEMENTATION SPEC

> **How to use:** paste this ENTIRE file into Gemini as your prompt. If the reply cuts off, send: `Continue from the last line exactly. Do not restart, do not summarize.`
> If you have no photos yet, that's fine: the spec includes a procedural fallback so it runs with zero images.

---

## 0. INSTRUCTIONS TO THE AI MODEL (READ FIRST)

You are a senior creative developer and motion designer. Build a **cinematic glitch/CRT preloader** exactly as specified below.

**Deliverable:** ONE file, `index.html`, with inline `<style>` and inline `<script>`. Nothing else.

**Allowed libraries:** GSAP 3.12.5 core ONLY, loaded from
`https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
Fonts: **Migha** (self-hosted WOFF2, see §2). No Google Fonts needed. No React, Tailwind, jQuery, or GSAP plugins (no SplitText, CustomEase, ScrambleText). Write the scramble effect yourself (§5.4).

**Hard rules**
1. Output the COMPLETE file. No `// ...rest of code`, no placeholders, no truncation. If you are close to your output limit, simplify comments, never features.
2. Every number in this spec is intentional. Use it exactly. Do not "improve" values.
3. All timings are **absolute seconds on one master GSAP timeline**. `T = 0` is the moment the overlay goes opaque black.
4. **Two motion languages, never mixed:**
   - *Stepped / glitchy* (counter, labels, logo, photo flashes): updates snap at about 15 fps. No easing, no tweening between glitch states.
   - *Smooth / cinematic* (window reveal, fades, hero handoff): GSAP tweens with `expo` or `power` eases at 60 fps.
5. Animate ONLY `transform`, `opacity`, `clip-path`, `filter` on GPU layers. Exception: modal height (§7).
6. No layout shift: digits use a fixed-width box, tabular numerals.
7. Must work with zero images (procedural fallback, §5.6) and zero network after load.
8. No emojis, no console spam, no `alert`, no `setTimeout` chains. Use the GSAP timeline plus one `requestAnimationFrame` ticker.
9. Respect `prefers-reduced-motion` (§8).
10. Ignore the "Made with ScrollFlow" watermark in the reference video. It is a screen-recorder watermark, NOT part of the design.

**Output order:** (a) the full `index.html` in a single code block, then (b) a 5-line "how to customize" note. Nothing else.

---

## 1. WHAT THE ANIMATION IS

A black CRT-style loading screen takes over the page. A coral percentage counter with an inline progress bar stutters up to 99% with horizontal-slice glitches. The counter cuts out, a hairline appears, and it widens into a letterbox "window" that rapid-fires through black-and-white photos with blocky datamosh artifacts. The window grows to full-bleed and becomes the hero background. Page UI decodes in with a scramble-text effect. Total preloader length is about **3.9 s**.

### Phase map (T in seconds)

| # | Phase | T start | T end | Motion language |
|---|-------|---------|-------|-----------------|
| 0 | Hard cut to black | 0.00 | 0.10 | instant |
| 1 | Chrome flickers in (logo, side labels, bottom icons) | 0.10 | 0.22 | stepped |
| 2 | Anticipation beat (only grain and scanlines) | 0.22 | 0.80 | — |
| 3 | Counter appears at 28, stalls, then jumps to 99 with glitches | 0.80 | 2.14 | stepped |
| 4 | Dead black beat (chrome stays, center empty) | 2.14 | 2.33 | — |
| 5 | Hairline → letterbox window opens | 2.33 | 2.70 | smooth |
| 6 | Photo flash sequence inside window | 2.58 | 3.55 | stepped |
| 7 | Window grows to full-bleed, chrome cuts out | 3.43 | 3.92 | smooth |
| 8 | Page UI decodes in, overlay removed, event fired | 3.60 | 4.20 | mixed |
| 9 | OPTIONAL: hero blur + app-promo modal (§7) | 4.00 | 5.90 | mixed |

---

## 2. DESIGN TOKENS

Reference viewport: 1174 × 784 (all positions below are given in vw/vh so they scale).

```css
:root{
  --bg:        #0b0b0b;                 /* measured 10.7/255 */
  --coral:     #dc7a80;                 /* measured range #d17379 – #e3868b */
  --ink:       #ececec;
  --dim:       rgba(255,255,255,.42);   /* side labels */
  --dimmer:    rgba(255,255,255,.26);   /* bottom icons, corner marks */
  --logo:      rgba(255,255,255,.55);
  --gold:      #c5a368;                 /* sampled from the Euro Star hero ("ENDURING") */
  --font-display: 'Migha Display','Arial Narrow',Impact,sans-serif;   /* Bold Condensed 700: headline, brand name, modal titles */
  --font-wide:    'Migha Wide','Arial',sans-serif;                    /* Medium Expanded 500: counter, labels, nav, eyebrow, buttons */
  --font-text:    'Migha Text','Arial Narrow',sans-serif;             /* Medium Condensed 500: paragraphs, lists */
  --font-count:   var(--font-wide);
  --ease-snap: cubic-bezier(.16,1,.3,1);                   /* = expo.out */
}
```

### Fonts: Migha (by Seniors Studio, free for commercial use, Latin only)

One family, three styles, one job each. Do NOT use any other font anywhere.

| Token | Migha style | Used for |
|-------|-------------|----------|
| `--font-display` | Bold Condensed (700) | hero headline, brand name, modal titles |
| `--font-wide` | Medium Expanded (500) | counter digits, side labels, eyebrow line, EST/MENU, buttons, brand sub-line |
| `--font-text` | Medium Condensed (500) | paragraphs, lists, footnotes |

Self-host: convert the downloaded TTF/OTF files to WOFF2 and put them in `/fonts/` (rename the files to match below). Add to `<head>`:

```html
<link rel="preload" href="/fonts/Migha-BoldCondensed.woff2"    as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Migha-MediumExpanded.woff2"   as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Migha-MediumCondensed.woff2"  as="font" type="font/woff2" crossorigin>
<style>
@font-face{font-family:'Migha Display';src:url('/fonts/Migha-BoldCondensed.woff2')   format('woff2');font-weight:700;font-display:swap}
@font-face{font-family:'Migha Wide';   src:url('/fonts/Migha-MediumExpanded.woff2')  format('woff2');font-weight:500;font-display:swap}
@font-face{font-family:'Migha Text';   src:url('/fonts/Migha-MediumCondensed.woff2') format('woff2');font-weight:500;font-display:swap}
</style>
```

**Do not start the timeline until all three styles are loaded** (see boot code in §5.8). Migha is not monospace, so the counter and labels use fixed-width boxes (already in the CSS) to prevent jitter.

### Site typography (add to the page CSS; adjust sizes to match the current hero)

```css
.brand-name{font:700 clamp(22px,2.2vw,34px)/.95 var(--font-display);letter-spacing:.01em;text-transform:uppercase}
.brand-sub {font:500 clamp(8px,.72vw,11px)/1 var(--font-wide);letter-spacing:.3em;text-transform:uppercase}
.eyebrow   {font:500 clamp(11px,1vw,14px)/1 var(--font-wide);letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.hero-title{font:700 clamp(56px,8.2vw,160px)/.9 var(--font-display);letter-spacing:-.01em;text-transform:uppercase}
.hero-title span{display:inline-block}
.hero-title .gold{color:var(--gold)}
.hero-sub  {font:500 clamp(15px,1.45vw,22px)/1.55 var(--font-text);letter-spacing:.02em;text-transform:uppercase;max-width:44ch}
.est,.menu {font:500 clamp(11px,1vw,14px)/1 var(--font-wide);letter-spacing:.3em;color:var(--ink)}
```

**Scramble rule:** `decode()` replaces an element's text, which would destroy child tags. Put `data-decode` on the innermost text elements (spans), never on a parent that contains other elements. That is why the headline below is split into spans.

---

## 3. DOM STRUCTURE (use exactly this)

```html
<body>
  <!-- the real site; hidden behind the preloader until done -->
  <main id="site">
    <section id="hero">
      <div id="hero-bg"></div>               <!-- last flash image, full-bleed -->
      <header class="nav">
        <a class="brand" href="/">
          <img class="brand-logo" src="logo.svg" alt="">
          <span class="brand-text"><b class="brand-name" data-decode>EURO STAR</b><i class="brand-sub" data-decode>ELECTROMECHANICAL</i></span>
        </a>
        <span class="est" data-decode>EST. 2010</span>
        <button class="menu" data-decode>MENU</button>
      </header>
      <p class="eyebrow" data-decode>STRUCTURAL STEEL · PRECISION WELDING · MEP</p>
      <h1 class="hero-title">
        <span data-decode>ENGINEERING</span><br>
        <span class="gold" data-decode>ENDURING</span> <span data-decode>INFRASTRUCTURE</span>
      </h1>
      <p class="hero-sub" data-decode>HEAVY STRUCTURAL FABRICATION, CERTIFIED HIGH-INTEGRITY WELDING, AND TURNKEY ELECTROMECHANICAL EXECUTION OUT OF AJMAN, UAE.</p>
    </section>
  </main>

  <div id="pl" role="progressbar" aria-label="Loading" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <div class="pl-bg"></div>
    <canvas class="pl-photo"></canvas>       <!-- clipped window, full-viewport canvas -->
    <div class="pl-noise"></div>
    <div class="pl-scan"></div>

    <div class="pl-chrome">
      <div class="pl-logo">[LOGO SVG]</div>
      <span class="pl-label pl-label-l">TT-25</span>
      <span class="pl-label pl-label-r">17-25</span>
      <div class="pl-icons">[4 small inline SVG icons]</div>
      <i class="pl-corner tl"></i><i class="pl-corner tr"></i>
      <i class="pl-corner bl"></i><i class="pl-corner br"></i>
    </div>

    <div class="pl-counter">
      <div class="pl-bar"></div>
      <div class="pl-num"><span class="pl-num-main">28%</span></div>
      <!-- JS injects 3 slice clones (.pl-slice) and up to 2 .pl-frag shards here -->
    </div>
  </div>
</body>
```

---

## 4. CSS (write it exactly like this, then add nothing that changes geometry)

```css
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--bg);color:var(--ink);overflow-x:hidden}
body.is-loading{overflow:hidden;height:100vh}

#pl{position:fixed;inset:0;z-index:9999;pointer-events:all;overflow:hidden;
    contain:layout paint size;opacity:0;visibility:hidden}   /* JS makes it visible at T=0 */
#pl.is-live{opacity:1;visibility:visible}
.pl-bg{position:absolute;inset:0;background:var(--bg)}

.pl-photo{position:absolute;inset:0;width:100%;height:100%;
  filter:grayscale(1) contrast(1.12) brightness(.96);       /* B&W look, works in Safari */
  clip-path:inset(33.5% 66.6% 33.5% 33.3%);                 /* start = hairline */
  opacity:0;will-change:clip-path,opacity;transform:translateZ(0)}

/* grain: static SVG noise nudged in 6 hard steps = film/CRT shimmer */
.pl-noise{position:absolute;inset:-10%;opacity:.07;mix-blend-mode:screen;pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  animation:pl-grain .5s steps(6) infinite;will-change:transform}
@keyframes pl-grain{
  0%{transform:translate(0,0)}  17%{transform:translate(-4%,3%)} 33%{transform:translate(3%,-5%)}
  50%{transform:translate(-5%,-2%)} 67%{transform:translate(4%,4%)} 83%{transform:translate(-2%,5%)} 100%{transform:translate(0,0)}}

/* scanlines: 1px light line every 3px, faint horizontal streaks */
.pl-scan{position:absolute;inset:0;pointer-events:none;opacity:.55;
  background:repeating-linear-gradient(to bottom,rgba(255,255,255,.045) 0 1px,transparent 1px 3px)}

/* ---------- chrome ---------- */
.pl-chrome{position:absolute;inset:0;opacity:0;pointer-events:none}
.pl-logo{position:absolute;left:50%;top:3.7vh;width:clamp(20px,2.2vw,32px);aspect-ratio:26/30;
  transform:translateX(-50%);color:var(--logo);transform-origin:50% 50%}
.pl-logo svg{width:100%;height:100%;display:block;fill:currentColor}
.pl-label{position:absolute;top:50%;transform:translateY(-50%);
  font:500 clamp(9px,.9vw,12px)/1 var(--font-wide);letter-spacing:.24em;color:var(--dim);
  font-variant-numeric:tabular-nums;white-space:nowrap}
.pl-label-l{left:1.9vw}  .pl-label-r{right:1.9vw;margin-right:-.24em}   /* cancels trailing letter-spacing */
.pl-icons{position:absolute;left:50%;bottom:4.2vh;transform:translateX(-50%);
  display:flex;gap:.9vw;color:var(--dimmer)}
.pl-icons svg{width:clamp(11px,1.2vw,16px);height:auto;display:block;fill:none;stroke:currentColor;stroke-width:1.4}
.pl-corner{position:absolute;width:10px;height:10px;border:0 solid var(--dimmer);opacity:0}
.pl-corner.tl{left:1vw;top:1.4vh;border-top-width:1px;border-left-width:1px}
.pl-corner.tr{right:1vw;top:1.4vh;border-top-width:1px;border-right-width:1px}
.pl-corner.bl{left:1vw;bottom:1.4vh;border-bottom-width:1px;border-left-width:1px}
.pl-corner.br{right:1vw;bottom:1.4vh;border-bottom-width:1px;border-right-width:1px}

/* ---------- counter ---------- */
/* bar starts at x=39.9vw; number box is x=46vw→54vw (centered on 50vw). Bar grows under the number. */
.pl-counter{position:absolute;left:39.9vw;top:50%;width:18.7vw;height:6vh;transform:translateY(-50%);
  opacity:0;will-change:opacity}
.pl-bar{position:absolute;left:0;top:50%;width:100%;height:2.1vh;margin-top:-1.05vh;
  background:var(--coral);transform-origin:0 50%;transform:scaleX(.28);will-change:transform}
.pl-num,.pl-slice{position:absolute;left:6.1vw;top:0;width:8vw;height:100%;display:flex;
  align-items:center;justify-content:center;
  font:500 clamp(28px,3.4vw,52px)/1 var(--font-count);white-space:nowrap;color:var(--coral);
  font-variant-numeric:tabular-nums;letter-spacing:.02em;
  /* dark knock-out ring so digits stay readable on top of the coral bar */
  text-shadow:-1.5px 0 var(--bg),1.5px 0 var(--bg),0 -1.5px var(--bg),0 1.5px var(--bg),
              -1.5px -1.5px var(--bg),1.5px 1.5px var(--bg),-1.5px 1.5px var(--bg),1.5px -1.5px var(--bg)}
.pl-slice{opacity:0;will-change:transform,clip-path}
.pl-frag{position:absolute;height:2px;background:var(--coral);opacity:0}   /* tiny detached shards */

/* ---------- site reveal ---------- */
#site{opacity:0}
#site.is-in{opacity:1}
[data-decode]{opacity:0}
[data-decode].is-in{opacity:1}
@media (prefers-reduced-motion:reduce){.pl-noise{animation:none}}
```

---

## 5. JAVASCRIPT ARCHITECTURE

Write ONE IIFE in this order. Code below is the reference. Implement it fully; do not simplify the glitch logic.

### 5.1 Config + utils

```js
const CFG = {
  labels: { left: 'EST-2010', right: 'AJMAN-UAE' },
  // 7 image URLs, in THIS order (B&W treatment is applied by CSS, colour photos are fine):
  // 0 dark abstract texture | 1 extreme close-up face | 2 high-key detail shot | 3 mid detail shot
  // 4 crowd / many subjects | 5 portrait | 6 HERO wide shot (becomes #hero-bg)
  // Leave [] to use the procedural fallback.
  images: [],
  scrambleSet: 'ABDEFGILMNOPRSTUVW',   // letters of similar width, so scrambled text keeps its shape
  labelSet: 'AEJMNSTU-0125',            // for the side labels (letters/digits that appear in them)
  glitchFPS: 15,
  gateT: 2.07,                         // timeline holds here until assets are ready
  skipIfSeen: false,                   // true = show only once per browser session
  modal: { enabled: false }            // see §7
};
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rand  = (a, b) => a + Math.random() * (b - a);
const randi = (a, b) => Math.floor(rand(a, b + 1));
const pick  = s => s[Math.floor(Math.random() * s.length)];
const STEP  = 1 / CFG.glitchFPS;
let finished = false;                 // set true by finish()
```

### 5.2 Stepped ticker (the "glitchy 15 fps" heartbeat)

One `requestAnimationFrame` loop. Anything glitchy registers a callback here. Callbacks run only every `STEP` seconds, so glitch states snap instead of flowing.

```js
const jobs = new Set();
let acc = 0, lastNow = performance.now(), raf = 0;
function loop(now) {
  acc += Math.min(0.1, (now - lastNow) / 1000); lastNow = now;
  while (acc >= STEP) { acc -= STEP; jobs.forEach(j => j(STEP)); }
  if (finished && jobs.size === 0 && !CFG.modal.enabled) return;   // preloader over, nothing left to animate: stop the ticker
  raf = requestAnimationFrame(loop);
}
const startLoop = () => { lastNow = performance.now(); raf = requestAnimationFrame(loop); };
```

### 5.3 `burst(level)` : counter + chrome glitch

`level` 1 = subtle (1 step), 2 = medium (2 steps), 3 = heavy (3 steps). One step = 1/15 s.

```js
function burst(level) {
  let steps = level;
  const job = () => {
    if (steps-- <= 0) { clearGlitch(); jobs.delete(job); return; }
    const numText = $('.pl-num-main').textContent;
    // A) three horizontal-slice clones of the number, each shifted sideways
    slices.forEach(s => {
      const top = rand(0, 70), h = rand(12, 38);
      s.textContent = Math.random() < .5 ? numText : randi(10, 99) + '%';   // "double number" feel
      s.style.clipPath  = `inset(${top}% 0 ${100 - top - h}% 0)`;
      s.style.transform = `translateX(${(Math.random() < .5 ? -1 : 1) * rand(6, 22 * level + 12)}px)`;
      s.style.opacity = 1;
    });
    // B) 1–2 tiny coral shards below/left of the counter
    frags.forEach((f, i) => {
      f.style.opacity = i < level ? 1 : 0;
      f.style.left = rand(-6, 14) + 'vw'; f.style.top = rand(62, 108) + '%'; f.style.width = rand(1.2, 4) + 'vw';
    });
    // C) level 3 only: bar overshoots to the right
    if (level === 3) bar.style.transform = `scaleX(${Math.min(1, state.v / 100 + rand(0, .12))})`;
    // D) logo squeeze + side-label scramble (1 step)
    logo.style.transform = `translateX(-50%) scaleX(${Math.random() < .6 ? .28 : 1})`;
    labelL.textContent = scrambleStr(CFG.labels.left,  CFG.labelSet, .6);
    labelR.textContent = scrambleStr(CFG.labels.right, CFG.labelSet, .6);
    corners.forEach(c => c.style.opacity = 1);                // corner marks appear on the first burst and stay
  };
  jobs.add(job);
}
function clearGlitch() {
  slices.forEach(s => s.style.opacity = 0);
  frags.forEach(f => f.style.opacity = 0);
  logo.style.transform = 'translateX(-50%)';
  labelL.textContent = CFG.labels.left; labelR.textContent = CFG.labels.right;
  renderCounter();                                            // restores the true bar scale
}
const scrambleStr = (str, set, p) => [...str].map(c => c === ' ' || c === '-' ? c : (Math.random() < p ? pick(set) : c)).join('');
```

### 5.4 `decode(el, {duration, delay})` : scramble-text reveal

Characters cycle through random letters and lock left-to-right with random jitter. Spaces and punctuation never scramble. Reserve the element's final height first so nothing jumps.

```js
function decode(el, { duration = .7, delay = 0 } = {}) {
  const final = el.dataset.text || (el.dataset.text = el.textContent);
  const chars = [...final];
  el.style.minHeight = el.offsetHeight + 'px';                 // measured while final text is in place
  const lock = chars.map((c, i) => delay + (i / chars.length) * duration * .75 + Math.random() * duration * .25);
  let t = 0;
  const job = dt => {
    t += dt;
    if (t < delay) return;
    el.classList.add('is-in');
    let out = '', done = true;
    chars.forEach((c, i) => {
      if (!/[A-Za-z0-9]/.test(c) || t >= lock[i]) out += c;
      else { out += pick(CFG.scrambleSet); done = false; }
    });
    el.textContent = out;
    if (done) { el.textContent = final; el.style.minHeight = ''; jobs.delete(job); }
  };
  jobs.add(job);
}
```

### 5.5 Counter engine

The displayed value is a proxy `state.v` that the master timeline moves between keyframes with linear ease, so it jumps in uneven steps like real network loading. The number NEVER shows 100.

```js
const state = { v: 28 };
const COUNT_KEYS = [                     // [T, value]  (equal values = stall)
  [0.80,28],[1.15,28],[1.18,40],[1.30,41],[1.43,51],[1.55,61],[1.68,69],
  [1.72,72],[1.80,75],[1.88,80],[1.95,89],[2.01,95],[2.07,98],[2.13,100]
];
const GLITCHES = [ [0.80,2],[1.18,2],[1.30,3],[1.55,1],[1.68,1],[1.95,2],[2.01,3],[2.07,3] ];   // [T, level]

function renderCounter() {
  const v = state.v;
  $('.pl-num-main').textContent = Math.min(99, Math.round(v)) + '%';
  bar.style.transform = `scaleX(${Math.min(1, v / 100)})`;
  pl.setAttribute('aria-valuenow', Math.min(99, Math.round(v)));
}
```

### 5.6 Photo window renderer (canvas 2D)

One full-viewport canvas. The CSS `clip-path` is the "window"; the canvas always draws the image full-bleed ("cover"), so the window REVEALS a fixed picture instead of scaling it. This is what makes the final handoff to the hero seamless.

```js
const cv = $('.pl-photo'), ctx = cv.getContext('2d', { alpha: false });
const tmp = document.createElement('canvas'), tctx = tmp.getContext('2d');
let dpr = 1, W = 0, H = 0;
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  fallbackCache.clear(); redraw();
}

function drawCover(src) {                // object-fit: cover
  const sw = src.naturalWidth || src.width, sh = src.naturalHeight || src.height;
  const s = Math.max(W / sw, H / sh), dw = sw * s, dh = sh * s;
  ctx.drawImage(src, (W - dw) / 2, (H - dh) / 2, dw, dh);
}

// current frame = { src, g } ; g = glitch strength 0..1
function drawFrame(src, g) {
  drawCover(src);
  if (g < .02) return;
  // 1) horizontal slice displacement (copy a strip of the canvas to itself, shifted in x)
  const n = Math.round(4 + g * 14);
  for (let i = 0; i < n; i++) {
    const h = randi(4, 10 + g * 46), y = randi(0, Math.max(1, H - h)), dx = rand(-1, 1) * g * W * .08;
    ctx.drawImage(cv, 0, y * dpr, cv.width, h * dpr, dx, y, W, h);
  }
  // 2) blocky datamosh patches (downscale a region, upscale with smoothing OFF)
  const blocks = Math.round(g * 7);
  for (let i = 0; i < blocks; i++) {
    const bw = randi(W * .06, W * .22), bh = randi(H * .04, H * .16);
    const x = randi(0, W - bw), y = randi(0, H - bh), px = randi(10, 26);
    tmp.width = Math.max(1, (bw / px) | 0); tmp.height = Math.max(1, (bh / px) | 0);
    tctx.drawImage(cv, x * dpr, y * dpr, bw * dpr, bh * dpr, 0, 0, tmp.width, tmp.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, bw, bh);
    ctx.imageSmoothingEnabled = true;
  }
  // 3) vertical smear streaks (strong glitch only)
  if (g > .5) for (let i = 0; i < 3; i++) {
    const x = randi(0, W - 130); ctx.drawImage(cv, x * dpr, 0, 1, cv.height, x, 0, randi(30, 120), H);
  }
  // 4) one dark scan bar
  ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, randi(0, H - 24), W, randi(6, 22));
}
```

**Procedural fallback** (used for any image that is missing or not yet loaded): `makeFallback(i)` returns an offscreen canvas `W×H`:
- Base luminance per index: `[.22, .35, .78, .55, .45, .5, .4][i]`. Fill with a linear gradient (random angle) between `lum−.12` and `lum+.12` as greyscale.
- Draw 40 radial-gradient circles (radius `rand(.02,.12)*W`, alpha `.05–.25`, white) = soft bokeh lights.
- Draw one diagonal band (width `.18*W`, alpha `.12`, black).
- Cache per index in `fallbackCache` (a `Map`); `resize()` clears it.
- `makeFlat(lum)` returns an offscreen canvas `W×H` filled with solid grey `rgb(lum*255)`, no gradient.
- IMPORTANT: `makeFallback` and `makeFlat` read `innerWidth`/`innerHeight` directly (NOT the `W`/`H` variables), because `makeFallback(6)` runs once at boot before the first `resize()`.

**Flash sequence** (stepped; during the loop, `g` decays ×0.85 each tick so every flash "settles"):

```js
const FLASH = [   // t = timeline seconds, img = index | 'flat', g = starting glitch, lum = for 'flat'
  { t:2.33, img:'flat', lum:.34, g:0   },   // hairline is plain grey
  { t:2.45, img:3,      g:.2 },            // narrow rect shows a crop of image 3
  { t:2.58, img:'flat', lum:.22, g:0   },   // wide dark-grey "blank" frame
  { t:2.70, img:0, g:1.0 },
  { t:2.76, img:1, g:1.0 },
  { t:2.83, img:1, g:.7  },
  { t:2.89, img:2, g:.8  },
  { t:2.96, img:3, g:.6  },
  { t:3.05, img:4, g:.5  },
  { t:3.17, img:4, g:.15 },
  { t:3.30, img:5, g:.3  },
  { t:3.43, img:5, g:0   },
  { t:3.55, img:6, g:.5  },                // HERO image
  { t:3.67, img:6, g:0   }
];
// timeline: FLASH.forEach(f => tl.call(() => setFrame(f), null, f.t));
```

### 5.7 Window geometry (clip-path, % of viewport; format `inset(top right bottom left)`)

```js
const WIN = {
  line:   'inset(33.5% 66.6% 33.5% 33.3%)',   // 1px hairline
  narrow: 'inset(33.5% 61.7% 33.5% 32.4%)',   // 5.9vw wide
  w1:     'inset(33.5% 34.8% 33.5% 26.9%)',   // 38vw wide
  w2:     'inset(33.5% 25.6% 33.5% 25.1%)',   // 49vw wide, 33vh tall (the "letterbox")
  big:    'inset(32.7% 24.2% 32.7% 24.2%)',   // tiny pre-growth
  large:  'inset(14.3% 8.4% 14.8% 8.4%)',     // 83vw × 71vh, black frame around it
  full:   'inset(0% 0% 0% 0%)'
};
```
Always tween between two `inset()` strings with the same units. GSAP interpolates them natively.

### 5.8 Boot, element refs, asset gate, finish

```js
// --- refs (query once) ---
const pl = $('#pl'), chrome = $('.pl-chrome'), counter = $('.pl-counter'), bar = $('.pl-bar'),
      photo = $('.pl-photo'), logo = $('.pl-logo'), labelL = $('.pl-label-l'), labelR = $('.pl-label-r'),
      corners = $$('.pl-corner');
// --- inject glitch helpers into .pl-counter ---
const slices = [0,1,2].map(() => { const s = document.createElement('div'); s.className = 'pl-slice'; counter.appendChild(s); return s; });
const frags  = [0,1].map(() => { const f = document.createElement('i');   f.className = 'pl-frag';  counter.appendChild(f); return f; });

// --- assets ---
const imgs = [];            // imgs[i] = HTMLImageElement once loaded
const fallbackCache = new Map();
const loadImg = (url, i) => new Promise(res => {
  const im = new Image(); im.crossOrigin = 'anonymous';
  im.onload = () => im.decode().catch(()=>{}).finally(() => { imgs[i] = im; res(); });
  im.onerror = () => res();                       // missing image = silently use fallback
  im.src = url;
});
let assetsReady = false;
const assets = Promise.all(CFG.images.map(loadImg)).then(() => { assetsReady = true; });
if (!CFG.images.length) assetsReady = true;

const srcFor = f => f.img === 'flat' ? makeFlat(f.lum)
                  : (imgs[f.img] || fallbackCache.get(f.img) || (fallbackCache.set(f.img, makeFallback(f.img)), fallbackCache.get(f.img)));

// --- photo draw loop (runs on the stepped ticker, only while the window is visible) ---
let current = null, photoLive = false;
const setFrame = f => { current = { src: srcFor(f), g: f.g }; drawFrame(current.src, current.g); };
const redraw   = () => current && drawFrame(current.src, current.g);
jobs.add(() => { if (!photoLive || !current) return; current.g *= .85; drawFrame(current.src, current.g); });

// --- hero background (same image as FLASH step img:6, same cover math = seamless handoff) ---
const heroBg = $('#hero-bg');
heroBg.style.backgroundImage = CFG.images[6] ? `url(${CFG.images[6]})` : `url(${makeFallback(6).toDataURL('image/jpeg', .85)})`;

// --- boot ---
let onResize = () => { clearTimeout(onResize.t); onResize.t = setTimeout(resize, 120); };
window.addEventListener('resize', onResize);
const MIGHA = ['700 1em "Migha Display"', '500 1em "Migha Wide"', '500 1em "Migha Text"'];
const fontsOK = Promise.race([
  Promise.all(MIGHA.map(f => document.fonts.load(f))).catch(() => {}),   // loads exactly the 3 styles we use
  new Promise(r => setTimeout(r, 1500))                                    // never block longer than 1.5 s
]);
fontsOK.then(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || (CFG.skipIfSeen && sessionStorage.getItem('pl-seen'))) return quickReveal();
  sessionStorage.setItem('pl-seen', '1');
  resize(); startLoop(); build();
});

function finish() {                      // called at T = 3.95
  finished = true; photoLive = false;
  pl.remove(); document.body.classList.remove('is-loading');
  window.removeEventListener('resize', onResize);
  window.dispatchEvent(new CustomEvent('preloader:done'));       // your site listens to this
  // decode jobs finish on their own, then the ticker stops itself (see 5.2)
}
```

---

## 6. MASTER TIMELINE (single source of truth)

Add this CSS for the hero background (it MUST use the same filter as the canvas so the handoff is invisible):

```css
#hero{position:relative;min-height:100vh;overflow:hidden}
#hero-bg{position:absolute;inset:0;background:center/cover no-repeat;
  filter:grayscale(1) contrast(1.12) brightness(.96);transform-origin:50% 50%;will-change:transform,filter}
```

```js
function build() {
  const tl = gsap.timeline({ onComplete: () => {} });

  // ---- PHASE 0–1 : hard cut + chrome flicker (hard steps, no easing) ----
  tl.call(() => { pl.classList.add('is-live'); document.body.classList.add('is-loading'); }, null, 0)
    .set(chrome, { opacity: 1  }, .10)
    .set(chrome, { opacity: .35 }, .14)
    .set(chrome, { opacity: 1  }, .17);

  // ---- PHASE 3 : counter ----
  tl.set(counter, { opacity: 1 }, .80);
  for (let i = 0; i < COUNT_KEYS.length - 1; i++) {
    const [t0, v0] = COUNT_KEYS[i], [t1, v1] = COUNT_KEYS[i + 1];
    tl.fromTo(state, { v: v0 }, { v: v1, duration: Math.max(.016, t1 - t0), ease: 'none', onUpdate: renderCounter }, t0);
  }
  GLITCHES.forEach(([t, lvl]) => tl.call(() => burst(lvl), null, t));

  // asset gate: if images are still loading at T=2.07, hold the "98%" glitch until they're ready
  tl.call(() => {
    if (assetsReady) return;
    tl.pause();
    const hold = () => burst(1); let n = 0;
    const job = () => { if (++n % 6 === 0) hold(); }; jobs.add(job);
    assets.then(() => { jobs.delete(job); tl.resume(); });
  }, null, CFG.gateT);

  // ---- PHASE 4 : dead beat ----
  tl.set(counter, { opacity: 0 }, 2.14);

  // ---- PHASE 5–7 : window ----
  tl.call(() => { photoLive = true; }, null, 2.33)
    .set(photo, { opacity: 1, clipPath: WIN.line }, 2.33)
    .to(photo, { clipPath: WIN.narrow, duration: .05, ease: 'none'       }, 2.45)
    .to(photo, { clipPath: WIN.w1,     duration: .06, ease: 'expo.out'   }, 2.58)
    .to(photo, { clipPath: WIN.w2,     duration: .08, ease: 'expo.out'   }, 2.65)
    .to(photo, { clipPath: WIN.big,    duration: .12, ease: 'power2.out' }, 3.43)
    .to(photo, { clipPath: WIN.large,  duration: .14, ease: 'power3.out' }, 3.55)
    .to(photo, { clipPath: WIN.full,   duration: .28, ease: 'expo.inOut' }, 3.67);

  // ---- PHASE 6 : photo flashes ----
  FLASH.forEach(f => tl.call(() => setFrame(f), null, f.t));

  // ---- PHASE 7 : chrome cuts out (two hard steps), grain/scanlines fade ----
  tl.set(chrome, { opacity: .4 }, 3.55).set(chrome, { opacity: 0 }, 3.60)
    .to(['.pl-noise', '.pl-scan'], { opacity: 0, duration: .23, ease: 'none' }, 3.67);

  // ---- PHASE 8 : handoff ----
  tl.set('#site', { opacity: 1 }, 3.67)                      // real hero is now live BEHIND the full-bleed canvas
    .call(() => { $$('#site [data-decode]').forEach((el, i) => decode(el, { duration: .7, delay: i * .05 })); }, null, 3.60)
    .fromTo('.nav', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: .35, ease: 'power3.out' }, 3.62)
    .call(finish, null, 3.95);

  // ---- PHASE 9 (optional) : see §7 ----
  if (CFG.modal.enabled) buildModal(tl);
  return tl;
}
```

**Quick-reveal fallback** (reduced motion, or already seen this session): `quickReveal()` removes `#pl`, sets `#site` opacity 1 via a 0.4 s fade, adds `is-in` to every `[data-decode]`, restores scroll, dispatches `preloader:done`. No glitch, no flashing.

---

## 7. OPTIONAL: APP-PROMO MODAL (reference phase 9)

Only build this if `CFG.modal.enabled = true`. In the reference, right after the hero lands the background blurs and darkens, then a dark card grows from a small rectangle into a tall card and its content decodes in.

```css
.modal{position:fixed;left:50%;top:50%;width:30.4vw;min-width:300px;height:16vh;transform:translate(-50%,-50%);
  background:#0e0e0e;border:1px solid rgba(255,255,255,.07);border-radius:6px;z-index:50;opacity:0;
  padding:3vh 1.6vw;overflow:hidden;display:flex;flex-direction:column;gap:2vh}
.m-title{font:700 clamp(18px,2vw,28px)/1 var(--font-display);letter-spacing:.01em;text-transform:uppercase;color:var(--ink)}
.m-img{height:30vh;border-radius:3px;overflow:hidden;background:#d9d9d9;opacity:0}
.m-img img{width:100%;height:100%;object-fit:cover;display:block}
.m-sub{font:700 clamp(14px,1.4vw,20px)/1 var(--font-display);text-transform:uppercase;color:var(--ink)}
.m-list{list-style:none;font:500 clamp(10px,.9vw,13px)/1.9 var(--font-text);color:var(--dim);letter-spacing:.08em;text-transform:uppercase}
.m-btns{display:grid;grid-template-columns:1fr 1fr;gap:1.4vw}
.m-btn{position:relative;display:grid;place-items:center;height:6.6vh;color:var(--dim);
  font:500 clamp(9px,.9vw,12px) var(--font-wide);letter-spacing:.2em;text-decoration:none}
.m-btn::before,.m-btn::after{content:"";position:absolute;width:8px;height:8px;border:0 solid var(--dimmer)}
.m-btn::before{left:0;top:0;border-top-width:1px;border-left-width:1px}
.m-btn::after{right:0;bottom:0;border-bottom-width:1px;border-right-width:1px}
.m-foot{font:500 clamp(9px,.8vw,11px)/1.6 var(--font-text);color:var(--dimmer);letter-spacing:.08em;text-transform:uppercase}
```

```js
function buildModal(tl) {
  const m = $('#app-modal');
  tl.to('#hero-bg', { scale: 1.06, filter: 'grayscale(1) contrast(1.12) brightness(.4) blur(10px)', duration: .7, ease: 'expo.out' }, 4.00)
    .set(m, { opacity: 1 }, 4.30)
    .fromTo(m, { height: '16vh' }, { height: '73vh', duration: .45, ease: 'expo.out' }, 4.30)
    .call(() => {
      const d = [0, .10, .25, .30, .35, .40, .45, .50, .60];             // stagger per [data-decode] in DOM order
      $$('[data-decode]', m).forEach((el, i) => decode(el, { duration: .55, delay: d[i] ?? .6 }));
    }, null, 4.80)
    .to('.m-img', { opacity: 1, duration: .25, ease: 'none' }, 4.92)
    .call(() => { finished = true; }, null, 6.00);                      // lets the ticker shut down
}
```
Closing the modal ("MAYBE LATER"): reverse the blur/brightness over 0.4 s, `height` back to `16vh` then `opacity:0`, remove from DOM.

---

## 8. PERFORMANCE, A11Y, ROBUSTNESS

- Overlay uses `contain: layout paint size`, the canvas is the only large repaint surface; it redraws at 15 fps only while the window is visible.
- `will-change` is set only on `.pl-photo`, `.pl-bar`, `.pl-slice`, `.pl-noise`; remove the overlay at the end (it is `remove()`d, which frees it).
- Cap DPR at 2. Debounce resize (120 ms). Never read layout (`offsetHeight`) inside a tick, only once in `decode()` before it starts.
- Lock scroll with `body.is-loading` and restore in `finish()`.
- `prefers-reduced-motion`: use `quickReveal()`.
- The overlay has `role="progressbar"` and `aria-valuenow` updated by `renderCounter()`; after removal the page is fully accessible. Do not announce every step to screen readers.
- Failure modes: a failed image uses the fallback; a failed font uses the stack; if GSAP fails to load, call `quickReveal()` (check `window.gsap`).

---

## 9. HOW TO ADAPT TO YOUR SITE (what to replace)

| What | Where | Notes |
|------|-------|-------|
| Logo | `.pl-logo` inline SVG | single-colour, `fill: currentColor`, about 26×30 |
| Fonts | `/fonts/*.woff2` + §2 | Migha Bold Condensed, Medium Expanded, Medium Condensed |
| Side labels | `CFG.labels` | short caps strings, e.g. `EST-2010` and `AJMAN-UAE` |
| Bottom icons | `.pl-icons` | 4 tiny 1.4px-stroke line icons |
| Photos | `CFG.images` | 7 images, high contrast, subject near the centre, at least 1920 px wide |
| Hero copy | `#hero [data-decode]` | any element with `data-decode` gets the scramble reveal |
| Accent colour | `--coral` | counter + bar only |
| Event hook | `window.addEventListener('preloader:done', …)` | start your own animations here |

---

## 10. QA CHECKLIST (the result is "done" only if all are true)

**Frame checkpoints**: if you scrub the finished animation (or screenshot it), you must see:

| T (s) | What must be on screen |
|-------|------------------------|
| 0.05 | pure near-black `#0b0b0b` with faint grain, nothing else |
| 0.30 | logo (top centre), `TT-25` left and `17-25` right at vertical middle, 4 icons at bottom centre |
| 0.85 | coral `28%` dead centre, short coral bar to its left |
| 1.35 | `41%` with a horizontally displaced duplicate slice, logo squeezed thin, labels scrambled, corner marks visible |
| 2.05 | bar nearly 18.7vw wide behind the number, shards below, number outlined in dark |
| 2.25 | centre completely empty, chrome still visible |
| 2.50 | 1px grey vertical line, then a narrow rect with a photo crop |
| 2.65 | wide letterbox (about 49vw × 33vh), flat dark grey |
| 3.00 | blocky glitched black-and-white photo in the letterbox |
| 3.60 | big window (83vw × 71vh) with black frame, chrome gone |
| 4.00 | full-bleed photo, page UI decoded, overlay gone, scroll restored |

**Behaviour**
- [ ] Counter never shows `100%`, never moves smoothly; it stalls at 28, then jumps.
- [ ] Digits do not shift horizontally as the value changes (fixed-width box; Migha is not monospace).
- [ ] Only the 3 Migha styles are used; no fallback font flashes on the counter or labels (check with the network throttled).
- [ ] The headline keeps its gold "ENDURING" while decoding (data-decode is on the spans, not on the h1).
- [ ] Glitches update in hard steps (about 15 fps); window reveals are smooth at 60 fps.
- [ ] The hand-off from canvas to `#hero-bg` has NO visible jump (same image, same cover math, same filter).
- [ ] With `CFG.images = []` everything still plays (procedural frames).
- [ ] With slow network, the animation holds at the `98%` glitch (T = 2.07) and continues the moment assets are ready.
- [ ] No console errors, no layout shift, no horizontal scrollbar at any viewport from 360 px to 2560 px.
- [ ] Reduced-motion users get the quick fade.

**Common mistakes to AVOID**
1. Tweening the counter with an eased smooth count. It must be keyframed and stepped.
2. Animating `width`/`height`/`top`/`left` of the window. Use `clip-path` on the full-viewport canvas.
3. Scaling the photo with the window. The photo stays fixed; the window reveals it.
4. Using `ctx.filter` for B&W (breaks Safari). Use the CSS `filter` on the canvas element.
5. Forgetting `pointer-events:none` on chrome, or leaving the overlay in the DOM.
6. Letting the scramble use symbols or digits for the hero text. Letters only; keep spaces and punctuation fixed.
7. Starting the timeline before fonts are ready (causes a font swap flash on the counter).
8. Adding bounce/overshoot easing. The whole piece is sharp: `expo`, `power`, or `none` only.

---

## 11. TUNING KNOBS (change one at a time)

| Knob | Default | Effect |
|------|---------|--------|
| `CFG.glitchFPS` | 15 | lower = choppier and more analog; higher = smoother and less "broken" |
| `COUNT_KEYS` | see 5.5 | shift the times to make the count faster or slower; keep the stall at 28 |
| `GLITCHES` levels | 1–3 | raise levels for a harsher look |
| `.pl-noise` opacity | .07 | grain strength |
| `.pl-scan` opacity | .55 | scanline strength |
| `FLASH` `g` values | 0–1 | datamosh intensity per photo |
| `--coral` | `#dc7a80` | set it to the `--gold` value for an on-brand counter and bar |
| Hero filter | grayscale | remove `grayscale(1)` from both `.pl-photo` and `#hero-bg` for colour |

---

## 12. IF GEMINI FLASH RUNS OUT OF OUTPUT (two-pass fallback)

- **Pass A prompt:** "Using this spec, build §2, §3, §4, §5.1–5.5, §5.8 and §6 phases 0–4 ONLY (chrome, counter, glitches). Output the full `index.html`. The photo window can be a stub."
- **Pass B prompt:** "Now take the file you just wrote and add §5.6, §5.7, the FLASH sequence, §6 phases 5–8, and `quickReveal()`. Output the COMPLETE updated `index.html`, not a diff."
- Optional Pass C: "Add §7 (modal)."
