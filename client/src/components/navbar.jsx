
import {React,useState} from 'react'
import {NavLink,redirect,useNavigate} from 'react-router-dom'
export default function Navbar(){
    const navigate = useNavigate()

    const red = ()=>{
        sessionStorage.removeItem('LoggedUser')
        navigate('/loguin')
    }
    
    return <>
    <header>
        <nav>
            <ul>
            <li><NavLink to='/home/perfil' >Perfil</NavLink></li>
            <li><NavLink to='/home/dashboard' >Dashboard</NavLink></li>
            <li><NavLink to='/home/ayuda' >ayuda</NavLink></li>
            <li><a onClick={red}>cerrarSesion</a></li>
            </ul>
        </nav>
    </header>
    </>
}