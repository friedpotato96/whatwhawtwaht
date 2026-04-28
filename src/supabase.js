import { createClient } from "@supabase/supabase-js";

// Paste your Supabase project values here.
// Supabase Dashboard -> Project Settings -> API.
const supabaseUrl = "https://gahwiaenngrwgxmkzdqy.supabase.co";
const supabaseAnonKey = "sb_publishable_ZFkbdyZrQrqTvNEdTiRXng_wCUxJL8k";

export const isSupabaseConfigured =
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey !== "PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE";

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : "https://placeholder.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey : "placeholder-anon-key",
);
