/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { DashboardContext } from "../../context/Dashboard/DashboardContext";
import { useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import CardSection from "../section/CardSection";

import "./contentDashboard.css";

export default function ContentDashboard() {
  let { id_dashboard } = useParams();
  const [sections, setSections] = useState([]);
  const [titleDashboard, setTitleDashboard] = useState("");
  const { dashboards, socket } = useContext(DashboardContext);
  const [formSectionModal, setFormSectionModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [dashboard, setDashboard] = useState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let dashFound = dashboards.find((d) => d._id === id_dashboard);

    if (dashFound) {
      setTitleDashboard(dashFound.name);
      setDashboard(dashFound);
      setSections(dashFound.sections);
    } else {
      setTitleDashboard("Ups, alparecer este tablero no existe");
    }
    socket.on("session-deleted", (body) => {
      // eslint-disable-next-line no-unused-vars
      const { id_dashboard, id_section } = body;
      const n_sections = dashboard.sections.filter((s) => s._id !== id_section);
      dashboard.sections = n_sections;
      setSections(n_sections);
    });

    socket.on("session-created", (data) => {
      const { section_insert } = data;
      dashboard.sections.push(section_insert);
      setSections([...sections, section_insert]);
    });

    socket.on("refresh-state-members", (body) => {
      const { members } = body;
      console.log(members);
      setMembers(members);
    });
    socket.emit("listen-dashboard", { id_dashboard });

    return () => {
      socket.off("session-deleted");
      socket.off("session-created");
      socket.off("listen-dashboard");
      socket.off("refresh-state-members");
    };
  }, [sections]);

  const newSession = (name) => {
    socket.emit("create-session", {
      data: {
        id_dashboard: id_dashboard,
        name,
      },
    });
  };

  return (
    <div className="content-Dashboard">
      <div className="block-info-dash">
        <p className="Title">{titleDashboard}</p>
        <SlOptions size={25} className="icon-options-dashboard" />
      </div>
      <div className="container-members">
        {members.map((m, i) => (
          <img
            key={i}
            alt={m.user.name}
            className="icon-member-dashboard"
            src={m.user.id_avatar}
          />
        ))}
      </div>

      <div className="container-sections">
        {sections.map((s, i) => (
          <CardSection
            socket={socket}
            dashboard={dashboard}
            key={i}
            id_section={s._id}
            tasks={s.tasks}
            title={s.name}
          />
        ))}
        <div className="form-section">
          {formSectionModal ? (
            <div>
              <input className="input-name-section" type="text" />
              <input
                type="button"
                className="button-create-section"
                value="crear"
                onClick={(e) => {
                  setFormSectionModal(!formSectionModal);
                  newSession("test");
                }}
              />
              <input
                type="button"
                className="button-create-section"
                value="cancelar"
                onClick={(e) => {
                  setFormSectionModal(!formSectionModal);
                }}
              />
            </div>
          ) : (
            <></>
          )}
          {!formSectionModal ? (
            <IoIosAdd
              size="35px"
              className="button_add"
              onClick={() => {
                setFormSectionModal(!formSectionModal);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
