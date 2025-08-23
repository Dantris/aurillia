type Props = { className?: string; color?: string };

export default function HexComb({ className = "", color = "#39FF88" }: Props) {
    // Width/height tuned for the navbar brand area
    return (
        <svg
            className={`pointer-events-none ${className}`}
            viewBox="0 0 200 48"
            fill="none"
            aria-hidden
            style={{ ["--hex" as any]: color }}
        >
            {/* We draw 5 flat-topped hexes in a row, each with a tiny delay */}
            <g className="hex hex-glow hex-delay-0">
                <polygon points="9,0 27,0 36,15.588 27,31.176 9,31.176 0,15.588" />
            </g>
            <g transform="translate(40,0)" className="hex hex-glow hex-delay-1">
                <polygon points="9,0 27,0 36,15.588 27,31.176 9,31.176 0,15.588" />
            </g>
            <g transform="translate(80,0)" className="hex hex-glow hex-delay-2">
                <polygon points="9,0 27,0 36,15.588 27,31.176 9,31.176 0,15.588" />
            </g>
            <g transform="translate(120,0)" className="hex hex-glow hex-delay-3">
                <polygon points="9,0 27,0 36,15.588 27,31.176 9,31.176 0,15.588" />
            </g>
            <g transform="translate(160,0)" className="hex hex-glow hex-delay-4">
                <polygon points="9,0 27,0 36,15.588 27,31.176 9,31.176 0,15.588" />
            </g>
        </svg>
    );
}
