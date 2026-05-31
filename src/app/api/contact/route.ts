import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { getContactConfig } from "@/lib/secrets";

/** Ensure Node runtime for AWS SDK */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------- Config (from env) ---------- */
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const CONTACT_TO = process.env.CONTACT_TO!;       // e.g. "inbox@yourdomain.com" (verified in SES)
const CONTACT_FROM = process.env.CONTACT_FROM!;   // e.g. "no-reply@yourdomain.com" (verified)
const APP_ORIGIN = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/+$/, ""); // optional origin check

// simple rate-limit defaults (overridable via env)
const RATE_LIMIT_MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
const RATE_LIMIT_WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 60_000);

const ses = new SESClient({ region: AWS_REGION });

/* ---------- Helpers ---------- */

const ALLOWED_INTEREST = new Set([
    "Web Development",
    "Mobile Apps",
    "Full-Stack Systems",
    "Hardware & IoT",
    "Cloud & AWS",
    "AI & Automation",
]);

function getClientIp(req: Request) {
    // best-effort; depends on hosting proxy
    const xff = req.headers.get("x-forwarded-for");
    if (xff) return xff.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

// naive in-memory rate limit bucket (fine for dev/small deploys)
const bucket = new Map<string, number[]>();
function checkRateLimit(ip: string) {
    const now = Date.now();
    const list = bucket.get(ip) ?? [];
    const recent = list.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) return false;
    recent.push(now);
    bucket.set(ip, recent);
    return true;
}

function sanitize(input: string, max: number) {
    // strip control chars, normalize whitespace, cap length
    const s = input.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
    return s.slice(0, max);
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function countUrls(text: string) {
    return (text.match(/https?:\/\/|www\./gi) || []).length;
}

function redirect(req: Request, q: string) {
    return NextResponse.redirect(new URL(`/contact${q}`, req.url), { status: 303 });
}

/* ---------- Handler ---------- */

export async function POST(req: Request) {
    try {
        // Optional origin check (protects API from cross-site POSTs)
        if (APP_ORIGIN) {
            const origin = req.headers.get("origin") || "";
            if (origin && !origin.startsWith(APP_ORIGIN)) {
                return redirect(req, "?error=origin");
            }
        }

        // Require multipart/form-data
        const ctype = req.headers.get("content-type") || "";
        if (!ctype.includes("multipart/form-data")) {
            return redirect(req, "?error=format");
        }

        const ip = getClientIp(req);
        if (!checkRateLimit(ip)) {
            return redirect(req, "?error=rate");
        }

        const form = await req.formData();

        // Honeypot — bots fill hidden fields; silently "succeed"
        if (String(form.get("website") || "").trim() !== "") {
            return redirect(req, "?sent=1");
        }

        // Extract + sanitize
        const name = sanitize(String(form.get("name") || ""), 120);
        const email = sanitize(String(form.get("email") || "").toLowerCase(), 200);
        const company = sanitize(String(form.get("company") || ""), 120);
        const interestRaw = String(form.get("interest") || "");
        const interest = ALLOWED_INTEREST.has(interestRaw) ? interestRaw : "Other";
        const message = sanitize(String(form.get("message") || ""), 4000);

        // Basic validation
        if (!name || !isValidEmail(email) || message.length < 10) {
            return redirect(req, "?error=invalid");
        }

        // Simple spam heuristic
        if (countUrls(message) > 3) {
            // Treat as delivered, but drop.
            return redirect(req, "?sent=1");
        }

        // Build email
        const Subject = `New contact — ${name}`;
        const BodyText = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Company: ${company || "-"}`,
            `Interested in: ${interest}`,
            "",
            "Message:",
            message,
            "",
            `IP: ${ip}`,
        ].join("\n");

        // Send via SES
        await ses.send(
            new SendEmailCommand({
                Destination: { ToAddresses: [CONTACT_TO] },
                Message: {
                    Subject: { Data: Subject, Charset: "UTF-8" },
                    Body: { Text: { Data: BodyText, Charset: "UTF-8" } },
                },
                Source: CONTACT_FROM,
                ReplyToAddresses: [email],
            })
        );

        return redirect(req, "?sent=1");
    } catch (err) {
        console.error("CONTACT_ERROR:", err);
        return redirect(req, "?error=send");
    }
}
