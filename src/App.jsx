import "./App.css";

import Player from "./SpriteAnimation.jsx";

import { Route, Routes } from "react-router-dom";
import Game from "./game";
import Register from "./Register.jsx";

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
