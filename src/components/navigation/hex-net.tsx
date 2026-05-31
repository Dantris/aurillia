import React from "react";

/** Flat-top hex edge indices:
 * 0: top, 1: upper-right, 2: lower-right, 3: bottom, 4: lower-left, 5: upper-left
 */
type Segment = [row: number, col: number, edge: 0 | 1 | 2 | 3 | 4 | 5];

type Props = {
    size?: number;
    color?: string;
    thickness?: number;
    className?: string;
    segments?: Segment[];  // which edges to draw
    debug?: boolean;       // faint outlines to help adjustments
};
// src/components/navigation/hex-static.tsx (or import it)
export const PATTERN_SEGMENTS: [number, number, 0 | 1 | 2 | 3 | 4 | 5][] = [
    // LEFT — short horizontal only
    [3, 0, 0],

    // CENTER-LEFT chevron (<) — two slants, no top bar
    [2, 2, 5],   // UL
    [3, 2, 5],   // UL (below)

    // TOP cluster: spike + short top bar + small UR slant
    [1, 3, 5],   // spike up-left
    [2, 3, 0],   // short top bar
    [2, 3, 1],   // tiny UR slant

    // RIGHT hook (tighter)
    [3, 3, 2],   // LR connector
    [3, 4, 1],   // UR
    [3, 5, 2],   // LR
    [3, 4, 0],   // (small top stub to brighten the corner)

    // MID short bar (slightly right of center)
    [3, 3, 3],   // bottom edge of hex (3,3)

    // LOWER chevron (+ short base) moved right
    [4, 4, 5],   // UL
    [5, 4, 4],   // LL
    [5, 4, 3],   // short base to the right
];

export default function HexStatic({
    size = 18,
    color = "#7BFFA8",
    thickness = 2.8,
    className = "",
    segments = PATTERN_SEGMENTS,
    debug = false,
}: Props) {
    const s = size;
    const h = Math.sqrt(3) * s;
    const stepX = 1.5 * s;
    const stepY = h;

    const edgeEndpoints = (r: number, c: number, e: 0 | 1 | 2 | 3 | 4 | 5) => {
        const cx = s + c * stepX;
        const cy = h / 2 + r * stepY + (c % 2 ? h / 2 : 0);
        const pts = [
            [cx - s / 2, cy - h / 2], // 0
            [cx + s / 2, cy - h / 2], // 1
            [cx + s, cy],         // 2
            [cx + s / 2, cy + h / 2], // 3
            [cx - s / 2, cy + h / 2], // 4
            [cx - s, cy],         // 5
        ] as const;
        const pairs = [
            [pts[0], pts[1]],
            [pts[1], pts[2]],
            [pts[2], pts[3]],
            [pts[3], pts[4]],
            [pts[4], pts[5]],
            [pts[5], pts[0]],
        ] as const;
        return pairs[e];
    };

    // gather endpoints + bounds
    const edges = segments.map(([r, c, e]) => {
        const [a, b] = edgeEndpoints(r, c, e);
        return { r, c, e, a, b };
    });

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    edges.forEach(({ a, b }) => {
        minX = Math.min(minX, a[0], b[0]);
        minY = Math.min(minY, a[1], b[1]);
        maxX = Math.max(maxX, a[0], b[0]);
        maxY = Math.max(maxY, a[1], b[1]);
    });

    const padX = s * 1.2, padY = h * 0.9;
    const dx = -minX + padX, dy = -minY + padY;
    const width = (maxX - minX) + padX * 2;
    const height = (maxY - minY) + padY * 2;

    // optional faint debug outlines for the minimal bounding grid
    const debugPolys: React.ReactElement[] = [];
    if (debug) {
        const rows = new Set(segments.map(([r]) => r));
        const cols = new Set(segments.map(([, c]) => c));
        const rMin = Math.min(...rows), rMax = Math.max(...rows);
        const cMin = Math.min(...cols), cMax = Math.max(...cols);
        for (let r = rMin - 1; r <= rMax + 1; r++) {
            for (let c = cMin - 1; c <= cMax + 1; c++) {
                const cx = s + c * stepX, cy = h / 2 + r * stepY + (c % 2 ? h / 2 : 0);
                const poly = [
                    [cx - s / 2, cy - h / 2],
                    [cx + s / 2, cy - h / 2],
                    [cx + s, cy],
                    [cx + s / 2, cy + h / 2],
                    [cx - s / 2, cy + h / 2],
                    [cx - s, cy],
                ].map(([x, y]) => `${x + dx},${y + dy}`).join(" ");
                debugPolys.push(
                    <polygon key={`${r}-${c}`} points={poly} className="hex-static-debug" />
                );
            }
        }
    }

    return (
        <svg
            className={`pointer-events-none ${className}`}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"   // <-- add this
            style={{ ["--hex" as any]: color, ["--thick" as any]: thickness } as React.CSSProperties}
        >
            {debug && debugPolys}
            {edges.map(({ a, b }, i) => (
                <polyline key={i} points={`${a[0] + dx},${a[1] + dy} ${b[0] + dx},${b[1] + dy}`} className="hex-edge-static" />
            ))}
        </svg>
    );

}
