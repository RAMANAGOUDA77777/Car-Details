import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Carslist = ({cars,title}) => {

    let[wid , setWid] = useState([null]);

    useEffect(()=>{
        let wishlist = JSON.parse(localStorage.getItem("wishlist"));
        let x = wishlist.map((m)=>{ return m.id });
        setWid(x);
    })

    let add = (car)=>{
        let wishlist = localStorage.getItem("wishlist");    // take prv array
        wishlist = JSON.parse(wishlist)                     // convert form json to js
        wishlist.push(car);                               // adding the car to wishlist array
        wishlist = JSON.stringify(wishlist);
        localStorage.setItem("wishlist" , wishlist);
        alert("car added to wishlist");
    }

    let remove = (id)=>{
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));   
        for (let i = 0; i < wishlist.length; i++) 
        {
            if(wishlist[i].id==id)
            {
                wishlist.splice(i,1);
            }
        }
        localStorage.setItem("wishlist" , JSON.stringify(wishlist));
        alert("car removed from wishlist");
    }
    return ( 
        <>
            <h1 id="change">{title}</h1>
            <div className="cars-details">
                {cars.map((c)=>{
                        return(
                                <div className="car">

                                   {wid.includes(c.id) && <i className='bx bxs-heart' onClick={()=>{remove(c.id)}}></i>}
                                   {!wid.includes(c.id) && <i className='bx bx-heart' onClick={()=>{add(c)}}></i>}

                                   <Link to={`/cardetails/${c.id}`}>    {/* id value to store in one parameter.  */}
                                        <img src={c.posturl} alt="car" />
                                        <h1>{c.model}</h1>
                                        <p>{c.engine}</p>
                                        <p>{c.fuel_type}</p>
                                        <p id="price">Price : {c.price}</p>
                                   </Link>
                                </div>
                        )
                    })}
            </div>
        </>
     );
}
 
export default Carslist;