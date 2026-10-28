import React, { useState } from 'react';
import Button from '../components/ui/Button';
// Importuojame BaseCard komponentą iš teisingo kelio
import BaseCard from '../components/ui/BaseCard';
import './FeedPage.css';

export default function FeedPage() {
  const [activities] = useState([
    { id: 1, title: 'Stalo tenisas', description: 'Ieškau žmonių, kurie norėtų pažaisti stalo teniso po paskaitų.', date: 'Spalio 23, 2026' },
    { id: 2, title: 'Rytinis bėgimas', description: 'Bėgam Vingio parke, junkitės!', date: 'Spalio 24, 2026' },
    { id: 3, title: 'Programavimo konsultacija', description: 'Kartojamės React prieš egzaminą bibliotekoje.', date: 'Spalio 25, 2026' },
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

      {/* Skelbimų tinklelis (Grid) */}
      <div className="activities-grid">
        {activities.length > 0 ? (
          activities.map((activity) => (
            // Naudojame BaseCard, kurio viduje patalpiname skelbimo informaciją
            <BaseCard key={activity.id}>
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-desc">{activity.description}</p>
              <span className="activity-date">📅 {activity.date}</span>
            </BaseCard>
          ))
        ) : (
          <p className="no-activities">Šiuo metu aktyvių veiklų nėra.</p>
        )}
      </div>
    </div>
  );
}