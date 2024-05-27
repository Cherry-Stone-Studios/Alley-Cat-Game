import React from "react";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <button onClick={handleBack} disabled={history.length <= 1}>
      GO BACK
    </button>
  );
};

export default BackButton;
