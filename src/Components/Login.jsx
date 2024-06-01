import "../CSS/form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import BackButton from "./BackButton";

const API_URL = "https://cherry-stone-studios.onrender.com";

export function Login({
  userToken,
  setUserToken,
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) {
  const navigate = useNavigate();

  // Handles the login form submission
  async function handleLogin(event) {
    event.preventDefault();
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
      localStorage.setItem("token", unpackedKey.token);
      alert(unpackedKey.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {<Nav userToken={userToken} />}

      <br />
      <h2 className="textHeader">Login</h2>
      <h3 className="loginh3">Please play safely!</h3>
      <form id="login" className="form" onSubmit={handleLogin}>
        <label className="formLabel">
          Username:
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>

        <label className="formLabel">
          Password:
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password!"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
        </label>

        <label className="formCheckbox">
          Show Password
          <input
            className="checkbox"
            type="checkbox"
            value={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
        </label>
        <button form="login" type="submit" className="button">
          Submit
        </button>
      </form>
      <BackButton />
      {/* {error && <alert>{error}</alert>} */}
    </>
  );
}
