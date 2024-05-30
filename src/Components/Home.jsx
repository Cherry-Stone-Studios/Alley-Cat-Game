import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/stylehome.css";
import backgroundMusic from "../assets/music/menu.mp3";
import { useEffect } from "react";
import { Nav } from "./Nav.jsx";
import { useState } from "react";
import { UsernamePop } from "../Components/UsernamePop.jsx";

export function Home({ createGuestName, userToken }) {
  const navigate = useNavigate();
  const bgMusic = new Audio(backgroundMusic);

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

  return (
    <>
      <h1>ALLEY CAT</h1>
      <p>
        In these cruel streets, a cat must rely on his smarts...and his chonk
      </p>
      <img
        src={"/src/assets/gifs/curiouscat.gif"}
        onClick={() => playMusic()}
      />
      <br></br>
      <br></br>
      <UsernamePop createGuestName={createGuestName} />

      <div onClick={() => stopMusic()}>
        <Nav userToken={userToken} />
      </div>

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
