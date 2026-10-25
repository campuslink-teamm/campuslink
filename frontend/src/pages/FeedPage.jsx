import React, { useState } from 'react';
import Button from '../components/ui/Button';
import './FeedPage.css';

export default function FeedPage() {
  // 1. Sukuriame mock duomenų masyvą su būsena (State), kad prireikus galėtume testuoti tuščią sąrašą
  const [activities] = useState([
    { id: 1, title: 'Stalo tenisas' },
    { id: 2, title: 'Rytinis bėgimas' },
    { id: 3, title: 'Programavimo konsultacija' },
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
        
        <Button onClick={() => alert('Atidaroma skelbimo kūrimo forma (Veronikos dalis)')}>
          + Sukurti skelbimą
        </Button>
      </div>

      {/* Skelbimų tinklelis ir sąlyginis atvaizdavimas (Conditional Rendering) */}
      <div className="activities-grid">
        {activities.length > 0 ? (
          // Jei skelbimų yra – sukuriame vietą (konteinerį) kortelėms
          activities.map((activity) => (
            <div key={activity.id} className="activity-card-container">
              {/* 
                ⚠️ SVARBU: Čia kuri TIK VIETĄ kortelei! 
                Kai Veronika baigs savo ActivityCard, šią vietą pakeisi importuota kortele, 
                pvz.: <ActivityCard activity={activity} />
              */}
              <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '20px', textAlign: 'center', background: '#f8fafc', color: '#64748b' }}>
                <p style={{ margin: 0, fontWeight: '600' }}>[ Veronikos ActivityCard vieta ]</p>
                <p style={{ fontSize: '14px', margin: '5px 0 0 0' }}>Skelbimas: {activity.title}</p>
              </div>
            </div>
          ))
        ) : (
          /* Jei skelbimų sąrašas tuščias – rodomas tvarkingas pranešimas */
          <div className="no-activities" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <p style={{ fontSize: '18px', fontWeight: '500' }}>Šiuo metu aktyvių veiklų nėra.</p>
            <p style={{ fontSize: '14px' }}>Būk pirmas ir sukurk naują skelbimą!</p>
          </div>
        )}
      </div>
    </div>
  );
}