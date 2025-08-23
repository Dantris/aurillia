// src/app/services/ai/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI & Automation — Aurillia",
    description: "Chatbots, assistants, and workflow automation that saves time.",
};

export default function AIPage() {
    return (
        <main className="border-b border-default bg-surface">
            <section className="mx-auto max-w-7xl px-6 py-16">
                <div className="mb-6 inline-flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-elev ring-1 ring-default text-sm">
                        06
                    </span>
                    <span className="text-xs uppercase tracking-widest text-muted">Services</span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">AI & Automation</h1>
                <p className="mt-4 max-w-2xl text-muted">
                    Start small: an assistant for FAQs, automatic quote drafts, or a workflow that files
                    emails into your system—no hype.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                        "Chat/FAQ assistants on your data",
                        "Lead triage, quote drafts, status updates",
                        "RAG pipelines with your docs/CRM",
                        "Human-in-the-loop review & logging",
                    ].map((t) => (
                        <div key={t} className="rounded-xl border border-default bg-elev px-4 py-3 text-[15px]">
                            {t}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
