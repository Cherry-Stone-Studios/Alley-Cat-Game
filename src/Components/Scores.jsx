import { Nav } from "./Nav";
import HighScores from "./BackButton";

export function Scores({ userToken, globalScores }) {
  return (
    <>
      <h1 className="textHeader">Global High Scores</h1>
      {<Nav userToken={userToken} />}
      <HighScores globalScores={globalScores} />
    </>
  );
}
