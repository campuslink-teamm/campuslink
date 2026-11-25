import { getSupabaseClient } from '../supabase/supabaseClient';

// Get activities created by the currently signed-in user
export async function getCurrentUserActivities() {
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

  // 2. Get only this user's activities
  const { data: activities, error: activitiesError } =
    await getSupabaseClient()
      .from('activities')
      .select(`
        id,
        author_id,
        category,
        title,
        description,
        location,
        starts_at,
        created_at
      `)
      .eq('author_id', user.id)
      .order('starts_at', { ascending: true });

  if (activitiesError) {
    throw activitiesError;
  }

  return activities ?? [];
}