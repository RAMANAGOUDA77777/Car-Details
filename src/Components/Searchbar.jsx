import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carslist from "./Carslist";
import BeatLoader from "react-spinners/BeatLoader";
const Searchbar = () => {
    let[cars,setCars] = useState(null);
    let[error,setError] = useState(null);
    let[pending,setPending] = useState(true);

    let {key} = useParams();

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
                setCars(data)
                setPending(false)
            })
            .catch((error)=>{setError(error.message)
            setPending(false)
            })
        },3000)
    },[])
    return ( 
        <div className="search-container"  style={{padding:"10px 80px"}}>
             {error != null && <h1>{error}</h1>}
             {pending==true && <div id="loader"><BeatLoader color="#009e6f" size="25"/></div>}
            {
                cars && <div id="getdata">
                          <Carslist cars={cars.filter((c)=>{return c.brand.toLowerCase().startsWith(key.toLowerCase())})}  title={`Search result for : ${key}`}/>
                        </div>
            }
        </div>
     );
}
 
export default Searchbar;