import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import { logoutUser } from '../services/authenticationService';
import {
  cancelTrip,
  createTrip,
  getTrips,
  joinTrip,
  leaveTrip,
} from '../services/tripService';
import './TripsPage.css';

const initialForm = {
  origin: '',
  destination: '',
  departureDate: '',
  departureTime: '',
  passengerSeats: '1',
  pricePerSeat: '0',
  notes: '',
};

const tripErrorMessages = {
  'This trip is full.': 'Šioje kelionėje nebeliko laisvų vietų.',
  'You cannot join your own trip.': 'Negalite prisijungti prie savo kelionės.',
  'You have already joined this trip.': 'Jau esate prisijungę prie šios kelionės.',
  'This trip has already departed.': 'Ši kelionė jau išvyko.',
  'Trip not found.': 'Kelionė nerasta.',
  'You have not joined this trip.': 'Nesate prisijungę prie šios kelionės.',
};

function getErrorMessage(error, fallback) {
  return tripErrorMessages[error.message] || error.message || fallback;
}

function getLocalDateValue() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function formatDeparture(value) {
  return new Date(value).toLocaleString('lt-LT', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPrice(value) {
  return new Intl.NumberFormat('lt-LT', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(value));
}

export default function TripsPage() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pendingTripId, setPendingTripId] = useState('');
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [notice, setNotice] = useState('');

  const loadTrips = useCallback(async () => {
    setLoading(true);
    setLoadError('');

    try {
      const result = await getTrips();
      setTrips(result.trips);
      setCurrentUserId(result.currentUserId);
    } catch (error) {
      setLoadError(error.message || 'Nepavyko įkelti kelionių.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function loadInitialTrips() {
      try {
        const result = await getTrips();

        if (active) {
          setTrips(result.trips);
          setCurrentUserId(result.currentUserId);
        }
      } catch (error) {
        if (active) {
          setLoadError(error.message || 'Nepavyko įkelti kelionių.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadInitialTrips();

    return () => {
      active = false;
    };
  }, []);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setActionError('');
  }

  async function handleCreateTrip(event) {
    event.preventDefault();
    setActionError('');
    setNotice('');
    setSaving(true);

    try {
      await createTrip(form);
      setForm(initialForm);
      setShowForm(false);
      setNotice('Kelionė paskelbta.');
      await loadTrips();
    } catch (error) {
      setActionError(
        getErrorMessage(error, 'Nepavyko paskelbti kelionės.')
      );
    } finally {
      setSaving(false);
    }
  }

  async function runTripAction(tripId, action, successMessage) {
    setPendingTripId(tripId);
    setActionError('');
    setNotice('');

    try {
      await action(tripId);
      setNotice(successMessage);
      await loadTrips();
    } catch (error) {
      setActionError(
        getErrorMessage(error, 'Nepavyko atnaujinti kelionės.')
      );
    } finally {
      setPendingTripId('');
    }
  }

  async function handleCancelTrip(trip) {
    const confirmed = window.confirm(
      'Atšaukti šią kelionę? Visi keleivių prisijungimai taip pat bus panaikinti.'
    );

    if (!confirmed) {
      return;
    }

    await runTripAction(
      trip.id,
      cancelTrip,
      'Kelionė atšaukta.'
    );
  }

  async function handleLogout() {
    setActionError('');

    try {
      await logoutUser();
      navigate('/', { replace: true });
    } catch (error) {
      setActionError(
        error.message || 'Nepavyko atsijungti. Bandykite dar kartą.'
      );
    }
  }

  return (
    <main className="trips-page">
      <header className="trips-header">
        <button
          className="trips-brand"
          type="button"
          onClick={() => navigate('/feed')}
          aria-label="Grįžti į CampusLink pagrindinį puslapį"
        >
          <img src="/images/logo.png" alt="CampusLink" />
        </button>

        <nav className="trips-nav" aria-label="Pagrindinė navigacija">
          <button type="button" onClick={() => navigate('/feed')}>
            Veiklos
          </button>
          <button type="button" onClick={() => navigate('/profile')}>
            Mano profilis
          </button>
          <Button onClick={handleLogout}>Atsijungti</Button>
        </nav>
      </header>

      <div className="trips-content">
        <section className="trips-heading">
          <div>
            <p className="trips-eyebrow">Kelionės kartu</p>
            <h1>Ieškai, kas pavežtų, o gal pats turi laisvų vietų?</h1>
            <p className="trips-intro">
              Rask bendrakeleivių arba pasiūlyk laisvą vietą savo automobilyje.
            </p>
          </div>

          <Button
            disabled={saving}
            onClick={() => {
              setShowForm((visible) => !visible);
              setActionError('');
              setNotice('');
            }}
          >
            {showForm ? 'Uždaryti formą' : '+ Skelbti kelionę'}
          </Button>
        </section>

        {actionError && (
          <p className="trips-message trips-message-error" role="alert">
            {actionError}
          </p>
        )}

        {notice && (
          <p className="trips-message trips-message-success" role="status">
            {notice}
          </p>
        )}

        {showForm && (
          <section className="trip-form-card">
            <div className="trip-form-heading">
              <h2>Kelionės skelbimas</h2>
              <p>Kaina nurodoma vienam keleiviui. Mokėjimai nevykdomi per CampusLink.</p>
            </div>

            <form onSubmit={handleCreateTrip}>
              <div className="trip-form-grid">
                <div className="trip-field">
                  <label htmlFor="trip-origin">Išvykimo miestas *</label>
                  <input
                    id="trip-origin"
                    name="origin"
                    type="text"
                    value={form.origin}
                    onChange={handleFormChange}
                    minLength={2}
                    maxLength={120}
                    autoComplete="address-level2"
                    placeholder="Pvz., Vilnius"
                    required
                  />
                </div>

                <div className="trip-field">
                  <label htmlFor="trip-destination">Atvykimo miestas *</label>
                  <input
                    id="trip-destination"
                    name="destination"
                    type="text"
                    value={form.destination}
                    onChange={handleFormChange}
                    minLength={2}
                    maxLength={120}
                    autoComplete="address-level2"
                    placeholder="Pvz., Kaunas"
                    required
                  />
                </div>

                <div className="trip-field">
                  <label htmlFor="trip-departure-date">Išvykimo data *</label>
                  <input
                    id="trip-departure-date"
                    name="departureDate"
                    type="date"
                    value={form.departureDate}
                    onChange={handleFormChange}
                    min={getLocalDateValue()}
                    required
                  />
                </div>

                <div className="trip-field">
                  <label htmlFor="trip-departure-time">Išvykimo laikas *</label>
                  <input
                    id="trip-departure-time"
                    name="departureTime"
                    type="time"
                    value={form.departureTime}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="trip-field">
                  <label htmlFor="trip-passenger-seats">
                    Laisvos keleivių vietos *
                  </label>
                  <input
                    id="trip-passenger-seats"
                    name="passengerSeats"
                    type="number"
                    min="1"
                    step="1"
                    value={form.passengerSeats}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="trip-field">
                  <label htmlFor="trip-price">Kaina vienam keleiviui (€) *</label>
                  <input
                    id="trip-price"
                    name="pricePerSeat"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.pricePerSeat}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="trip-field">
                <label htmlFor="trip-notes">Papildoma informacija</label>
                <textarea
                  id="trip-notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  maxLength={500}
                  rows={3}
                  placeholder="Bagažas, sustojimai ar kita keleiviams svarbi informacija"
                />
              </div>

              <div className="trip-form-actions">
                <button
                  className="trip-secondary-button"
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                >
                  Atšaukti
                </button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Skelbiama...' : 'Paskelbti kelionę'}
                </Button>
              </div>
            </form>
          </section>
        )}

        <section className="trips-list" aria-labelledby="trips-list-title">
          <div className="trips-list-heading">
            <h2 id="trips-list-title">Artėjančios kelionės</h2>
            <button
              className="trips-refresh-button"
              type="button"
              onClick={loadTrips}
              disabled={loading}
            >
              {loading ? 'Kraunama...' : 'Atnaujinti'}
            </button>
          </div>

          {loading ? (
            <p className="trips-empty-state">Kraunamos kelionės...</p>
          ) : loadError ? (
            <div className="trips-empty-state" role="alert">
              <p>{loadError}</p>
              <Button onClick={loadTrips}>Bandyti dar kartą</Button>
            </div>
          ) : trips.length === 0 ? (
            <div className="trips-empty-state">
              <h3>Kelionių dar nėra</h3>
              <p>Paskelbk kelionę ir pakviesk kitus studentus prisijungti.</p>
            </div>
          ) : (
            <div className="trips-grid">
              {trips.map((trip) => {
                const isDriver = trip.driver_id === currentUserId;
                const isJoined = trip.passengers.some(
                  (passenger) => passenger.passenger_id === currentUserId
                );
                const isPending = pendingTripId === trip.id;

                return (
                  <article className="trip-card" key={trip.id}>
                    <div className="trip-card-top">
                      <span className="trip-date">
                        {formatDeparture(trip.departure_at)}
                      </span>
                      {isDriver && (
                        <span className="trip-owner-badge">Tavo kelionė</span>
                      )}
                    </div>

                    <div className="trip-route">
                      <div className="trip-city">
                        <span>Išvyksta iš</span>
                        <strong>{trip.origin}</strong>
                      </div>
                      <span className="trip-route-arrow" aria-hidden="true">
                        →
                      </span>
                      <div className="trip-city trip-city-destination">
                        <span>Vyksta į</span>
                        <strong>{trip.destination}</strong>
                      </div>
                    </div>

                    <div className="trip-card-details">
                      <span>
                        {trip.seatsLeft > 0
                          ? `${trip.seatsLeft} laisv. viet. iš ${trip.passenger_seats}`
                          : 'Visos vietos užimtos'}
                      </span>
                      <strong>{formatPrice(trip.price_per_seat)} / asm.</strong>
                    </div>

                    {trip.notes && (
                      <p className="trip-notes">{trip.notes}</p>
                    )}

                    {isDriver && (
                      <div className="trip-passengers">
                        <h3>Keleiviai ({trip.seats_booked})</h3>
                        {trip.passengers.length > 0 ? (
                          <ul>
                            {trip.passengers.map((passenger) => (
                              <li key={passenger.passenger_id}>
                                {passenger.passenger_name}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>Kol kas niekas neprisijungė.</p>
                        )}
                      </div>
                    )}

                    <div className="trip-card-actions">
                      {isDriver ? (
                        <button
                          className="trip-secondary-button"
                          type="button"
                          onClick={() => handleCancelTrip(trip)}
                          disabled={isPending}
                        >
                          {isPending ? 'Atšaukiama...' : 'Atšaukti kelionę'}
                        </button>
                      ) : isJoined ? (
                        <Button
                          onClick={() => runTripAction(
                            trip.id,
                            leaveTrip,
                            'Atsijungei nuo kelionės.'
                          )}
                          disabled={isPending}
                        >
                          {isPending ? 'Atšaukiama...' : 'Atsisakyti vietos'}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => runTripAction(
                            trip.id,
                            joinTrip,
                            'Prisijungei prie kelionės.'
                          )}
                          disabled={isPending || trip.seatsLeft === 0}
                        >
                          {isPending
                            ? 'Prisijungiama...'
                            : trip.seatsLeft === 0
                              ? 'Vietų nėra'
                              : 'Prisijungti'}
                        </Button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
