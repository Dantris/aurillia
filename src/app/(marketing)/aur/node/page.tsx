import type { Metadata } from "next";
import React from "react";
import Tabs from "@/components/ui/tabs";

export const metadata: Metadata = {
    title: "Aurillia Node — Modular sensor/actuator",
    description:
        "Aurillia Node is a tiny, tough device you can place anywhere. Swap sensor modules, stream data locally, and trigger actions at the edge.",
};

export default function NodePage() {
    return (
        <main className="relative">
            {/* HERO — same structure as Core */}
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
                                Aurillia Node
                            </h1>
                            <p className="mt-4 max-w-prose text-muted">
                                The modular sensor/actuator you can stick anywhere. Swap cartridges for occupancy,
                                temperature, light, vibration, or a compact relay—then run rules locally through Core.
                            </p>

                            <div className="mt-6 flex gap-3">
                                <a href="#contact" className="btn-primary">Talk to an engineer</a>
                                <a href="#specs" className="btn-ghost">View specs</a>
                            </div>
                        </div>

                        <div className="md:col-span-7">
                            <div className="relative overflow-hidden rounded-2xl border border-default bg-elev">
                                <video
                                    className="aspect-[16/9] w-full"
                                    src="/media/node-hero.mp4"
                                    poster="/media/node-hero-poster.jpg"
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
            <SectionWithTabs step="02" title="Deployment">
                <Tabs labels={["Modules & I/O", "Install & Power", "Mesh & Range", "Security"]} underline>
                    {/* Panel 1 */}
                    <div>
                        <p className="text-muted">
                            Mix the sensors you need today—and swap them later. Node handles edge thresholds,
                            smoothing and quick diagnostics so your network stays quiet and responsive.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Cartridges: PIR/ToF occupancy, Temp/Humidity, Light, Vibration",
                                "Door/contact input + compact relay module",
                                "Edge thresholds & event filtering",
                                "Live health & diagnostics in Core",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Panel 2 */}
                    <div>
                        <p className="text-muted">
                            Mount with adhesive, screws, or magnets. Run multi-year on batteries or wire 5–24 V DC.
                            Pair in seconds using QR codes through Core.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Adhesive / screw / magnet mounts",
                                "Battery (multi-year) or 5–24 V DC",
                                "Fast QR provisioning via Core",
                                "Field-calibration helpers",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Panel 3 */}
                    <div>
                        <p className="text-muted">
                            BLE mesh by default; optional LoRa/Thread for large sites. Nodes hop via nearest peers,
                            with auto-retry and buffering if a link drops.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "BLE mesh with adaptive duty cycling",
                                "Optional LoRa/Thread for campuses",
                                "Local buffering when offline",
                                "Channel planning & interference hints",
                            ].map((it) => <li key={it} className="pill">{it}</li>)}
                        </ul>
                    </div>

                    {/* Panel 4 */}
                    <div>
                        <p className="text-muted">
                            Every Node ships with signed firmware and secure boot. Unique device keys, scoped access
                            through Core, and staged, reversible OTA updates.
                        </p>
                        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {[
                                "Signed firmware & secure boot",
                                "Scoped keys & RBAC in Core",
                                "Staged OTA with rollback",
                                "Full audit trail & device logs",
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
                            title="Sensors & I/O"
                            items={[
                                "PIR/ToF occupancy, Temp/Humidity, Light, Vibration",
                                "Door/contact input, 1× relay driver module",
                                "Configurable sampling & edge thresholds",
                            ]}
                        />
                        <SpecCard
                            title="Power"
                            items={[
                                "2–5 years typical on battery (use-case dependent)",
                                "5–24 V DC input (barrel or terminal)",
                                "Low-power sleep with event wake",
                            ]}
                        />
                        <SpecCard
                            title="Connectivity"
                            items={[
                                "BLE mesh; optional LoRa/Thread",
                                "Secure pairing with Core (QR)",
                                "Local buffering if offline",
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
                            <h3 className="text-lg font-medium">Pilot a floor in a day.</h3>
                            <p className="mt-1 text-muted">Starter kit: 1× Core, 5× Nodes, 1× Sense.</p>
                        </div>
                        <a href="mailto:hello@aurillia.dev" className="btn-primary">hello@aurillia.dev</a>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* ---------- server helpers ---------- */
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
