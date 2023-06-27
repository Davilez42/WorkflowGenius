import Sesion from './Sesion'
import { useContext } from 'react'
import {DashboardContext} from '../context/DashboardContext'

export default function Tasks({id_dashboard}){
    const {dashboards} = useContext(DashboardContext)
    const sesions = dashboards.filter(d=> d.id_ === 1321342422)[0].sesions
    console.log(sesions);
        return <div className='container-tasks'>
 
                {
                    sesions.map(s => <Sesion tasks={s.tasks} title = {s.nombre}/>)
                } 
            
                </div>
}