import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Loguin from "./components/auth/Loguin";
import Register from "./components/auth/Register";
import Perfil from './Pages/perfil'

const routes = createBrowserRouter([
            {
            path:'/register',
            element:<Register/>
            },
            {
            path:'/',
            element:<Loguin/>
            },
            {
                path:'/perfil/:id_user',
                element:<Perfil/>
            }
])
export default function App() {
  return (
    <>
    <RouterProvider router={routes} />
    </>
  );
}
