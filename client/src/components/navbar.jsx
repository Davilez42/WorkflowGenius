
import {React} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
export default function Navbar(){
    const navigate = useNavigate()
    return <>
    <header>
        <nav>
            <ul>
            <li><NavLink to='/home/perfil' >Perfil</NavLink></li>
            <li><NavLink to='/home/dashboard' >Dashboard</NavLink></li>
            <li><NavLink to='/home/ayuda' >ayuda</NavLink></li>
            <li><NavLink onClick={()=>{
                sessionStorage.removeItem('LoggedUser')
                navigate('/loguin')
            }}>cerrarSesion</NavLink></li>
            </ul>
        </nav>
    </header>
    </>
}