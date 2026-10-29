import React from "react";
import BaseCard from "./BaseCard";
import "./ActivityCard.css";

export default function ActivityCard({ activity }) {
  if (!activity) return null;

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleString("lt-LT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <BaseCard>
      <div className="activity-card-image-wrapper">
        <img
          src={activity.image}
          alt={activity.title}
          className="activity-card-image"
        />

      </div>

      <div className="activity-card-content">
        <h3 className="activity-card-title">{activity.title}</h3>

        {activity.description && (
          <p className="activity-card-description">{activity.description}</p>
        )}

        <div className="activity-card-meta">
          <span>📅 {formatDateTime(activity.starts_at)}</span>
          {activity.location && <span>📍 {activity.location}</span>}
        </div>
      </div>
    </BaseCard>
  );
}