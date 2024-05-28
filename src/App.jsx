import "./App.css";
import { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Nav } from "./components/Nav";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register } from "./components/Register";
import { Account } from "./components/Account";
import Game from "./game";
import { Scores } from "./components/Scores";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";
import { Admin } from "./components/Admin";

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
