import type { Metadata } from "next";
import React from "react";
import Tabs from "@/components/ui/tabs";

export const metadata: Metadata = {
    title: "Aurillia Core — Local hub for devices, data, and automations",
    description:
        "Aurillia Core is the on-prem hub that powers your network: local-first processing, device management, and secure sync to cloud—on your terms.",
};

export default function CorePage() {
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
                                Aurillia Core
                            </h1>
                            <p className="mt-4 max-w-prose text-muted">
                                The hub that runs your network. Local-first processing, secure device
                                onboarding and updates, and automations that keep working even if the internet doesn’t.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <a href="#contact" className="btn-primary">Book a demo</a>
                                <a href="#specs" className="btn-ghost">View specs</a>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-2xl border border-default bg-elev">
                                <video
                                    className="aspect-[16/9] w-full"
                                    src="/media/core-hero.mp4"
                                    poster="/media/core-hero-poster.jpg"
                                    autoPlay muted loop playsInline preload="metadata"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_50%,rgba(124,255,168,.12),transparent_70%)]" />
                            </div>
                            <p className="mt-2 text-xs text-muted">
                                Render mock — drop your <code>.mp4</code>/<code>.webm</code> in <code>/public/media</code>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION — title + tabs */}
            <SectionWithTabs step="02" title="Architecture">
                <Tabs
                    labels={["Systems Architecture", "Full-stack & Integrations", "QA", "Launch"]}
                    underline
                >
                    {/* Panel 1 */}
                    <div>
                        <p className="text-muted">
                            We define how Core fits your environment: single hub, HA pair, or multi-site.
                            Networking, security boundaries, and update strategy are designed first.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Local-first data with encrypted cloud sync",
                                "Role-based access & signed firmware updates",
                                "MQTT / Webhooks / Modbus bridges via Link",
                                "Resilient automations (run without internet)",
                            ].map((it) => (
                                <li key={it} className="pill">{it}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Panel 2 */}
                    <div>
                        <p className="text-muted">
                            Connect Core to the tools you already use: Slack/Teams, your BI stack,
                            and building systems via Modbus/Matter/HomeKit.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {["Slack", "Teams", "Notion", "HomeKit/Matter", "Modbus", "Webhooks"].map((t) => (
                                <div key={t} className="chip">{t}</div>
                            ))}
                        </div>
                    </div>

                    {/* Panel 3 */}
                    <div>
                        <p className="text-muted">
                            Provision in staging with simulated loads and failure testing. Verify alert flows,
                            rate limits, and recovery paths before go-live.
                        </p>
                    </div>

                    {/* Panel 4 */}
                    <div>
                        <p className="text-muted">
                            Roll out site by site with training and observability baked in—so your team can operate, not babysit.
                        </p>
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
                            title="Compute & Power"
                            items={[
                                "Silent ARM SBC, secure boot",
                                "AC/PoE; optional UPS",
                                "On-device rules engine",
                            ]}
                        />
                        <SpecCard
                            title="Connectivity"
                            items={[
                                "Ethernet, Wi-Fi; optional LTE",
                                "BLE mesh / LoRa via Nodes",
                                "MQTT, REST/GraphQL via Link",
                            ]}
                        />
                        <SpecCard
                            title="Security"
                            items={[
                                "E2E encryption",
                                "Signed firmware / OTA",
                                "RBAC, audit logs",
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* CONTACT / CTA */}
            <section id="contact" className="border-t border-default bg-surface">
                <div className="mx-auto max-w-7xl px-6 py-14">
                    <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-default bg-elev px-6 py-6">
                        <div>
                            <h3 className="text-lg font-medium">Ready to see Core in your environment?</h3>
                            <p className="mt-1 text-muted">30-minute walkthrough + tailored architecture notes.</p>
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
