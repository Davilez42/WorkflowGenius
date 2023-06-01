
import {useState,useEffect}  from 'react'
import {Form_selected} from './forms'
export const App =()=>{
    const [View,setView] = useState(Form_selected((algo)=>setView(algo)))

    return <>
    {
        View
    }
    </>
    
}