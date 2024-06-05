import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ setUserToken, setUSername }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(null);
    setUSername("");
    navigate("/login");
  }, [navigate, setUserToken]);
}
