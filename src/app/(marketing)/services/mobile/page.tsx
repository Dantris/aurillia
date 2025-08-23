import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mobile Apps — Aurillia",
    description: "iOS, Android, or PWA—built once, deployed everywhere.",
};

export default function Page() {
    return (
        <main className="border-b border-default bg-surface">
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">02</span>
                    <span className="text-xs uppercase tracking-widest text-muted">Services</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Mobile Apps</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Ship a single codebase to iOS/Android (or as a PWA). Great for customer apps, staff tools, or on-site checklists.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        "React Native / Expo or high-quality PWA",
                        "Auth, push notifications, offline-first flows",
                        "App Store / Play Store setup & updates",
                        "Connect to your existing backend or new APIs",
                    ].map((t) => (
                        <div key={t} className="rounded-xl border border-default bg-elev px-4 py-3 text-[15px]">{t}</div>
                    ))}
                </div>
            </section>
        </main>
    );
}
