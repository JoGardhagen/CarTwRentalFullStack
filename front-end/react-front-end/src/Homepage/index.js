import React from 'react';
import { useLocalState } from "../util/useLocalStorage";

const Homepage = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");


    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToCars(){
        window.location.href = "/cars";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }
    function sendMeToNewReservation(){
        window.location.href ="/reservation";
    }
    function logMeOut(){
        setJwt(null);
    }

    return (
    <div>
        <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservation</button>
                <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button>
                <button onClick={(e)=>logMeOut()}>Logout</button>
                </div>
        <h1>Homepage</h1>
        </div>
        );
};

export default Homepage;