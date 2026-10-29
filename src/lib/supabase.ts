import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase Client Configuration for Gurukul Vidyapeeth
 * Supports both public client (anon key) and secure server-side admin client (service role).
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes("your-project") &&
  !supabaseAnonKey.includes("your-supabase")
);

// 1. Client-Side Safe Supabase Instance
let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

// 2. Server-Side Privileged Supabase Instance (Service Role)
export function getAdminSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey || supabaseServiceKey.includes("your-service-role")) {
    // If service role not configured, fallback to anon client
    return getSupabase();
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
