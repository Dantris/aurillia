// src/app/services/cloud/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cloud & AWS — Aurillia",
    description: "Migrations, hosting, and cost-efficient, secure setups.",
};

export default function CloudPage() {
    return (
        <main className="bg-[#f5f5f6] text-slate-900">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 space-y-20">
                {/* HERO */}
                <section className="space-y-10">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-medium">
                            05
                        </span>
                        <span className="uppercase tracking-[0.22em]">
                            Services · Cloud &amp; AWS
                        </span>
                    </div>

                    <div className="grid gap-10 md:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)] md:items-start">
                        <div>
                            <h1 className="text-[2.5rem] leading-[1.05] font-semibold tracking-tight md:text-[2.8rem]">
                                Cloud &amp; AWS setups that stay boring (in a good way).
                            </h1>
                            <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-slate-600">
                                Aurillia designs and maintains practical cloud setups on AWS,
                                Vercel, or Render: secure by default, observable, and sized so
                                you&apos;re not burning money on idle resources.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3 text-[11px] text-slate-600">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    AWS, Vercel, Render
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    CI/CD, backups, observability
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    Cost &amp; security baselines
                                </span>
                            </div>

                            <div className="mt-9 flex flex-wrap gap-3 text-sm">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-medium text-white hover:bg-slate-800"
                                >
                                    Talk about a cloud setup
                                    <span className="ml-2 text-sm">↗</span>
                                </a>
                                <span className="text-[0.8rem] text-slate-500">
                                    Prefer async? Send a short outline or architecture diagram
                                    and we&apos;ll review it first.
                                </span>
                            </div>
                        </div>

                        <aside className="space-y-4 border-l border-slate-200 pl-5 md:pl-8 text-xs leading-relaxed text-slate-600">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
                                    Typical engagement
                                </p>
                                <p className="mt-2">
                                    A small product team with an app that&apos;s grown past
                                    &quot;single VPS&quot; and needs{" "}
                                    <span className="font-medium text-slate-900">
                                        proper environments, monitoring, and backups
                                    </span>{" "}
                                    without a huge DevOps department.
                                </p>
                            </div>
                            <div className="space-y-1.5">
                                <p>
                                    • Duration:{" "}
                                    <span className="font-medium text-slate-900">
                                        2–8 weeks
                                    </span>
                                </p>
                                <p>
                                    • Platforms:{" "}
                                    <span className="font-medium text-slate-900">
                                        AWS, Vercel, Render, Cloudflare
                                    </span>
                                </p>
                                <p>
                                    • Focus: environments, pipelines, observability, sensible
                                    security defaults, cost baselines.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* WHAT YOU GET */}
                <section className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-[1.35rem] font-semibold tracking-tight">
                            What you get when we set up your cloud
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
                            Think of it as three layers: the foundation (accounts &amp;
                            security), how you ship (CI/CD &amp; environments), and how you
                            run things day-to-day (monitoring &amp; costs).
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                01 · Foundation
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Clean accounts &amp; security
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                We untangle accounts, projects, and IAM so it&apos;s clear who
                                owns what. Secure defaults instead of ad-hoc permissions.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• AWS accounts, organizations, roles</li>
                                <li>• VPC basics, secrets management</li>
                                <li>• Baseline security posture &amp; backups</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                02 · Delivery
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Environments &amp; CI/CD that behave
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Your code goes from Git to staging to production the same way
                                every time, with config that&apos;s easy to understand.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• GitHub/GitLab pipelines wired to your stack</li>
                                <li>• Staging / preview environments</li>
                                <li>• Rollbacks and simple runbooks</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                03 · Operations
                            </p>
                            <h3 className="text-sm font-medium text-slate-900">
                                Observability &amp; cost sanity
                            </h3>
                            <p className="text-xs leading-relaxed text-slate-600">
                                Dashboards, alerts, and reports so you notice issues before
                                your users do—and know what the cloud bill is doing.
                            </p>
                            <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                                <li>• Metrics &amp; logs (CloudWatch, Grafana, etc.)</li>
                                <li>• Alerts that aren&apos;t just noise</li>
                                <li>• Cost dashboards &amp; right-sizing suggestions</li>
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
                                    • A team with a web or mobile product that&apos;s growing and
                                    starting to hit the limits of a single VPS or shared
                                    account.
                                </li>
                                <li>
                                    • Paying more than you&apos;d like for AWS / hosting and not
                                    sure what&apos;s actually used.
                                </li>
                                <li>
                                    • Missing basic things like staging, backups, or alerts that
                                    go to the right people.
                                </li>
                                <li>
                                    • Happy to keep day-to-day ops in-house, but want a solid
                                    baseline designed with you.
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
                                    • You&apos;re looking for the absolute cheapest contractor
                                    billing by the hour with no long-term view.
                                </li>
                                <li>
                                    • You need a 24/7 on-call SRE team across multiple regions
                                    and strict SLAs.
                                </li>
                                <li>
                                    • You want a pure lift-and-shift of a very large legacy
                                    system with dozens of teams involved.
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
                            We usually work on fixed project pricing. Most small cloud
                            projects land somewhere in the{" "}
                            <span className="font-medium text-slate-900">€3k–€15k</span> range
                            depending on scope, integrations, and compliance needs.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Infra review &amp; tidy-up
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For existing setups
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Short engagement to review your AWS / hosting setup, fix the
                                worst issues, and give you a clear list of next steps.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Account / IAM &amp; security review</li>
                                <li>• Cost + usage snapshot</li>
                                <li>• Actionable checklist &amp; call</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €2,500
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Product stack on AWS
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For SaaS &amp; internal tools
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                Design and implement a small but robust AWS setup for your app:
                                environments, CI/CD, monitoring, and docs.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Environments &amp; pipelines</li>
                                <li>• Monitoring, logging, alerts</li>
                                <li>• Runbook &amp; handover session</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €6,000–€12,000
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="text-sm font-medium text-slate-900">
                                Ongoing cloud &amp; DevOps care
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                                For teams that want backup
                            </p>
                            <p className="mt-3 text-xs leading-relaxed text-slate-600">
                                A small retainer for incremental improvements, updates, and
                                &quot;can you look at this metric?&quot; questions each month.
                            </p>
                            <ul className="mt-3 space-y-1 text-[11px] text-slate-600">
                                <li>• Reserved hours for changes</li>
                                <li>• Monthly cost &amp; health check-ins</li>
                                <li>• Priority async support</li>
                            </ul>
                            <p className="mt-4 text-sm font-medium text-slate-900">
                                From €800–€2,500 / month
                            </p>
                        </div>
                    </div>

                    <p className="text-[11px] text-slate-500">
                        Exact pricing depends on team size, regions, compliance, and how much
                        existing infra we&apos;re working with. After a short call or outline,
                        you get a fixed quote—not open-ended hourly billing.
                    </p>
                </section>

                {/* CTA BAR */}
                <section>
                    <div className="flex flex-col gap-3 rounded-[999px] border border-slate-300 bg-white px-6 py-4 text-sm md:flex-row md:items-center md:justify-between md:px-8">
                        <div>
                            <p className="text-[0.95rem] font-semibold text-slate-900">
                                Want a second pair of eyes on your cloud setup?
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                Send a short description of your stack (or a screenshot of your
                                AWS bill). Aurillia will come back with a quick assessment and
                                a suggested scope.
                            </p>
                        </div>
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium text-white hover:bg-slate-800"
                        >
                            Talk to Aurillia about cloud &amp; AWS
                            <span className="ml-2 text-sm">↗</span>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}
