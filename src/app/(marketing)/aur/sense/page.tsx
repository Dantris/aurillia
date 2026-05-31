import type { Metadata } from "next";
import React from "react";
import Tabs from "@/components/ui/tabs";

export const metadata: Metadata = {
    title: "Aur Sense — Motion, battery & environment monitoring",
    description:
        "Drop-in sensors for motion, environment, power and doors/windows. Install in minutes, view in Watch, automate via Core.",
};

export default function SensePage() {
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
                                Aurillia Sense
                            </h1>
                            <p className="mt-4 max-w-prose text-muted">
                                Drop-in sensing for <strong>motion</strong>, <strong>environment</strong> (temp, humidity, IAQ),
                                <strong> battery & power</strong>, and <strong>open/close</strong>. Pairs with Core in minutes, shows up
                                in Watch dashboards, and triggers automations even if the internet goes down.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <a href="#contact" className="btn-primary">Book a demo</a>
                                <a href="#specs" className="btn-ghost">View specs</a>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-2xl border border-default bg-elev">
                                {/* Replace with a short render or product b-roll */}
                                <video
                                    className="aspect-[16/9] w-full"
                                    src="/media/sense-hero.mp4"
                                    poster="/media/sense-hero-poster.jpg"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_50%,rgba(124,255,168,.12),transparent_70%)]" />
                            </div>
                            <p className="mt-2 text-xs text-muted">
                                Tip: show a quick install → detect motion → alert in Watch → automation toggled.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPABILITIES (tabs) */}
            <SectionWithTabs step="02" title="Capabilities">
                <Tabs labels={["Use cases", "Sensors", "Power & placement", "Integrations", "Security & privacy"]} underline>
                    {/* Use cases */}
                    <div>
                        <p className="text-muted">
                            Build reliable, low-noise monitoring across sites: occupancy, environment, doors/windows,
                            power anomalies, and leak/temp alarms — with clear alerts and simple actions.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Occupancy & traffic patterns",
                                "Environment (temp, humidity, IAQ)",
                                "Open/close (doors, cabinets, racks)",
                                "Battery & power health",
                                "Leak / temp thresholds with actions",
                                "Anomaly alerts that respect quiet hours",
                            ].map((it) => (
                                <li key={it} className="pill">{it}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Sensors */}
                    <div>
                        <p className="text-muted">
                            Mix and match modules as needed — all report through Core and surface neatly in Watch.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Motion & presence (PIR + tuned noise floor)",
                                "Temperature, humidity, IAQ (VOC/CO₂-e)",
                                "Open/close reed + tamper detect",
                                "Power draw / battery voltage",
                                "Optional water/leak puck",
                                "Ambient light (for scene logic)",
                            ].map((it) => (
                                <li key={it} className="pill">{it}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Power & placement */}
                    <div>
                        <p className="text-muted">
                            Install quickly with adhesive or screws. Battery or wired options depending on duty cycle and update rate.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Battery (multi-year) or USB-C/PoE power",
                                "Magnet/adhesive brackets; screw mount",
                                "BLE mesh to Node or direct to Core",
                                "Configurable report intervals & thresholds",
                            ].map((it) => (
                                <li key={it} className="pill">{it}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Integrations */}
                    <div>
                        <p className="text-muted">
                            Use Link to route events to your tools or building systems; keep the heavy lifting on Core.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Alerts to Slack/Teams/Email",
                                "Webhooks & API for BI dashboards",
                                "Modbus/Matter/HomeKit bridges via Link",
                                "Export as CSV/JSON snapshots",
                            ].map((it) => (
                                <li key={it} className="pill">{it}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Security & privacy */}
                    <div>
                        <p className="text-muted">
                            Minimal data by default. Per-site retention, signed updates, and offline buffering with secure sync.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Signed firmware & secure boot",
                                "Local-first with encrypted sync",
                                "Per-site retention policies",
                                "Device keys, audit logs, OTA via Core",
                            ].map((it) => (
                                <li key={it} className="pill">{it}</li>
                            ))}
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
                            title="Sensing"
                            items={[
                                "PIR motion / presence",
                                "Temp/Humidity/IAQ (VOC/CO₂-e)",
                                "Reed open/close & tamper",
                                "Optional leak puck & light",
                            ]}
                        />
                        <SpecCard
                            title="Connectivity & Power"
                            items={[
                                "BLE mesh ↔ Node/Core; Wi-Fi option",
                                "Battery (multi-year) or USB-C/PoE",
                                "Offline buffering; rate limiting",
                            ]}
                        />
                        <SpecCard
                            title="Install & Service"
                            items={[
                                "Adhesive/magnet/screw brackets",
                                "QR onboarding; OTA updates via Core",
                                "Per-device health & diagnostics",
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
                            <h3 className="text-lg font-medium">Roll out Sense in an afternoon.</h3>
                            <p className="mt-1 text-muted">Starter kit: 1× Core, 5× Nodes, 20× Sense modules.</p>
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
