import { Nav } from "./Nav";
import GlobalScores from "./GlobalScores";

export function Scores({ userToken, userID }) {
  return (
    <>
      <h1 className="textHeader">Global High Scores</h1>
      {<Nav userToken={userToken} userID={userID} />}
      <GlobalScores />
    </>
  );
}
