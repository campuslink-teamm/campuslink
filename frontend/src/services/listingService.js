import { getSupabaseClient } from '../supabase/supabaseClient';

// Get all listings for the feed page
export async function getActivities() {
  const { data: listings, error: listingsError } =
    await getSupabaseClient()
      .from('LISTINGS')
      .select(`
        id,
        user_id,
        category_id,
        title,
        description,
        contact_info,
        created_at,
        image_urls
      `)
      .order('created_at', { ascending: false });

  if (listingsError) {
    throw listingsError;
  }

  return listings ?? [];
}

// Get activities created by the currently signed-in user
export async function getCurrentUserActivities() {
  const { data: authData, error: authError } =
    await getSupabaseClient().auth.getUser();

  if (authError) {
    throw authError;
  }

  const user = authData.user;

  if (!user) {
    throw new Error('User is not signed in.');
  }

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