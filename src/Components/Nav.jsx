import "../CSS/nav.css";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";

export function Nav({ userToken, onPauseBackgroundMusic }) {
  const handleItemClick = () => {
    if (onPauseBackgroundMusic) {
      onPauseBackgroundMusic();
    }
  };

  return (
    <>
      <BackButton />
      <div className="navBox">
        <div className="navRow">
          {window.location.pathname === "/" ? (
            <></>
          ) : (
            <Link to="/">
              <div className="button">Home</div>
            </Link>
          )}

          <Link to="/game" onClick={handleItemClick}>
            <div className="button">Play!</div>
          </Link>

          <Link to="/highscores" onClick={handleItemClick}>
            <div className="button">High Scores</div>
          </Link>

          {userToken ? (
            <>
              {window.location.pathname === "/user/:id" ? (
                <></>
              ) : (
                <Link to="/user/:id">
                  <div className="button">Account</div>
                </Link>
              )}

              <Link to="/logout">
                <div className="button">Logout</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" onClick={handleItemClick}>
                <div className="button">Register</div>
              </Link>
              <Link to="/login" onClick={handleItemClick}>
                <div className="button">Login</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
