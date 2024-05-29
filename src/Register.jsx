import BackButton from "./Components/BackButton";
import "./CSS/Register.css";
import { useState } from "react";
require("dotenv").config();

const Register = () => {
  // States for registration
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [DOB, setDOB] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
    setSubmitted(false);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
    setSubmitted(false);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setSubmitted(false);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    setSubmitted(false);
  };

  const handleDOB = (event) => {
    setDOB(event.target.value);
    console.log(event.target.value);
    setSubmitted(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log("in register handle");
    const response = await fetch(`${DATABASE_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password, email, DOB }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <BackButton />
      <div>
        <h2>Create an Account!</h2>
        <form onSubmit={handleRegister}>
          <label>
            Name:
            <input
              type="text"
              id="name"
              placeholder="Name"
              onChange={handleName}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleUsername}
              required
            />
          </label>
          <label>
            Email Address:
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={handleEmail}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              id="password"
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              id="retypedPassword"
              placeholder="Confirm Password"
              required
            />
          </label>
          <label>
            Date of Birth:
            <input type="date" id="DOB" onChange={handleDOB} required />
          </label>
          <button type="submit">Create a Cat!</button>
        </form>
        {/* MAKE THIS BUTTON LINK TO /LOGIN PAGE */}
        <button>Have an Account?</button>
      </div>
    </>
  );
};

export default Register;
