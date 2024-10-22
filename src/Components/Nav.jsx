import "../CSS/nav.css";
import { Link } from "react-router-dom";

export function Nav({ userToken, userID, onPauseBackgroundMusic }) {
  const handleItemClick = () => {
    if (onPauseBackgroundMusic) {
      onPauseBackgroundMusic();
    }
  };

  return (
    <>
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
              {window.location.pathname === `/user/${userID}` ? (
                <></>
              ) : (
                <Link to={`/user/${userID}`}>
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
