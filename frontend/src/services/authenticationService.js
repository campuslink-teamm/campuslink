
import { supabaseClient } from '../supabase/supabaseClient';

// Student registration
export async function registerUser(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    throw error;
  }

  return data;
}

// Student login
export async function loginUser(email, password) {
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

  if (error) {
    throw error;
  }

  return data;
}

// Student logout
export async function logoutUser() {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    throw error;
  }
}

// Check current session
export async function getCurrentUserSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}
