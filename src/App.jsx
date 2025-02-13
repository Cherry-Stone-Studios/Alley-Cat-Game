import "./CSS/App.css";
import { useEffect, useState } from "react";
import { Home } from "./Components/Home.jsx";
import { Nav } from "./Components/Nav.jsx";
import { Login } from "./Components/Login.jsx";
import { Logout } from "./Components/Logout.jsx";
import { Account } from "./Components/Account.jsx";
import { GamePage } from "./Components/GamePage.jsx";
import { Scores } from "./Components/Scores.jsx";
import { Terms } from "./Components/Terms.jsx";
import { Privacy } from "./Components/Privacy.jsx";
import { Admin } from "./Components/Admin.jsx";
import { Footer } from "./Components/Footer.jsx";
import Register from "./Components/Register.jsx";

import { Route, Routes } from "react-router-dom";

const API_URL = "https://cherry-stone-studios.onrender.com";

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

  useEffect(() => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (
          ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
            e.code
          ) > -1
        ) {
          e.preventDefault();
        }
      },
      false
    );
  }, []);

  return (
    <>
      <Routes>
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
              setGuestname={setGuestname}
              setGuestScore={setGuestScore}
            />
          }
        />

        <Route
          path="/logout"
          element={
            <Logout
              setUserToken={setUserToken}
              setUserID={setUserID}
              setUsername={setUsername}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setDate_of_birth={setDate_of_birth}
              setShowPassword={setShowPassword}
              setGuestname={setGuestname}
              setGuestScore={setGuestScore}
            />
          }
        />

        <Route
          path="/register"
          element={
            <Register
              userToken={userToken}
              setUserID={setUserID}
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
              setUserToken={setUserToken}
              userID={userID}
              username={username}
              setUsername={setUsername}
              setUserID={setUserID}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setDate_of_birth={setDate_of_birth}
              setShowPassword={setShowPassword}
              setGuestname={setGuestname}
              setGuestScore={setGuestScore}
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
