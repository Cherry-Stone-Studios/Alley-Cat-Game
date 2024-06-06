import { Nav } from "./Nav";
import GlobalScores from "./GlobalScores";
import { newtonsCradle } from "ldrs";
newtonsCradle.register();

export function Scores({ userToken, userID, limit }) {
  return (
    <>
      <h1 className="textHeader">Global High Scores</h1>
      {<Nav userToken={userToken} userID={userID} />}
      <GlobalScores limit={100} />
    </>
  );
}
