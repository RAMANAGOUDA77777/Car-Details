import React, { useRef } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditCar = () => {
   let Model =useRef();
   let Brand=useRef();
   let year = useRef();
   let Engine = useRef();
   let HorsePower = useRef();
   let FuelType = useRef();
   let Price = useRef();
   let Features = useRef();
   let PostUrl = useRef();
   let VideoClip = useRef() ;
   let Transmission = useRef();
   let navigate = useNavigate();

  let{id} = useParams();
   console.log(id);
   useEffect(()=>{
    fetch(`http://localhost:8000/cars/${id}`)
    .then(res=>res.json())
    .then((data)=>{
        Model.current.value             =   data.model
        Brand.current.value             =   data.brand
        year.current.value              =   data.year
        Engine.current.value            =   data.engine
        HorsePower.current.value        =   data.horsepower
        Transmission.current.value      =   data.transmission
        FuelType.current.value          =   data.fuel_type
        Price.current.value             =   data.price
        Features.current.value          =   data.features.join(", ")
        PostUrl.current.value           =   data.posturl
        VideoClip.current.value         =   data.carVideoClip
    })
},[])   

   const handleSubmit=(e)=>{
           e.preventDefault();
        
       let editcar = {
        model : Model.current.value ,
        brand : Brand.current.value,
        year : parseInt(year.current.value),
        engine : Engine.current.value,
        horsepower : parseInt(HorsePower.current.value),
        transmission : Transmission.current.value,
        fuel_type : FuelType.current.value,
        price : Price.current.value,          
        features : [...new Set([ ...Features.current.value.split(",")])] ,         
        PostUrl : PostUrl.current.value||null,   
        carVideoClip : VideoClip.current.value
    }    

    fetch(`http://localhost:8000/cars/${id}` ,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(editcar)
    })
    .then(res=> res.json())
    .then((data)=>{

        alert(`New ${Brand.current.value},${Model.current.value} added successfully`);

       setTimeout(()=>{
                let ask = window.confirm("are you want to stay here or goto Cardetails")
                if(ask)
                {
                navigate(`/cardetails/${data.id}`)
                }else
                {
                    window.location.reload();
                }
       },2000)
    })
}

    return ( 
        <div className="add-car">
            <h1>Add a new Car</h1>
            <form onSubmit={handleSubmit}>
               <input type="text" placeholder="Model" ref={Model} required />
               <input type="text" placeholder="Brand" ref={Brand} required/>
               <input type="number" placeholder="year" ref={year} required/> 
               <input type="text" placeholder="Engine" ref={Engine} required/>
               <input type="number" placeholder="HorsePower" ref={HorsePower} required/>
               <input type="text" placeholder="transmission" ref={Transmission} required/>
               <input type="text" placeholder="Fuel-type" ref={FuelType} required/>
               <input type="text" placeholder="Price" ref={Price} required/>
               <input type="text" placeholder="Features" ref={Features} required/>
               <input type="url"  placeholder="Posturl" ref={PostUrl} required/>
               <input type="url" placeholder="Car video clip url" ref={VideoClip} required/>
                <input type="submit" value="Add new Car" />
            </form>
        </div>
     );
}
 
export default EditCar;