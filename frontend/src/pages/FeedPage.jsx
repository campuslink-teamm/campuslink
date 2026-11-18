import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import { mockActivities } from '../data/mockActivities';

// Nedo sukurta atsijungimo funkcija
import { logoutUser } from '../services/authenticationService';

import './FeedPage.css';

export default function FeedPage() {
  const [activities] = useState(mockActivities);

  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const navigate = useNavigate();

  // Atsijungimo funkcija
  async function handleLogout() {
    setLoggingOut(true);
    setLogoutError('');

    try {
      // Atsijungiame per Supabase
      await logoutUser();

      // Grąžiname naudotoją į Homepage
      navigate('/', { replace: true });

    } catch (error) {
      setLogoutError(
        'Nepavyko atsijungti. Bandykite dar kartą.'
      );

    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="feed-page">

      {/* Viršutinė juosta */}
      <header className="feed-header">

        <div className="feed-header-left">

          <h2 className="feed-logo">
            CampusLink
          </h2>

          <Button
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Atsijungiama...' : 'Atsijungti'}
          </Button>

        </div>

        <nav className="feed-nav">

          <span
            className="nav-link"
            onClick={() => navigate('/feed')}
            style={{ cursor: 'pointer' }}
          >
            Pagrindinis
          </span>

          <span className="nav-link active">
            Sukurti skelbimą
          </span>

          <span className="nav-link">
            Mano skelbimai
          </span>

          <span
            className="nav-link"
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            Mano profilis
          </span>

        </nav>

      </header>

      {/* Klaidos pranešimas */}
      {logoutError && (
        <p className="feed-logout-error" role="alert">
          {logoutError}
        </p>
      )}

      {/* Pagrindinė puslapio dalis */}
      <div className="feed-top-section">

        <div>
          <h1 className="feed-title">
            Studentų skelbimai
          </h1>

          <p className="feed-subtitle">
            Peržiūrėk kitų studentų veiklas ir prisijunk!
          </p>
        </div>

        <Button onClick={() => navigate('/create')}>
          + Sukurti skelbimą
        </Button>

      </div>

      {/* Skelbimų tinklelis */}
      <div className="activities-grid">

        {activities.length > 0 ? (

          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))

        ) : (

          <div
            className="no-activities"
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}
          >
            <p>
              Šiuo metu aktyvių veiklų nėra.
            </p>

            <p>
              Būk pirmas ir sukurk naują skelbimą!
            </p>
          </div>

        )}

      </div>

    </div>
  );
}