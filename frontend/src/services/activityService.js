import { getSupabaseClient } from '../supabase/supabaseClient';

const activityFields =
  'id, title, description, category, location, starts_at, author_id, created_at';

export async function getActivities() {
  const { data, error } = await getSupabaseClient()
    .from('activities')
    .select(activityFields)
    .order('starts_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getActivityById(id) {
  const { data, error } = await getSupabaseClient()
    .from('activities')
    .select(activityFields)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createActivity({
  title,
  category,
  description,
  location,
  date,
  time,
}) {
  const client = getSupabaseClient();
  const { data: authData, error: authError } = await client.auth.getUser();

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error('You must be signed in to create an activity.');
  }

  const startsAt = new Date(`${date}T${time}`);

  if (Number.isNaN(startsAt.getTime())) {
    throw new Error('Enter a valid activity date and time.');
  }

  const { data, error } = await client
    .from('activities')
    .insert({
      title: title.trim(),
      category,
      description: description.trim(),
      location: location.trim() || null,
      starts_at: startsAt.toISOString(),
      author_id: authData.user.id,
    })
    .select(activityFields)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
