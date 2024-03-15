/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { IoIosAdd, IoIosClose, IoMdRemove } from "react-icons/io";

import "./section.css";

export default function CardSection({
  dashboard,
  id_section,
  tasks,
  title,
  socket,
}) {
  const [tasks_, setTasks_] = useState(tasks); //PENDIENTE
  const [name, setName] = useState("");

  useEffect(() => {
    socket.on(`${dashboard._id}-task-created-${id_section}`, (body) => {
      setTasks_([...tasks_, body.data]);
      dashboard.sections.forEach((s) => {
        if (s._id === id_section) {
          s.tasks.push({ ...body.data });
          return;
        }
      });
    });

    socket.on(`${dashboard._id}-task-deleted-${id_section}`, (body) => {
      const { id_task } = body;
      dashboard.sections.forEach((s) => {
        if (s._id === id_section) {
          s.tasks = s.tasks.filter((t) => t._id.toString() !== id_task);
          setTasks_(s.tasks);
          return;
        }
      });
    });

    return () => {
      socket.off(`${dashboard._id}-task-created-${id_section}`);
      socket.off(`${dashboard._id}-task-deleted${id_section}`);
    };
  });

  const createTask = (name) => {
    if (name.trim() === "") {
      return;
    }
    setName("");
    document.querySelectorAll(".input_Name_Task").forEach((e) => {
      e.value = "";
    });
    socket.emit("create-task", {
      data: { id_dashboard: dashboard._id, id_section, title: name },
    });
  };

  const deleteTask = (id_section, id_task) => {
    socket.emit("delete-task", {
      data: { id_dashboard: dashboard._id, id_section, id_task },
    });
  };

  const moveTask = (from_section, id_task) => {
    socket.emit("move-task", {
      data: {
        id_dashboard: dashboard._id,
        from_section,
        to_section: id_section,
        id_task,
      },
    });
  };
  const deleteSection = () => {
    socket.emit("delete-session", {
      id_section,
      id_dashboard: dashboard._id,
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
            deleteSection();
          }}
        >
          <IoIosClose className="icon" size="35px" />
        </div>
      </div>

      <div
        className="container-card-tasks"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragExit={(e) => {
          e.preventDefault();
          const { t } = JSON.parse(e.dataTransfer.getData("text"));
          const aux = tasks_.filter((tk) => tk._id != t._id);
          setTasks_(aux);
          dashboard.sections.forEach((s) => {
            if (s._id === id_section) {
              s.tasks = aux;
              return;
            }
          });
        }}
        onDrop={(e) => {
          e.preventDefault();
          const { from, t } = JSON.parse(e.dataTransfer.getData("text"));

          if (from !== id_section) {
            moveTask(from, t._id);
          } else {
            setTasks_([...tasks_, t]);
          }
        }}
      >
        {tasks_.map((t, i) => (
          // eslint-disable-next-line react/no-unknown-property
          <div
            key={i}
            id={t._id}
            className="card-task"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData(
                "text/plain",
                JSON.stringify({ from: id_section, t })
              );
            }}
          >
            <div className="title_task">{t.title}</div>
            <div
              className="delete-icon"
              onClick={() => {
                deleteTask(id_section, t._id);
              }}
            >
              <IoMdRemove className="icon" size={25} />
            </div>
          </div>
        ))}
      </div>

      <div className="options-tasks">
        <input
          className="input_Name_Task"
          type="text"
          placeholder="nombre"
          onChange={(event) => {
            setName(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTask(name);
            }
          }}
        />

        <div
          onClick={() => {
            createTask(name);
          }}
          className="icon-add"
        >
          <IoIosAdd className="icon" size={30} />
        </div>
      </div>
    </div>
  );
}
