import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cloud & AWS — Aurillia",
    description: "Migrations, hosting, and cost-efficient, secure setups.",
};

export default function Page() {
    return (
        <main className="border-b border-default bg-surface">
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">05</span>
                    <span className="text-xs uppercase tracking-widest text-muted">Services</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Cloud & AWS</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Practical cloud setups: secure, observable, and right-sized so you don’t overspend.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        "Hosting & migrations to AWS/Render/Vercel",
                        "CI/CD, backups, monitoring & alerting",
                        "Simple, secure networking (VPC, roles, secrets)",
                        "Cost-optimization & disaster recovery basics",
                    ].map((t) => (
                        <div key={t} className="rounded-xl border border-default bg-elev px-4 py-3 text-[15px]">{t}</div>
                    ))}
                </div>
            </section>
        </main>
    );
}
