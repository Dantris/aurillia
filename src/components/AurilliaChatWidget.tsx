// src/components/AurilliaChatWidget.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
    role: "user" | "assistant";
    content: string;
};

type AssistantMeta = {
    intent?: string;
    stage?: "greeting" | "discovery" | "scoping" | "proposal" | "handoff" | string;
    links?: string[];
};

const QUICK_OPTIONS = [
    { label: "Website", text: "Ich möchte eine moderne Website bauen.", intent: "web" },
    { label: "App", text: "Ich möchte eine mobile App entwickeln.", intent: "mobile" },
    { label: "AI-Feature", text: "Ich möchte ein AI-Feature oder einen Chatbot integrieren.", intent: "ai" },
    { label: "Beratung", text: "Ich brauche erstmal technische Beratung.", intent: "other" }
];

const LINK_LABELS: Record<string, string> = {
    "/services/web": "Mehr zu Webprojekten",
    "/services/mobile": "Mehr zu Mobile Apps",
    "/services/ai": "Mehr zu AI & Automation",
    "/aurillia-home": "Aurillia Home (Security)",
    "/contact": "Kontakt aufnehmen"
};

export default function AurilliaChatWidget() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hey, ich bin der Aurillia Assistent. Was möchtest du bauen oder verbessern? Website, App, AI-Feature oder etwas anderes?"
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState<AssistantMeta | null>(null);

    async function sendMessageText(text: string) {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        const updatedMessages: Message[] = [
            ...messages,
            { role: "user", content: trimmed }
        ];

        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/aurillia-assistant", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                })
            });

            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [
                    ...prev,
                    { role: "assistant", content: data.reply as string }
                ]);
                setMeta({
                    intent: data.intent,
                    stage: data.stage,
                    links: data.links || []
                });
            } else if (data.error) {
                setMessages(prev => [
                    ...prev,
                    {
                        role: "assistant",
                        content:
                            "Da ist etwas schiefgelaufen. Versuch es bitte gleich noch einmal."
                    }
                ]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Ich konnte gerade keine Antwort erzeugen. Versuch es bitte später noch einmal."
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await sendMessageText(input);
    }

    function handleQuickOption(text: string) {
        void sendMessageText(text);
    }

    function handleLinkClick(link: string) {
        setOpen(false);
        // simple: let Next.js handle navigation
        router.push(link);
    }

    const showQuickOptions =
        !loading &&
        messages.length <= 3 && // initial phase
        (!meta || meta.stage === "greeting" || meta.stage === "discovery");

    return (
        <div className="fixed bottom-5 right-5 z-40">
            {open && (
                <div className="mb-3 w-80 max-h-[460px] rounded-3xl border border-default bg-surface/95 text-sm text-foreground shadow-xl shadow-black/40 backdrop-blur-md flex flex-col overflow-hidden">
                    {/* header */}
                    <div className="px-4 py-3 border-b border-default flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-[0.25em] text-muted">
                                Aurillia
                            </span>
                            <span className="text-xs font-medium text-foreground">
                                Dev Assistant
                            </span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-default bg-elev hover:bg-elev/80 text-xs text-muted"
                        >
                            ✕
                        </button>
                    </div>

                    {/* messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`rounded-2xl px-3 py-2 max-w-[80%] text-xs leading-relaxed whitespace-pre-wrap transition-transform duration-150 ${m.role === "user"
                                            ? "bg-emerald-500 text-slate-950"
                                            : "bg-elev text-foreground border border-default/60"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex items-center gap-2 text-[11px] text-muted pt-1">
                                <span className="h-1 w-1 rounded-full bg-muted animate-pulse" />
                                <span>Der Assistent denkt kurz nach …</span>
                            </div>
                        )}

                        {/* Quick options in early stage */}
                        {showQuickOptions && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {QUICK_OPTIONS.map(option => (
                                    <button
                                        key={option.label}
                                        type="button"
                                        onClick={() => handleQuickOption(option.text)}
                                        className="rounded-full border border-default bg-elev px-3 py-1 text-[11px] text-muted hover:border-emerald-500 hover:text-foreground hover:bg-elev/80 transition-colors"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Links suggested by the assistant */}
                        {meta?.links && meta.links.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {meta.links.map(link => (
                                    <button
                                        key={link}
                                        type="button"
                                        onClick={() => handleLinkClick(link)}
                                        className="rounded-full border border-default bg-transparent px-3 py-1 text-[11px] text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 transition-colors"
                                    >
                                        {LINK_LABELS[link] ?? link}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* input */}
                    <form
                        onSubmit={handleSubmit}
                        className="border-t border-default px-3 py-2 flex gap-2 items-center bg-surface"
                    >
                        <input
                            className="flex-1 bg-elev rounded-full px-3 py-1.5 text-xs outline-none border border-default focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 placeholder:text-muted"
                            placeholder="Kurze Beschreibung deines Projekts"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-medium text-slate-950 shadow-sm shadow-emerald-500/40 disabled:opacity-60"
                        >
                            Senden
                        </button>
                    </form>
                </div>
            )}

            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/40 border border-emerald-400/70 hover:bg-emerald-400"
                >
                    <span className="h-2 w-2 rounded-full bg-emerald-900" />
                    Chat mit Aurillia
                </button>
            )}
        </div>
    );
}
