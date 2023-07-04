import {React} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
export default function NavbarDashboard(){
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('LoggedUser'))
    return <div className='navBarDashboard'>
     <nav>          
            <ul>
            <img src={user.id_avatar} className='avatar' />
            <li><NavLink to='/home/main/perfil' style={{ textDecoration: 'none' }}>Perfil</NavLink></li>
            <li><NavLink to='/home/main/dashboards' style={{ textDecoration: 'none' }}>Tableros</NavLink></li>
            <li><NavLink to='/home/main/dashboards' style={{ textDecoration: 'none' }}>ayuda</NavLink></li>
            <li><NavLink onClick={()=>{
                sessionStorage.removeItem('LoggedUser')
                navigate('/loguin')
            }} style={{ textDecoration: 'none' }}>cerrarSesion</NavLink></li>
            </ul>
        </nav>
    </div>
}