
import {Button} from './button'
import React,{ Component, useEffect, useState } from 'react'

export const Form_selected = ({data})=>{
    const FormLoguin = ()=>{
        return <>
                 <h3>Sign in AdTasker</h3>
                 <label htmlFor="input_username">Username or email</label>
                 <input id="input_username"  className="input input-username" type="text"   placeholder="Username"></input>
                 <label htmlFor="input_password">password</label>
                 <input  id="input_password" className="input input-password" type="password" placeholder="Password"></input>
                 <a href='/' >Forget you password?</a><br />

                 <Button handler_view={data} value="Loguin" id='btn_loguin'/>
                 </>
            }
    const FormRegister = ()=>{
        return  <>
                    <h3>Register on AdTasker</h3>
                    <label htmlFor="input_fullname">Full Name</label>
                    <input id="input_fullname"  className="input input-fullname" type="text"   placeholder="Full Name"></input>
                    <label htmlFor="input_username">Username</label>
                    <input id="input_username" className="input input-username" type="text" placeholder="Username"></input>
                    <label htmlFor="input_email">Email</label>
                    <input id="input_email" className="input input-email" type="text" placeholder="Email@some.com"></input>
                    <label htmlFor="input_password">password</label>
                    <input id="input_password" className="input input-password" type="password" placeholder="Password"></input>                
                    
                    <Button handler_view={data}   value="Register" id='btn_register'/>
                    </>
            }

   

    const [component,setForm] = useState(FormLoguin)
    const [text,setText] = useState('Do you need a count?')
    const [here,setHere] =useState('Register here')
  
    return  <>
            <div className ="container_form">  
            <form>
            {component}
            </form>            
            </div>
            <div className="box_info">
            <p>{text}<b
            onClick={()=>{
                console.log('entra') 
                if(text === 'Do you need a count?' ){
                    setForm(FormRegister)
                    setText('Do you have a count?')
                    setHere('Loguin Here')  
                }else{
                    setForm(FormLoguin)
                    setText('Do you need a count?')
                    setHere('Register Here') 
                      
                }}}          
                    className="here" > {here}</b> </p>
            </div>
            </>

}
