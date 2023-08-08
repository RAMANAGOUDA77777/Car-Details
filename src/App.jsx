import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Watchlist from "./Components/Watchlist";
import Profile from "./Components/Profile";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Addcar from "./Components/Addcar";
import CarDetails from "./Components/Cardetails";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Protector from "./Components/Protector";
import EditCar from "./Components/EditCar";
import Searchbar from "./Components/Searchbar";

function App()
{
	return(
		<BrowserRouter>
		    <div className="app">
			    {window.location.pathname != '/' && <Navbar/>}
			    <Routes>
					<Route path="/search/:key" element={<Searchbar/>}/>
	                <Route path="/Editcar/:id" element={<EditCar/>}/>
					<Route path="/login" element ={<Login/>}/>
					<Route path="/" element={<Signup/>}/>
					<Route path="/home" element={<Protector Child = {Home}/>}/>
					<Route path="/addcar" element={<Protector Child={Addcar}/>}/>
					<Route path="/watchlist" element={<Protector Child={Watchlist}/>}/>
					<Route path="/profile" element={<Protector Child={Profile}/>}/>
					<Route path="/cardetails/:id" element={<CarDetails/>}/> // we took one parameter as id to store into it value.
			    </Routes>
		    </div>
		</BrowserRouter>   
	);
}
export default App;