import "./App.css";
import { useEffect, useState } from "react";
import { Home } from "./Components/Home.jsx";
import { Nav } from "./Components/Nav.jsx";
import { Login } from "./Components/Login.jsx";
import { Logout } from "./Components/Logout.jsx";
import { Register } from "./Components/Register.jsx";
import { Account } from "./Components/Account.jsx";
import Game from "./game";
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
  return (
    <>
      <Routes>
        {/* home, nav, login, logout, register, account, game, scores, terms, privacy, admin */}
        <Route path="/" element={<Home />} />

        <Route path="/nav" element={<Nav />} />

        <Route path="/login" element={<Login />} />

        <Route path="/logout" element={<Logout />} />

        <Route path="/register" element={<Register />} />

        <Route path="/user/:id" element={<Account />} />

        <Route path="/game" element={<Game />} />
        <Route path="/highscores" element={<Scores />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
