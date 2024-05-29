/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom";
import "./stylehome.css";

export function Nav({userToken, onPauseBackgroundMusic}) {

  const handleItemClick = () => {
    if (onPauseBackgroundMusic) {
      onPauseBackgroundMusic();
    }
  }

export function Nav({ userToken }) {

  return (
    <>
      <div className="navBox">
        <div className="navRow">
          <Link to="/">
            <div className="navItem">Home</div>
          </Link>

          <Link to="/game" onClick={handleItemClick}>
            <div className="navItem">Play!</div>
          </Link>

          <Link to="/highscores" onClick={handleItemClick}>
            <div className="navItem">High Scores</div>
          </Link>

          {userToken ? (
            <>
              <Link to="/user/:id">
                <div className="navItem">Account</div>
              </Link>

              <Link to="/logout">
                <div className="navItem">Logout</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" onClick={handleItemClick}>
                <div className="navItem">Register</div>
              </Link>
              <Link to="/login" onClick={handleItemClick}>
                <div className="navItem">Login</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
