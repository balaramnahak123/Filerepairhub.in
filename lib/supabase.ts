import { createClient } from "@supabase/supabase-js"

// Provide fallback values for development/preview
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Only create client if we have real values
const hasValidConfig = supabaseUrl !== "https://placeholder.supabase.co" && supabaseAnonKey !== "placeholder-key"

export const supabase = hasValidConfig ? createClient(supabaseUrl, supabaseAnonKey) : null

// Server-side client
export const createServerClient = () => {
  if (!hasValidConfig) return null
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Helper to check if Supabase is configured
export const isSupabaseConfigured = () => hasValidConfig
