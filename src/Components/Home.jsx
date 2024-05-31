import "../CSS/home.css";
import React from "react";
import backgroundMusic from "../assets/music/menu.mp3";
import { Nav } from "./Nav.jsx";
import GameInfo from "./GameInfo.jsx";

export function Home({ userToken }) {
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
      <h1 className="alleyHeader">ALLEY CAT</h1>
      <p className="alleyHome">
        In the cruel streets, we must rely on our smarts and ability to level
        our chonk.
      </p>
      <div onClick={() => stopMusic()}>
        <Nav userToken={userToken} />
        <GameInfo />
      </div>
      <img src={"/src/curiouscat.gif"} onClick={() => playMusic()} />
      <br></br>
      <br></br>
    </>
  );
}

export default Home;
