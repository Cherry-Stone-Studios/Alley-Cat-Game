import "../CSS/home.css";
import { useState, useEffect, useRef } from "react";
import React from "react";
import backgroundMusic from "../assets/music/menu.mp3";
import { Nav } from "./Nav.jsx";
import EditInfo from "./EditInfo.jsx";

import TheChonkImage from "../assets/ChonkCat/gatito_parada_espera.png";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function Account({
  userToken,
  userID,
  name,
  username,
  email,
  password,
  date_of_birth,
  setUsername,
  setName,
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  // contruct new useState for new data, pass into editInfo component
  const [currName, setCurrName] = useState("");
  const [currUsername, setCurrUsername] = useState("");
  const [currEmail, setCurrEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [thisUser, setThisUser] = useState([]);

  const bgMusic = new Audio(backgroundMusic);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const frameCounterRef = useRef(0); // Counter for frame delay
  const frameDelay = 8; // Number of frames to delay animation update

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

  const theupdatedUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/${thisUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: currName,
          username: currUsername,
          email: currEmail,
          password: currPassword,
        }),
      });
      const result = await response.json();

      setUpdatedUser(result);
    } catch (err) {
      console.error(err);
    }
  };

  const playMusic = async () => {
    const confirmation = confirm(
      "Hurry home, Alley Cat!\n\n (Cancel to stop music.)"
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

  const stopMusic = async () => {
    try {
      bgMusic.loop = false;
      bgMusic.pause();
    } catch (err) {
      console.error(err);
    }
  };

  // put function to json with new user data

  // use new data from new useStates in json,
  // use new json data to set original props

  const updateInfo = async () => {
    // if data is not the same, trigger the api PUT call
    try {
      const updatedUser = await fetch(`${API_URL}/api/scores/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          name: newName,
          password: newPassword,
          email: newEmail,
        }),
      });
      const data = await createScore.json();

      setScore(data.value);
    } catch (error) {
      console.log(error);
    }
    // else, just close module
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 720;

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
      <h1 className="alleyHeader">{`WELCOME HOME, ${thisUser.username}`}</h1>

      <p className="alleyHome">
        Prowl the alleys and collect fish in this purr-fect adventure!
      </p>
      <div onClick={() => stopMusic()}>
        <Nav userToken={userToken} userID={userID} />
      </div>
      {/* <img src={"/src/curiouscat.gif"} onClick={() => playMusic()} /> */}
      <canvas ref={canvasRef} id="canvas2" onClick={() => playMusic()}></canvas>
      <div>
        <h2 className="alleyHome">Global Leaderboard</h2>
        {/* PLACE LEADERBOARD COMPONENT */}
        {/* <Leaderboard /> */}
        {/* PLACE USER LEADERBOARD COMPONENT */}
        <h2 className="alleyHome">{`${thisUser.username}'s Leaderboard`}</h2>
        {/* <UserLeaderboard/> */}
      </div>
      <EditInfo
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
    </>
  );
}
