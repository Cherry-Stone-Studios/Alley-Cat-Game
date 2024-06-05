import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({
  setUserToken,
  setUsername,
  setGuestname,
  setGuestScore,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(null);
    setUsername("");
    setGuestname("");
    setGuestScore(0);
    navigate("/login");
  }, [navigate, setUserToken, setUsername]);
}
