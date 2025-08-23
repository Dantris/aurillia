import type { Metadata } from "next";
import React from "react";
import Tabs from "@/components/ui/tabs";

export const metadata: Metadata = {
    title: "Aurillia Watch — App for control & monitoring",
    description:
        "The Aurillia app for dashboards, alerts, and on-site workflows. Control devices, acknowledge incidents, and run checklists—desktop and mobile.",
};

export default function WatchPage() {
    return (
        <main className="relative">
            {/* HERO — same structure as Core/Node */}
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
                                Aurillia Watch
                            </h1>
                            <p className="mt-4 max-w-prose text-muted">
                                The control & monitoring app for the Aurillia stack. See dashboards,
                                acknowledge alerts, trigger automations, and guide staff with simple, on-site workflows.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <a href="#contact" className="btn-primary">Book a demo</a>
                                <a href="#specs" className="btn-ghost">View specs</a>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-2xl border border-default bg-elev">
                                {/* Swap with UI capture or motion mock of the app */}
                                <video
                                    className="aspect-[16/9] w-full"
                                    src="/media/watch-hero.mp4"
                                    poster="/media/watch-hero-poster.jpg"
                                    autoPlay muted loop playsInline preload="metadata"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_50%,rgba(124,255,168,.12),transparent_70%)]" />
                            </div>
                            <p className="mt-2 text-xs text-muted">
                                Tip: record a short UI flow (dash → alert → acknowledge → action) and loop it here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION — title + underline tabs */}
            <SectionWithTabs step="02" title="What you can do">
                <Tabs
                    labels={["Dashboards", "Alerts & Actions", "Workflows", "Access & Privacy"]}
                    underline
                >
                    {/* Panel 1: Dashboards */}
                    <div>
                        <p className="text-muted">
                            Build live views for occupancy, environment, power, and status across sites.
                            Drag cards, filter by tags, and save presets for teams or roles.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Cards: charts, maps, device lists, incidents",
                                "Per-role presets & quick filters",
                                "Multi-site views with health and SLA",
                                "Export snapshots for reports",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Panel 2: Alerts & Actions */}
                    <div>
                        <p className="text-muted">
                            See incidents as a tidy feed. Acknowledge, assign, or trigger automations (lights, relays),
                            with rate limits and escalation rules baked in.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Acknowledge & assign with one tap",
                                "Trigger automations & routines",
                                "Escalation & quiet hours",
                                "Full audit trail",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Panel 3: Workflows */}
                    <div>
                        <p className="text-muted">
                            Guide on-site tasks with simple checklists and confirmations—rounds, openings, compliance checks—
                            with location hints via Link beacons.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Checklists & confirmations",
                                "Templates per site/zone",
                                "Offline-friendly; sync later",
                                "Location hints via Link beacons",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Panel 4: Access & Privacy */}
                    <div>
                        <p className="text-muted">
                            Roles & scopes govern what users can see or trigger. Minimal telemetry by default,
                            opt-in location hints, and enterprise SSO support.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "RBAC & per-site scopes",
                                "SAML/OAuth2 SSO",
                                "Minimal telemetry, opt-in location",
                                "Device & action-level audit logs",
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
                            title="Platforms"
                            items={[
                                "Web app (desktop & mobile web)",
                                "iOS & Android apps (optional)",
                                "Works offline; resyncs when online",
                            ]}
                        />
                        <SpecCard
                            title="Integrations"
                            items={[
                                "Slack/Teams for notifications",
                                "Email/SMS via Link",
                                "Webhooks & API actions",
                            ]}
                        />
                        <SpecCard
                            title="Security"
                            items={[
                                "SSO (SAML/OAuth2)",
                                "RBAC & per-site scopes",
                                "Audit logs & versioned automations",
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
                            <h3 className="text-lg font-medium">See Watch with your data.</h3>
                            <p className="mt-1 text-muted">We’ll connect a demo space to your devices and alerts.</p>
                        </div>
                        <a href="mailto:hello@aurillia.dev" className="btn-primary">hello@aurillia.dev</a>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ---------- tiny server helpers ---------- */
function SectionWithTabs({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
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
