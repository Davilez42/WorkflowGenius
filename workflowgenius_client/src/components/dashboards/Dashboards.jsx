import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { DashboardContext } from "../../context/Dashboard/DashboardContext";
import "./dashboards.css";
import { InputAdd } from "../inputAdd/InputAdd";
import { IoIosClose, IoIosList } from "react-icons/io";
import useDashboard from "../../hooks/useDashboards";
export default function Dashboards() {
  const { dashboards, setDashboards } = useContext(DashboardContext);
  const { createDashboard, deleteDashboard } = useDashboard();
  const navigate = useNavigate();

  const createDashboardHandler = (name, description) => {
    const tkn = sessionStorage.getItem("csrftoken");
    createDashboard(tkn, { name, description: " " }, (data, err) => {
      if (err) {
        return alert(err);
      }
      setDashboards([...dashboards, data.data.dash_new]);
    });
  };

  const deleteDashboardHandler = (id_dash) => {
    const tkn = sessionStorage.getItem("csrftoken");
    deleteDashboard(tkn, id_dash, (data, err) => {
      if (err) {
        return alert(err);
      }
      console.log(data);
      setDashboards(dashboards.filter((d) => d._id !== id_dash));
    });
  };

  return (
    <div className="container-dashboards">
      <p className="title-dashboard">Tableros Actuales</p>
      <div className="form_dashboard">
        <InputAdd
          valueDefault="Crear Tablero"
          action={createDashboardHandler}
        />
      </div>
      {dashboards.map((d) => (
        <div key={d._id} className="card-dashboard">
          <div className="card-dashboard-title">
            <IoIosList size="25px" className="icon-card-dashboard" />
            <p
              onClick={() => {
                navigate(`/home/main/dashboard/${d._id}`);
              }}
              className="title-card"
            >
              {d.name}
            </p>
            <IoIosClose
              size="40"
              className="button_delete_dash"
              onClick={() => deleteDashboardHandler(d._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
