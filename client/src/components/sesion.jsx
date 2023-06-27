import {React} from 'react'
export default function Sesion({tasks,title}){   
    return  <div className='container-sesion'>
                <div className='cabecera_sesion'>
                <p>{title}</p>
                </div>
                <div className='container-card-tasks'>
                {tasks.map(t=> <div key={t.id} className='card-task'>
                    <p className='titulo'>{t.title}</p>
                </div> )}
               

                </div>
                <div className='options-tasks'>
                    <p>insertar Nueba tarea</p>
                </div>
            </div> 
}