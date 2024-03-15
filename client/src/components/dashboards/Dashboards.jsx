import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SlOptions } from "react-icons/sl";
import { DashboardContext } from "../../context/Dashboard/DashboardContext";
import "./dashboards.css";

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
    <div className="block-dashboards">
      <p className="title-dashboard">Tableros</p>
      <div className="form_dashboard">
        <input type="text" onChange={(e) => {}} />
        <input
          type="button"
          value="crear"
          onClick={() => {
            createDashboardHandler("test", " ");
          }}
        />
      </div>
      <div className="container-dashboards">
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
            </div>
            <div className="info-autor">Creado por {d.id_aut}</div>
            <SlOptions size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}
