import "../CSS/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Nav } from "./Nav";
import BackButton from "./BackButton";
import "ldrs/newtonsCradle";

const API_URL = "https://cherry-stone-studios.onrender.com";

const Register = ({
  userToken,
  setUserID,
  userID,
  setUserToken,
  username,
  setUsername,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  date_of_birth,
  setDate_of_birth,
  showPassword,
  setShowPassword,
}) => {
  // States for just the registration page
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);

  // Handles the name input
  const handleName = (event) => {
    setName(event.target.value);
    setSubmitted(false);
  };

  // Handles the username input
  const handleUsername = (event) => {
    setUsername(event.target.value);
    setSubmitted(false);
  };

  // Handles the email input
  const handleEmail = (event) => {
    setEmail(event.target.value);
    setSubmitted(false);
  };

  // Handles the password input
  const handlePassword = (event) => {
    setPassword(event.target.value);
    setSubmitted(false);
  };

  // Handles the password input
  const handleConfirm = (event) => {
    setConfirm(event.target.value);
    setSubmitted(false);
  };

  // Handles the date_of_birth input
  const handleDate_of_birth = (event) => {
    setDate_of_birth(event.target.value);
    setSubmitted(false);
  };

  // Handles the register form submission
  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowPassword(false);
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          date_of_birth,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setUserToken(data.token);
        setUserID(data.id);
        localStorage.setItem("token", data.token);
        alert(data.message);
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("Oops! You've encountered an error, try again.");
    }
  };

  return (
    <>
      {<Nav userToken={userToken} userID={userID} />}
      <br />
      <h2 className="textHeader">Create an Account!</h2>
      <h3 className="registerh3">⮞ Compete for the best score!</h3>
      <h3 className="registerh3">⮞ Instantly Save Your High Score</h3>
      <h3 className="registerh3">⮞ See Your Personal Top Scores</h3>
      <h3 className="registerh3">⮞ Connect With Other Cool Cats</h3>
      <form id="register" className="form" onSubmit={handleRegister}>
        <div className="inputArea">
          <label className="formLabel">
            <p className="labelText">{" Name "}</p>
            <input type="text" id="name" onChange={handleName} required />
          </label>

          <label className="formLabel">
            <p className="labelText">{" Username "}</p>
            <input
              type="text"
              id="username"
              onChange={handleUsername}
              required
            />
          </label>

          <label className="formLabel">
            <p className="labelText">Email</p>
            <input id="email" type="email" onChange={handleEmail} required />
          </label>

          <label className="formDOB">
            <p className="labelText">Birthdate</p>
            <input
              type="date"
              id="date_of_birth"
              onChange={handleDate_of_birth}
              required
            />
          </label>

          <label className="formLabel">
            <p className="labelText">Password</p>
            <input
              type={showPassword ? "text" : "password"}
              onChange={handlePassword}
              id="password"
              required
            />
          </label>

          <label className="formCheckbox">
            <div className="checkbox">
              <input
                type="checkbox"
                value={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              {" See Password"}
            </div>
          </label>

          <legend>
            I Agree to the
            <Link className="registerlinks" to={"/terms"}>
              Terms of Use
            </Link>
            and
            <Link className="registerlinks" to={"/privacy"}>
              Privacy Policy
            </Link>
          </legend>
          <div>
            <input
              className="checkbox"
              type="checkbox"
              id="agreeterms"
              name="terms"
              value="Agree to Terms"
              required="required"
            />
            {" Yes! I have read and agree to the terms"}
          </div>
        </div>
        <div className="loading">
          {isLoading ? (
            <l-newtons-cradle color="aqua"></l-newtons-cradle>
          ) : (
            <button form="register" type="submit" className="button">
              Let's Go!
            </button>
          )}
        </div>
      </form>
      <BackButton />
      {/* {errorMessage && <h2>{errorMessage}</h2>} */}
    </>
  );
};

export default Register;
