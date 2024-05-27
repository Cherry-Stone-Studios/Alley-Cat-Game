import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    if (!history.state.idx) navigate("/");
    if (window.location.pathname !== "/") navigate(-1);
  };

  return (
    <>
      <button id="BackButton" onClick={clickHandler}>
        Go Back
      </button>
    </>
  );
};

export default BackButton;
