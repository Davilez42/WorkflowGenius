
import {React} from 'react'
import {NavLink} from 'react-router-dom'
export default function Navbar(){
    
    return <>
    <header>
        <nav>
            <ul>
            <li><NavLink to='/home/main/dashboards' style={{ textDecoration: 'none' }}>Inicio</NavLink></li>
            <li><NavLink to='/home/perfil'  style={{ textDecoration: 'none' }}>Perfil</NavLink></li>
            <li><NavLink to='/home/ayuda' style={{ textDecoration: 'none' }}>ayuda</NavLink></li>
          
            </ul>
        </nav>
    </header>
    </>
}