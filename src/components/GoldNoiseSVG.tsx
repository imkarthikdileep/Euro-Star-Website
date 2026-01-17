export function GoldNoiseSVG() {
    return (
        <svg className="hidden">
            <defs>
                <filter id="gold-noise-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="3"
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 0.3 0"
                        in="noise"
                        result="softNoise"
                    />
                    <feComposite operator="in" in="softNoise" in2="SourceGraphic" result="composite" />
                    <feBlend mode="overlay" in="composite" in2="SourceGraphic" />
                </filter>
            </defs>
        </svg>
    );
}
