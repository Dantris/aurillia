import type { Metadata } from "next";
import React from "react";
import Tabs from "@/components/ui/tabs";

export const metadata: Metadata = {
    title: "Aur Link — Lightweight secure protocol & integrations",
    description:
        "Bridge devices and tools with a minimal, secure protocol. MQTT-first with adapters for Modbus, Matter/HomeKit, webhooks and REST/GraphQL APIs.",
};

export default function LinkPage() {
    return (
        <main className="relative">
            {/* HERO */}
            <section className="relative border-b border-default bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
                        <div className="md:col-span-5">
                            <div className="mb-6 inline-flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">
                                    01
                                </span>
                                <span className="text-xs uppercase tracking-widest text-muted">Product</span>
                            </div>

                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                Aurillia Link
                            </h1>
                            <p className="mt-4 max-w-prose text-muted">
                                The lightweight, secure way to connect devices and software. Publish/subscribe with
                                <strong> MQTT</strong>, bridge to building protocols (<strong>Modbus</strong>,
                                <strong> Matter/HomeKit</strong>), and expose <strong>APIs & webhooks</strong>—with
                                rate limits, retries, and audit built in.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <a href="#contact" className="btn-primary">Book a demo</a>
                                <a href="#specs" className="btn-ghost">View specs</a>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-2xl border border-default bg-elev">
                                {/* Replace with a short diagram animation or protocol flow */}
                                <video
                                    className="aspect-[16/9] w-full"
                                    src="/media/link-hero.mp4"
                                    poster="/media/link-hero-poster.jpg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_50%,rgba(124,255,168,.12),transparent_70%)]" />
                            </div>
                            <p className="mt-2 text-xs text-muted">
                                Tip: a quick flow—device publishes → Core rule → webhook to Slack → action back to device.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <SectionWithTabs step="02" title="Capabilities">
                <Tabs
                    labels={[
                        "Protocol",
                        "Bridges & Adapters",
                        "APIs & Webhooks",
                        "Reliability & Security",
                        "Deployment",
                    ]}
                    underline
                >
                    {/* Protocol */}
                    <div>
                        <p className="text-muted">
                            Link speaks MQTT by default: topic-based publish/subscribe with retained messages,
                            QoS control, and discovery. It’s simple for embedded and powerful at scale.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "MQTT 3.1.1/5.0 with QoS 0/1",
                                "Structured topic conventions & discovery",
                                "Device identity & session auth via Core",
                                "Retained state for quick reconnection",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Bridges & Adapters */}
                    <div>
                        <p className="text-muted">
                            Use built-in bridges to talk to building systems and consumer ecosystems—no glue code.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Modbus RTU/TCP maps ↔ topics",
                                "Matter / HomeKit device exposure",
                                "HTTP(S) poller → topic ingest",
                                "CSV/JSON snapshot importer",
                                "Outbound adapters to Slack/Teams",
                                "Email/SMS via relay",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* APIs & Webhooks */}
                    <div>
                        <p className="text-muted">
                            Integrate with anything. Use REST/GraphQL for reads & commands, or subscribe via webhooks
                            with signed requests and backoff.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "REST & GraphQL for device/query",
                                "Signed webhooks with retries",
                                "Filter by site/tags/priority",
                                "Action endpoints with RBAC",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Reliability & Security */}
                    <div>
                        <p className="text-muted">
                            Designed for noisy networks and restricted sites: resilient delivery, offline buffering,
                            strong identities, and clear audit trails.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Rate limits & backpressure",
                                "Exponential backoff & DLQ",
                                "mTLS/TLS, signed tokens",
                                "Per-topic RBAC & audit logs",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Deployment */}
                    <div>
                        <p className="text-muted">
                            Run on Core (single site), HA pair, or multi-site. Export metrics to your observability stack.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Runs on Core; optional HA",
                                "Edge concentrators for large sites",
                                "Prometheus/OpenTelemetry metrics",
                                "Config as code; OTA updates",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>
                </Tabs>
            </SectionWithTabs>

            {/* SPECS */}
            <section id="specs" className="border-t border-default bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="mb-8 inline-flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">
                            03
                        </span>
                        <h2 className="text-xl font-semibold tracking-tight">Specs</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <SpecCard
                            title="Protocols"
                            items={[
                                "MQTT 3.1.1/5.0, HTTP(S)",
                                "Modbus RTU/TCP, Matter/HomeKit",
                                "Webhooks (signed) & SSE",
                            ]}
                        />
                        <SpecCard
                            title="Security"
                            items={[
                                "mTLS/TLS, signed JWTs",
                                "Per-topic RBAC & scopes",
                                "Audit logs & immutable events",
                            ]}
                        />
                        <SpecCard
                            title="Operations"
                            items={[
                                "HA/cluster options",
                                "Metrics (Prom/OpenTelemetry)",
                                "Config as code; OTA via Core",
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="border-t border-default bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-14">
                    <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-default bg-elev px-6 py-6">
                        <div>
                            <h3 className="text-lg font-medium">Connect your stack in days, not months.</h3>
                            <p className="mt-1 text-muted">We’ll map your systems and ship a working bridge plan.</p>
                        </div>
                        <a href="mailto:hello@aurillia.dev" className="btn-primary">hello@aurillia.dev</a>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ---------- tiny server helpers ---------- */

function SectionWithTabs({
    step,
    title,
    children,
}: { step: string; title: string; children: React.ReactNode }) {
    return (
        <section className="border-b border-default bg-surface">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-8 flex items-center gap-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">
                        {step}
                    </span>
                    <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
                </div>
                {children}
            </div>
        </section>
    );
}

function SpecCard({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="rounded-2xl border border-default bg-elev p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{title}</h3>
            <ul className="mt-3 space-y-2">
                {items.map((it) => (
                    <li key={it} className="flex gap-2">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent/80" />
                        <span className="text-foreground/90">{it}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
