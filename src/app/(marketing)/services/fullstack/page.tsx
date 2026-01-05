// src/app/services/fullstack/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Full-Stack Systems — Aurillia",
    description: "Booking, inventory, dashboards—apps that run your business.",
};

export default function Page() {
    return (
        <main className="bg-[#f5f5f6] text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 space-y-20">
                {/* HERO */}
                <section className="space-y-10">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-medium">
                            03
                        </span>
                        <span className="uppercase tracking-[0.22em]">
                            Services · Full-stack
                        </span>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
                        <div>
                            <h1 className="text-[2.5rem] leading-[1.05] font-semibold tracking-tight md:text-[2.8rem]">
                                Full-stack systems that match how you actually work.
                            </h1>
                            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-slate-600">
                                Aurillia designs and builds internal tools and customer
                                portals: booking, inventory, billing, dashboards, and
                                small apps that glue your process together—without
                                turning into a giant ERP project.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-[11px] text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Next.js · TypeScript · Postgres
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Auth, roles &amp; audit trails
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Dashboards, exports &amp; admin
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    APIs &amp; integrations
                                </span>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-3 text-sm">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-medium text-white hover:bg-slate-800"
                                >
                                    Talk about an internal tool
                                    <span className="ml-2 text-sm">↗</span>
                                </a>
                                <span className="text-[0.8rem] text-slate-500">
                                    Send a quick note about your process or current
                                    spreadsheets—no long brief needed.
                                </span>
                            </div>
                        </div>

                        <aside className="space-y-4 border-l border-slate-200 pl-5 md:pl-8 text-xs leading-relaxed text-slate-600">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                                    Typical engagement
                                </p>
                                <p className="mt-2">
                                    A team running key workflows on{" "}
                                    <span className="font-medium text-slate-900">
                                        spreadsheets, Notion, or a tangle of SaaS tools
                                    </span>{" "}
                                    that now needs one place to see what&apos;s going on
                                    and get work done.
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
                                    • Deliverables:{" "}
                                    <span className="font-medium text-slate-900">
                                        production-ready app, repo, docs &amp; handover
                                    </span>
                                </p>
                                <p>
                                    • Use cases: bookings, inventory, partner portals,
                                    billing, back-office dashboards, light CRM.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* WHAT YOU GET */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            What we build in a full-stack project
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            Not just a UI on top of a database, but the whole stack:
                            clear data model, flows that fit your process, and the
                            right hooks into your other tools.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                01 · Workflows &amp; UX
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Interfaces your team can actually use
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Screens built from ride-along notes, not just wireframes.
                                We optimize for the people who use this every day, not
                                just a pretty dashboard.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Booking / intake forms &amp; pipelines</li>
                                <li>• Day-to-day views for ops and support</li>
                                <li>• Exportable reports for finance &amp; leadership</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                02 · Data &amp; permissions
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Solid backend, clear roles
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Postgres + Prisma (or similar) with validation, history,
                                and the right constraints so your data stays trustworthy.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Auth, roles &amp; fine-grained permissions</li>
                                <li>• Audit trails on important actions</li>
                                <li>• Structured models that are easy to extend later</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                03 · Integrations
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Connected to the rest of your stack
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Your system plays nicely with the tools you already use:
                                billing, docs, messaging, and analytics.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Stripe, Paddle, or Mollie for payments</li>
                                <li>• Notion, Airtable, Slack, email providers</li>
                                <li>• APIs &amp; webhooks to integrate later systems</li>
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
                                    • Copy-pasting between tools and spreadsheets to keep
                                    track of customers, bookings, or stock.
                                </li>
                                <li>
                                    • Hitting the limits of generic tools like Airtable,
                                    Notion, or off-the-shelf CRMs.
                                </li>
                                <li>
                                    • Wanting something{" "}
                                    <span className="font-medium text-slate-900">
                                        opinionated but still extendable
                                    </span>{" "}
                                    instead of a huge, custom ERP.
                                </li>
                                <li>
                                    • Okay with a small, focused app that solves a few
                                    workflows really well.
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
                                    • You need a giant all-in-one system with dozens of
                                    teams and years of legacy processes.
                                </li>
                                <li>
                                    • You&apos;re mostly looking for a cheap time-tracking,
                                    CRM, or ticketing tool—those already exist.
                                </li>
                                <li>
                                    • You expect a full on-call team and 24/7 SLAs. Aurillia
                                    is intentionally small and focused.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* STARTING POINTS / PRICING */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            Typical starting points
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            Most full-stack projects land between{" "}
                            <span className="font-medium text-slate-900">
                                €5,000–€25,000
                            </span>{" "}
                            depending on number of screens, roles, and integrations.
                            Everything is quoted as a fixed project, not open-ended
                            hourly billing.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Single workflow / mini-app
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For one painful process
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Replace one gnarly spreadsheet or form with a small app:
                                clear inputs, validation, and a simple dashboard for your
                                team.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• 2–4 core screens</li>
                                <li>• Basic auth &amp; roles</li>
                                <li>• Exports / simple reports</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €5,000
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Operations dashboard / portal
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For teams &amp; partners
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                A multi-role app for your internal team and/or partners:
                                bookings, inventory, customer history, and exports.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• 6–12 screens &amp; flows</li>
                                <li>• Roles, permissions &amp; audit log</li>
                                <li>• 1–2 key integrations (e.g. Stripe, Slack)</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €10,000–€20,000
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                System + integrations bundle
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For product-adjacent tools
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                A more involved build that ties into your product backend,
                                billing, and analytics—often alongside a new marketing
                                site or mobile app.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Rich data model &amp; multi-step flows</li>
                                <li>• Several external integrations / APIs</li>
                                <li>• Handover, docs &amp; technical map</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                Custom quote (typically €18k+)
                            </p>
                        </div>
                    </div>

                    <p className="text-[11px] text-slate-500">
                        Prices above are ballparks so you can self-select. Once we see
                        your workflow and tools, you&apos;ll get a short proposal with
                        scope, milestones, and a fixed price.
                    </p>
                </section>

                {/* CTA BAR */}
                <section>
                    <div className="flex flex-col gap-3 rounded-[999px] border border-slate-300 bg-white px-6 py-4 text-sm md:flex-row md:items-center md:justify-between md:px-8">
                        <div>
                            <p className="text-[0.95rem] font-semibold text-slate-900">
                                Have a workflow that deserves its own tool?
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                Describe how you work today (or send a screenshot of your
                                spreadsheet). Aurillia will reply with a suggested scope,
                                a rough timeline, and a price range.
                            </p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-white hover:bg-slate-800"
                        >
                            Talk to Aurillia about a full-stack system
                            <span className="ml-2 text-sm">↗</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
