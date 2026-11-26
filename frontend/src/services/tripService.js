import { getSupabaseClient } from '../supabase/supabaseClient';

const tripFields = `
  id,
  driver_id,
  origin,
  destination,
  departure_at,
  passenger_seats,
  seats_booked,
  price_per_seat,
  notes,
  status,
  passengers:trip_passengers(passenger_id, passenger_name)
`;

async function getSignedInUser(client) {
  const { data, error } = await client.auth.getUser();

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('You must be signed in to manage trips.');
  }

  return data.user;
}

export async function getTrips() {
  const client = getSupabaseClient();
  const user = await getSignedInUser(client);
  const { data, error } = await client
    .from('trips')
    .select(tripFields)
    .eq('status', 'active')
    .gte('departure_at', new Date().toISOString())
    .order('departure_at', { ascending: true });

  if (error) {
    throw error;
  }

  return {
    currentUserId: user.id,
    trips: (data ?? []).map((trip) => ({
      ...trip,
      passengers: trip.passengers ?? [],
      seatsLeft: Math.max(0, trip.passenger_seats - trip.seats_booked),
    })),
  };
}

export async function createTrip({
  origin,
  destination,
  departureDate,
  departureTime,
  passengerSeats,
  pricePerSeat,
  notes,
}) {
  const client = getSupabaseClient();
  const user = await getSignedInUser(client);
  const departureAt = new Date(`${departureDate}T${departureTime}`);
  const seats = Number(passengerSeats);
  const price = Number(pricePerSeat);

  if (Number.isNaN(departureAt.getTime()) || departureAt <= new Date()) {
    throw new Error('Enter a valid future departure date and time.');
  }

  if (!Number.isInteger(seats) || seats < 1) {
    throw new Error('Enter at least one passenger seat.');
  }

  if (!Number.isFinite(price) || price < 0) {
    throw new Error('Enter a valid price per seat.');
  }

  const { error } = await client.from('trips').insert({
    driver_id: user.id,
    origin: origin.trim(),
    destination: destination.trim(),
    departure_at: departureAt.toISOString(),
    passenger_seats: seats,
    price_per_seat: price,
    notes: notes.trim() || null,
  });

  if (error) {
    throw error;
  }
}

async function callTripAction(functionName, tripId) {
  const { error } = await getSupabaseClient().rpc(functionName, {
    p_trip_id: tripId,
  });

  if (error) {
    throw error;
  }
}

export function joinTrip(tripId) {
  return callTripAction('join_trip', tripId);
}

export function leaveTrip(tripId) {
  return callTripAction('leave_trip', tripId);
}

export function cancelTrip(tripId) {
  return callTripAction('cancel_trip', tripId);
}
