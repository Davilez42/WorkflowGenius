import {React} from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/navbar'

export default function Perfil(){
    return <>
        <Navbar/>
        <Outlet/>
        
    </>
}