// src/app/services/hardware/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hardware & IoT — Aurillia",
    description:
        "Sensor nodes, hubs, and small runs of hardware that talk to your app and actually work in real spaces.",
};

export default function Page() {
    return (
        <main className="bg-[#f5f5f6] text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 space-y-20">
                {/* HERO */}
                <section className="space-y-10">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-medium">
                            04
                        </span>
                        <span className="uppercase tracking-[0.22em]">
                            Services · Hardware &amp; IoT
                        </span>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
                        <div>
                            <h1 className="text-[2.7rem] leading-[1.04] font-semibold tracking-tight md:text-[3.1rem]">
                                Hardware &amp; IoT for real spaces, not just lab benches.
                            </h1>
                            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-slate-600">
                                Aurillia designs and builds small, reliable hardware stacks:
                                sensor nodes on ESP32, a local hub on Raspberry&nbsp;Pi, and
                                dashboards or mobile apps to watch what&apos;s going on. Good
                                for apartments, studios, small sites, or care scenarios.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-[11px] text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    ESP32 / Raspberry&nbsp;Pi prototypes
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Local-first, cloud-optional
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Dashboards, alerts &amp; maintenance
                                </span>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-3 text-sm">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-medium text-white hover:bg-slate-800"
                                >
                                    Talk about a hardware project
                                    <span className="ml-2 text-sm">↗</span>
                                </a>
                                <a
                                    href="/aur/overview"
                                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
                                >
                                    See Aurillia overview
                                </a>
                            </div>
                        </div>

                        {/* Typical engagement */}
                        <aside className="space-y-4 border-l border-slate-200 pl-5 md:pl-8 text-xs leading-relaxed text-slate-600">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                                    Typical engagement
                                </p>
                                <p className="mt-2">
                                    A small team, property owner, or studio that wants{" "}
                                    <span className="font-medium text-slate-900">
                                        a handful of smart nodes
                                    </span>{" "}
                                    rather than a massive “smart building” platform.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    • Duration:{" "}
                                    <span className="font-medium text-slate-900">
                                        4–10 weeks
                                    </span>
                                </p>
                                <p>
                                    • Scope:{" "}
                                    <span className="font-medium text-slate-900">
                                        1 hub + 2–12 nodes, firmware, and a simple app view
                                    </span>
                                </p>
                                <p>
                                    • Use cases: motion / presence, doors &amp; windows, cameras,
                                    environmental sensors, light/relay control.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* WHAT WE BUILD */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            What we actually build for you
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            From PCB and firmware to the UI: a small stack that you can deploy,
                            monitor, and extend later—without guessing what runs where.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                01 · Nodes &amp; sensing
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Sensor &amp; camera modules
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                ESP32-based nodes with motion, door/window, temperature, or
                                camera modules. We pick parts that are available and don&apos;t
                                require a PhD to maintain.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• PIR and door/window sensors</li>
                                <li>• ESP32-CAM / USB cameras where legal &amp; appropriate</li>
                                <li>• Power design: mains, PoE, or battery-friendly</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                02 · Hub &amp; processing
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Local hub &amp; protocols
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                A Raspberry&nbsp;Pi or similar device as the local brain:
                                receives data, stores events, runs simple rules, and talks to
                                the cloud only when needed.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• MQTT / WebSockets / REST gateway</li>
                                <li>• Local logging &amp; buffering when offline</li>
                                <li>• Secure updates for firmware &amp; hub</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                03 · App &amp; flows
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Dashboards &amp; alerts
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Simple web or mobile views to see rooms, last events, and device
                                health—plus flows for alerts, schedules, and access.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Room &amp; device overview screens</li>
                                <li>• Push, email, or SMS alerts via your providers</li>
                                <li>• Maintenance view: battery, connectivity, errors</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FIT / NOT FIT */}
                <section className="space-y-6">
                    <div className="grid gap-10 md:grid-cols-2">
                        <div className="space-y-3">
                            <h2 className="text-sm font-medium text-slate-900">
                                A good match if you&apos;re…
                            </h2>
                            <div className="h-px w-10 bg-slate-300" />
                            <ul className="space-y-2 text-xs leading-relaxed text-slate-600">
                                <li>
                                    • Running a space (home, studio, small site) that needs{" "}
                                    better sensing, logging, or lightweight automation.
                                </li>
                                <li>
                                    • Interested in a{" "}
                                    <span className="font-medium text-slate-900">
                                        transparent bill of materials
                                    </span>{" "}
                                    and owning the firmware &amp; code.
                                </li>
                                <li>
                                    • Ok with starting with a pilot in a few rooms before rolling
                                    out further.
                                </li>
                                <li>
                                    • Happy to keep things simple rather than building a
                                    fully-generic &quot;platform&quot; on day one.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-sm font-medium text-slate-900">
                                Probably not the best fit if…
                            </h2>
                            <div className="h-px w-10 bg-slate-300" />
                            <ul className="space-y-2 text-xs leading-relaxed text-slate-600">
                                <li>
                                    • You need thousands of devices manufactured with strict
                                    certifications right away.
                                </li>
                                <li>
                                    • You want a fully managed vendor solution with long-term
                                    lock-in and proprietary hardware.
                                </li>
                                <li>
                                    • You expect on-site installation teams in multiple countries.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* PRICING / SHAPES */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            Typical hardware shapes &amp; pricing
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            Exact pricing depends on sensors, enclosures, and how much UI we
                            build. Hardware is priced from a{" "}
                            <span className="font-medium text-slate-900">
                                transparent bill of materials (BOM)
                            </span>{" "}
                            plus assembly, then a project fee for firmware and software.
                        </p>
                        <p className="max-w-2xl text-[11px] leading-relaxed text-slate-500">
                            As a rough guide: an ESP32 node with PIR, camera, and enclosure is
                            typically in the{" "}
                            <span className="font-medium text-slate-900">
                                €40–€90 parts range
                            </span>{" "}
                            per unit (ESP32, PIR, camera, connectors, case), while a Raspberry&nbsp;Pi hub
                            often lands around{" "}
                            <span className="font-medium text-slate-900">
                                €60–€120 in parts
                            </span>
                            .
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Pilot kit (1–2 rooms)
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For testing in a single space
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                1 hub (Pi or similar) plus 2–4 nodes (motion / door / temp /
                                camera), simple dashboard, and alert flow. Good for trying the
                                stack before expanding.
                            </p>
                            <p className="mt-4 text-xs text-slate-600">
                                Project fee{" "}
                                <span className="font-medium text-slate-900">
                                    from €1,500–€3,000
                                </span>{" "}
                                + hardware at cost (typically €300–€800 for a small pilot).
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Apartment / small site
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For homes, studios &amp; small offices
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                1–2 hubs plus 6–12 nodes across rooms, corridors, and entry
                                points. Includes custom views for rooms/sites, device health, and
                                basic admin tools.
                            </p>
                            <p className="mt-4 text-xs text-slate-600">
                                Project fee{" "}
                                <span className="font-medium text-slate-900">
                                    from €4,000–€10,000
                                </span>{" "}
                                depending on UI and integrations + hardware based on BOM.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Custom hardware / roll-out
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For repeated setups or small runs
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Help refining the design for a repeatable kit: BOM, wiring
                                diagrams, firmware updates, and per-unit assembly guidelines. We
                                can coordinate with a manufacturer if needed.
                            </p>
                            <p className="mt-4 text-xs text-slate-600">
                                <span className="font-medium text-slate-900">
                                    Custom quote
                                </span>{" "}
                                based on unit count, sensors, and assembly. Focus on keeping
                                each unit affordable and maintainable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA BAR */}
                <section>
                    <div className="flex flex-col gap-3 rounded-[999px] border border-slate-300 bg-white px-6 py-4 text-sm md:flex-row md:items-center md:justify-between md:px-8">
                        <div>
                            <p className="text-[0.95rem] font-semibold text-slate-900">
                                Ready to sketch a hardware setup?
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                Share what you want to sense or control, how many rooms or sites,
                                and any constraints (power, network, privacy). You&apos;ll get a
                                simple plan, BOM estimate, and price range.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-white hover:bg-slate-800"
                            >
                                Talk to Aurillia about hardware
                                <span className="ml-2 text-sm">↗</span>
                            </a>
                            <a
                                href="/aur/overview"
                                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-800 hover:bg-slate-50"
                            >
                                Open Aurillia overview
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
