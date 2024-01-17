import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Perfil from "./Pages/Perfil";
import { CookiesProvider } from "react-cookie";
import Main from "./components/Home";
import Dashboards from "./components/dashboards/Dashboards";
import ContentDashboard from "./components/contentDashboard/ContentDashboard";
import Index from "./Pages/Index";
import "./App.css";

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

function App() {
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <RouterProvider router={routes} />
      </CookiesProvider>
    </>
  );
}

export default App;
