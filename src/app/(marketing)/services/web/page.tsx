// src/app/(marketing)/services/web/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Web Development — Aurillia",
    description:
        "Calm, product-focused websites built with Next.js. Clear story, fast load times, and a codebase you actually own.",
};

export default function Page() {
    return (
        <main className="bg-[#f5f5f6] text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 space-y-20">
                {/* HERO */}
                <section className="space-y-10">
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[0.75rem] font-medium">
                            01
                        </span>
                        <span className="uppercase tracking-[0.22em]">Services · Web</span>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
                        <div>
                            <h1 className="text-[2.7rem] leading-[1.02] font-semibold tracking-tight md:text-[3.1rem]">
                                Web development for products, not just pages.
                            </h1>
                            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-slate-600">
                                Aurillia builds calm, fast websites on Next.js for founders,
                                studios, and small teams. Think clear story, sharp layout, and
                                a build that&apos;s easy to extend when your product grows.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-[0.8rem] text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Next.js + TypeScript
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Performance &amp; Core Web Vitals
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    SEO, analytics &amp; forms wired in
                                </span>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-3 text-base">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                                >
                                    Talk about a web project
                                    <span className="ml-2 text-sm">↗</span>
                                </a>
                                <span className="text-[0.9rem] text-slate-500">
                                    Prefer async? You can also start in the chat and send a short
                                    brief.
                                </span>
                            </div>
                        </div>

                        <aside className="space-y-4 border-l border-slate-200 pl-5 md:pl-8 text-sm leading-relaxed text-slate-600">
                            <div>
                                <p className="text-[0.75rem] font-medium uppercase tracking-[0.22em] text-slate-500">
                                    Typical engagement
                                </p>
                                <p className="mt-2">
                                    A small product team or founder with a real product and a site
                                    that&apos;s either{" "}
                                    <span className="font-medium text-slate-900">
                                        not there yet,
                                    </span>{" "}
                                    or hard to maintain.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    • Duration:{" "}
                                    <span className="font-medium text-slate-900">2–6 weeks</span>
                                </p>
                                <p>
                                    • Deliverables:{" "}
                                    <span className="font-medium text-slate-900">
                                        production-ready site, repo, and handover
                                    </span>
                                </p>
                                <p>
                                    • Tech: Next.js, TypeScript, Tailwind, headless CMS, your
                                    choice of hosting.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* WHAT YOU GET */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.5rem] font-semibold tracking-tight">
                            What you get when we build your site
                        </h2>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                            Three layers that make the site feel like a product, not a
                            template: the technical base, content tools, and the glue to your
                            stack.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <p className="text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                01 · Foundation
                            </p>
                            <h3 className="text-base font-medium text-slate-900">
                                Modern, fast build
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                Next.js, TypeScript and a design system that behaves. Good
                                defaults for speed, accessibility and long-term maintainability.
                            </p>
                            <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600">
                                <li>• Green Core Web Vitals as a goal</li>
                                <li>• Fully responsive layouts</li>
                                <li>• Accessible components and patterns</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                02 · Content &amp; SEO
                            </p>
                            <h3 className="text-base font-medium text-slate-900">
                                A CMS you can live with
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                Headless CMS (Sanity, Contentful, headless WP, etc) tailored to
                                your structure. SEO baked into the components, not added later.
                            </p>
                            <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600">
                                <li>• Pages, sections, blog, docs &amp; case studies</li>
                                <li>• Per-page titles, meta and OG cards</li>
                                <li>• Analytics and events to your tools</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                03 · Integrations
                            </p>
                            <h3 className="text-base font-medium text-slate-900">
                                Connected to your stack
                            </h3>
                            <p className="text-sm leading-relaxed text-slate-600">
                                Contact and project flows that actually land in your CRM, inbox,
                                or automation. Optional AI helpers if we build those with you.
                            </p>
                            <ul className="mt-2 space-y-1 text-[0.8rem] text-slate-600">
                                <li>• Lead + project request flows</li>
                                <li>• Integrations with tools you already use</li>
                                <li>• Optional AI FAQ / lead triage / support</li>
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
                                    • A founder or small team with a product that needs a site
                                    that finally feels “right”.
                                </li>
                                <li>
                                    • On a slow, fragile site where publishing a new page is scary.
                                </li>
                                <li>
                                    • Planning to add docs, a small app view, or AI flows later.
                                </li>
                                <li>
                                    • Happy to invest once in a solid base instead of redesigning
                                    every year.
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
                                    • You just need a €50 template with your logo and a few text
                                    changes.
                                </li>
                                <li>
                                    • You want to migrate a huge legacy CMS 1:1 with all edge
                                    cases.
                                </li>
                                <li>
                                    • You need a full in-house team on call every day. Aurillia is
                                    intentionally small and focused.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* STARTING POINTS */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.5rem] font-semibold tracking-tight">
                            Typical starting points
                        </h2>
                        <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                            Exact pricing depends on scope and content. These shapes keep
                            things concrete &mdash; you&apos;ll get a fixed quote before we
                            start.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-base font-medium text-slate-900">
                                Launch page
                            </h3>
                            <p className="mt-1 text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                For new products or features
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                A focused landing page with clear story, strong hero, basic SEO
                                and a lead capture flow.
                            </p>
                            <p className="mt-4 text-base font-medium text-slate-900">
                                From €X,XXX
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-base font-medium text-slate-900">
                                Marketing site + CMS
                            </h3>
                            <p className="mt-1 text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                For small teams &amp; studios
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                4–8 pages (Home, Product, Pricing, About, Contact, etc.) plus a
                                blog or case studies section you can update yourself.
                            </p>
                            <p className="mt-4 text-base font-medium text-slate-900">
                                From €Y,YYY
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-base font-medium text-slate-900">
                                Product + docs + integrations
                            </h3>
                            <p className="mt-1 text-[0.75rem] uppercase tracking-[0.22em] text-slate-500">
                                For tools &amp; platforms
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                Marketing site plus product docs, simple dashboards or account
                                views, and deeper integrations or AI helpers.
                            </p>
                            <p className="mt-4 text-base font-medium text-slate-900">
                                Custom quote
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA BAR – VERY CLEAR */}
                <section>
                    <div className="flex flex-col gap-3 rounded-[999px] border border-slate-300 bg-white px-6 py-4 text-base md:flex-row md:items-center md:justify-between md:px-8">
                        <div>
                            <p className="text-[1.05rem] font-semibold text-slate-900">
                                Ready to talk about your site?
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                Share a link to what you have (or a short brief if you&apos;re
                                starting from scratch). Aurillia will reply with a simple plan,
                                a rough timeline, and a fixed price range.
                            </p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Talk to Aurillia about a web project
                            <span className="ml-2 text-sm">↗</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
