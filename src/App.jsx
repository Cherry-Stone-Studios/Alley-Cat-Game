import "./CSS/App.css";
import { useEffect, useState } from "react";
import { Home } from "./Components/Home.jsx";
import { Nav } from "./Components/Nav.jsx";
import { Login } from "./Components/Login.jsx";
import { Logout } from "./Components/Logout.jsx";
import Register from "./Components/Register.jsx";
import { Account } from "./Components/Account.jsx";
import { GamePage } from "./Components/GamePage.jsx";
import EditInfo from "./Components/EditInfo.jsx";
import { Scores } from "./Components/Scores.jsx";
import { Terms } from "./Components/Terms.jsx";
import { Privacy } from "./Components/Privacy.jsx";
import { Admin } from "./Components/Admin.jsx";

import Player from "./SpriteAnimation.jsx";

import { Route, Routes } from "react-router-dom";

const API_URL = "https://cherry-stone-studios.onrender.com";
const USER_API = `https://cherry-stone-studios.onrender.com/api/users/`;
const SCORE_API = `https://cherry-stone-studios.onrender.com/api/scores/`;
const ADMIN_API = `https://cherry-stone-studios.onrender.com/api/admin/`;
const FRIENDS_API = `https://cherry-stone-studios.onrender.com/api/users/friends/`;

function App() {
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserID] = useState(0);
  const [score, setScore] = useState({});
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [guestname, setGuestname] = useState("");
  const [guestScore, setGuestScore] = useState(0);

  // write a use effect to get the user's ID
  // get to json
  //c

  return (
    <>
      <Routes>
        {/* home, nav, login, logout, register, account, game, scores, terms, privacy, admin */}
        <Route
          path="/"
          element={<Home userToken={userToken} userID={userID} />}
        />

        <Route
          path="/nav"
          element={<Nav userToken={userToken} userID={userID} />}
        />

        <Route
          path="/login"
          element={
            <Login
              userToken={userToken}
              userID={userID}
              setUserToken={setUserToken}
              setUserID={setUserID}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />

        <Route
          path="/logout"
          element={<Logout setUserToken={setUserToken} />}
        />

        <Route
          path="/register"
          element={
            <Register
              userToken={userToken}
              userID={userID}
              setUserToken={setUserToken}
              username={username}
              setUsername={setUsername}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              date_of_birth={date_of_birth}
              setDate_of_birth={setDate_of_birth}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />

        <Route
          path={`/user/${userID}`}
          element={
            <Account
              userToken={userToken}
              userID={userID}
              username={username}
              setUsername={setUsername}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              date_of_birth={date_of_birth}
              setDate_of_birth={setDate_of_birth}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          }
        />

        <Route
          path="/game"
          element={
            <GamePage
              userToken={userToken}
              userID={userID}
              setScore={setScore}
              username={username}
              setGuestname={setGuestname}
              guestname={guestname}
              setGuestScore={setGuestScore}
              guestScore={guestScore}
            />
          }
        />
        <Route path="/highscores" element={<Scores score={score} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin" element={<Admin userToken={userToken} />} />
        <Route path="/edit" element={<EditInfo />} />
      </Routes>
    </>
  );
}

export default App;
