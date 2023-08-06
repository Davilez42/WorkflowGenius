import SesionTasks from "../sesionTasks/SesionTasks";
import { useContext, useState, useEffect } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { useParams } from "react-router-dom";
import { InputAdd } from "../inputAdd/InputAdd";
import { socket } from "../../socket";
import "./contentDashboard.css";

export default function ContentDashboard() {
  let params = useParams();
  const [sessions, setSessions] = useState([]);
  const [titleDashboard, setTitleDashboard] = useState("");
  const { dashboards } = useContext(DashboardContext);

  useEffect(() => {
    let dashboard = dashboards.filter((d) => d._id === params.id_dashboard)[0];
    let sessions_ = [];
    if (dashboard) {
      setTitleDashboard(dashboard.name);
      sessions_ = dashboard.sesions;
    }
    setSessions(sessions_);
  }, [dashboards, params.id_dashboard]);

  const newSession = (name) => {
    socket.emit("create-session", {
      data: {
        id_dashboard: params.id_dashboard,
        name,
      },
    });
    socket.on("session-created", (data) => {
      const { session_insert } = data;

      dashboards.forEach((d) => {
        if (d._id === params.id_dashboard) {
          d.sesions.push(session_insert);
        }
      });

      setSessions([...sessions, session_insert]);
      socket.off("session-created");
    });
    socket.off("create-sessions");
  };

  return (
    <div className="content-Dashboard">
      <div className="Title">
        <p>{titleDashboard}</p>

        <div className="options-dashboard">
          <InputAdd valueDefault="agregar sesion" action={newSession} />
        </div>
      </div>
      <div className="container-tasks">
        {sessions.map((s) => (
          <SesionTasks
            id_dashboard={params.id_dashboard}
            key={s._id}
            id_sesion={s._id}
            tasks={s.tasks}
            title={s.name}
          />
        ))}
      </div>
    </div>
  );
}
