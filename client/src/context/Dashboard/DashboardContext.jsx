/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import useDashboard from "../../hooks/useDashboards";

import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL, {
  auth: { token: window.sessionStorage.getItem("csrftoken") },
  autoConnect: false,
});

export const DashboardContext = createContext();

export function DashboardContextProvider(props) {
  const [dashboards, setDashboards] = useState([]);
  const { getDashboards } = useDashboard();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("client Connect socket");
    });
    socket.on("server-error", (data) => {
      alert(data.errorMessage);
    });

    //Obtengo los dashboards del usuario
    const csrftoken = sessionStorage.getItem("csrftoken"); //token de seguridad
    getDashboards(csrftoken, (data, err) => {
      if (err) {
        console.log(err);
        return;
      }
      setDashboards(data.data.dashboards_user);
    });

    return () => {
      socket.off("connect");
      socket.off("server-error");
    };
  }, []);

  return (
    <>
      <DashboardContext.Provider
        value={{
          dashboards,
          socket,
          setDashboards,
        }}
      >
        {props.children}
      </DashboardContext.Provider>
    </>
  );
}
