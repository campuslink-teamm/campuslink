import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import AuthenticatedHeader from '../components/AuthenticatedHeader';
import { getCurrentUserListings } from '../services/listingService';

import './FeedPage.css'; // Galite naudoti tuos pačius stilius kaip FeedPage

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadMyListings() {
      try {
        const data = await getCurrentUserListings();
        if (active) {
          setListings(data);
          setLoadError('');
        }
      } catch (error) {
        if (active) {
          setLoadError(error.message || 'Nepavyko įkelti jūsų skelbimų.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMyListings();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="auth-page feed-page-wrapper">
      <AuthenticatedHeader />

      <div className="feed-main-content">
        <div className="feed-top-section">
          <div>
            <h1 className="feed-title">Mano skelbimai</h1>
            <p className="feed-subtitle">Čia matote visus savo sukurtus skelbimus.</p>
          </div>
          <Button onClick={() => navigate('/create')}>+ Sukurti naują</Button>
        </div>

        <div className="activities-grid">
          {loading ? (
            <p className="activities-status">Kraunami jūsų skelbimai...</p>
          ) : loadError ? (
            <div className="activities-status" role="alert">
              <p>{loadError}</p>
              <Button onClick={() => window.location.reload()}>Bandyti dar kartą</Button>
            </div>
          ) : listings.length > 0 ? (
            listings.map((listing) => (
              <ActivityCard
                key={listing.id}
                activity={{
                  ...listing,
                  image: listing.image_urls?.[0] ?? null,
                }}
                onClick={() => navigate(`/activities/${listing.id}`)}
              />
            ))
          ) : (
            <div className="no-activities">
              <p>Dar nesukūrėte jokių skelbimų.</p>
              <Button onClick={() => navigate('/create')}>Sukurti pirmą skelbimą</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}