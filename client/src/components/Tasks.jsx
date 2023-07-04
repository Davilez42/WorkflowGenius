import Sesion from './Sesion'
import { useContext } from 'react'
import {DashboardContext} from '../context/DashboardContext'
import { useParams } from 'react-router-dom'

export default function Tasks(){
    let params = useParams()
    const {dashboards} = useContext(DashboardContext)
    let sesions = dashboards.filter(d=> d._id === params.id_dashboard)[0].sesions
        return <div className='container-tasks'>
                {
                    sesions.map(s => <Sesion id_dashboard={params.id_dashboard}  key={s._id} id_sesion={s._id} tasks={s.tasks} title = {s.nombre}/>)
                }            
                </div>
}