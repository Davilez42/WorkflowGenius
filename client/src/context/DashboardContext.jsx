import { createContext, useEffect, useState } from "react";
import { getDashboards } from "../services/getDashboard";
import { createDashboard } from "../services/createDashboard";
export const DashboardContext = createContext();

export function DashboardContextProvider(props) {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    getDashboards(setDashboards);
  }, []);

  const crearDashboard = (name) => {
    createDashboard(setDashboards, name, dashboards);
  };

  const createTask = (name, id_dashboard, id_sesion, f) => {
    dashboards.forEach((d) => {
      if (d._id === id_dashboard) {
        d.sesions.forEach((s) => {
          if (s._id === id_sesion) {
            s.tasks.push({ title: name });
            f([...s.tasks]);
            //TODO
          }
        });
      }
    });
  };

  return (
    <>
      <DashboardContext.Provider
        value={{
          dashboards,
          crearDashboard,
          createTask,
        }}
      >
        {props.children}
      </DashboardContext.Provider>
    </>
  );
}
