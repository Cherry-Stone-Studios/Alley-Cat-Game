import "./App.css";
import { useEffect, useState } from "react";
import { Home } from "./Components/Home.jsx";
import { Nav } from "./Components/Nav.jsx";
import { Login } from "./Components/Login.jsx";
import { Logout } from "./Components/Logout.jsx";
import Register from "./Components/Register.jsx";
import { Account } from "./Components/Account.jsx";
import { GamePage } from "./Components/GamePage.jsx";

import { Scores } from "./Components/Scores.jsx";
import { Terms } from "./Components/Terms.jsx";
import { Privacy } from "./Components/Privacy.jsx";
import { Admin } from "./Components/Admin.jsx";

import Player from "./SpriteAnimation.jsx";

import { Route, Routes } from "react-router-dom";

const USER_API = `https://cherry-stone-studios.onrender.com/api/users/`;
const SCORE_API = `https://cherry-stone-studios.onrender.com/api/scores/`;
const ADMIN_API = `https://cherry-stone-studios.onrender.com/api/admin/`;
const FRIENDS_API = `https://cherry-stone-studios.onrender.com/api/users/friends/`;

function App() {
  const [userToken, setUserToken] = useState(null);
  const [score, setScore] = useState({});

  return (
    <>
      <Routes>
        {/* home, nav, login, logout, register, account, game, scores, terms, privacy, admin */}
        <Route path="/" element={<Home userToken={userToken} />} />

        <Route path="/nav" element={<Nav userToken={userToken} />} />

        <Route
          path="/login"
          element={<Login userToken={userToken} setUserToken={setUserToken} />}
        />

        <Route
          path="/logout"
          element={<Logout setUserToken={setUserToken} />}
        />

        <Route
          path="/register"
          element={
            <Register userToken={userToken} setUserToken={setUserToken} />
          }
        />

        <Route path="/user/:id" element={<Account userToken={userToken} />} />

        <Route
          path="/game"
          element={<GamePage userToken={userToken} setScore={setScore} />}
        />
        <Route path="/highscores" element={<Scores score={score} />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin" element={<Admin userToken={userToken} />} />
      </Routes>
    </>
  );
}

export default App;
