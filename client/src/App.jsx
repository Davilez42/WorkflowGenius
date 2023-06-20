import { createBrowserRouter,RouterProvider,redirect} from "react-router-dom";
import Loguin from "./components/auth/Loguin";
import Register from "./components/auth/Register";
import Perfil from './Pages/perfil'
import Dashboard from "./components/dashboard";

const routes = createBrowserRouter([
           
            {
            path:'/',
            element:<Loguin/>,
            },
            {
            path:'register',
            element:<Register/>
            },
            {
              path:'loguin',
              element:<Loguin/>
            }
            ,
            {
              path:'/home',
              element:<Perfil/>,
              children:[
                {
                  path:'dashboard',
                  element:<Dashboard/>,

                },
                {
                  path:'Perfil',
                  element:<>Perfil</>,

                },
                {
                  path:'ayuda',
                  element:<>ayuda</>,

                },

              ]
            }
            
          
])
export default function App() {
  return (
    <>
    <RouterProvider router={routes} />
    </>
  );
}
