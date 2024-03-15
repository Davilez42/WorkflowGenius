import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BoxInfo from "../components/boxInfo/BoxInfo";
import Navbar from "../components/navbar/Navbar";
export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => {
      navigate("/login");
    };
    handler();
  }, []);
  return (
    <>
      <Navbar />
      <div className="mainForms">
        {<BoxInfo />}
        {<Outlet />}
      </div>
    </>
  );
}
