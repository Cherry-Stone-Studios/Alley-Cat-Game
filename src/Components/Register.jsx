import "../CSS/form.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Nav } from "./Nav";
import BackButton from "./BackButton";

const API_URL = "https://cherry-stone-studios.onrender.com";

const Register = ({
  userToken,
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
    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
          date_of_birth,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUserToken(data.token);
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      {<Nav userToken={userToken} />}
      <BackButton />
      <br />
      <h2 className="formHeader">Create an Account!</h2>
      <form id="register" onSubmit={handleRegister} className="form">
        <label className="formLabel">
          Name:
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={handleName}
            required
          />
        </label>

        <label className="formLabel">
          Username:
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleUsername}
            required
          />
        </label>

        <label className="formLabel">
          Email Address:
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            required
          />
        </label>

        <label className="formLabel">
          Password:
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handlePassword}
            id="password"
            required
          />
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

        <label className="formLabel">
          Date of Birth:
          <input
            type="date"
            id="date_of_birth"
            onChange={handleDate_of_birth}
            required
          />
        </label>

        <input
          type="radio"
          id="agreeterms"
          name="terms"
          value="Agree to Terms"
          required="required"
        />
        <label className="formLabel" for="agreeterms">
          I agree to the <Link to={"/terms"}>Terms of Use</Link> and
          <Link to={"/privacy"}>Privacy Policy</Link>
        </label>
      </form>
      <button form="register" type="submit" className="button">
        Create Cat!
      </button>
      {/* {errorMessage && <h2>{errorMessage}</h2>} */}
    </>
  );
};

export default Register;
