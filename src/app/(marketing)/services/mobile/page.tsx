// src/app/(marketing)/mobile/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile Apps — Aurillia",
    description:
        "Cross-platform mobile apps and PWAs for products, teams, and on-site workflows. One codebase, iOS, Android and web.",
};

export default function Page() {
    return (
        <main className="bg-[#f5f5f6] text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 space-y-20">
                {/* HERO */}
                <section className="space-y-10">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[0.75rem] font-medium">
                            02
                        </span>
                        <span className="uppercase tracking-[0.22em]">
                            Services · Mobile
                        </span>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
                        <div>
                            <h1 className="text-[2.7rem] leading-[1.02] font-semibold tracking-tight md:text-[3.1rem]">
                                Mobile apps that feel native and ship fast.
                            </h1>
                            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-slate-600">
                                Aurillia designs and builds cross-platform apps with React
                                Native, Expo, or high-quality PWAs. One codebase, iOS and
                                Android, with the right hooks into your backend, hardware, or
                                AI stack.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-[0.8rem] text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    React Native / Expo &amp; PWAs
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Auth, push, offline-first flows
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    App Store &amp; Play Store ready
                                </span>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-3 text-base">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                                >
                                    Talk about a mobile app
                                    <span className="ml-2 text-sm">↗</span>
                                </a>
                                <span className="text-[0.9rem] text-slate-500">
                                    Tell us what the app should do&mdash;customer-facing,
                                    internal tool, or something for your hardware.
                                </span>
                            </div>
                        </div>

                        <aside className="space-y-4 border-l border-slate-200 pl-5 md:pl-8 text-sm leading-relaxed text-slate-600">
                            <div>
                                <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                                    Typical engagement
                                </p>
                                <p className="mt-2">
                                    A team with a product already in use (or close to MVP) that
                                    needs a{" "}
                                    <span className="font-medium text-slate-900">
                                        focused, reliable mobile companion
                                    </span>
                                    &mdash;not a bloated all-in-one.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    • Duration:{" "}
                                    <span className="font-medium text-slate-900">4–10 weeks</span>
                                </p>
                                <p>
                                    • Platforms:{" "}
                                    <span className="font-medium text-slate-900">
                                        iOS, Android, and/or PWA
                                    </span>
                                </p>
                                <p>
                                    • Use cases: customer apps, field / staff tools, hardware
                                    control, dashboards, or simple internal workflows.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* WHAT YOU GET */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.5rem] font-semibold tracking-tight">
                            What we bring to a mobile project
                        </h2>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                            From UX flows to deployment, you get a clear stack, not a science
                            experiment. We focus on the parts that make your app feel fast,
                            trustworthy, and easy to iterate on.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <p className="text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                01 · Product &amp; UX
                            </p>
                            <h3 className="text-base font-medium text-slate-900">
                                Flows designed around real use
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                We start with the jobs your app needs to do: booking, scanning,
                                monitoring, reporting, or controlling hardware. Screens and
                                navigation follow from that.
                            </p>
                            <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600">
                                <li>• Light UX mapping and wireframes</li>
                                <li>• States for offline, errors, and edge cases</li>
                                <li>• Design system that matches your brand</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                02 · Engineering
                            </p>
                            <h3 className="text-base font-medium text-slate-900">
                                One codebase, native-feeling app
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                React Native / Expo or a robust PWA, depending on your
                                distribution and budget. Clean architecture, typed APIs, and
                                logging so you&apos;re not flying blind.
                            </p>
                            <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600">
                                <li>• Auth, push notifications, deep links</li>
                                <li>• Offline-first where it matters</li>
                                <li>• API integration with your backend or a new one</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                03 · Launch &amp; lifecycle
                            </p>
                            <h3 className="text-base font-medium text-slate-900">
                                Store-ready and maintainable
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                We don&apos;t disappear after “it runs on my phone”. You get
                                help with store submissions, release channels, and a sane plan
                                for updates.
                            </p>
                            <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600">
                                <li>• App Store / Play Store setup and updates</li>
                                <li>• Release channels and OTA updates (Expo)</li>
                                <li>• Monitoring, crash reporting, and handover</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FIT / NOT FIT */}
                <section className="space-y-6">
                    <div className="grid gap-10 md:grid-cols-2">
                        <div className="space-y-3">
                            <h2 className="text-base font-medium text-slate-900">
                                A good match if you&apos;re…
                            </h2>
                            <div className="h-px w-10 bg-slate-300" />
                            <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                                <li>
                                    • Running a product or service that would genuinely benefit
                                    from being in your users&apos; pocket.
                                </li>
                                <li>
                                    • Needing a clean, reliable companion app for your web app or
                                    hardware (sensors, hubs, devices).
                                </li>
                                <li>
                                    • Looking for a single small team to handle UX, build, and
                                    launch&mdash;not five vendors.
                                </li>
                                <li>
                                    • Happy to start focused and add more in future releases.
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-base font-medium text-slate-900">
                                Probably not the best fit if…
                            </h2>
                            <div className="h-px w-10 bg-slate-300" />
                            <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
                                <li>
                                    • You mainly want a game or heavy 3D experience&mdash;that
                                    needs a different stack.
                                </li>
                                <li>
                                    • You expect a fully-staffed product team available every day.
                                    Aurillia is intentionally small and focused.
                                </li>
                                <li>
                                    • You&apos;re exploring a pure idea with no budget yet.
                                    We&apos;re a better fit once there&apos;s a real project.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* STARTING POINTS / PRICING SHAPES */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.5rem] font-semibold tracking-tight">
                            Typical starting points
                        </h2>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                            Exact pricing depends on scope and integrations. These ranges keep
                            expectations realistic&mdash;you&apos;ll get a fixed quote once
                            we&apos;ve seen your product and content.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-base font-medium text-slate-900">
                                Companion / MVP app
                            </h3>
                            <p className="mt-1 text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                For early-stage products
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                A focused mobile companion to an existing web app or service.
                                Core flows only, simple UI, analytics and crash reporting wired
                                in.
                            </p>
                            <p className="mt-4 text-base font-medium text-slate-900">
                                From ~€8–15k
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-base font-medium text-slate-900">
                                Operations / field tool
                            </h3>
                            <p className="mt-1 text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                For teams &amp; on-site work
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Staff-facing app for checklists, inspections, on-site data
                                capture, or hardware control. Offline-first where needed,
                                integrations with your existing systems.
                            </p>
                            <p className="mt-4 text-base font-medium text-slate-900">
                                From ~€15–30k
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-base font-medium text-slate-900">
                                Full product app
                            </h3>
                            <p className="mt-1 text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                For customer-facing products
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                A polished, store-ready app with richer UX, multiple user roles,
                                and deeper integrations or AI features. Scoped and priced as a
                                product build.
                            </p>
                            <p className="mt-4 text-base font-medium text-slate-900">
                                Custom quote (typically €30k+)
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA BAR */}
                <section>
                    <div className="flex flex-col gap-3 rounded-[999px] border border-slate-300 bg-white px-6 py-4 text-base md:flex-row md:items-center md:justify-between md:px-8">
                        <div>
                            <p className="text-[1.05rem] font-semibold text-slate-900">
                                Thinking about a mobile app?
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                Share what the app should do, who it&apos;s for, and whether it
                                needs to talk to your web app, hardware, or AI stack. You&apos;ll
                                get a short proposal with options and a fixed price range.
                            </p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Talk to Aurillia about a mobile project
                            <span className="ml-2 text-sm">↗</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
