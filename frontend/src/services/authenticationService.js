
import { getSupabaseClient } from '../supabase/supabaseClient';

// Student registration
export async function registerUser(email, password) {
  const { data, error } = await getSupabaseClient().auth.signUp({
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
    await getSupabaseClient().auth.signInWithPassword({
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
  const { error } = await getSupabaseClient().auth.signOut();

  if (error) {
    throw error;
  }
}

// Check current session
export async function getCurrentUserSession() {
  const { data, error } = await getSupabaseClient().auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}
// Siųsti slaptažodžio atkūrimo laišką
export async function sendPasswordResetEmail(email) {
  const { error } =
    await getSupabaseClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

  if (error) {
    throw error;
  }
}
// Pakeisti prisijungusio naudotojo slaptažodį
export async function updateUserPassword(newPassword) {
  const { error } = await getSupabaseClient().auth.updateUser({
    password: newPassword
  });

  if (error) {
    throw error;
  }
}