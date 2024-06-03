import "../CSS/scores.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://cherry-stone-studios.onrender.com";

const GlobalScores = ({ limit }) => {
  const [globalScores, setGlobalScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getScores() {
      try {
        let fetchAPI = await fetch(`${API_URL}/api/scores/`);
        let jsonCatch = await fetchAPI.json();
        setGlobalScores(jsonCatch);
      } catch (err) {
        console.log(err);
      }
    }
    getScores();
  }, []);

  // Create a map to store the highest score for each player
  const highestScoresMap = {};

  globalScores.forEach((score) => {
    const playerName = score.name ? score.name : score.guestname;
    if (!highestScoresMap[playerName] || highestScoresMap[playerName].value < score.value) {
      highestScoresMap[playerName] = score;
    }
  });

  // Convert the map back into an array
  let highestScores = Object.values(highestScoresMap);

  // Sort the array
  let sortedScores = highestScores.sort((score1, score2) => {
    return score2.value - score1.value;
  });

  // Apply limit if necessary
  if (limit) {
    sortedScores = sortedScores.slice(0, limit);
  }

  return (
    <>
      <div className="allScores">
        <div className="eachScore">
          {sortedScores.map((score) => (
            <div key={score.id} className="oneScore">
              <div className="scoreCard">
                <div className="scoreDetails">
                  Name: {score.name ? score.name : score.guestname}
                </div>
                <div className="scoreDetails">Score: {score.value}</div>
                <div className="scoreDetails">
                  {score.name ? "User" : "Guest"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GlobalScores;
