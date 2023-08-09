import { React, useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import "./sesionTasks.css";

export default function SesionTasks({ id_dashboard, id_sesion, tasks, title }) {
  const [task, setTask] = useState(tasks); //PENDIENTE

  const [name, setName] = useState("");

  const { dashboards, socket } = useContext(DashboardContext);

  const createTask = (title) => {
    setName("");
    socket.emit("create-task", { data: { id_dashboard, id_sesion, title } });
    socket.on("task-created", (body) => {
      dashboards.forEach((d) => {
        if (d._id === id_dashboard) {
          d.sesions.forEach((s) => {
            if (s._id === id_sesion) {
              s.tasks.push({ ...body.data });
              setTask([...s.tasks]);
            }
          });
        }
      });
      socket.off("task-created");
    });
    socket.off("create-task");
  };

  const deleteTask = (id_task) => {
    socket.emit("delete-task", { data: { id_dashboard, id_sesion, id_task } });
    dashboards.forEach((d) => {
      if (d._id === id_dashboard) {
        d.sesions.forEach((s) => {
          if (s._id === id_sesion) {
            s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
            setTask(s.tasks);
          }
        });
      }
    });
    socket.off("delete-task");
  };

  return (
    <div className="container-sesion">
      <div className="cabecera_sesion">
        <p>{title}</p>
      </div>
      <div className="container-card-tasks">
        {task.map((t, i) => (
          <div key={i} id_task={t._id} className="card-task">
            <div className="titulo_task">{t.title}</div>
            <div
              className="delete-icon"
              onClick={() => {
                deleteTask(t._id);
              }}
            >
              <IoIosClose className="icon" size="40px" />
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
            document.querySelector(".input_Name_Task").value = "";
            createTask(name, id_dashboard, id_sesion);
          }}
          className="icon-add"
        >
          <IoIosAdd className="icon" size="45px" />
        </div>
      </div>
    </div>
  );
}
