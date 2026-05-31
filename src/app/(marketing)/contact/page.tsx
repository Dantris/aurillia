// src/app/(marketing)/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — Aurillia",
    description:
        "Tell us what you’re building. We’ll reply with next steps and options.",
};

// Next 15: searchParams is a Promise<Record<string, string | string[] | undefined>>
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ContactPage({
    searchParams,
}: { searchParams?: SearchParams }) {
    const sp = (await searchParams) ?? {};
    const raw = sp.sent;
    const sent = Array.isArray(raw) ? raw[0] === "1" : raw === "1";

    return (
        <main className="bg-surface border-b border-default">
            <section className="mx-auto max-w-3xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">07</span>
                    <span className="text-xs uppercase tracking-widest text-muted">Contact</span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Let’s talk</h1>
                <p className="mt-3 max-w-2xl text-muted">
                    Share a bit about your project. We’ll reply with a short plan and options.
                </p>

                {sent && (
                    <div role="status" aria-live="polite"
                        className="mt-6 rounded-xl border border-[color-mix(in_oklch,var(--accent)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent)_12%,transparent)] px-4 py-3 text-[15px]">
                        Thanks! Your message is in. We’ll get back to you shortly.
                    </div>
                )}

                <form action="/api/contact" method="POST"
                    className="mt-8 rounded-2xl border border-default bg-elev p-6">
                    {/* honeypot */}
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Name" htmlFor="name">
                            <input id="name" name="name" required
                                className="block w-full rounded-xl border border-default bg-surface px-4 py-2.5 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="Jane Doe" />
                        </Field>
                        <Field label="Email" htmlFor="email">
                            <input id="email" name="email" type="email" required
                                className="block w-full rounded-xl border border-default bg-surface px-4 py-2.5 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="you@company.com" />
                        </Field>
                        <Field label="Company (optional)" htmlFor="company">
                            <input id="company" name="company"
                                className="block w-full rounded-xl border border-default bg-surface px-4 py-2.5 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                                placeholder="Acme Co." />
                        </Field>
                        <Field label="Interested in" htmlFor="interest">
                            <select id="interest" name="interest"
                                className="block w-full rounded-xl border border-default bg-surface px-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]">
                                <option>Web Development</option>
                                <option>Mobile Apps</option>
                                <option>Full-Stack Systems</option>
                                <option>Hardware & IoT</option>
                                <option>Cloud & AWS</option>
                                <option>AI & Automation</option>
                            </select>
                        </Field>
                    </div>

                    <Field className="mt-4" label="Message" htmlFor="message">
                        <textarea id="message" name="message" rows={6} required
                            className="block w-full rounded-xl border border-default bg-surface px-4 py-3 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            placeholder="Tell us about the goal, timeline, and what success looks like." />
                    </Field>

                    <div className="mt-5 flex items-center justify-between gap-4">
                        <p className="text-sm text-muted">We usually respond within 1–2 business days.</p>
                        <button type="submit" className="pill-accent">Send message</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

function Field({
    label, htmlFor, children, className = "",
}: { label: string; htmlFor: string; children: React.ReactNode; className?: string }) {
    return (
        <label htmlFor={htmlFor} className={`block ${className}`}>
            <span className="mb-1.5 block text-sm text-muted">{label}</span>
            {children}
        </label>
    );
}
