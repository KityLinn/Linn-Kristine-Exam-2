import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {    
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("manager");

    navigate("/");  
  });
}