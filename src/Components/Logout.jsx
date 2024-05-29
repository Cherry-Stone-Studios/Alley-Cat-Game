import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ setUserToken }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(null);
    navigate("/login");
  }, [navigate, setUserToken]);
}
