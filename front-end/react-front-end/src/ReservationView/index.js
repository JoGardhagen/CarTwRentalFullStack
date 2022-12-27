import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const ReservartionView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const reservationId = window.location.href.split("/reservation/")[1];
 
    const [car,setCar] = useState({});
    const [userEntity,setUserEntity]= useState("")
    const [reservation,setReservation] = useState({
        car,userEntity
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
        .then(reservationData =>{ 
            setReservation(reservationData);
           
        });
    },[])
   
    // function updateReservation(prop,value){
    //     const newReservation = {...reservation};
    //     newReservation[prop] = value;
    //     setReservation(newReservation)
    //     console.log(reservation);
    // }

    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToCars(){
        window.location.href = "/cars";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }

    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservation</button>
                <button>Logout</button>
                <div>  
                <h2>Reservation for {reservation.userEntity.username}</h2>
                <h2>Date of Reservation {reservation.bookingDate}</h2>
                    <h2>Rental Days: {reservation.rentalDays}</h2>
                    <h2>Car :   {reservation.car.id +" "},
                                {reservation.car.brand+" "}, 
                                {reservation.car.modelYear+" "}, 
                                {reservation.car.rentalPrice}
                    </h2>
                    <h2>At Total Charge :{reservation.rentalDays * reservation.car.rentalPrice +" SEK"}</h2>
                    
                </div>
                        
            <div>
    
            </div>
        </div>
        </div>
    );
};

export default ReservartionView;