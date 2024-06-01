import "../CSS/background.css";
import "../CSS/gameinfo.css";
import Game from "../game.jsx";
import { Nav } from "./Nav";
import { useState } from "react";
import React from "react";
import Popup from "reactjs-popup";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function GamePage({ userToken, setScore, username }) {
  const [guestname, setGuestname] = useState("");
  const [guestScore, setGuestScore] = useState(0);

  console.log("THIS IS THE USERNAME", username);

  const submitHighScore = async (score) => {
    console.log("THIS IS THE ASYNC USERNAME", username);

    if (username.length > 0) {
      try {
        const createScore = await fetch(`${API_URL}/api/scores/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: score,
            username: username,
            guestname: "",
            created_on: new Date().toISOString(),
          }),
        });

        const data = await createScore.json();

        console.log("THIS IS THE UNPACKED KEY", data);

        setScore(data.value);
      } catch (error) {
        console.log(error);
      }
    } else {
      setGuestScore(score);
    }
  };

  const guestHighScore = async () => {
    console.log("THIS IS THE GUEST NAME STATE", guestname);
    if (guestScore > 0) {
      try {
        const createScore = await fetch(`${API_URL}/api/scores/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: guestScore,
            guestname: guestname,
            username: "",
            created_on: new Date().toISOString(),
          }),
        });

        const data = await createScore.json();

        console.log("THIS IS THE UNPACKED KEY", data);

        setScore(data.value);

        setScore({ data });
        setGuestScore(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="textHeader">Good luck! Eat lots of fish!</h1>
      {<Nav userToken={userToken} />}

      <Game submitHighScore={submitHighScore} />

      {
        <Popup open={guestScore > 0} modal nested>
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="header">
                Register to Automatically Save Scores{" "}
              </div>
              <div className="content">
                <form>
                  <label className="formLabel">
                    Username:
                    <input
                      type="text"
                      onChange={(e) => setGuestname(e.target.value)}
                    />
                  </label>
                </form>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={async () => {
                    console.log("Submitting Guest scores", guestScore);
                    await guestHighScore();
                    close();
                  }}
                >
                  Save High Score!
                </button>
              </div>
            </div>
          )}
        </Popup>
      }

      {/* {<UsernamePop guestname={guestname} />} */}
    </>
  );
}
