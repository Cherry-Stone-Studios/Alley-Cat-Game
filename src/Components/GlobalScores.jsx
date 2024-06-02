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

  let sortedScores = globalScores.sort((score1, score2) => {
    if (score2.value > score1.value) {
      return 1;
    } else if (score2.value < score1.value) {
      return -1;
    }
    return 0;
  });

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
                  Name:
                  {score.name ? score.name : score.guestname}
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
