// src/lib/supabaseServer.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null | undefined;
let warnedAboutConfig = false;

function readSupabaseJwtRole(key: string) {
  if (!key.startsWith("eyJ")) return "";

  try {
    const payload = key.split(".")[1];
    if (!payload) return "";

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = Buffer.from(normalized, "base64").toString("utf8");
    const parsed = JSON.parse(decoded) as { role?: unknown };

    return typeof parsed.role === "string" ? parsed.role : "";
  } catch {
    return "";
  }
}

function hasValidSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) return false;
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl)) return false;

  // Accept legacy service_role JWTs and newer `sb_secret_...` server keys only.
  // This keeps anon/publishable keys and secrets from other vendors out of the
  // server-side Supabase client.
  if (serviceRoleKey.startsWith("sb_secret_")) return true;
  return readSupabaseJwtRole(serviceRoleKey) === "service_role";
}

export function getSupabaseServer() {
  if (cachedClient !== undefined) return cachedClient;

  if (!hasValidSupabaseConfig()) {
    if (!warnedAboutConfig) {
      console.warn("SUPABASE_DISABLED: Missing or invalid server-side Supabase configuration.");
      warnedAboutConfig = true;
    }
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  return cachedClient;
}
