import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Loguin from "./components/auth/Loguin";
import Register from "./components/auth/Register";
import Perfil from "./Pages/perfil";
import Main from "./components/Main";
import Dashboards from "./components/dashboards/Dashboards";
import ContentDashboard from "./components/contentDashboard/ContentDashboard";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Loguin />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "loguin",
    element: <Loguin />,
  },
  {
    path: "/home",
    element: <Perfil />,
    children: [
      {
        path: "main",
        element: <Main />,
        children: [
          {
            path: "dashboards",
            element: <Dashboards />,
          },
          {
            path: "dashboard/:id_dashboard",
            props: true,
            element: <ContentDashboard />,
          },
        ],
      },
      {
        path: "Perfil",
        element: <>Perfil</>,
      },
      {
        path: "ayuda",
        element: <>ayuda</>,
      },
    ],
  },
]);
export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
