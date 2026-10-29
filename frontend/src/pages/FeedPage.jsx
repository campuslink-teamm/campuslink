import React, { useState } from 'react';
import Button from '../components/ui/Button';
import ActivityCard from '../components/ui/ActivityCard';
import './FeedPage.css';

export default function FeedPage() {
  const [activities] = useState([
    {
      id: 1,
      title: 'Stalo tenisas',
      description: 'Ieškau žmonių, kurie norėtų pažaisti stalo teniso po paskaitų.',
      date: 'Spalio 23, 2026',
      location: 'Aukštojo mokslo rūmai',
      author: 'Jonas'
    },
    {
      id: 2,
      title: 'Rytinis bėgimas',
      description: 'Bėgam Vingio parke, junkitės visi norintys!',
      date: 'Spalio 24, 2026',
      location: 'Vingio parkas',
      author: 'Milda'
    },
    {
      id: 3,
      title: 'Programavimo konsultacija',
      description: 'Kartojamės React prieš egzaminą bibliotekoje.',
      date: 'Spalio 25, 2026',
      location: 'Biblioteka, 3 salė',
      author: 'Lukas'
    }
  ]);

  return (
    <div className="feed-page">
      {/* Viršutinė juosta (Header) */}
      <header className="feed-header">
        <h2 className="feed-logo">CampusLink</h2>
        <nav className="feed-nav">
          <span className="nav-link">Pagrindinis</span>
          <span className="nav-link active">Sukurti skelbimą</span>
          <span className="nav-link">Mano skelbimai</span>
          <span className="nav-link">Mano profilis</span>
        </nav>
      </header>

      {/* Pagrindinė puslapio dalis */}
      <div className="feed-top-section">
        <div>
          <h1 className="feed-title">Studentų skelbimai</h1>
          <p className="feed-subtitle">Peržiūrėk kitų studentų veiklas ir prisijunk!</p>
        </div>
        
        <Button onClick={() => alert('Atidaroma skelbimo kūrimo forma')}>
          + Sukurti skelbimą
        </Button>
      </div>

      {/* Skelbimų tinklelis ir sąlyginis atvaizdavimas */}
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
  );
}