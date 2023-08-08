import React from "react";
import { Sliderify } from "react-sliderify";

let Slider = ({cars})=>{


    return(
        <div className="sliders">
            <Sliderify autoPlay={true}  slideDurationInSecs="3" showSpot={false}>
            {
                cars.map((car)=>{
                    return(<div style={{ height: "500px", background:`url(${car.bannerurl})`,backgroundRepeat:"no-repeat",backgroundSize:"cover" , color: "white" }}>
                        </div>) 
                })
            }
            </Sliderify>
        </div>
    )
}

export default Slider;