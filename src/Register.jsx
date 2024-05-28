import BackButton from "./Components/BackButton";
import "./CSS/Register.css";
import { useState } from "react";

const Form = () => {
  // States for registration
  const [name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
};

const handleName = (e) => {
  setName(e.target.value);
  setSubmitted(false);
};

const handleRegister = async (event) => {
  event.preventDefault();
  const response = await fetch("/Register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, password, email, date_of_birth }),
  });
  const data = await response.json();
};

const Register = () => {
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
              placeholder="Name"
              onChange={handleName}
              value={name}
              required
            />
          </label>
          <label>
            Username:
            <input type="text" placeholder="Username" required />
          </label>
          <label>
            Email Address:
            <input type="email" placeholder="Email" required />
          </label>

          <label>
            Password:
            <input type="password" placeholder="Password" required />
          </label>
          <label>
            Confirm Password:
            <input type="password" placeholder="Confirm Password" required />
          </label>
          <label>
            Date of Birth:
            <input type="date" required />
          </label>
        </form>
        <button type="submit">Create a Cat!</button>
        {/* MAKE THIS BUTTON LINK TO /LOGIN PAGE */}
        <button>Have an Account?</button>
      </div>
    </>
  );
};

export default Register;
