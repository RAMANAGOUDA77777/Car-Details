import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Carslist from "./Carslist";

const CarDetails = () => {
    let[car,setCar] = useState(null);
    let[error,setError] = useState(null);
    let[pending,setPending] = useState(true);
    let[cars, setCars] = useState(null);

    let back = useNavigate();

// ****************--------------------------------------------------------************************************************************


            useEffect(()=>{
                setTimeout(()=>{
                    fetch("http://localhost:8000/cars")
                    .then((Response)=>{
                        // console.log(Response);
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
                        // console.log(data);
                        setCars(data)
                        setPending(false)
                    })
                    .catch((error)=>{setError(error.message)
                    setPending(false)
                    })
                },3000)
            },[])



    //-----------------------------------------********************************************------------------------------------------------------------


    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:8000/cars/${id}`)
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
                setCar(data)
                setPending(false)
            })
            .catch((error)=>{setError(error.message)
            setPending(false)
            })
        },1000)
    },[])

   let {id} = useParams() // it will return one object
//    console.log(id);
  
let deletdata = ()=>{
    fetch(`http://localhost:8000/cars/${id}`,{
        method:"DELETE"
    }).then(()=>{
       let x= window.confirm("are you sure you want to delete!!");
       if(x)
       {
           back("/home")
       }   
    })
}
    return ( 
        <>
            <div id="cardetails__container">
            {error != null && <h1>{error}</h1>}
            {pending==true && <div id="loader"></div>}
            {car && <div className="car-container">
                       <section id="box1-container">
                           <img src={car.posturl} alt="" />
                       </section>
                       <section id="box2-container">
                            <h1>{car.year} {car.model}</h1> 
                            <p>{car.engine} . {car.transmission}</p>
                            <span>Start at {car.price} </span> 
                            <span> {car.fuel_type}</span>
                            <h4>Features : {car.features.join(", ")}</h4>
                            <p>Car Video Clip : <iframe width="560" height="315" src={car.carVideoClip} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>
                            <article>
                                <Link to={`/Editcar/${id}`}><input type="submit"  value="Edit"/></Link> <br />
                                <input type="submit"  value="Delete" onClick={deletdata}/>
                            </article>
                       </section>
                       
                    </div>
            }
           
           </div>
          {
            cars &&  <div id="similar-cars">
                           <Carslist cars={cars.filter((c)=>{return c.fuel_type.toLowerCase().includes("diesel")})} title="Similar cars" />  
                    </div>
          }
        
        </>
        
     );
}
 
export default CarDetails;