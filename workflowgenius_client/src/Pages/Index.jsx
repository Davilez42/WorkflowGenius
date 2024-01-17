import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavbarIndex from "../components/navBarIndex/NavbarIndex";
import BoxInfo from "../components/boxInfo/BoxInfo";
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
      <NavbarIndex />
      <div className="mainForms">
        {<BoxInfo />}
        {<Outlet />}
      </div>
    </>
  );
}
