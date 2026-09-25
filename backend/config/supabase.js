// Supabase Client Configuration
// Reads SUPABASE_URL and SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY from .env
// Operates in live cloud mode when keys are present, or mock in-memory mode when keys are pending.

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (isSupabaseConfigured) {
  console.log(`[Supabase] ✔ Connected to Supabase Project: ${supabaseUrl}`);
} else {
  console.log(`[Supabase] ℹ SUPABASE_URL or keys not yet provided in .env. Running in in-memory session mode.`);
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false
      }
    })
  : null;
