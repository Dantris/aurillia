import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { getSupabaseServer } from "@/lib/supabaseServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTACT_TO = process.env.CONTACT_TO || "info@aurillia.de";
const CONTACT_FROM = process.env.CONTACT_FROM || "Aurillia <onboarding@resend.dev>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/+$/, "");

const IP_RATE_LIMIT_MAX = Number(process.env.CONTACT_IP_RATE_LIMIT_MAX ?? 3);
const IP_RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_IP_RATE_LIMIT_WINDOW_MS ?? 60 * 60_000);
const EMAIL_RATE_LIMIT_MAX = Number(process.env.CONTACT_EMAIL_RATE_LIMIT_MAX ?? 1);
const EMAIL_RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_EMAIL_RATE_LIMIT_WINDOW_MS ?? 10 * 60_000);
const DUPLICATE_WINDOW_MS = Number(process.env.CONTACT_DUPLICATE_WINDOW_MS ?? 10 * 60_000);
const MIN_FORM_AGE_MS = Number(process.env.CONTACT_MIN_FORM_AGE_MS ?? 2_500);
const MAX_FORM_AGE_MS = Number(process.env.CONTACT_MAX_FORM_AGE_MS ?? 24 * 60 * 60 * 1_000);
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_ENABLED = Boolean(TURNSTILE_SECRET_KEY && TURNSTILE_SITE_KEY);

const HONEYPOT_FIELDS = ["aurillia_extra_field", "aurillia_confirm_code"];
const SPAM_PATTERNS = [
  /\bbtc\b/i,
  /\bbitcoin\b/i,
  /\btelegram\b/i,
  /\bcrypto(?:currency)?\b/i,
  /\bearnings?\b/i,
  /\breservation\s*id\b/i,
  /\burgent\s+message\b/i,
];

const ALLOWED_INTEREST = new Set([
  "Web Development",
  "Mobile Apps",
  "AI Chatbot / Assistant",
  "Website Care",
]);

const ipBucket = new Map<string, number[]>();
const emailBucket = new Map<string, number[]>();
const duplicateBucket = new Map<string, number>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

function checkRateLimit(
  bucket: Map<string, number[]>,
  key: string,
  max: number,
  windowMs: number,
) {
  const now = Date.now();
  const list = bucket.get(key) ?? [];
  const recent = list.filter((ts) => now - ts < windowMs);
  if (recent.length >= max) return false;
  recent.push(now);
  bucket.set(key, recent);
  return true;
}

function sanitize(input: string, max: number) {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function countUrls(text: string) {
  return (text.match(/https?:\/\/|www\./gi) || []).length;
}

function hasObviousSpam(...values: string[]) {
  const text = values.join(" \n ");
  return SPAM_PATTERNS.some((pattern) => pattern.test(text));
}

function duplicateKey(email: string, message: string) {
  return createHash("sha256")
    .update(`${email}\n${message.toLowerCase().replace(/\s+/g, " ").trim()}`)
    .digest("hex");
}

function isDuplicateSubmission(email: string, message: string) {
  const now = Date.now();
  const key = duplicateKey(email, message);
  const lastSeen = duplicateBucket.get(key);

  if (lastSeen && now - lastSeen < DUPLICATE_WINDOW_MS) {
    return true;
  }

  duplicateBucket.set(key, now);
  return false;
}

function getSilentDropReason(form: FormData) {
  const filledTrap = HONEYPOT_FIELDS.some((field) =>
    String(form.get(field) || "").trim() !== "",
  );

  if (filledTrap) return "honeypot";

  const startedAt = Number(String(form.get("contactStartedAt") || ""));
  const formAge = Date.now() - startedAt;

  if (!Number.isFinite(startedAt)) return "missing_timestamp";
  if (formAge < MIN_FORM_AGE_MS) return "too_fast";
  if (formAge > MAX_FORM_AGE_MS) return "stale_timestamp";

  return "";
}

async function verifyTurnstile(form: FormData, req: Request) {
  if (!TURNSTILE_ENABLED) return true;

  const token = String(form.get("cf-turnstile-response") || "");
  if (!token) return false;

  try {
    const body = new URLSearchParams({
      secret: TURNSTILE_SECRET_KEY!,
      response: token,
      remoteip: getClientIp(req),
    });

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };

    if (!result.success) {
      console.error("CONTACT_TURNSTILE_ERROR:", result["error-codes"] ?? []);
    }

    return result.success === true;
  } catch (error) {
    console.error("CONTACT_TURNSTILE_VERIFY_ERROR:", error);
    return false;
  }
}

function originFromUrl(value: string | null) {
  if (!value) return "";

  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

function isAllowedOrigin(req: Request) {
  if (!APP_ORIGIN) return true;

  const allowedOrigins = new Set([APP_ORIGIN, "https://www.aurillia.de"].filter(Boolean));
  const origin = req.headers.get("origin")?.replace(/\/+$/, "") || "";
  const refererOrigin = originFromUrl(req.headers.get("referer")).replace(/\/+$/, "");

  if (origin && allowedOrigins.has(origin)) return true;
  if (refererOrigin && allowedOrigins.has(refererOrigin)) return true;

  return process.env.NODE_ENV !== "production" && !origin && !refererOrigin;
}

type LeadPayload = {
  name: string;
  email: string;
  company: string;
  projectUrl: string;
  timeline: string;
  interest: string;
  message: string;
};

function formatLeadEmail(payload: LeadPayload) {
  return [
    "New Aurillia contact form submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.company ? `Company: ${payload.company}` : null,
    payload.projectUrl ? `Current website: ${payload.projectUrl}` : null,
    payload.timeline ? `Timeline: ${payload.timeline}` : null,
    `Interest: ${payload.interest}`,
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendLeadEmail(payload: LeadPayload) {
  if (!RESEND_API_KEY) {
    console.error("CONTACT_EMAIL_DISABLED: Missing RESEND_API_KEY.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_TO],
        reply_to: payload.email,
        subject: `Aurillia contact: ${payload.interest} - ${payload.name}`,
        text: formatLeadEmail(payload),
      }),
    });

    if (!response.ok) {
      console.error("CONTACT_EMAIL_ERROR:", response.status, await response.text());
      return false;
    }

    const result = (await response.json().catch(() => null)) as { id?: string } | null;
    console.info("CONTACT_EMAIL_SENT:", {
      from: CONTACT_FROM,
      to: CONTACT_TO,
      resendId: result?.id ?? "unknown",
    });

    return true;
  } catch (error) {
    console.error("CONTACT_EMAIL_SEND_ERROR:", error);
    return false;
  }
}

async function storeLead(payload: LeadPayload, projectSummary: string) {
  const supabaseServer = getSupabaseServer();
  if (!supabaseServer) return false;

  try {
    const { error } = await supabaseServer.from("leads").insert({
      name: payload.name,
      email: payload.email,
      project_summary: projectSummary,
      intent: payload.interest,
      source: "contact_form",
    });

    if (error) {
      console.error("CONTACT_SUPABASE_ERROR:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("CONTACT_SUPABASE_INSERT_ERROR:", error);
    return false;
  }
}

function getLocaleFromRequest(req: Request) {
  const referer = req.headers.get("referer") || "";
  try {
    const url = new URL(referer);
    return url.pathname.startsWith("/en") ? "en" : "de";
  } catch {
    return "de";
  }
}

function redirect(req: Request, q: string, locale = getLocaleFromRequest(req)) {
  const path = locale === "en" ? "/en/contact" : "/contact";
  return NextResponse.redirect(new URL(`${path}${q}`, req.url), { status: 303 });
}

export async function POST(req: Request) {
  try {
    if (!isAllowedOrigin(req)) {
      return redirect(req, "?error=origin");
    }

    const ctype = req.headers.get("content-type") || "";
    const canParseForm =
      ctype.includes("multipart/form-data") ||
      ctype.includes("application/x-www-form-urlencoded");

    if (!canParseForm) {
      return redirect(req, "?error=format");
    }

    const form = await req.formData();
    const locale = String(form.get("locale") || "") === "en" ? "en" : "de";

    const silentDropReason = getSilentDropReason(form);
    if (silentDropReason) {
      console.info("CONTACT_SILENT_DROP:", silentDropReason);
      return redirect(req, "?sent=1", locale);
    }

    if (!(await verifyTurnstile(form, req))) {
      return redirect(req, "?error=turnstile", locale);
    }

    const name = sanitize(String(form.get("name") || ""), 120);
    const email = sanitize(String(form.get("email") || "").toLowerCase(), 200);
    const company = sanitize(String(form.get("company") || ""), 120);
    const projectUrl = sanitize(String(form.get("projectUrl") || ""), 300);
    const timeline = sanitize(String(form.get("timeline") || ""), 160);
    const interestRaw = String(form.get("interest") || "");
    const interest = ALLOWED_INTEREST.has(interestRaw) ? interestRaw : "Other";
    const message = sanitize(String(form.get("message") || ""), 4000);

    if (!name || !isValidEmail(email) || message.length < 10) {
      return redirect(req, "?error=invalid", locale);
    }

    if (hasObviousSpam(name, email, company, projectUrl, timeline, message)) {
      console.info("CONTACT_SILENT_DROP:", "spam_keyword");
      return redirect(req, "?sent=1", locale);
    }

    if (countUrls(message) > 3) {
      console.info("CONTACT_SILENT_DROP:", "too_many_urls");
      return redirect(req, "?sent=1", locale);
    }

    if (isDuplicateSubmission(email, message)) {
      console.info("CONTACT_SILENT_DROP:", "duplicate");
      return redirect(req, "?sent=1", locale);
    }

    const ip = getClientIp(req);
    if (!checkRateLimit(ipBucket, ip, IP_RATE_LIMIT_MAX, IP_RATE_LIMIT_WINDOW_MS)) {
      return redirect(req, "?error=rate", locale);
    }

    if (!checkRateLimit(emailBucket, email, EMAIL_RATE_LIMIT_MAX, EMAIL_RATE_LIMIT_WINDOW_MS)) {
      return redirect(req, "?error=rate", locale);
    }

    const payload = { name, email, company, projectUrl, timeline, interest, message };
    const projectSummary = [
      company ? `Company: ${company}` : null,
      projectUrl ? `Current website: ${projectUrl}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      `Interested in: ${interest}`,
      `Forward to: ${CONTACT_TO}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const [emailSent, leadStored] = await Promise.all([
      sendLeadEmail(payload),
      storeLead(payload, projectSummary),
    ]);

    if (!emailSent) {
      if (leadStored) {
        console.error("CONTACT_EMAIL_FAILED_LEAD_STORED: Email notification failed after lead storage.");
      }
      return redirect(req, "?error=send", locale);
    }

    return redirect(req, "?sent=1", locale);
  } catch (err) {
    console.error("CONTACT_ERROR:", err);
    return redirect(req, "?error=send");
  }
}
