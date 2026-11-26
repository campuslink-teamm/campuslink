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
    <div className="auth-page feed-page-wrapper">

      {/* Viršutinė juosta (Header) su logotipu, navigacija ir atsijungimu */}
      <header className="auth-header feed-header">

        <div className="feed-header-left">
          {/* Tikrasis logo paveikslėlis, derantis prie prisijungimo lango */}
          <button
            className="auth-logo-button"
            type="button"
            onClick={() => navigate('/')}
          >
            <img
              src="/images/logo.png"
              alt="CampusLink"
              className="auth-logo"
            />
          </button>

          <Button
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? 'Atsijungiama...' : 'Atsijungti'}
          </Button>
        </div>

        <nav className="feed-nav">
          <span
            className="nav-link active"
            onClick={() => navigate('/feed')}
          >
            Pagrindinis
          </span>

          <span
            className="nav-link"
            onClick={() => navigate('/create')}
          >
            Sukurti skelbimą
          </span>

          {/* Nukreipimas į tavo sukurtą Mano skelbimų puslapį */}
          <span
            className="nav-link"
            onClick={() => navigate('/my-listings')}
          >
            Mano skelbimai
          </span>

          <span
            className="nav-link"
            onClick={() => navigate('/profile')}
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
      <div className="feed-main-content">
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
                color: '#5b4860'
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

    </div>
  );
}