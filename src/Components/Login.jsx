import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [name, setName] = useState("");
    const [password,setPassword] = useState("")
    let goto = useNavigate();

    let formHandale = (e)=>{
        e.preventDefault();

        let currentuser = null;

        fetch("http://localhost:5000/user")
        .then(res=>res.json())
        .then((data)=>{
            for(let i = 0; i<data.length; i++)
            {
                if( data[i].name == name)
                {
                    currentuser = data[i]
                    console.log(data[i]);
                }
            }
            if(currentuser == null)
            {
                alert("user is not found in database")
            }
            else if(currentuser.password != password)
            {
                alert("incorrect your password!! please try again")
            }
            else
            {
                alert("successfully login into your Account");
                setTimeout(()=>{
                    localStorage.setItem("currentuser", JSON.stringify(currentuser))
                       goto("/home");
                },1000)
            }
        })
    }
    return ( 
        <div className="login">
            <h1>Login into your Account </h1>
            <hr />
            <form onSubmit={formHandale}>  
                <input type="text" placeholder="Name" 
                value={name} onChange={(e)=>{setName(e.target.value);}}/>

                <input type="password" placeholder="Password"
                 value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <input type="submit"  value="Sign UP!!"/>
            </form>           
        </div>
     );
}
 
export default Login;