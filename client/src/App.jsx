import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Perfil from "./Pages/perfil";
import { CookiesProvider } from "react-cookie";
import Main from "./components/Main";
import Dashboards from "./components/dashboards/Dashboards";
import ContentDashboard from "./components/contentDashboard/ContentDashboard";
import { useEffect } from "react";
import loadImage from "./loadRandomImage";
import Index from "./Pages";
import React from "react";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
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
    ],
  },
]);

export default function App() {
  return (
    <>
      <React.StrictMode>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <RouterProvider router={routes} />
        </CookiesProvider>
      </React.StrictMode>
    </>
  );
}
