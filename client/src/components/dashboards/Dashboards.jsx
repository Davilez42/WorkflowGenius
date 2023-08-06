import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { createDashboardService } from "../../services/createDashboard.service";
import { deleteDashboardService } from "../../services/deleteDashboard.service";
import { DashboardContext } from "../../context/DashboardContext";
import "./dashboards.css";
import { IoIosAdd, IoIosClose } from "react-icons/io";

export default function Dashboards() {
  const { dashboards, setDashboards } = useContext(DashboardContext);

  const [nombre, setNombre] = useState("");
  const navigate = useNavigate();

  const createDashboard = (name) => {
    createDashboardService(setDashboards, name, dashboards);
  };

  const deleteDashboard = (id_dash) => {
    deleteDashboardService(setDashboards, id_dash, dashboards);
  };

  return (
    <div className="container-dashboards">
      <p className="title-dashboard">Dashboards Actuales</p>
      <div className="form_dashboard">
        <input
          onChange={(event) => setNombre(event.target.value)}
          type="text"
          placeholder="nombre Dashboard"
          value={nombre}
        />

        <IoIosAdd
          size="35px"
          className="button_add_dash"
          onClick={() => {
            createDashboard(nombre);
            setNombre("");
          }}
        />
      </div>

      {dashboards.map((d) => (
        <div key={d._id} className="card-dashboard">
          <div className="card-dashboard-title">
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
              onClick={() => deleteDashboard(d._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
