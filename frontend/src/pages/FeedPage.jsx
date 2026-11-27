import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import AuthenticatedHeader from '../components/AuthenticatedHeader';
import { getActivities } from '../services/activityService';

import './FeedPage.css';

export default function FeedPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
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

  return (
    <div className="auth-page feed-page-wrapper">
      <AuthenticatedHeader />

      {/* Pagrindinė puslapio dalis */}
      <main className="feed-main-content">
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
      </main>

    </div>
  );
}