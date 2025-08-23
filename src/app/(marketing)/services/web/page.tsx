import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Web Development — Aurillia",
    description: "Fast, modern websites that rank, convert, and are easy to update.",
};

export default function Page() {
    return (
        <main className="border-b border-default bg-surface">
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">01</span>
                    <span className="text-xs uppercase tracking-widest text-muted">Services</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Web Development</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    We build fast, maintainable websites that look great and bring customers in—without locking you into complex tools.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        "Next.js sites with great Lighthouse scores",
                        "CMS you can actually use (Sanity/Contentful/Headless WP)",
                        "SEO, analytics, forms, and basic automations included",
                        "Accessibility & responsive by default",
                    ].map((t) => (
                        <div key={t} className="rounded-xl border border-default bg-elev px-4 py-3 text-[15px]">{t}</div>
                    ))}
                </div>

                <div className="mt-8 rounded-2xl border border-default bg-elev p-6">
                    <h2 className="text-lg font-medium">Good fit for</h2>
                    <ul className="mt-2 list-disc pl-5 text-muted">
                        <li>New businesses that need a site that actually converts</li>
                        <li>Established sites that are slow, dated, or hard to edit</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
