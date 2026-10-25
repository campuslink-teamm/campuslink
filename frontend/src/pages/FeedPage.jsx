import React from 'react';
// Importuojame bendrą Dominyko mygtuko komponentą (pagal nurodymus paveikslėlyje)
import Button from '../components/ui/Button';

export default function FeedPage() {
  // Pavyzdiniai (mock) skelbimai pirmam sprintui
  const mockActivities = [
    { id: 1, title: 'Stalo tenisas', description: 'Ieškau žmonių, kurie norėtų pažaisti stalo teniso po paskaitų.', date: 'Spalio 23, 2026' },
    { id: 2, title: 'Rytinis bėgimas', description: 'Bėgam Vingio parke, junkitės!', date: 'Spalio 24, 2026' },
  ];

  return (
    <div className="feed-page" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Viršutinė juosta (Header) */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ color: '#2563eb', margin: 0 }}>CampusLink</h2>
        </div>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer', fontWeight: '500' }}>Home</span>
          <span style={{ cursor: 'pointer', color: '#2563eb', fontWeight: '600' }}>Create Listing</span>
          <span style={{ cursor: 'pointer', color: '#6b7280' }}>My Listings</span>
          <span style={{ cursor: 'pointer', color: '#6b7280' }}>My Profile</span>
        </nav>
      </header>

      {/* Pagrindinė puslapio dalis */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '24px', margin: '0 0 5px 0' }}>Studentų skelbimai</h1>
          <p style={{ color: '#6b7280', margin: 0 }}>Peržiūrėk kitų studentų veiklas ir prisijunk!</p>
        </div>
        
        {/* Veiksmo mygtukas „Sukurti skelbimą“ */}
        <Button onClick={() => alert('Atidaroma skelbimo kūrimo forma (Veronikos dalis)')}>
          + Sukurti skelbimą
        </Button>
      </div>

      {/* Skelbimų tinklelis (Grid) / Vieta kortelėms */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {mockActivities.length > 0 ? (
          mockActivities.map((activity) => (
            <div key={activity.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              {/* Čia vėliau bus įstatoma Veronikos ActivityCard */}
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{activity.title}</h3>
              <p style={{ color: '#4b5563', fontSize: '14px', margin: '0 0 12px 0' }}>{activity.description}</p>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>📅 {activity.date}</span>
            </div>
          ))
        ) : (
          <p style={{ color: '#6b7280' }}>Šiuo metu aktyvių veiklų nėra.</p>
        )}
      </div>
    </div>
  );
}