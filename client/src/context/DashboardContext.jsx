
import {createContext,useEffect,useState} from 'react'
import {getDashboards} from '../hooks/getDashboard'
import {setDashboardDb}  from '../hooks/setDashboardsBd';
export const DashboardContext = createContext();
 
export  function DashboardContextProvider (props){

    const [dashboards,setDashboards] = useState([])
    
    useEffect(()=>{
        getDashboards(setDashboards)
    },[])

    const crearDashboard=(name)=>{
        setDashboardDb(setDashboards,name,dashboards)       
    }

    const crearTarea=(name,id_dashboard,id_sesion,f)=>{

             dashboards.forEach(d=>{
            if (d._id===id_dashboard){
                d.sesions.forEach(s=>{
                    if(s._id===id_sesion){
                           s.tasks.push({"title":name})
                           f([...s.tasks]) 
                           //TODO
                           
                    }
                })
            }
        })

    }

   return  <>
            <DashboardContext.Provider value={
                {
                    dashboards,
                    crearDashboard,
                    crearTarea               
                }}>
            {
                props.children
            }
            </DashboardContext.Provider>
            </>
}