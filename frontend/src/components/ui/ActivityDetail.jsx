import React, { useState, useEffect } from "react";
import BaseCard from "./BaseCard";
import Button from "./Button";
import "./ActivityDetail.css";

// Testiniai duomenys, kol Eimanto DB užklausa dar neprijungta
const MOCK_DB = {
  "1": {
    id: "1",
    title: "Stalo teniso turnyras",
    category: "Laisvalaikis",
    location: "Saulėtekio al. 9, II rūmai",
    date: "2026-11-20",
    description:
      "Kviečiame visus studentus į draugišką stalo teniso turnyrą! Raketes turėsime vietoje, bet galite atsinešti ir savo. Laukia prizai ir gera nuotaika.",
    contactInformation: "organizatoriai@stud.vu.lt | +370 612 34567",
  },
  "2": {
    id: "2",
    title: "Parduodami aukštosios matematikos vadovėliai",
    category: "Vadovėliai",
    location: "Centrinė biblioteka",
    date: "2026-11-16",
    description:
      "Parduodu puikios būklės tiesinės algebros ir matematinės analizės pratybų bei teorijos knygas. Kaina už abi – 15 EUR.",
    contactInformation: "studentas@universitetas.lt",
  },
};

export default function ActivityDetail({ activityId, onBack }) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activityId) return;

    setLoading(true);
    setError(null);
    setActivity(null);

    const fetchActivityDetails = async () => {
      try {
        /* 
        // --- 3 PUNKTAS: Eimanto DB užklausa pagal skelbimo ID ---
        const response = await fetch(`http://localhost:5000/api/activities/${activityId}`);
        
        if (response.status === 404) {
          setActivity(null);
          setLoading(false);
          return;
        }
        
        if (!response.ok) {
          throw new Error("Nepavyko užkrauti skelbimo duomenų iš serverio.");
        }
        
        const data = await response.json();
        setActivity(data);
        */

        // --- TESTAVIMO SIMULIACIJA ---
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (activityId === "error") {
          throw new Error("Serverio ryšio klaida. Bandykite vėliau.");
        }
        const found = MOCK_DB[String(activityId)];
        setActivity(found || null);
      } catch (err) {
        setError(err.message || "Įvyko netikėta klaida.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityDetails();
  }, [activityId]);

  return (
    <div className="activity-detail-container">
      {/* 5 PUNKTAS: Aiškus „Atgal“ veiksmas */}
      <div className="activity-detail-nav">
        <button
          type="button"
          onClick={onBack}
          className="activity-detail-back-btn"
        >
          ← Atgal į skelbimus
        </button>
      </div>

      <BaseCard>
        {/* 4.1 PUNKTAS: Kol informacija kraunasi */}
        {loading && (
          <div className="activity-detail-status">
            <div className="activity-detail-spinner" />
            <p className="activity-detail-loading-text">
              Kraunama skelbimo informacija...
            </p>
          </div>
        )}

        {/* 4.2 PUNKTAS: Jeigu įvyko klaida */}
        {!loading && error && (
          <div className="activity-detail-status">
            <h3 className="activity-detail-error-title">
              Nepavyko užkrauti skelbimo
            </h3>
            <p className="activity-detail-status-desc">{error}</p>
            <Button onClick={onBack}>Grįžti į sąrašą</Button>
          </div>
        )}

        {/* 4.3 PUNKTAS: Jeigu skelbimas ištrintas arba nerastas */}
        {!loading && !error && !activity && (
          <div className="activity-detail-status">
            <h3 className="activity-detail-empty-title">
              Skelbimas nerastas
            </h3>
            <p className="activity-detail-status-desc">
              Šis skelbimas buvo ištrintas arba nebeegzistuoja.
            </p>
            <Button onClick={onBack}>Grįžti į sąrašą</Button>
          </div>
        )}

        {/* 2 PUNKTAS: Pasirinkto skelbimo detalės */}
        {!loading && !error && activity && (
          <div>
            <div className="activity-detail-header">
              {activity.category && (
                <span className="activity-detail-badge">
                  {activity.category}
                </span>
              )}
              <span className="activity-detail-id">ID: #{activity.id}</span>
            </div>

            <h1 className="activity-detail-title">{activity.title}</h1>

            {(activity.location || activity.date) && (
              <div className="activity-detail-meta-grid">
                {activity.location && (
                  <div>
                    <div className="activity-detail-meta-label">Vieta</div>
                    <div className="activity-detail-meta-value">
                      {activity.location}
                    </div>
                  </div>
                )}
                {activity.date && (
                  <div>
                    <div className="activity-detail-meta-label">Data</div>
                    <div className="activity-detail-meta-value">
                     {activity.date_time || activity.date}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="activity-detail-section">
              <h3 className="activity-detail-section-title">Aprašymas</h3>
              <p className="activity-detail-description">
                {activity.description}
              </p>
            </div>

            {activity.contactInformation && (
              <div className="activity-detail-contact-box">
                <div className="activity-detail-contact-label">
                  Kontaktinė informacija
                </div>
                <div className="activity-detail-contact-value">
                  {activity.contactInformation}
                </div>
              </div>
            )}
          </div>
        )}
      </BaseCard>
    </div>
  );
}
