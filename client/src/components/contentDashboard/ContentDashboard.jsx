import SesionTasks from "../sesionTasks/SesionTasks";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { useParams } from "react-router-dom";
import './contentDashboard.css'
export default function ContentDashboard() {
  let params = useParams();
  const { dashboards } = useContext(DashboardContext);
  let dashboard = dashboards.filter((d) => d._id === params.id_dashboard);
  let sesions = [];
  if (dashboard.length !== 0) {
    sesions = dashboard[0].sesions;
  }
  return (
    <div className="container-tasks">
      {sesions.map((s) => (
        <SesionTasks
          id_dashboard={params.id_dashboard}
          key={s._id}
          id_sesion={s._id}
          tasks={s.tasks}
          title={s.nombre}
        />
      ))}
    </div>
  );
}
