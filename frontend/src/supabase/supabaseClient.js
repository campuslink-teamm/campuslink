
import { createClient } from '@supabase/supabase-js';

const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseProjectUrl && supabasePublishableKey
);

export const supabaseClient = isSupabaseConfigured
  ? createClient(supabaseProjectUrl, supabasePublishableKey)
  : null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_PUBLISHABLE_KEY.'
    );
  }

  return supabaseClient;
}
