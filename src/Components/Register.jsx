import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useState } from "react";
const API_URL = "https://cherry-stone-studios.onrender.com";
import { Link } from "react-router-dom";
import { Nav } from "./Nav";

const Register = () => {
  // States for registration
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [confirm, setConfirm] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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

  // Handles the form submission
  const handleRegister = async (event) => {
    event.preventDefault();
    if (confirm !== password) {
      alert("PASSWORDS MUST MATCH");
      throw error;
    } else {
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
        if (response.ok) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/login");
        }
      } catch (error) {
        setErrorMessage(true);
      }
    }
  };

  return (
    <>
      <Nav />
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
              onChange={handleConfirm}
              required
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              id="date_of_birth"
              onChange={handleDate_of_birth}
              required
            />
          </label>
          <button type="submit">Create a Cat!</button>
        </form>
        <Link to={"/login"}>
          <button>Have an Account?</button>
        </Link>
        {/* {errorMessage && <h2>{errorMessage}</h2>} */}
      </div>
    </>
  );
};

export default Register;
