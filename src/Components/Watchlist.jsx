import React from "react";
import { useEffect, useState } from "react";
import Carslist from "./Carslist";

const Watchlist = () => {

    let[favCars , setFav] = useState(null);

    useEffect(()=>{
        let x = JSON.parse(localStorage.getItem("wishlist"));
        setFav(x);
    } )

    return ( 
        <>
            <div className="fav-cars">
                {favCars && <Carslist cars={favCars} title="Wishlist"/>}

                {favCars && favCars.length==0 && <h2>No movies in wishlist please add some and visit</h2>}
            </div>
        </>
    );
}
export default Watchlist;