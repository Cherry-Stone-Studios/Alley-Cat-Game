/* TODO - add your code to create a functional React component that renders a login form */
import { Nav } from "./Nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ userToken, setUserToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submitLogin(event) {
    event.preventDefault();
    try {
      const registerPackage = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };

      const apiKeyResponse = await fetch(
        "https://cherry-stone-studios.onrender.com/api/users/login",
        registerPackage
      );

      const unpackedKey = await apiKeyResponse.json();

      console.log("THIS IS THE UNPACKED KEY", unpackedKey);

      setUserToken(unpackedKey.token);

      console.log("THIS IS THE USER TOKEN", userToken);

      if (unpackedKey.message === "Login successful") {
        console.log("Welcome back!");
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {<Nav userToken={userToken} />}

      {/* {error && <alert>{error}</alert>} */}

      <form className="loginForm" onSubmit={submitLogin}>
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

        <button className="submit">Submit</button>
      </form>
    </>
  );
}
