import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import { getActivities } from '../services/activityService';
import { logoutUser } from '../services/authenticationService';

import './FeedPage.css';

export default function FeedPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const data = await getActivities();
        if (active) {
          setActivities(data);
          setLoadError('');
        }
      } catch (error) {
        if (active) {
          setLoadError(error.message || 'Nepavyko įkelti veiklų.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  async function handleLogout() {
    setLoggingOut(true);
    setLogoutError('');

    try {
      // Atsijungiame per Supabase
      await logoutUser();

      // Grąžiname naudotoją į Homepage
      navigate('/', { replace: true });

    } catch {
      setLogoutError(
        'Nepavyko atsijungti. Bandykite dar kartą.'
      );

    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="auth-page feed-page-wrapper">

      {/* Viršutinė juosta */}
      <header className="auth-header feed-header">

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

          <button
            className="nav-link"
            type="button"
            onClick={() => navigate('/trips')}
          >
            Kelionės
          </button>
          <button
            className="nav-link active"
            type="button"
            aria-current="page"
            onClick={() => navigate('/feed')}
          >
            Pagrindinis
          </button>
          <button
            className="nav-link"
            type="button"
            onClick={() => navigate('/my-listings')}
          >
            Mano skelbimai
          </button>
          <button
            className="nav-link"
            type="button"
            onClick={() => navigate('/profile')}
          >
            Mano profilis
          </button>

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
              Studentų veiklos
            </h1>

            <p className="feed-subtitle">
              Peržiūrėk kitų studentų veiklas ir prisijunk!
            </p>
          </div>

          <Button onClick={() => navigate('/create')}>
            + Sukurti veiklą
          </Button>

        </div>

        {/* Skelbimų tinklelis */}
        <div className="activities-grid">

          {loading ? (
            <p className="activities-status">Kraunamos veiklos...</p>
          ) : loadError ? (
            <div className="activities-status" role="alert">
              <p>{loadError}</p>
              <Button onClick={() => window.location.reload()}>
                Bandyti dar kartą
              </Button>
            </div>
          ) : activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => navigate(`/activities/${activity.id}`)}
              />
            ))
          ) : (
            <div className="no-activities">
              <p>
                Šiuo metu aktyvių veiklų nėra.
              </p>

              <p>
                Būk pirmas ir sukurk naują veiklą!
              </p>
            </div>

          )}

        </div>
      </div>

    </div>
  );
}