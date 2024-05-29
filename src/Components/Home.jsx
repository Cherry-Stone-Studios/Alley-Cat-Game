import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/stylehome.css";
import backgroundMusic from "../assets/menu.mp3";
import { useEffect } from "react";
import { Nav } from "./Nav.jsx";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);

  const bgMusic = new Audio(backgroundMusic);
  bgMusic.loop = true;
  bgMusic.volume = 0.5;
  bgMusic.play();

  const pauseBackgroundMusic = () => {
    bgMusic.pause();
  };

  return (
    <>
      <h1>ALLEY CAT</h1>
      <p>
        In these cruel streets, a cat must rely on his smarts...and his chonk
      </p>
      <img src={"../game_module/curiouscat.gif"} />
      <br></br>
      <br></br>
      <Nav
        userToken={userToken}
        onPauseBackgroundMusic={pauseBackgroundMusic}
      />
      {/* <button onClick={startGame}>START GAME</button>
      <br></br>
      <button>LOG IN</button>
      <br></br>
      <button>REGISTER</button>
      <br></br>
      <button>LEADERBOARDS</button> */}
    </>
  );
}

export default Home;
