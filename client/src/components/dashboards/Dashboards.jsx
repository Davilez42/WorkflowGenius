
import {useNavigate} from 'react-router-dom'
import {useContext,useState} from 'react'
import { createDashboard } from "../../services/createDashboard";
import {DashboardContext} from '../../context/DashboardContext'
import './dashboards.css'
export default function Dashboards(){
        const {dashboards, setDashboards} =   useContext(DashboardContext)
        
        const [nombre,setNombre] = useState('')
        const navigate = useNavigate()
           
    const crearDashboard = (name) => {
        createDashboard(setDashboards, name, dashboards);
    };

    return  <div className="container-dashboards">
                  <p className='title-dashboard'>Dashboards Actuales</p>
                  <div className='form_dashboard'>
                    <input onChange={(event)=>setNombre(event.target.value)}                      
                     type="text" placeholder='nombre Dashboard' value={nombre}/>
                    <input onClick={()=>{
                        crearDashboard(nombre)
                        setNombre("")
                        
                    }} type="button" value="crear dashboard" />
                  </div>
                     {dashboards.map(d => 
                        <div key={d._id}  className="card-dashboard" onClick={()=>{  navigate(`/home/main/dashboard/${d._id}`)} }> 
                            <p>{d.name}</p>
                        </div>)}  
            </div>
 
}