import "./App.css";
import { useEffect, useState } from "react";

import Player from "./SpriteAnimation.jsx";

import { Route, Routes } from "react-router-dom";
import Game from "./game";
import Register from "./Register.jsx";

const USER_API = `https://cherry-stone-studios.onrender.com/api/users/`;
const SCORE_API = `https://cherry-stone-studios.onrender.com/api/scores/`;
const ADMIN_API = `https://cherry-stone-studios.onrender.com/api/admin/`;
const FRIENDS_API = `https://cherry-stone-studios.onrender.com/api/users/friends/`;

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/register" element={<Register />} />
        {/* < Player /> */}
      </Routes>
    </>
  );
}

export default App;
