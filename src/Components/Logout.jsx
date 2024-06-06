import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({
  setUserToken,
  setUserID,
  setUsername,
  setName,
  setEmail,
  setPassword,
  setDate_of_birth,
  setShowPassword,
  setGuestname,
  setGuestScore,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(null);
    setUserID(0);
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
    setDate_of_birth("");
    setShowPassword(false);
    setGuestname("");
    setGuestScore(0);
    navigate("/login");
  }, [
    navigate,
    setUserToken,
    setUserID,
    setUsername,
    setName,
    setEmail,
    setPassword,
    setDate_of_birth,
    setShowPassword,
    setGuestname,
    setGuestScore,
  ]);
}
