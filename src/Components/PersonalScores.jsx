import "../CSS/scores.css";
import { useEffect, useState } from "react";

const API_URL = "https://cherry-stone-studios.onrender.com";

const PersonalScores = ({ username, limit }) => {
  const [personalScores, setPersonalScores] = useState([]);

  useEffect(() => {
    async function getScores() {
      try {
        let fetchAPI = await fetch(`${API_URL}/api/scores/${username}`);
        let jsonCatch = await fetchAPI.json();
        setPersonalScores(jsonCatch);
      } catch (err) {
        console.log(err);
      }
    }
    getScores();
  }, []);

  let sortedScores = personalScores.sort((score1, score2) => {
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
                  Date: {score.created_on.substring(0, 10)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonalScores;
