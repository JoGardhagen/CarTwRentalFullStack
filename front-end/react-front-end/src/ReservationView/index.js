import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const ReservartionView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const reservationId = window.location.href.split("/reservation/")[1];
    const [reservation,setReservation] = useState({

    });

    useEffect(()=>{
        fetch(`/api/v1/myorder/${reservationId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"GET",
        }).then(response =>{
            if(response.status === 200) return response.json();
        })
        .then((reservationData) =>{ 
            setReservation(reservation);
            console.log(reservationData);
            
        });
    },[])


    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }
    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservation</button>
                <button>Logout</button>
            </div>
            <div>
                <h1>Reservation {reservationId}</h1>
            </div>
        </div>
    );
};

export default ReservartionView;