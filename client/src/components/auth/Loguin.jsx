
import {React,useState} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import LoguinHandler from '../../hooks/loguinHandler'
export default  function Loguin(){
        const [username,setUsername] = useState('')
        const [password,setPassword] = useState('')
        const [message,setMessage] = useState('')
        const navigate = useNavigate()

        const handlerAction = (id_user)=>{
            navigate(`/Perfil/${id_user}`)
        }


        const senDate = ()=>{
             if(username === ''){
                setMessage('Porfavor ingrese un nombre de usuario')
                return
             } 
             if(password === ''){
                setMessage('Porfavor ingrese una contraseña')
                return
             }    

             LoguinHandler(username,password,setMessage,handlerAction)
        } 

    return   <> 
             
            <div className='container_form'>
            <div className='container_message'><p>{message}</p></div>
            <form>
             <h3>Sign in AdTasker</h3>
             <label htmlFor="input_username">Username or email</label>
             <input id="input_username" onChange={(event)=>setUsername(event.target.value)} className="input input-username" type="text"   placeholder="Username"></input>
             <label htmlFor="input_password">password</label>
             <input  id="input_password" onChange={(event)=>setPassword(event.target.value)}  className="input input-password" type="password" placeholder="Password"></input>
             <NavLink href='/' >Forget you password?</NavLink><br />
             <a onClick={senDate}  className='btn' >Loguin</a>
             </form>
            </div>
            <div className='box_info'> 

            <p>Don't have an account ? <NavLink className="here" to='/register' >Register here</NavLink> </p>
             </div>
             </>
        }

       