import { React, useState, useEffect } from "react";
import { IoIosAdd, IoIosClose, IoMdRemove } from "react-icons/io";
import { useContext } from "react";
import { DashboardContext } from "../../context/Dashboard/DashboardContext";
import { socket } from "../../socket";
import "./sessionTasks.css";

export default function SessionTasks({
  id_dashboard,
  id_session,
  tasks,
  title,
}) {
  const [task, setTask] = useState(tasks); //PENDIENTE

  const [name, setName] = useState("");

  const { dashboards } = useContext(DashboardContext);

  useEffect(() => {
    if (name.length === 0) {
      socket.on(`task-created-${id_session}`, (body) => {
        dashboards.forEach((d) => {
          if (d._id === id_dashboard) {
            d.sessions.forEach((s) => {
              if (s._id === id_session) {
                s.tasks.push({ ...body.data });
                setTask([...s.tasks]);
                return;
              }
            });
          }
        });
      });
    }
    return () => {
      socket.off(`task-created-${id_session}`);
    };
  });

  const createTask = (title) => {
    setName("");
    document.querySelector(".input_Name_Task").value = "";
    socket.emit("create-task", { data: { id_dashboard, id_session, title } });
  };

  const deleteTask = (id_task) => {
    socket.emit("delete-task", { data: { id_dashboard, id_session, id_task } });
    dashboards.forEach((d) => {
      if (d._id === id_dashboard) {
        d.sessions.forEach((s) => {
          if (s._id === id_session) {
            s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
            setTask(s.tasks);
            return;
          }
        });
      }
    });
  };

  const deleteSession = () => {
    socket.emit("delete-session", {
      id_session,
      id_dashboard,
    });
  };

  return (
    <div className="container-session">
      <div className="header_session">
        <div className="title_session">
          <p>{title}</p>
        </div>
        <div
          className="delete-icon"
          onClick={() => {
            deleteSession();
          }}
        >
          <IoIosClose className="icon" size="35px" />
        </div>
      </div>

      <div className="container-card-tasks">
        {task.map((t, i) => (
          <div key={i} id_task={t._id} className="card-task">
            <div className="title_task">{t.title}</div>
            <div
              className="delete-icon"
              onClick={() => {
                deleteTask(t._id);
              }}
            >
              <IoMdRemove className="icon" size="25px" />
            </div>
          </div>
        ))}
      </div>

      <div className="options-tasks">
        <input
          className="input_Name_Task"
          type="text"
          placeholder="Titulo"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <div
          onClick={() => {
            document.querySelectorAll(".input_Name_Task").forEach((e) => {
              e.value = "";
            });
            createTask(name, id_dashboard, id_session);
          }}
          className="icon-add"
        >
          <IoIosAdd className="icon" size="45px" />
        </div>
      </div>
    </div>
  );
}
