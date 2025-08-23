import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hardware & IoT — Aurillia",
    description: "Custom sensors, enclosures, and on-site automation.",
};

export default function Page() {
    return (
        <main className="border-b border-default bg-surface">
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">04</span>
                    <span className="text-xs uppercase tracking-widest text-muted">Services</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Hardware & IoT</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    From proof-of-concept to small runs: 3D-printed enclosures, sensor nodes, gateways, and automations that run locally.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        "ESP32/RPi prototypes & firmware",
                        "Enclosures & mounts (3D printed/CNC)",
                        "Local processing, cloud sync optional",
                        "Dashboards, alerts & maintenance flows",
                    ].map((t) => (
                        <div key={t} className="rounded-xl border border-default bg-elev px-4 py-3 text-[15px]">{t}</div>
                    ))}
                </div>
            </section>
        </main>
    );
}
