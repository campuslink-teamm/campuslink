
import { supabaseClient } from '../supabase/supabaseClient';

// Get the currently signed-in student's profile
export async function getCurrentUserProfile() {
  // 1. Get the authenticated user
  const { data: authData, error: authError } =
    await supabaseClient.auth.getUser();

  if (authError) {
    throw authError;
  }

  const user = authData.user;

  if (!user) {
    throw new Error('User is not signed in.');
  }

  // 2. Get the student's profile information
  const { data: profile, error: profileError } =
    await supabaseClient
      .from('PROFILES')
      .select('first_name, last_name, phone_number')
      .eq('id', user.id)
      .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  // 3. Count listings created by this student
  const { count, error: listingsError } =
    await supabaseClient
      .from('LISTINGS')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);

  if (listingsError) {
    throw listingsError;
  }

  // 4. Return all information to the frontend
  return {
    id: user.id,
    email: user.email ?? '',
    firstName: profile?.first_name ?? '',
    lastName: profile?.last_name ?? '',
    phoneNumber: profile?.phone_number ?? '',
    listingsCount: count ?? 0,
  };
}
