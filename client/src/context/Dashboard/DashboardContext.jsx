import { createContext, useEffect, useState } from "react";
import { getDashboardsService } from "../../services/getDashboard.service";
import { socket } from "../../socket";

export const DashboardContext = createContext();

export function DashboardContextProvider(props) {
  const [dashboards, setDashboards] = useState([]);

  useEffect(() => {
    getDashboardsService(setDashboards);
    socket.on("connect", () => {
      console.log("client Connect socket");
    });

    socket.on("server-error", (data) => {
      alert(data.messageError);
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
