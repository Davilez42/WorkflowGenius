import {Button} from '../button'
import React from 'react'
import {NavLink} from 'react-router-dom'
export default function Loguin(){
    return   <>
            <div className='container_form'>
            <form>
             <h3>Sign in AdTasker</h3>
             <label htmlFor="input_username">Username or email</label>
             <input id="input_username"  className="input input-username" type="text"   placeholder="Username"></input>
             <label htmlFor="input_password">password</label>
             <input  id="input_password" className="input input-password" type="password" placeholder="Password"></input>
             <a href='/' >Forget you password?</a><br />
             <Button value="Loguin" id='btn_loguin'/>
             </form>
            </div>
            <div className='box_info'> 

            <p>Do you not have a count? <NavLink className="here" to='/register' >Register here</NavLink> </p>
             </div>
             </>
        }