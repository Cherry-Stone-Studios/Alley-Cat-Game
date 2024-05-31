import "../CSS/home.css";
import React from "react";
import backgroundMusic from "../assets/music/menu.mp3";
import { Nav } from "./Nav.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function Account({ userToken, username }) {
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
      <h1 className="alleyHeader">{`WELCOME HOME, ${username}`}</h1>
      <p className="alleyHome">
        Prowl the alleys and collect fish in this purr-fect adventure!
      </p>
      <div onClick={() => stopMusic()}>
        <Nav userToken={userToken} />
      </div>
      <img src={"/src/curiouscat.gif"} onClick={() => playMusic()} />
      <div>
        <h2 className="alleyHome">Global Leaderboard</h2>
        {/* PLACE LEADERBOARD COMPONENT */}
        {/* <Leaderboard /> */}
        {/* PLACE USER LEADERBOARD COMPONENT */}
        <h2 className="alleyHome">{`${username}'s Leaderboard`}</h2>
        {/* <UserLeaderboard/> */}
      </div>
      <br></br>
      <br></br>
    </>
  );
}
