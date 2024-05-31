import "../CSS/background.css";
import Game from "../game.jsx";
import { Nav } from "./Nav";
import { useState } from "react";

export function GamePage({ userToken, setScore, username }) {
  // const [guestname, setGuestname] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function submitHighScore(score) {
    const guestname = prompt("What name do you want for your high score?");

    try {
      const createScore = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          username,
          guestname,
          date: new Date().toISOString(),
        }),
      };

      const apiKeyResponse = await fetch(
        "https://cherry-stone-studios.onrender.com/api/scores/",
        createScore
      );

      const unpackedKey = await apiKeyResponse.json();

      console.log("THIS IS THE UNPACKED KEY", unpackedKey);

      setScore({ unpackedKey });

      alert(unpackedKey.message);
    } catch (error) {
      throw error;
    }
  }

  // const submitHighScore = async (score) => {
  //   // check to see if there is a userToken
  //   // if there is a userToken, get the username from the body and create the high score
  //   // else, the player is a guest and requires a guestname
  //   // if the guestname exists, create a guest high score
  //   // else, run the createGuestName function to
  //   // collect a guestname input from the user
  //   // then create a highscore for the user
  //   // using the api call with the correct inputs for each if statement
  //   // use the body to set the date/time, user info, etc

  //   //   createGuestName();
  //   //   setScore(score);
  //   //   console.log(score);

  //   const guestname = prompt("What name do you want for your high score?");

  //   try {
  //     const createScore = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         score,
  //         username,
  //         guestname,
  //         date: new Date().toISOString(),
  //       }),
  //     };

  //     const apiKeyResponse = await fetch(
  //       "https://cherry-stone-studios.onrender.com/api/scores/",
  //       createScore
  //     );

  //     const unpackedKey = await apiKeyResponse.json();

  //     setScore(unpackedKey.token);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // const createGuestName = async () => {
  //   // this function will need to create a popup for the user
  //   // if the user already has a token, return their username to the higScore
  //   // that will prompt them with an empty text box
  //   // to enter their guestname in order to save their highscore
  //   // and a message encouraging them to register to save their scores

  //   {
  //     userToken ? { username } : setIsOpen(true);
  //   }
  // };

  // console.log("THIS IS THE USE STATE guestname", guestname);

  // field showing the final highscore
  // if user is a registered member, show their username next to the score
  // if the user is a guest, show an input box to allow them to add a guestname
  // include a message that highscore names need to be 25 characters or less

  return (
    <>
      <h1>Good luck! Eat lots of fish!</h1>
      {<Nav userToken={userToken} />}

      <Game submitHighScore={submitHighScore} />

      {/* <UsernamePop
         setGuestname={setGuestname}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}

      {/* {<UsernamePop guestname={guestname} />} */}
    </>
  );
}
