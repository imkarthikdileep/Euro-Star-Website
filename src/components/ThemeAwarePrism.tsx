"use client";

import { useTheme } from "next-themes";
import Prism from "@/components/Prism";
import { useEffect, useState } from "react";

type PrismProps = React.ComponentProps<typeof Prism>;

export function ThemeAwarePrism(props: PrismProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Prism {...props} />;
    }

    const isDark = theme === 'dark';

    return (
        <Prism
            {...props}
            // In dark mode, we shift the hue to get darker/cooler tones
            // hueShift=0.5 often rotates towards purples/blues if base is white-ish
            hueShift={isDark ? 0.6 : (props.hueShift || 0)}
            // Possibly reduce bloom/glow in dark mode to avoid being too blinding, or increase for neon effect
            // Let's keep it subtle as per "default dark theme hues"
            bloom={isDark ? 0.8 : (props.bloom || 1)}
        />
    );
}
