
import {NavLink,useNavigate,Outlet} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import {DashboardContext} from '../context/DashboardContext'






export default function Dashboards(props){
        const {dashboards,crearDashboard} =   useContext(DashboardContext)
        const [nombre,setNombre] = useState('')
        const navigate = useNavigate()

    return  <div className="container-dashboards">
                    <p>Dashboards Actuales</p>
                  <div className='form_dashboard'>
                    <input onChange={(event)=>setNombre(event.target.value)}                      
                     type="text" placeholder='nombre Dashboard' value={nombre}/>
                    <input onClick={()=>{
                        crearDashboard(nombre)
                        setNombre("")
                        
                    }} type="button" value="crear dashboard" />
                  </div>
                     {dashboards.map(d => 
                        <div key={d.id_}  className="card-dashboard" onClick={()=>{  navigate(`/home/main/dashboard/${d.id_}`)} }> 
                            <p>{d.nombre}</p>
                        </div>)}  

            </div>
 
}