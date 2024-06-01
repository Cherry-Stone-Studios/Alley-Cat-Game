import "../CSS/home.css";
import React from "react";
import backgroundMusic from "../assets/music/menu.mp3";
import { Nav } from "./Nav.jsx";
import EditInfo from "./EditInfo.jsx";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function Account({
  userToken,
  setUserToken,
  username,
  setUsername,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  date_of_birth,
  setDate_of_birth,
}) {
  // contruct new useState for new data, pass into editInfo component
  const [currName, setCurrName] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [currEmail, setCurrEmail] = useState("");
  const [currUsername, setCurrUsername] = useState("");

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

  let newName = username;
  let newPassword = password;
  let newEmail = email;
  let newUsername = username;
  let newDate_of_birth = date_of_birth;

  console.log(`this is Account the newName`, newName);
  console.log(`this is Account the newUsername`, newUsername);
  console.log(`this is Account the newEmail`, newEmail);
  console.log(`this is Account the newPassword`, newPassword);
  console.log(`this is Account the newDate_of_birth`, newDate_of_birth);

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
        <EditInfo
          setCurrUsername={setCurrUsername}
          setCurrName={setCurrName}
          setCurrEmail={setCurrEmail}
          setCurrPassword={setCurrPassword}
          newName={newName}
          newPassword={newPassword}
          newEmail={newEmail}
          newUsername={newUsername}
          newDate_of_birth={newDate_of_birth}
        />

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
              <div className="header">
                {" "}
                Are you sure you want to delete your account {`${newUsername}`}?{" "}
              </div>
              <div className="content">
                <form>
                  {/* Form fields for user info */}
                  <button type="submit" onChange={(e) => closeSubmit()}>
                    Delete My Account
                  </button>
                </form>
              </div>
              <div className="actions">
                <button
                  className="button"
                  onClick={() => {
                    console.log("modal closed");
                    close();
                  }}
                >
                  close
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>

      <br></br>
      <br></br>
    </>
  );
}
