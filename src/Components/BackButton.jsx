import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (!history.state.idx) navigate("/");
    if (window.location.pathname !== "/") navigate(-1);
  };

  return (
    <>
      <button className="button" onClick={clickHandler}>
        Go Back
      </button>

      {/* <h1>WHERE AM I HIDING HUH</h1> */}
    </>
  );
};

export default BackButton;
