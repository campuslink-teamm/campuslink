
import { useState } from "react";

function App() {
  const [activities, setActivities] = useState(null);

  async function loadActivities() {
    const response = await fetch("/api/activities");
    const data = await response.json();
    setActivities(data);
  }

  return (
    <div>
      <h1>CampusLink</h1>
      <button onClick={loadActivities}>
        Gauti veiklas
      </button>
      <p>
        {activities === null
          ? "Duomenys dar negauti"
          : `Gautos veiklos: ${JSON.stringify(activities)}`}
      </p>
    </div>
  );
}

export default App;

