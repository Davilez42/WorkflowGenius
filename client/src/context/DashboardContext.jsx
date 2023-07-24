import { createContext, useEffect, useState } from "react";
import { getDashboards } from "../services/getDashboard";
import { socket } from "../socket";
export const DashboardContext = createContext();


export function DashboardContextProvider(props) {

  const [dashboards, setDashboards] = useState([]);
  
  useEffect(() => {
    getDashboards(setDashboards);
  }, []);

  socket.on("connect", () => {
    console.log("client Connect socket");
  });

  socket.on("server-error", (data) => {
    alert(data.messageError);
  });



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
