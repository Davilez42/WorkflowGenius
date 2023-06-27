import {React,useState} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
export default function NavbarDashboard(){
    return <div className='navBarDashboard'>
     <nav>
           
            <ul>
            <img src="https://ik.imagekit.io/picmont/icons/default_avatar.png?updatedAt=1687206611943" className='avatar' />
            <li><NavLink to='/home/main/perfil' >Perfil</NavLink></li>
            <li><NavLink to='/home/main/dashboards' >Tableros</NavLink></li>
            <li><NavLink to='/home/main/dashboards' >ayuda</NavLink></li>
            </ul>
        </nav>
    </div>
}