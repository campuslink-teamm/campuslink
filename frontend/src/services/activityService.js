import { getSupabaseClient } from '../supabase/supabaseClient';

export const ACTIVITY_IMAGE_BUCKET = 'activity-images';
export const ACTIVITY_IMAGE_LIMIT = 5;
export const ACTIVITY_IMAGE_SIZE_LIMIT = 5 * 1024 * 1024;

const imageExtensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export const ACTIVITY_IMAGE_TYPES = Object.keys(imageExtensions);

const activityFields =
  'id, title, description, category, location, starts_at, author_id, created_at, image_urls';

function validateActivityImages(images) {
  if (!Array.isArray(images) || images.length > ACTIVITY_IMAGE_LIMIT) {
    throw new Error(`Pasirinkite ne daugiau kaip ${ACTIVITY_IMAGE_LIMIT} nuotraukų.`);
  }

  for (const image of images) {
    if (!Object.hasOwn(imageExtensions, image.type)) {
      throw new Error('Galima įkelti tik JPG, PNG arba WebP nuotraukas.');
    }

    if (image.size > ACTIVITY_IMAGE_SIZE_LIMIT) {
      throw new Error('Vienos nuotraukos dydis negali viršyti 5 MB.');
    }
  }
}

async function rollbackActivityCreation(client, userId, activityId, filePaths, cause) {
  const cleanupErrors = [];

  if (filePaths.length > 0) {
    try {
      const { error } = await client.storage
        .from(ACTIVITY_IMAGE_BUCKET)
        .remove(filePaths);

      if (error) {
        cleanupErrors.push(error.message);
      }
    } catch (error) {
      cleanupErrors.push(error.message || 'Nepavyko pašalinti įkeltų nuotraukų.');
    }
  }

  try {
    const { error } = await client
      .from('activities')
      .delete()
      .eq('id', activityId)
      .eq('author_id', userId);

    if (error) {
      cleanupErrors.push(error.message);
    }
  } catch (error) {
    cleanupErrors.push(error.message || 'Nepavyko pašalinti veiklos įrašo.');
  }

  if (cleanupErrors.length > 0) {
    throw new Error(
      `${cause.message || 'Nepavyko įkelti veiklos nuotraukų.'} ` +
      `Valymo klaida: ${cleanupErrors.join('; ')}`,
      { cause }
    );
  }

  throw cause;
}

export async function getActivities() {
  const { data, error } = await getSupabaseClient()
    .from('activities')
    .select(activityFields)
    .order('starts_at', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((activity) => ({
    ...activity,
    image: activity.image_urls?.[0] ?? null,
  }));
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

  return data
    ? { ...data, image: data.image_urls?.[0] ?? null }
    : data;
}

export async function createActivity({
  title,
  category,
  description,
  location,
  date,
  time,
  images = [],
}) {
  validateActivityImages(images);

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

  if (images.length === 0) {
    return data;
  }

  const uploadedPaths = [];
  const imageUrls = [];

  try {
    for (const image of images) {
      const path = [
        authData.user.id,
        data.id,
        `${crypto.randomUUID()}.${imageExtensions[image.type]}`,
      ].join('/');

      const { error: uploadError } = await client.storage
        .from(ACTIVITY_IMAGE_BUCKET)
        .upload(path, image, {
          cacheControl: '3600',
          contentType: image.type,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      uploadedPaths.push(path);
      const { data: publicUrlData } = client.storage
        .from(ACTIVITY_IMAGE_BUCKET)
        .getPublicUrl(path);
      imageUrls.push(publicUrlData.publicUrl);
    }

    const { data: updatedActivity, error: updateError } = await client
      .from('activities')
      .update({ image_urls: imageUrls })
      .eq('id', data.id)
      .eq('author_id', authData.user.id)
      .select(activityFields)
      .single();

    if (updateError) {
      throw updateError;
    }

    return updatedActivity;
  } catch (uploadError) {
    return rollbackActivityCreation(
      client,
      authData.user.id,
      data.id,
      uploadedPaths,
      uploadError
    );
  }
}
