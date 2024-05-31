import "../CSS/form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import BackButton from "./BackButton";

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

      setUserToken(unpackedKey.token);

      if (unpackedKey.message == `Welcome ${username}, you're logged in!`) {
        console.log("Welcome back!", userToken);
      }

      localStorage.setItem("token", unpackedKey.token);
      alert(unpackedKey.message);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      {<Nav userToken={userToken} />}
      <BackButton />;
      <br />
      <h2 className="formHeader">Login to play with your username!</h2>
      <form id="login" className="form" onSubmit={submitLogin}>
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
      </form>
      <button type="submit" form="login" className="button">
        Submit
      </button>
      {/* {error && <alert>{error}</alert>} */}
    </>
  );
}
