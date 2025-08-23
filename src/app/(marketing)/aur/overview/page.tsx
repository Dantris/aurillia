import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "Aurillia Overview — How Core, Node, Sense, Link & Watch fit together",
    description:
        "See how Aur’s products connect: Core orchestrates, Node & Sense observe/act, Link integrates, and Watch is the control & monitoring app.",
};

export default function OverviewPage() {
    return (
        <main>
            {/* HERO */}
            <section className="border-b border-default bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
                    <div className="mb-6 inline-flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">
                            01
                        </span>
                        <span className="text-xs uppercase tracking-widest text-muted">Aur</span>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                        How it fits together
                    </h1>
                    <p className="mt-4 max-w-3xl text-muted">
                        Aurillia is a local-first hardware & software stack. <strong>Core</strong> orchestrates devices and automations,
                        <strong> Node</strong> & <strong>Sense</strong> observe and act in the environment, <strong>Link</strong> integrates with your
                        tools and protocols, and <strong>Watch</strong> is the control & monitoring app for people on site or remote.
                    </p>
                </div>
            </section>

            {/* DIAGRAM */}
            <section className="border-b border-default bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="overflow-hidden rounded-2xl border border-default bg-elev p-6">
                        <AurMap />
                    </div>
                    <p className="mt-3 text-xs text-muted">
                        Tip: The diagram is clickable — open a product to dive deeper.
                    </p>
                </div>
            </section>

            {/* PRODUCT CARDS */}
            <section className="bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <ProductCard
                            title="Aurillia Core"
                            description="Backend brain of the system: local-first compute, device onboarding, and automations."
                            href="/aur/core"
                        />
                        <ProductCard
                            title="Aurillia Node"
                            description="Wireless sensor & camera modules. Stick anywhere and stream what matters."
                            href="/aur/node"
                        />
                        <ProductCard
                            title="Aurillia Sense"
                            description="Motion, battery & environment monitoring for healthy, reliable spaces."
                            href="/aur/sense"
                        />
                        <ProductCard
                            title="Aurillia Link"
                            description="Lightweight secure protocol & APIs to connect tools and building systems."
                            href="/aur/link"
                        />
                        <ProductCard
                            title="Aurillia Watch"
                            description="App for control & monitoring: dashboards, alerts, checklists, and actions."
                            href="/aur/watch"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ---------- tiny components ---------- */

function ProductCard({ title, description, href }: { title: string; description: string; href: string }) {
    return (
        <Link
            href={href}
            className="group block rounded-2xl border border-default bg-elev p-6 hover:border-accent"
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                Learn more <span aria-hidden>›</span>
            </span>
        </Link>
    );
}

/** Simple clickable SVG map of the ecosystem (responsive) */
function AurMap() {
    // 900x520 view tuned for this layout
    return (
        <svg viewBox="0 0 900 520" className="block w-full" aria-labelledby="aur-map-title" role="img">
            <title id="aur-map-title">Aur ecosystem map</title>
            <defs>
                <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* connections */}
            <g stroke="var(--border)" strokeWidth="2">
                <line x1="450" y1="260" x2="200" y2="120" />
                <line x1="450" y1="260" x2="700" y2="120" />
                <line x1="450" y1="260" x2="200" y2="420" />
                <line x1="450" y1="260" x2="700" y2="420" />
            </g>

            {/* nodes */}
            <NodeCircle x={450} y={260} r={56} label="Core" href="/aur/core" accent />
            <NodeCircle x={200} y={120} r={44} label="Watch" href="/aur/watch" />
            <NodeCircle x={700} y={120} r={44} label="Link" href="/aur/link" />
            <NodeCircle x={200} y={420} r={44} label="Node" href="/aur/node" />
            <NodeCircle x={700} y={420} r={44} label="Sense" href="/aur/sense" />
        </svg>
    );
}

function NodeCircle({
    x, y, r, label, href, accent = false,
}: { x: number; y: number; r: number; label: string; href: string; accent?: boolean }) {
    // Using <a> inside SVG to keep it simple & clickable
    return (
        <a href={href}>
            <g className="cursor-pointer" filter="url(#nodeGlow)">
                <circle cx={x} cy={y} r={r} fill={accent ? "var(--accent)" : "var(--elev)"} />
                <circle cx={x} cy={y} r={r} stroke="var(--border)" strokeWidth="2" fill="transparent" />
                <text
                    x={x} y={y + 5}
                    textAnchor="middle"
                    fontSize="14"
                    style={{ fill: accent ? "var(--bg)" : "var(--text)" }}
                >
                    {label}
                </text>
            </g>
        </a>
    );
}
