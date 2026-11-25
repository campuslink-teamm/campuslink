
import { getSupabaseClient } from '../supabase/supabaseClient';

// Get the currently signed-in student's profile
export async function getCurrentUserProfile() {
  // 1. Get the authenticated user
  const { data: authData, error: authError } =
    await getSupabaseClient().auth.getUser();

  if (authError) {
    throw authError;
  }

  const user = authData.user;

  if (!user) {
    throw new Error('User is not signed in.');
  }

  // 2. Get the student's profile information
  const { data: profile, error: profileError } =
    await getSupabaseClient()
      .from('profiles')
      .select('first_name, last_name, phone_number')
      .eq('id', user.id)
      .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  // 3. Count activities created by this student
  const { count, error: listingsError } =
    await getSupabaseClient()
      .from('activities')
      .select('id', { count: 'exact', head: true })
      .eq('author_id', user.id);

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
    activitiesCount: count ?? 0,
  };
}
// Update the currently signed-in student's profile
export async function updateCurrentUserProfile({
  firstName,
  lastName,
  phoneNumber,
}) {
  // 1. Get the authenticated user
  const { data: authData, error: authError } =
    await getSupabaseClient().auth.getUser();

  if (authError) {
    throw authError;
  }

  const user = authData.user;

  if (!user) {
    throw new Error('User is not signed in.');
  }

  // 2. Save profile information to Supabase
  const { data, error } = await getSupabaseClient()
    .from('profiles')
    .upsert(
      {
        id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone_number: phoneNumber.trim(),
      },
      { onConflict: 'id' }
    )
    .select('first_name, last_name, phone_number')
    .single();

  if (error) {
    throw error;
  }

  // 3. Return the updated profile
  return {
    firstName: data.first_name,
    lastName: data.last_name,
    phoneNumber: data.phone_number,
  };
}