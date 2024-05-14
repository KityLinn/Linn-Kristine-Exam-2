import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/venues");
    } else {
      navigate("/login");
    }
  }, []);
  
  return (
    <>
    </>
  );
}
