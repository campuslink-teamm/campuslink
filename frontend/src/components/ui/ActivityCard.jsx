import React, { useState } from "react";
import BaseCard from "./BaseCard";
import "./ActivityCard.css";

export default function ActivityCard({
  activity,
  onToggleFavorite,
  isFavorite = false,
  onClick,
}) {
  if (!activity) return null;

  const [liked, setLiked] = useState(isFavorite);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    const nextState = !liked;
    setLiked(nextState);
    if (onToggleFavorite) {
      onToggleFavorite(activity.id, nextState);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="activity-card-outer"
      onClick={() => onClick && onClick(activity)}
    >
      <BaseCard>
        <div className="activity-card-image-wrapper">
          <img
            src={activity.image}
            alt={activity.title}
            className="activity-card-image"
          />

          <button
            type="button"
            onClick={handleLikeClick}
            className="activity-card-like-btn"
            aria-label="Add to favorites"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={liked ? "#ef4444" : "none"}
              stroke={liked ? "#ef4444" : "#1e293b"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
        </div>

        <div className="activity-card-content">
          <h3 className="activity-card-title">{activity.title}</h3>

          <div className="activity-card-meta">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1e293b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span>{formatDate(activity.starts_at)}</span>
          </div>
        </div>
      </BaseCard>
    </div>
  );
}
