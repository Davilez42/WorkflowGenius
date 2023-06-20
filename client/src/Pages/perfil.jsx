import {React,useState} from 'react'
import {NavLink, Outlet} from 'react-router-dom'
import Navbar from '../components/navbar'

export default function Perfil(){

    return <>
        <Navbar/>
        <Outlet/>
        
    </>
}