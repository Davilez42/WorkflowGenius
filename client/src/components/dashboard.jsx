import {React,useState} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import Sesion from './sesion'
const tareas = {
    todo:[
        {   id:123,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        },
        {
            id:1123,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        },
        {
            id:14324242,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        },
        {
            id:1232134,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        }, {
            id:11232,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        }, {
            id:1412122132,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        }, {
            id:762343241,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        }
        , {
            id:76223343241,
            title:"Estudiar parcial ingles",
            description:"estudiar para no perder el parcial de ingles"
        }

    ],
    inprogres:[
        {
            id:4351231,
            title:"estudiar fada",
            description:"estudiar para no perder el parcial de fada la proxima semana"
        },{
            id:34512312,
            title:"estudiar fada",
            description:"estudiar para no perder el parcial de fada la proxima semana"
        },{
            id:23412311,
            title:"estudiar fada",
            description:"estudiar para no perder el parcial de fada la proxima semana"
        },{
            id:34221351,
            title:"estudiar fada",
            description:"estudiar para no perder el parcial de fada la proxima semana"
        }

    ],
    terminane:[
        {
            id:18726,
            title:"estudiar fada",
            description:"estudiar para no perder el parcial de fada la proxima semana"
        }
    ]
    
}




export default function Dashboard(){   
    return <div className='container-dashboard'>
         
        <Sesion tasks={tareas.todo} title = 'Todo'/>
        <Sesion tasks={tareas.inprogres} title = 'Inprogress'/>
        <Sesion tasks={tareas.terminane} title = 'Terminate'/>
   
        </div>
}