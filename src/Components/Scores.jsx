import { Nav } from "./Nav";
import BackButton from "./BackButton";

export function Scores({ userToken }) {
  return (
    <>
      <h1>SCORES</h1>
      {<Nav userToken={userToken} />}
      <BackButton />;
      <br />
    </>
  );
}
