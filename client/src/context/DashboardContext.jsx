
import {createContext,useEffect,useState} from 'react'
import {dashboards_users} from '../hooks/getDashboard'
export const DashboardContext = createContext();
 
export function DashboardContextProvider(props){

    const [dashboards,setDashboards] = useState(dashboards_users)
  

    const crearDashboard=(nombre)=>{
        console.log(dashboards);
        //va a la base de datos y lo ingresa obtiene el id 
        setDashboards([...dashboards,{nombre,tasks:{todo:[],inprogres:[],terminate:[]}}])
    }

    


   return  <>
            <DashboardContext.Provider value={
                {
                    dashboards,
                    crearDashboard                
                }}>
            {
                props.children
            }
            </DashboardContext.Provider>
            </>
}