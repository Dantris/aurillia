import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Full-Stack Systems — Aurillia",
    description: "Booking, inventory, dashboards—apps that run your business.",
};

export default function Page() {
    return (
        <main className="border-b border-default bg-surface">
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">03</span>
                    <span className="text-xs uppercase tracking-widest text-muted">Services</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Full-Stack Systems</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Internal tools and customer portals that actually fit your process: booking, inventory, billing, dashboards, and more.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        "Next.js apps with Postgres/Prisma",
                        "Auth, roles/permissions, audit trails",
                        "Admin dashboards & exports",
                        "Integrations: Stripe, Notion, Slack, Xero, etc.",
                    ].map((t) => (
                        <div key={t} className="rounded-xl border border-default bg-elev px-4 py-3 text-[15px]">{t}</div>
                    ))}
                </div>
            </section>
        </main>
    );
}
