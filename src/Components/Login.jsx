import "../CSS/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import BackButton from "./BackButton";
import "ldrs/newtonsCradle";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function Login({
  userToken,
  setUserToken,
  userID,
  setUserID,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handles the login form submission
  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const loginPackage = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      };

      const apiKeyResponse = await fetch(
        `${API_URL}/api/users/login`,
        loginPackage
      );

      const unpackedKey = await apiKeyResponse.json();

      if (unpackedKey.message == `Welcome ${username}, you're logged in!`) {
        console.log("Welcome back!", username);
      }
      setUserToken(unpackedKey.token);
      setUserID(unpackedKey.id);
      localStorage.setItem("token", unpackedKey.token);
      alert(unpackedKey.message);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Oops! You've encountered an error, try again.");
    }
  }

  return (
    <>
      {<Nav userToken={userToken} userID={userID} />}

      <br />
      <h2 className="textHeader">Login</h2>
      <h3 className="loginh3">Please play safely!</h3>
      <form id="login" className="loginform" onSubmit={handleLogin}>
        <div className="logininputArea">
          <label className="loginformLabel">
            <p className="loginlabelText">{" Username"}</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>

          <label className="loginformLabel">
            <p className="loginlabelText">{" Password"}</p>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="loginformCheckbox">
            <div>
              <input
                type="checkbox"
                value={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              {" See Password"}
            </div>
          </label>
        </div>

        <div className="loading">
          {isLoading ? (
            <l-newtons-cradle
              className="button"
              color="aqua"
            ></l-newtons-cradle>
          ) : (
            <button form="login" type="submit" className="button">
              Submit
            </button>
          )}
        </div>
      </form>
      <BackButton />
      {/* {error && <alert>{error}</alert>} */}
    </>
  );
}
