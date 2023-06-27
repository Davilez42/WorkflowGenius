import {React} from 'react'
import {Outlet} from 'react-router-dom'
import NavbarLeft from './NavbarLeft'
import {DashboardContextProvider} from '../context/DashboardContext'

export default function Main(){  

    return <DashboardContextProvider>
            <div className='container-main'>
            <NavbarLeft/>
            <Outlet/>
            
            </div>
         </DashboardContextProvider>
}