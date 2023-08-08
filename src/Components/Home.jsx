import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import Carslist from "./Carslist";
import BeatLoader from "react-spinners/BeatLoader";
import Slider from "./Slider";
const Home = () => {
    let[cars,setCars] = useState(null);
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
                setCars(data)
                setPending(false)
            })
            .catch((error)=>{setError(error.message)
            setPending(false)
            })
        },3000)
    },[])
    
     useEffect(()=>{
        let x =  localStorage.getItem("wishlist");
        if(x==null)
        {
            localStorage.setItem("wishlist" , "[]")
        }
     },[]);
    return ( 
        <div className="home">
            {error != null && <h1>{error}</h1>}
            {pending==true && <div id="loader"><BeatLoader color="#009e6f" size="25"/></div>}
            {cars && <Slider cars={cars}/>}

            {cars && <>
                        <Carslist cars={cars} title="All Cars"/>
                        <Carslist cars={cars.filter((c)=>{return c.model.toLowerCase().includes("mahindra")})} title="Mahindra"/>
                        <Carslist cars={cars.filter((c)=>{return c.model.toLowerCase().includes("kia")})} title="KIA"/>
                        <Carslist cars={cars.filter((c)=>{return c.model.toLowerCase().includes("rolls-royce")})} title="ROLLS-ROYCE"/>
                    </>}
        </div>
     );
}
 
export default Home;