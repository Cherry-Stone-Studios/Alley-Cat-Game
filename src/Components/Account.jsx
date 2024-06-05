import "../CSS/account.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import backgroundMusic from "../assets/music/menu.mp3";
import { useNavigate } from "react-router-dom";
import { Nav } from "./Nav.jsx";
import EditInfo from "./EditInfo.jsx";
import GlobalScores from "./GlobalScores";
import PersonalScores from "./PersonalScores";
import TheChonkImage from "../assets/ChonkCat/gatito_parada_espera.png";
import Popup from "reactjs-popup";
import BackButton from "./BackButton";
import "ldrs/newtonsCradle";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function Account({
  userToken,
  setUserToken,
  userID,
  username,
  setUsername,
}) {
  // contruct new useState for new data, pass into editInfo component
  const [currName, setCurrName] = useState("");
  const [currUsername, setCurrUsername] = useState("");
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [thisUser, setThisUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const bgMusic = new Audio(backgroundMusic);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameCounterRef = useRef(0); // Counter for frame delay
  const frameDelay = 8; // Number of frames to delay animation update

  const navigate = useNavigate();

  // get the info of this user interacting with the account page
  useEffect(() => {
    async function getUser() {
      try {
        let fetchAPI = await fetch(`${API_URL}/api/users/username/${username}`);
        let jsonCatch = await fetchAPI.json();
        setThisUser(jsonCatch);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, []);

  const deleteAccount = async () => {
    setIsLoading(true);
    const confirmation = confirm(
      "Oh no! We're sorry that you want to delete your account.\n\nWARNING: This action cannot be undone!\n\nAre you really sure you want to delete your account?\n\nCancel to go back!"
    );
    if (confirmation === true) {
      try {
        const response = await fetch(`${API_URL}/api/users/${userID}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
        const result = await response.json();
        console.log(result);
        alert(result.message);
        alert("Lucky for you, you can always play as a guest!");
        setUserToken(null);
        setUsername("");
        setIsLoading(false);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    }
  };

  // music start
  const playMusic = async () => {
    const confirmation = confirm(
      "Enjoy this secret treato!\n\n (Cancel to stop music.)"
    );
    if (confirmation === true) {
      try {
        bgMusic.loop = true;
        bgMusic.volume = 0.05;
        bgMusic.play();
      } catch (err) {
        console.error(err);
      }
    } else if (confirmation === false) {
      try {
        bgMusic.loop = false;
        bgMusic.pause();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // music stop
  const stopMusic = async () => {
    try {
      bgMusic.loop = false;
      bgMusic.pause();
    } catch (err) {
      console.error(err);
    }
  };

  // cat sprite
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 720;

    ctx.imageSmoothingEnabled = false;

    class TheChonk {
      constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 500; // size of cats
        this.height = 420;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.image = new Image();
        this.image.src = TheChonkImage;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 5; // number of columns
        this.maxFrameY = 14; // number of rows
        this.reverse = false; // to track the direction of the animation
      }

      draw(context) {
        context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        context.drawImage(
          this.image,
          this.frameX * this.spriteWidth,
          this.frameY * this.spriteHeight,
          this.spriteWidth,
          this.spriteHeight,
          150,
          0,
          this.width,
          this.height
        );
      }

      update() {
        frameCounterRef.current++; // Increment frame counter
        if (frameCounterRef.current >= frameDelay) {
          // Check if enough frames have passed
          frameCounterRef.current = 0; // Reset frame counter
          if (!this.reverse) {
            if (this.frameX < this.maxFrameX) {
              this.frameX++;
            } else if (this.frameY < this.maxFrameY) {
              this.frameX = 0;
              this.frameY++;
            } else {
              this.reverse = true;
            }
          } else {
            if (this.frameX > 0) {
              this.frameX--;
            } else if (this.frameY > 0) {
              this.frameX = this.maxFrameX;
              this.frameY--;
            } else {
              this.reverse = false;
            }
          }
        }
      }
    }

    const theChonk = new TheChonk(canvas.width, canvas.height);

    theChonk.image.onload = () => {
      const animate = () => {
        theChonk.update();
        theChonk.draw(ctx);
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    };

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <>
      <h1 className="textHeader">{`WELCOME HOME, ${username}`}</h1>

      <p className="accountHello">
        Prowl the alleys and collect fish in this purr-fect adventure!
      </p>
      <div onClick={() => stopMusic()}>
        <Nav userToken={userToken} userID={userID} />
      </div>
      <canvas ref={canvasRef} id="canvas2" onClick={() => playMusic()}></canvas>

      <EditInfo
        userToken={userToken}
        currName={currName}
        setCurrName={setCurrName}
        currUsername={currUsername}
        setCurrUsername={setCurrUsername}
        currEmail={currEmail}
        setCurrEmail={setCurrEmail}
        currPassword={currPassword}
        setCurrPassword={setCurrPassword}
        thisUser={thisUser}
        setThisUser={setThisUser}
      />

      <div className="accountButtonBox">
        <div className="accountScoresBox">
          <div className="scoresBox1">
            <h2 className="accounth2">Global Leaderboard</h2>

            {isLoading ? (
              <l-newtons-cradle
                className="button"
                color="aqua"
              ></l-newtons-cradle>
            ) : (
              <GlobalScores limit={20} />
            )}
          </div>
          <div className="spacer"></div>
          <div className="scoresBox2">
            <h2 className="accounth2">{` ${thisUser.username}'s Leaderboard`}</h2>

            {isLoading ? (
              <l-newtons-cradle
                className="button"
                color="aqua"
              ></l-newtons-cradle>
            ) : (
              <PersonalScores username={username} limit={20} />
            )}
          </div>
        </div>
      </div>

      <Popup
        trigger={<button className="button"> Delete Account </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="accountHeader">
              Are you sure you want to <br />
              delete your account,
              {` ${thisUser.username}`}?
            </div>
            <br />
            <div className="accountHeader">
              Your high scores will be converted to <br />
              guest scores with your current username. <br />
              You will be able to continue as a guest.
            </div>
            <div className="actions">
              <div className="loading">
                {isLoading ? (
                  <l-newtons-cradle
                    className="button"
                    color="aqua"
                  ></l-newtons-cradle>
                ) : (
                  <button
                    className="button"
                    onClick={async () => {
                      await deleteAccount();
                      close();
                    }}
                  >
                    Delete Account
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}
