import { supabaseClient } from '../supabase/supabaseClient';

// Get all listings for the feed page (visi skelbimai pagrindiniam puslapiui)
export async function getActivities() {
  const { data: listings, error: listingsError } =
    await supabaseClient
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

// Get listings created by the currently signed-in user (tik prisijungusio vartotojo skelbimai)
export async function getCurrentUserListings() {
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

  // 2. Get only this user's listings
  const { data: listings, error: listingsError } =
    await supabaseClient
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
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

  if (listingsError) {
    throw listingsError;
  }

  // 3. Return an empty array if the user has no listings
  return listings ?? [];
}