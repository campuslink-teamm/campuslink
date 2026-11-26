import BaseCard from "./BaseCard";
import "./ActivityCard.css";

export default function ActivityCard({
  activity,
  onClick,
}) {
  if (!activity) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleString("lt-LT", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className="activity-card-outer"
      role="button"
      tabIndex={0}
      onClick={() => onClick && onClick(activity)}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick(activity);
        }
      }}
    >
      <BaseCard>
        {activity.image && (
          <div className="activity-card-image-wrapper">
          <img
            src={activity.image}
            alt={activity.title}
            className="activity-card-image"
          />
          </div>
        )}

        <div className="activity-card-content">
          <h3 className="activity-card-title">{activity.title}</h3>
          <p className="activity-card-description">{activity.description}</p>

          <div className="activity-card-meta">
            <span>{formatDate(activity.starts_at)}</span>
          </div>
          {activity.location && (
            <p className="activity-card-location">{activity.location}</p>
          )}
        </div>
      </BaseCard>
    </div>
  );
}
