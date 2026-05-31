// src/app/api/aurillia-assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import OpenAI from "openai";
import { supabaseServer } from "@/lib/supabaseServer";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// ---------- CONFIG ----------

// Allowed origins (frontend domains that may call this API)
const ALLOWED_ORIGINS = [
    "http://localhost:3000",
    // add your production domains here:
    "https://aurillia.de",
    "https://www.aurillia.de"
];

// Simple rate limit settings (per IP, per window)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;  // 20 requests per minute per IP

// Max size & history
const MAX_MESSAGE_LENGTH = 1000;       // characters per message
const MAX_HISTORY_MESSAGES = 12;       // last N messages sent to the model

// Use a module-scoped map as a soft rate limit bucket
type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

// ---------- HELPERS ----------

async function isAllowedOrigin(req: NextRequest): Promise<boolean> {
    const h = await headers();
    const origin = h.get("origin") || "";
    const host = h.get("host") || "";

    if (ALLOWED_ORIGINS.includes(origin)) return true;

    // allow your own domain even if Origin is missing
    if (host.endsWith("aurillia.de") || host.startsWith("localhost")) return true;

    return false;
}

function getClientId(req: NextRequest): string {
    // Vercel/Proxies often pass IP here
    const xf = req.headers.get("x-forwarded-for");
    if (xf) return xf.split(",")[0].trim();
    // Fallback (not great, but better than nothing)
    return req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(req: NextRequest): boolean {
    const id = getClientId(req);
    const now = Date.now();
    const bucket = buckets.get(id);

    if (!bucket) {
        buckets.set(id, { count: 1, windowStart: now });
        return false;
    }

    // Reset window
    if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
        buckets.set(id, { count: 1, windowStart: now });
        return false;
    }

    if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
        return true;
    }

    bucket.count += 1;
    return false;
}

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

// Trim history & message length to control token usage
function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
    return messages
        .slice(-MAX_HISTORY_MESSAGES)
        .map((m) => ({
            role: m.role,
            content: (m.content || "").slice(0, MAX_MESSAGE_LENGTH)
        }));
}

// ---------- SYSTEM PROMPT ----------

const systemPrompt = `
Du bist der technische Assistent von Aurillia, einer kleinen, fokussierten Software- und AI-Agentur.

Aurillia bietet:
- Webentwicklung: moderne Websites, Dashboards, SaaS-Apps (Next.js, TypeScript, Supabase).
- Mobile Apps: React Native/Flutter, eine Codebasis für iOS und Android.
- AI & Automation: Chatbots, AI Agents, RAG-Bots, Workflows und Integrationen in bestehende Systeme.
- In Zukunft: ein Home-Security-System (Aurillia Home) mit Raspberry Pi & ESP32, aktuell noch in Entwicklung.

DEINE ROLLE
Du bist ein ruhiger, senioriger Berater. Du hilfst Besuchern, ihr Projekt klar zu formulieren und zeigst, wie Aurillia helfen kann. Du schreibst knapp, klar und ohne Hype.

DU ARBEITEST IN PHASEN
1) "greeting": kurz begrüßen, fragen was gebaut/verbessert werden soll.
2) "discovery": max. 2–3 gezielte Fragen zu Zielen, Plattform (Web/Mobile/AI), grobem Zeitrahmen/Budget.
3) "scoping": das Gehörte in 3–6 Bullet Points zusammenfassen und sagen, was technisch sinnvoll wäre.
4) "proposal": eine kleine, grobe Projekt-Skizze geben (was, wie, grober Ablauf).
5) "handoff": wenn der Besucher ernsthaft interessiert wirkt, höflich nach Kontaktdaten fragen und auf Kontaktmöglichkeit verweisen.

REGELN
- Stelle nur dann Nachfragen, wenn sie wirklich helfen, das Projekt zu verstehen.
- Frage NICHT direkt am Anfang nach Name/E-Mail.
- Frage nur nach Kontaktdaten, wenn die Person klar ein Projekt anstoßen oder ein Angebot möchte.
- Mach KEINE konkreten Preiszusagen. Wenn nach Budget gefragt wird, sage, dass genaue Zahlen erst nach einem kurzen Gespräch möglich sind.
- Verweise bei Bedarf auf passende Bereiche der Seite, zum Beispiel:
  "/services/web", "/services/mobile", "/services/ai", "/aurillia-home", "/contact".
- Wenn jemand nur allgemein stöbert, sei hilfreich, aber dränge nicht auf Kontakt.

ANTWORTFORMAT:
Gib die Antwort IMMER als JSON im folgenden Format aus, ohne zusätzlichen Text:

{
  "reply": "Text, der dem Nutzer angezeigt wird. Nutze einfache Absätze und Aufzählungen, aber keine Backticks.",
  "intent": "web" | "mobile" | "ai" | "iot" | "other",
  "stage": "greeting" | "discovery" | "scoping" | "proposal" | "handoff",
  "links": ["/services/web"],
  "lead": {
    "name": "Name oder null",
    "email": "E-Mail oder null",
    "project_summary": "Kurzbeschreibung oder null"
  }
}

HINWEISE ZUM FELD "lead":
- Wenn du noch keine Kontaktdaten hast, setze "lead" auf null oder alle Felder auf null.
- Nur wenn der Nutzer freiwillig Name UND E-Mail angibt, fülle diese Felder aus.
- "project_summary" ist eine 1–3-sätzige, neutrale Beschreibung des Projekts aus deiner Sicht.

WICHTIG:
- Schreibe wirklich NUR dieses JSON. Keine Erklärungen oder Texte außerhalb des JSON-Objekts.
`;

// ---------- MAIN HANDLER ----------

export async function POST(req: NextRequest) {
    try {
        // 1) Origin check
        if (!isAllowedOrigin(req)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 2) Rate limit
        if (isRateLimited(req)) {
            return NextResponse.json(
                { error: "Too many requests, bitte kurz warten." },
                { status: 429 }
            );
        }

        const body = await req.json();
        const messages: ChatMessage[] = body.messages || [];
        const normalizedMessages = normalizeMessages(messages);

        // get latest user message text (for moderation)
        const latestUser = [...normalizedMessages]
            .reverse()
            .find((m) => m.role === "user");
        const latestUserText = latestUser?.content ?? "";

        // 3) Basic moderation with OpenAI
        if (latestUserText) {
            try {
                const mod = await openai.moderations.create({
                    model: "omni-moderation-latest",
                    input: latestUserText
                });

                const flagged = mod.results?.[0]?.flagged;
                if (flagged) {
                    // We don't call the chat model; reply with safe generic message
                    return NextResponse.json({
                        reply:
                            "Bei diesem Thema kann ich dir hier leider nicht helfen. Wenn du Fragen zu Software-, App- oder AI-Projekten hast, frag mich gerne.",
                        intent: "other",
                        links: ["/contact"]
                    });
                }
            } catch (modErr) {
                console.error("Moderation error", modErr);
                // fail-open: still allow chat if moderation fails, but you could also block
            }
        }

        // 4) Call the chat model
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            temperature: 0.2,
            max_tokens: 400,
            messages: [
                { role: "system", content: systemPrompt },
                ...normalizedMessages
            ]
        });

        const raw = completion.choices[0].message.content;
        if (!raw) {
            return NextResponse.json(
                { error: "Empty response from model" },
                { status: 500 }
            );
        }

        // 5) Parse model JSON
        let parsed: {
            reply: string;
            intent: string;
            stage: string;
            links?: string[];
            lead?: {
                name?: string | null;
                email?: string | null;
                project_summary?: string | null;
            } | null;
        };

        try {
            parsed = JSON.parse(raw);
        } catch (e) {
            console.error("Failed to parse model JSON", raw);
            return NextResponse.json(
                { error: "Bad JSON from model" },
                { status: 500 }
            );
        }

        const clientId = getClientId(req);

        // 6) Store lead if present
        if (parsed.lead && parsed.lead.name && parsed.lead.email) {
            await supabaseServer.from("leads").insert({
                name: parsed.lead.name,
                email: parsed.lead.email,
                project_summary: parsed.lead.project_summary || "",
                intent: parsed.intent || "other",
                source: "website_bot"
            });
        }

        // 7) Store usage log (optional but recommended)
        try {
            const usage = completion.usage;
            if (usage) {
                const promptTokens = usage.prompt_tokens ?? 0;
                const completionTokens = usage.completion_tokens ?? 0;
                const totalTokens = usage.total_tokens ?? promptTokens + completionTokens;

                // Example rough pricing for gpt-4o-mini (check OpenAI pricing for exact numbers)
                const costUsd =
                    (promptTokens / 1_000) * 0.00015 +
                    (completionTokens / 1_000) * 0.0006;

                await supabaseServer.from("usage_log").insert({
                    ip: clientId,
                    intent: parsed.intent || "unknown",
                    prompt_tokens: promptTokens,
                    completion_tokens: completionTokens,
                    total_tokens: totalTokens,
                    estimated_cost_usd: costUsd
                });
            }
        } catch (logErr) {
            console.error("Usage logging error", logErr);
        }

        // 8) Respond to frontend
        return NextResponse.json({
            reply: parsed.reply,
            intent: parsed.intent,
            stage: parsed.stage,
            links: parsed.links || []
        });
    } catch (err) {
        console.error("aurillia-assistant error", err);
        return NextResponse.json(
            { error: "Assistant error" },
            { status: 500 }
        );
    }
}
