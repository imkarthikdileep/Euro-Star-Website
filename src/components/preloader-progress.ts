export interface LoadTrackerWeights {
  fonts: number;
  page: number;
  fold: number;
  rest: number;
  video: number;
}

export interface LoadTrackerOptions {
  video: HTMLVideoElement | null;
  weights: LoadTrackerWeights;
  maxWaitMs: number;
  videoNeedSec: number;
}

export interface LoadTrackerSnapshot {
  fonts: number;
  page: number;
  fold: number;
  rest: number;
  video: number;
  real: number;
  degraded: boolean;
  ageMs: number;
  vReady: number;
  vBuf: number;
}

export interface LoadTracker {
  value: () => number;
  ready: () => boolean;
  videoReady: () => boolean;
  degraded: () => boolean;
  snapshot: () => LoadTrackerSnapshot;
  subscribe: (fn: () => void) => () => void;
  destroy: () => void;
}

export function createLoadTracker({
  video,
  weights,
  maxWaitMs,
  videoNeedSec,
}: LoadTrackerOptions): LoadTracker {
  const st = { fonts: 0, page: 0, fold: 0, rest: 0, video: 0 };
  const subs = new Set<() => void>();
  let degraded = false;
  let destroyed = false;
  const cleanups: (() => void)[] = [];
  const emit = () => subs.forEach((fn) => fn());

  // each category is monotonic: it can only go up
  const set = (k: keyof typeof st, v: number) => {
    v = Math.max(st[k], Math.min(1, v));
    if (v !== st[k]) {
      st[k] = v;
      emit();
    }
  };

  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      value: () => 1,
      ready: () => true,
      videoReady: () => true,
      degraded: () => false,
      snapshot: () => ({
        ...st,
        real: 1,
        degraded: false,
        ageMs: 0,
        vReady: 4,
        vBuf: 3,
      }),
      subscribe: () => () => {},
      destroy: () => {},
    };
  }

  // ---- 1. fonts (exactly the 3 Migha styles the preloader uses) ----
  const FONTS = [
    '700 1em "Migha Display"',
    '500 1em "Migha Wide"',
    '500 1em "Migha Text"',
  ];
  if (document.fonts) {
    Promise.all(FONTS.map((f) => document.fonts.load(f))).then(
      () => set("fonts", 1),
      () => set("fonts", 1)
    );
  } else {
    set("fonts", 1);
  }

  // ---- 2. page: 0 -> .5 (interactive) -> 1 (window load event) ----
  const onState = () =>
    set(
      "page",
      document.readyState === "complete"
        ? 1
        : document.readyState === "interactive"
        ? 0.5
        : 0
    );
  document.addEventListener("readystatechange", onState);
  cleanups.push(() => document.removeEventListener("readystatechange", onState));
  if (document.readyState === "complete") {
    set("page", 1);
  } else {
    const onLoad = () => set("page", 1);
    window.addEventListener("load", onLoad, { once: true });
    cleanups.push(() => window.removeEventListener("load", onLoad));
    onState();
  }

  // ---- 3 + 4. images: 'fold' = intersects the first viewport, 'rest' = everything else that is rendered ----
  const seen = new Set<string>();
  const groups: { fold: { done: boolean }[]; rest: { done: boolean }[] } = {
    fold: [],
    rest: [],
  };
  const recompute = () =>
    (["fold", "rest"] as const).forEach((g) => {
      const a = groups[g];
      set(g, a.length ? a.filter((r) => r.done).length / a.length : 1);
    });

  function scanImages() {
    if (destroyed) return;
    document.querySelectorAll("img").forEach((img) => {
      if (img.closest("#pl") || img.closest("[data-pl-ignore]")) return; // skip the preloader's own logo
      if (img.getClientRects().length === 0) return; // skip display:none variants
      const key = img.currentSrc || img.src;
      if (!key || seen.has(key)) return; // de-duplicate
      seen.add(key);
      const r = img.getBoundingClientRect();
      const g = r.top < window.innerHeight && r.bottom > 0 ? "fold" : "rest";
      const rec = { done: false };
      groups[g].push(rec);
      const fin = () => {
        if (!rec.done) {
          rec.done = true;
          recompute();
        }
      };
      if (img.loading === "lazy") img.loading = "eager"; // force-load lazy images
      img.fetchPriority = g === "fold" ? "high" : "low";
      if (img.complete && img.naturalWidth > 0) fin();
      else {
        img.addEventListener("load", fin, { once: true });
        img.addEventListener("error", fin, { once: true });
      }
    });
    recompute();
  }
  scanImages();
  const scanTimers = [
    setTimeout(scanImages, 400),
    setTimeout(scanImages, 1200),
  ];
  const winLoadHandler = () => setTimeout(scanImages, 250);
  window.addEventListener("load", winLoadHandler, { once: true });
  cleanups.push(() => window.removeEventListener("load", winLoadHandler));

  // ---- 5. hero video: progress = buffered seconds from t=0 divided by videoNeedSec ----
  const bufferedAhead = () => {
    if (!video) return 0;
    try {
      const b = video.buffered;
      for (let i = 0; i < b.length; i++) {
        if (b.start(i) <= 0.05) return b.end(i);
      }
    } catch {
      return 0;
    }
    return 0;
  };
  const videoReady = () =>
    !video ||
    !!video.error ||
    video.readyState >= 4 ||
    bufferedAhead() >=
      Math.min(
        videoNeedSec,
        isFinite(video.duration) && video.duration > 0
          ? video.duration
          : videoNeedSec
      );

  function updVideo() {
    if (destroyed) return;
    if (!video || video.error) {
      set("video", 1);
      return;
    }
    const need = Math.min(
      videoNeedSec,
      isFinite(video.duration) && video.duration > 0
        ? video.duration
        : videoNeedSec
    );
    let p = Math.min(1, bufferedAhead() / need);
    if (video.readyState < 1) p = Math.min(p, 0.05);
    if (videoReady()) p = 1;
    set("video", p);
  }

  const VEV = [
    "loadedmetadata",
    "loadeddata",
    "progress",
    "canplay",
    "canplaythrough",
    "suspend",
    "stalled",
    "error",
  ];
  if (video) {
    VEV.forEach((e) => video.addEventListener(e, updVideo));
    cleanups.push(() => VEV.forEach((e) => video.removeEventListener(e, updVideo)));
  }
  const poll = setInterval(updVideo, 250);
  updVideo();

  // ---- timeout ----
  const tMax = setTimeout(() => {
    if (!destroyed) {
      degraded = true;
      emit();
    }
  }, maxWaitMs);
  const tStart = performance.now();

  const value = () => {
    const w = weights;
    const sum = w.fonts + w.page + w.fold + w.rest + w.video;
    return (
      (st.fonts * w.fonts +
        st.page * w.page +
        st.fold * w.fold +
        st.rest * w.rest +
        st.video * w.video) /
      sum
    );
  };
  const ready = () =>
    st.fonts === 1 &&
    st.page === 1 &&
    st.fold === 1 &&
    st.rest === 1 &&
    st.video === 1;

  return {
    value,
    ready,
    videoReady,
    degraded: () => degraded,
    snapshot: () => ({
      ...st,
      real: +value().toFixed(3),
      degraded,
      ageMs: Math.round(performance.now() - tStart),
      vReady: video ? video.readyState : -1,
      vBuf: +bufferedAhead().toFixed(2),
    }),
    subscribe: (fn: () => void) => {
      subs.add(fn);
      return () => subs.delete(fn);
    },
    destroy() {
      destroyed = true;
      clearInterval(poll);
      clearTimeout(tMax);
      scanTimers.forEach(clearTimeout);
      cleanups.forEach((f) => f());
      subs.clear();
    },
  };
}
