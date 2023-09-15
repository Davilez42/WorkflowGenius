import SessionTasks from "../sessionTasks/SessionTasks";
import { useContext, useState, useEffect } from "react";
import { DashboardContext } from "../../context/Dashboard/DashboardContext";
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
      sessions_ = dashboard.sessions;
    }
    setSessions(sessions_);

    socket.on("session-deleted", (body) => {
      const { success, id_dashboard, id_session } = body.data;
      if (success) {
        console.log("delete session");
        dashboards.forEach((d) => {
          if (d._id === id_dashboard) {
            const n_sessions = d.sessions.filter((s) => s._id !== id_session);
            d.sessions = n_sessions;
            setSessions(n_sessions);
          }
        });
      } else {
        alert("La sesion no fue eliminada");
      }
    });

    socket.on("session-created", (data) => {
      const { session_insert } = data;
      dashboards.forEach((d) => {
        if (d._id === params.id_dashboard) {
          d.sessions.push(session_insert);
        }
      });
      setSessions([...sessions, session_insert]);
    });

    return () => {
      socket.off("session-deleted");
      socket.off("session-created");
    };
  }, [dashboards, params.id_dashboard, sessions]);

  const newSession = (name) => {
    socket.emit("create-session", {
      data: {
        id_dashboard: params.id_dashboard,
        name,
      },
    });
  };

  return (
    <div className="content-Dashboard">
      <div className="Title">
        <p>{titleDashboard}</p>

        <div className="options-dashboard">
          <InputAdd valueDefault="nueva sesion" action={newSession} />
        </div>
      </div>
      <div className="container-tasks">
        {sessions.map((s, i) => (
          <SessionTasks
            id_dashboard={params.id_dashboard}
            key={i}
            id_session={s._id}
            tasks={s.tasks}
            title={s.name}
          />
        ))}
      </div>
    </div>
  );
}
