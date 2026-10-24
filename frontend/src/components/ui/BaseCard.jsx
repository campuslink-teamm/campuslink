
import "./BaseCard.css";

function BaseCard({ children }) {
  return (
    <div className="campus-card">
      {children}
    </div>
  );
}

export default BaseCard;
