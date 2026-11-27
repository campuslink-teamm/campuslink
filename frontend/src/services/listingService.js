import { getSupabaseClient } from '../supabase/supabaseClient';

// Get listings created by the currently signed-in user
export async function getCurrentUserListings() {
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

  // 2. Get only this user's activity posts
  const { data: listings, error: listingsError } =
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
        created_at,
        image_urls
      `)
      .eq('author_id', user.id)
      .order('created_at', { ascending: false });

  if (listingsError) {
    throw listingsError;
  }

  // 3. Return an empty array if the user has no listings
  return listings ?? [];
}