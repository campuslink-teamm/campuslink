import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import { mockActivities } from '../data/mockActivities';
import './FeedPage.css';

export default function FeedPage() {
  const [activities] = useState(mockActivities);
  const navigate = useNavigate();

  return (
    <div className="auth-page feed-page-wrapper">
      {/* Viršutinė juosta su tuo pačiu logotipu ir stiliumi */}
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
          <span className="nav-link active" onClick={() => navigate('/feed')}>Pagrindinis</span>
          <span className="nav-link" onClick={() => navigate('/create')}>Sukurti skelbimą</span>
          <span className="nav-link" onClick={() => navigate('/feed')}>Mano skelbimai</span>
          <span className="nav-link" onClick={() => navigate('/feed')}>Mano profilis</span>
        </nav>
      </header>

      {/* Pagrindinė turinio dalis */}
      <div className="feed-main-content">
        <div className="feed-top-section">
          <div>
            <h1 className="feed-title">Studentų skelbimai</h1>
            <p className="feed-subtitle">Peržiūrėk kitų studentų veiklas ir prisijunk!</p>
          </div>
          
          <Button onClick={() => navigate('/create')}>
            + Sukurti skelbimą
          </Button>
        </div>

        {/* Skelbimų tinklelis */}
        <div className="activities-grid">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="no-activities" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              <p style={{ fontSize: '18px', fontWeight: '500' }}>Šiuo metu aktyvių veiklų nėra.</p>
              <p style={{ fontSize: '14px' }}>Būk pirmas ir sukurk naują skelbimą!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}