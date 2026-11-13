import { useEffect, useState } from "react";

export type ViewportTier = "mobile" | "tablet" | "desktop";

export interface MediaConfig {
  tier: ViewportTier;
  mp4: string | null;
  poster: string;
}

export function useAdaptiveHeroMedia(): MediaConfig {
  const [config, setConfig] = useState<MediaConfig>({
    tier: "desktop",
    mp4: "/gallery/Eurostar_Hero_Section_Hd_compressed.mp4",
    poster: "/images/hero-poster-desktop.webp",
  });

  useEffect(() => {
    const conn = typeof navigator !== "undefined"
      ? (navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }).connection
      : undefined;

    const isConstrainedNetwork =
      Boolean(conn?.saveData) ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g";

    const updateMedia = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setConfig({
          tier: "mobile",
          mp4: isConstrainedNetwork ? null : "/videos/eurostar-hero-mobile.mp4",
          poster: "/images/hero-poster-mobile.webp",
        });
      } else if (width < 1024) {
        setConfig({
          tier: "tablet",
          mp4: isConstrainedNetwork ? null : "/videos/eurostar-hero-tablet.mp4",
          poster: "/images/hero-poster-tablet.webp",
        });
      } else {
        setConfig({
          tier: "desktop",
          mp4: "/videos/eurostar-hero-desktop.mp4",
          poster: "/images/hero-poster-desktop.webp",
        });
      }
    };

    updateMedia();
    window.addEventListener("resize", updateMedia, { passive: true });
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return config;
}

