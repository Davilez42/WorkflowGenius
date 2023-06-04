import { NavLink } from 'react-router-dom'
import {Button} from '../button'
import React from 'react'

export default function Register(){   
    return      <>
                <div className='container_form'>
                <form>
                <h3>Register on AdTasker</h3>
                <label htmlFor="input_fullname">Full Name</label>
                <input id="input_fullname"  className="input input-fullname" type="text"   placeholder="Full Name"></input>
                <label htmlFor="input_username">Username</label>
                <input id="input_username" className="input input-username" type="text" placeholder="Username"></input>
                <label htmlFor="input_email">Email</label>
                <input id="input_email" className="input input-email" type="text" placeholder="Email@some.com"></input>
                <label htmlFor="input_password">password</label>
                <input id="input_password" className="input input-password" type="password" placeholder="Password"></input>                               
                <Button    value="Register" id='btn_register'/>
                </form>
                </div>
                <div className='box_info'> 
                   <p>Do you have a count? <NavLink className="here" to='/' >Loguin here</NavLink> </p>
                </div>
                </>
        }