import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
const Navbar =()=>{
    let [searchkey, setSearchkey] = useState("");
    let [movienames , setmovienames] = useState([]);
    let [filtercarsname, setFiltercarsname] = useState([]);
    let[error,setError] = useState(null);
    let[pending,setPending] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            fetch("http://localhost:8000/cars")
            .then((Response)=>{
                if(Response.ok == true)
                {
                   return Response.json()
                }
                else
                {
                    throw new Error("sorry user data is not found");
                }
            })
            .then((data)=>{ 
             let x = data.map((d)=>{return d.brand})
                 console.log(x);
                 setmovienames(x);
                let m = x.filter((v)=>{return v.toLowerCase().startsWith(searchkey.toLowerCase())})
                setFiltercarsname(m);
                // console.log(m);
            })
            .catch((error)=>{setError(error.message)
            setPending(false)
            })
        },3000)
    },[searchkey])
    return(
       <nav>
           <div id="logo">
               <Link to="/home">
                   <span><i className='bx bxs-car'></i></span>
                    CarDetails
               </Link>
           </div>
           <div id="searchbar">
                <input type="text" placeholder="Search..." value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}} />
                <Link to={`/search/${searchkey}`}><button><i className='bx bx-search-alt-2'></i></button></Link>
                <div className="suggestion">
                    {
                        filtercarsname.map((f)=>{return(
                        <p onClick={(e)=>{setSearchkey(e.target.innerText)}}>{f}</p>)})
                    }
                </div>
           </div>
           <div id="nav-links">
                <Link to="/addcar">Add Car</Link>
                <Link to="/watchlist"><i className='bx bxs-heart'></i></Link>
                <Link to="/profile"> <i className='bx bxs-user-circle'></i> </Link>
           </div>
       </nav>
    )
}
export default Navbar;