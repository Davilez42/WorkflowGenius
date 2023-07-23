import { React, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import './sesionTasks.css'

export default function SesionTasks({ id_dashboard, id_sesion, tasks, title }) {
  const [task, setTask] = useState(tasks); //PENDIENTE

  const [name, setName] = useState("");

  const { createTask } = useContext(DashboardContext);

  return (
    <div className="container-sesion">
      <div className="cabecera_sesion">
        <p>{title}</p>
      </div>
      <div className="container-card-tasks">
        {task.map((t) => (
          <div key={t._id} className="card-task">
            <p className="titulo">{t.title}</p>
          </div>
        ))}
      </div>
      <div className="options-tasks">
        <input
          type="text"
          placeholder="Titulo"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <div
          onClick={() => {
            createTask(name, id_dashboard, id_sesion, setTask);
          }}
          className="icon-add"
        >
          <IoIosAdd size="45px" />
        </div>
      </div>
    </div>
  );
}
