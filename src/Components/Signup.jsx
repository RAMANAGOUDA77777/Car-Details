import React from "react";
import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";


const Signup = () => {
    let[name, setName]= useState("");
    let[email, setEmail]= useState("")
    let[password, setPassword] = useState("")
    let[phone, setPhone]= useState("")
   let navigate = useNavigate();

    let formHandale = (e)=>{
        e.preventDefault();

        let data = {
                    "name":name,
                    "email":email,
                    "password": password,
                    "phone": phone
                }
        fetch("http://localhost:5000/user" , {
                                                        method:"POST",
                                                        headers:{"Content-Type" :"application/json"},
                                                        body:JSON.stringify(data)
                                                 })
        .then(()=>{
           alert("your has been Account is created!!")
            setTimeout(()=>{
                navigate("/login")
            },1000)
        })
    }
    return ( 
        <div className="signup">
            <h1>Create your account</h1>
            <hr />
            <form onSubmit={formHandale}>  
                <input type="text" placeholder="Name" 
                value={name} onChange={(e)=>{setName(e.target.value);}}/>

                <input type="email" placeholder="Email_ID"
                 value={email} onChange={(e)=>{setEmail(e.target.value)}}/>

                <input type="password" placeholder="Password"
                 value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                <input type="tel" placeholder="Phone number" 
                maxLength="10" minLength="10"  value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>

                <input type="submit"  value="Sign UP!!"/>
            </form>
            <span>Already have an account ?<Link to="/login">Login</Link></span>
        </div>
     );
}
 
export default Signup;