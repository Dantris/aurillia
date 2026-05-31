// src/lib/supabaseServer.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseServer() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Supabase server environment variables are not configured.");
    }

    cachedClient ??= createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false }
    });

    return cachedClient;
}

export const supabaseServer = new Proxy({} as SupabaseClient, {
    get(_target, property) {
        return getSupabaseServer()[property as keyof SupabaseClient];
    },
});
