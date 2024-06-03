import "../CSS/background.css";
import "../CSS/gameinfo.css";
import Game from "../game.jsx";
import { Nav } from "./Nav";
import { useState } from "react";
import React from "react";
import Popup from "reactjs-popup";
import "ldrs/newtonsCradle";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function GamePage({
  userToken,
  userID,
  setScore,
  username,
  setGuestname,
  guestname,
  setGuestScore,
  guestScore,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [inGame, setInGame] = useState(false);
  // isMobile
  // detects from browser in a useEffect if the user is on a mobile device
  // if on mobile, then we show the mobile control canvas over the game

  const submitHighScore = async (score) => {
    setIsLoading(true);

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

        setScore(data.value);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    } else {
      setGuestScore(score);
    }
  };

  const guestHighScore = async () => {
    setIsLoading(true);

    if (guestScore > 0) {
      try {
        setIsSending(true);

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

        setScore(data.value);

        setScore({ data });
        setGuestScore(0);
        setIsLoading(false);
        setIsSending(false);
      } catch (error) {
        setIsLoading(false);
        setIsSending(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2 className="goodLuck">Good luck! Eat lots of fish!</h2>
      {<Nav userToken={userToken} userID={userID} />}

      {/* this is where the canvas for the mobile stuff will render if the user is on mobile */}

      {/* <div className="catBox">
            <canvas
              ref={canvasRef}
              id="canvas2"
              onClick={() => playMusic()}
            ></canvas>
          </div> */}

      {/* find a way to get the game to only play when on this page  */}
      <Game submitHighScore={submitHighScore} />

      {
        <Popup id="scoreSubmit" open={guestScore > 0} modal nested>
          {(close) => (
            <div className="modal">
              <button className="close" onClick={close}>
                ･.･
              </button>
              <div className="header">
                Register to Automatically Save Scores
              </div>
              <div className="content">
                <form>
                  <p>Enter Name and Restart!</p>
                  <label className="formLabel">
                    Username:
                    <input
                      type="text"
                      onChange={(e) => setGuestname(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setIsSending(true);
                          await guestHighScore();
                          close();
                        }
                      }}
                    />
                  </label>
                </form>
              </div>
              <div className="actions">
                <div className="loading">
                  {isSending ? (
                    <l-newtons-cradle
                      className="button"
                      color="aqua"
                    ></l-newtons-cradle>
                  ) : (
                    <button
                      className="button"
                      id="scoreButton"
                      onClick={async () => {
                        await guestHighScore();
                        close();
                      }}
                    >
                      Save High Score!
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Popup>
      }
    </>
  );
}
