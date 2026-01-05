// src/app/services/ai/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI & Automation — Aurillia",
    description:
        "Assistants, copilots, and workflow automation that save time instead of adding noise.",
};

export default function AIPage() {
    return (
        <main className="bg-[#f5f5f6] text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 space-y-20">
                {/* HERO */}
                <section className="space-y-10">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-medium">
                            06
                        </span>
                        <span className="uppercase tracking-[0.22em]">
                            Services · AI &amp; Automation
                        </span>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
                        <div>
                            <h1 className="text-[2.6rem] leading-[1.05] font-semibold tracking-tight md:text-[2.9rem]">
                                AI that helps your team work faster, not harder.
                            </h1>
                            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-slate-600">
                                Aurillia designs assistants and automations around your actual
                                workflows: FAQs on your docs, lead triage plugged into your CRM,
                                small copilots that prepare drafts for humans to approve. No
                                vague &quot;AI platform&quot;—just focused tools that save time.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-[11px] text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Chat &amp; FAQ on your data
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Lead &amp; support triage
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Workflow automation &amp; copilots
                                </span>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-3 text-sm">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-medium text-white hover:bg-slate-800"
                                >
                                    Talk about an AI project
                                    <span className="ml-2 text-sm">↗</span>
                                </a>
                                <span className="text-[0.8rem] text-slate-500">
                                    Or start in the chat with a short description of your workflow.
                                </span>
                            </div>
                        </div>

                        <aside className="space-y-4 border-l border-slate-200 pl-5 md:pl-8 text-xs leading-relaxed text-slate-600">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                                    Typical engagement
                                </p>
                                <p className="mt-2">
                                    A founder or ops lead with{" "}
                                    <span className="font-medium text-slate-900">
                                        repeatable tasks
                                    </span>{" "}
                                    such as support questions, quote preparation, or status
                                    updates—usually spread across email, docs, and tools.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    • Duration:{" "}
                                    <span className="font-medium text-slate-900">3–8 weeks</span>
                                </p>
                                <p>
                                    • Deliverables:{" "}
                                    <span className="font-medium text-slate-900">
                                        working assistant / automations, evals, and a simple admin
                                        view or logs
                                    </span>
                                </p>
                                <p>
                                    • Tech: OpenAI API, vector search, your CRM/helpdesk,
                                    Zapier/Make or custom backend—whatever fits best.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* WHAT WE USUALLY BUILD */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            What we usually build with AI
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            Small, focused assistants and flows that plug into tools you already
                            use—so your team can trust the output and stay in control.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                01 · Assistants
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Chat &amp; FAQ on your content
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                A chatbot that actually knows your docs, pricing, and policies—
                                with good guardrails and a clear tone of voice.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Trained on your docs, site, and knowledge base</li>
                                <li>• Clear &quot;I don&apos;t know&quot; behaviour</li>
                                <li>• Optional human handoff to email or ticketing</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                02 · Copilots
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Drafts for humans to approve
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Little helpers that prepare the boring part: draft replies,
                                summaries, and first versions your team can tweak and send.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Lead &amp; support reply suggestions</li>
                                <li>• Call / meeting summaries into your CRM</li>
                                <li>• Quote or proposal skeletons from a simple form</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                03 · Automation
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Glue between your tools
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Workflows that move data between tools, categorise things, and
                                keep your team&apos;s view of reality up to date.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Routing leads &amp; tickets by topic or priority</li>
                                <li>• Classifying feedback, reviews, or NPS comments</li>
                                <li>• Syncing summaries into Notion, HubSpot, Linear, etc.</li>
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
                                    • A founder or team lead with clear, repeatable workflows that
                                    already work—just slowly.
                                </li>
                                <li>
                                    • Happy to keep a human in the loop for important decisions,
                                    at least at first.
                                </li>
                                <li>
                                    • Using tools like Notion, HubSpot, Linear, Jira, or Help Scout
                                    and want them to talk to each other.
                                </li>
                                <li>
                                    • Looking for one or two concrete wins, not an all-in-one
                                    &quot;AI transformation&quot; project.
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
                                    • You just want a generic chatbot widget with no integration or
                                    guardrails.
                                </li>
                                <li>
                                    • You’re hoping to replace your entire team with AI
                                    immediately.
                                </li>
                                <li>
                                    • You need a massive data-science project or research team.
                                    Aurillia focuses on product-y, applied use cases.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* STARTING POINTS */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            Typical starting points
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            Exact pricing depends on scope, data sources, and integrations. These
                            shapes keep things concrete—you&apos;ll get a fixed quote before we
                            start.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                FAQ / support assistant
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For sites &amp; help centers
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Chat widget or assistant trained on your docs, pricing, and
                                policies with clear guardrails and escalation paths.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Up to a few data sources (site, docs, PDFs)</li>
                                <li>• Basic analytics &amp; feedback loop</li>
                                <li>• Optional handoff to email or ticketing</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €3,000–€6,000
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Lead &amp; sales copilot
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For sales &amp; founder-led teams
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Helper that qualifies leads, prepares reply drafts, and keeps your
                                CRM tidy with summaries and next steps.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Integrates with your CRM or email</li>
                                <li>• Lead scoring / routing rules</li>
                                <li>• Human-in-the-loop approval flows</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €5,000–€10,000
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Internal workflow automation
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For ops, support &amp; product
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Custom flows that classify, summarise, or sync data between your
                                tools, plus a small admin view for logs and overrides.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Connects 2–4 systems you already use</li>
                                <li>• Clear error handling &amp; fallbacks</li>
                                <li>• Monitoring and basic evaluations</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €8,000–€20,000
                            </p>
                        </div>
                    </div>

                    <p className="text-[11px] text-slate-500">
                        Model usage (tokens, API calls, hosting) is billed at cost, with soft
                        limits and alerts agreed up front.
                    </p>
                </section>

                {/* CTA BAR */}
                <section>
                    <div className="flex flex-col gap-3 rounded-[999px] border border-slate-300 bg-white px-6 py-4 text-sm md:flex-row md:items-center md:justify-between md:px-8">
                        <div>
                            <p className="text-[0.95rem] font-semibold text-slate-900">
                                Have a workflow you&apos;d like to automate?
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                Describe what your team does today (tools, steps, examples).
                                Aurillia will reply with one or two concrete AI ideas, a rough
                                timeline, and a price range.
                            </p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-white hover:bg-slate-800"
                        >
                            Talk to Aurillia about AI &amp; automation
                            <span className="ml-2 text-sm">↗</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
