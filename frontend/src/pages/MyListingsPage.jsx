import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import { getCurrentUserListings } from '../services/listingService';
import './MyListingsPage.css';

export default function MyListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyListings() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCurrentUserListings();
        setListings(data);
      } catch (err) {
        console.error('Klaida gaunant skelbimus:', err);
        setError('Nepavyko gauti jūsų skelbimų. Bandykite dar kartą vėliau.');
      } finally {
        setLoading(false);
      }
    }

    fetchMyListings();
  }, []);

  return (
    <div className="auth-page my-listings-wrapper">
      {/* Viršutinė juosta (Header) su logotipu ir navigacija */}
      <header className="auth-header feed-header">
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

        <nav className="feed-nav">
          <span className="nav-link" onClick={() => navigate('/feed')}>Pagrindinis</span>
          <span className="nav-link" onClick={() => navigate('/create')}>Sukurti skelbimą</span>
          <span className="nav-link active" onClick={() => navigate('/my-listings')}>Mano skelbimai</span>
          <span className="nav-link" onClick={() => navigate('/feed')}>Mano profilis</span>
        </nav>
      </header>

      {/* Pagrindinis turinys */}
      <div className="feed-main-content">
        <div className="feed-top-section">
          <div>
            <h1 className="feed-title">Mano skelbimai</h1>
            <p className="feed-subtitle">Čia matysi visas savo paties sukurtas veiklas.</p>
          </div>
          
          <Button onClick={() => navigate('/create')}>
            + Sukurti skelbimą
          </Button>
        </div>

        {/* Būsena: Kraunasi */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#5b4860', fontSize: '18px' }}>
            Kraunami jūsų skelbimai...
          </div>
        )}

        {/* Būsena: Klaida */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#e63946', fontWeight: '600' }}>
            <p>{error}</p>
          </div>
        )}

        {/* Būsena: Užkrauta, bet skelbimų nėra */}
        {!loading && !error && listings.length === 0 && (
          <div className="no-activities" style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '2px dashed #e879f9' }}>
            <p style={{ fontSize: '20px', fontWeight: '600', color: '#390039', marginBottom: '10px' }}>
              Kol kas neturi skelbimų
            </p>
            <p style={{ fontSize: '15px', color: '#5b4860', marginBottom: '20px' }}>
              Pasidalyk savo veikla su universiteto bendruomene!
            </p>
            <Button onClick={() => navigate('/create')}>
              Sukurti naują skelbimą
            </Button>
          </div>
        )}

        {/* Būsena: Rodomi skelbimai */}
        {!loading && !error && listings.length > 0 && (
          <div className="activities-grid">
            {listings.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}