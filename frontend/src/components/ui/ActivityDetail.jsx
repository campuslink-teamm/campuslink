import { useState, useEffect } from "react";
import BaseCard from "./BaseCard";
import Button from "./Button";
import { getActivityById } from "../../services/activityService";
import "./ActivityDetail.css";

export default function ActivityDetail({ activityId, onBack }) {
  const [result, setResult] = useState({
    activityId: null,
    activity: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!activityId) return;

    let active = true;

    const fetchActivityDetails = async () => {
      try {
        const found = await getActivityById(activityId);
        if (active) {
          setResult({
            activityId,
            activity: found || null,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        if (active) {
          setResult({
            activityId,
            activity: null,
            loading: false,
            error: err.message || "Nepavyko užkrauti veiklos.",
          });
        }
      }
    };

    fetchActivityDetails();

    return () => {
      active = false;
    };
  }, [activityId]);

  const currentResult = result.activityId === activityId
    ? result
    : { activity: null, loading: true, error: null };
  const { activity, loading, error } = currentResult;

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

            {(activity.location || activity.starts_at) && (
              <div className="activity-detail-meta-grid">
                {activity.location && (
                  <div>
                    <div className="activity-detail-meta-label">Vieta</div>
                    <div className="activity-detail-meta-value">
                      {activity.location}
                    </div>
                  </div>
                )}
                {activity.starts_at && (
                  <div>
                    <div className="activity-detail-meta-label">Data</div>
                    <div className="activity-detail-meta-value">
                      {new Date(activity.starts_at).toLocaleString('lt-LT', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
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

          </div>
        )}
      </BaseCard>
    </div>
  );
}
