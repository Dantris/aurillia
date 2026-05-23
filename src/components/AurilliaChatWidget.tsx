"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { localeFromPathname, localizedPath, stripLocale, type Locale } from "@/lib/i18n";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AssistantMeta = {
  intent?: string;
  stage?: "greeting" | "discovery" | "scoping" | "proposal" | "handoff" | string;
  links?: string[];
};

const CHAT_COPY: Record<
  Locale,
  {
    title: string;
    greeting: string;
    close: string;
    thinking: string;
    placeholder: string;
    send: string;
    launcher: string;
    genericError: string;
    unavailableError: string;
    quickOptions: { label: string; text: string }[];
    linkLabels: Record<string, string>;
  }
> = {
  de: {
    title: "Projektassistent",
    greeting:
      "Hallo, ich bin der Aurillia-Assistent. Erzählen Sie kurz, was Sie bauen oder verbessern möchten, und ich helfe, einen sinnvollen ersten Schritt zu formen.",
    close: "Chat schließen",
    thinking: "Denkt nach",
    placeholder: "Projekt beschreiben",
    send: "Senden",
    launcher: "Aurillia fragen",
    genericError:
      "Etwas ist schiefgelaufen. Versuchen Sie es gleich erneut oder nutzen Sie das Kontaktformular.",
    unavailableError:
      "Ich konnte gerade keine Antwort erzeugen. Die Kontaktseite ist weiterhin verfügbar.",
    quickOptions: [
      { label: "Website", text: "Ich möchte meine Unternehmenswebsite verbessern oder neu aufbauen." },
      { label: "Mobile App", text: "Ich möchte eine mobile App für mein Produkt oder meinen Ablauf prüfen." },
      { label: "KI-Assistent", text: "Ich möchte einen KI-Chatbot oder Assistenten auf meiner Website ergänzen." },
      { label: "Noch unsicher", text: "Ich brauche Hilfe dabei, den richtigen ersten Schritt zu finden." },
    ],
    linkLabels: {
      "/services/web": "Webentwicklung",
      "/services/mobile": "Mobile Apps",
      "/contact": "Kontakt",
    },
  },
  en: {
    title: "Project assistant",
    greeting:
      "Hi, I’m the Aurillia assistant. Tell me what you want to build or improve, and I’ll help shape a sensible first step.",
    close: "Close chat",
    thinking: "Thinking",
    placeholder: "Describe the project",
    send: "Send",
    launcher: "Ask Aurillia",
    genericError: "Something went wrong. Try again in a moment, or use the contact form.",
    unavailableError: "I couldn’t generate a reply right now. The contact page is still available.",
    quickOptions: [
      { label: "Website", text: "I want to improve or rebuild my company website." },
      { label: "Mobile app", text: "I want to explore a mobile app for my product or workflow." },
      { label: "AI assistant", text: "I want to add an AI chatbot or assistant to my website." },
      { label: "Not sure yet", text: "I need help deciding what the right first step is." },
    ],
    linkLabels: {
      "/services/web": "Web development",
      "/services/mobile": "Mobile apps",
      "/contact": "Contact",
    },
  },
};

export default function AurilliaChatWidget() {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedPathname = stripLocale(pathname ?? "/");
  const locale = localeFromPathname(pathname);
  const copy = CHAT_COPY[locale];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: copy.greeting,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<AssistantMeta | null>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", content: copy.greeting }]);
    setInput("");
    setMeta(null);
    setLoading(false);
  }, [copy.greeting]);

  async function sendMessageText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const updatedMessages: Message[] = [...messages, { role: "user", content: trimmed }];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/aurillia-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Aurillia-Chat": "1",
        },
        body: JSON.stringify({
          locale,
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
        setMeta({
          intent: data.intent,
          stage: data.stage,
          links: data.links || [],
        });
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: copy.genericError,
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: copy.unavailableError,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await sendMessageText(input);
  }

  function handleLinkClick(link: string) {
    setOpen(false);
    router.push(localizedPath(link, locale));
  }

  const showQuickOptions =
    !loading &&
    messages.length <= 3 &&
    (!meta || meta.stage === "greeting" || meta.stage === "discovery");

  if (["/contact", "/impressum", "/datenschutz"].includes(normalizedPathname)) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 flex flex-col items-end sm:inset-x-auto sm:bottom-6 sm:right-6">
      {open ? (
        <div className="mb-3 flex max-h-[min(720px,calc(100vh-6rem))] w-full flex-col overflow-hidden border border-[var(--site-line)] bg-[var(--site-chat-bg)] text-lg text-[var(--site-text)] shadow-[0_24px_90px_var(--site-menu-shadow)] backdrop-blur-xl sm:w-[min(540px,calc(100vw-48px))]">
          <div className="flex items-start justify-between border-b border-[var(--site-line)] p-5 md:p-6">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.22em] text-[var(--site-cyan)]">
                Aurillia
              </p>
              <p className="mt-2 text-2xl font-semibold leading-tight">{copy.title}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-11 w-11 place-items-center border border-[var(--site-line)] text-2xl text-[var(--site-muted)] transition hover:text-[var(--site-strong)]"
              aria-label={copy.close}
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5 md:p-6">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[90%] border px-4 py-3 text-[1.05rem] leading-8 whitespace-pre-wrap md:px-5 md:py-4 md:text-lg ${
                    message.role === "user"
                      ? "border-[color-mix(in_oklch,var(--site-cyan)_48%,transparent)] bg-[rgba(var(--site-cyan-rgb),.14)] text-[var(--site-strong)]"
                      : "border-[var(--site-line)] bg-[var(--site-soft-bg)] text-[var(--site-text)]"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.16em] text-[var(--site-cyan)]">
                <span className="h-1.5 w-1.5 animate-pulse bg-[var(--site-cyan)]" />
                {copy.thinking}
              </div>
            ) : null}

            {showQuickOptions ? (
              <div className="grid gap-2 pt-1">
                {copy.quickOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => void sendMessageText(option.text)}
                    className="border border-[var(--site-line)] bg-[var(--site-subtle-bg)] px-4 py-3 text-left text-[1.05rem] font-semibold leading-7 text-[var(--site-text)] transition hover:border-[color-mix(in_oklch,var(--site-cyan)_42%,transparent)] hover:text-[var(--site-strong)] md:px-5 md:py-4 md:text-lg"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}

            {meta?.links?.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {meta.links.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => handleLinkClick(link)}
                    className="border border-[color-mix(in_oklch,var(--site-cyan)_32%,transparent)] px-3 py-2 font-mono text-sm uppercase tracking-[0.16em] text-[var(--site-cyan)] transition hover:bg-[rgba(var(--site-cyan-rgb),.08)]"
                  >
                    {copy.linkLabels[link] ?? link}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-t border-[var(--site-line)] p-4 sm:flex-row md:p-5">
            <input
              className="min-w-0 flex-1 border border-[var(--site-line)] bg-[var(--site-soft-bg)] px-4 py-3 text-lg text-[var(--site-strong)] outline-none placeholder:text-[var(--site-muted-2)] focus:border-[color-mix(in_oklch,var(--site-cyan)_55%,transparent)] md:px-5 md:py-4"
              placeholder={copy.placeholder}
              value={input}
              maxLength={700}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" disabled={loading} className="site-button site-button-primary min-h-[3.25rem] px-5 py-4 text-lg disabled:opacity-55">
              {copy.send}
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 border border-[color-mix(in_oklch,var(--site-cyan)_48%,transparent)] bg-[var(--site-chat-bg)] px-5 py-4 text-lg font-semibold text-[var(--site-strong)] shadow-[0_16px_60px_var(--site-floating-shadow)] backdrop-blur-xl transition hover:bg-[rgba(var(--site-cyan-rgb),.1)]"
        >
          <span className="h-2 w-2 bg-[var(--site-cyan)]" />
          {copy.launcher}
        </button>
      )}
    </div>
  );
}
