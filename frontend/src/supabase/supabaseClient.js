
import { createClient } from '@supabase/supabase-js';

const supabaseProjectUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabaseClient = createClient(
  supabaseProjectUrl,
  supabasePublishableKey
);
