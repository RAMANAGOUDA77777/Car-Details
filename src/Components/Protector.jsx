import React from "react";
import { Navigate } from "react-router-dom";
const Protector = ({Child}) => {

    let verify = ()=>{
        let result = localStorage.getItem("currentuser")
        if(!result)
        {
            return false;
        }else{
            return true 
        }
    }
    return ( 
        <div className="protect">
            {
                 verify()? <Child/> : <Navigate to="/login"/>
            }
        </div>
     );
}
 
export default Protector;

