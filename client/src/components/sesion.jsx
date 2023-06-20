import {React,useState} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
export default function Sesion({tasks,title}){   
    return  <div className='container-sesion'>
                <h3>{title}</h3>
                <div className='container-card-tasks'>
                {tasks.map(t=> <div key={t.id} className='card-task'>
                    <p className='titulo'>{t.title}</p>
                    <p>{t.description}</p>
                </div> )}   
                </div>
            </div> 
}