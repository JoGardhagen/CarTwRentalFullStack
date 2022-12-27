import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const ReservartionView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const reservationId = window.location.href.split("/reservation/")[1];
    
    const [carId,setCarId] = useState("");
    const [carBrand,setCarBrand] = useState("");
    const [carModelYear,setCarModelYear] = useState("");
    const [carRentalPrice,setCarRentalPrice]=useState("");
    const carBody = {carId,carBrand,carModelYear,carRentalPrice};
    const [reservation,setReservation] = useState({});
    // const [reservations,setReservations] = useState([]);

    // useEffect(()=>{
    //     fetch(`api/v1/myorders`,{
    //         headers:{
    //             "Content-Type" : "application/json",
    //             "Authorization": `Bearer ${jwt}`
    //         },
    //         method: "GET",
    //     }).then(response =>{
    //         if(response.status === 200)return response.json();
    //     }).then(reservationData=>{
    //         setReservations(reservationData);
    //         console.log(reservationData);
    //     });
    // },[])
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
            // console.log(reservationData);
            
            selectedCar(reservationData);
            // console.log(reservation);
            // setCarBrand(reservationData.carbrand);
        });
    },[])
    function selectedCar(data){
        setCarId(data[0]);
        setCarBrand(data[1]);
        setCarModelYear(data[2]);
        setCarRentalPrice(data[3]);

        // console.log(carBody);
    }
    // function updateReservation(prop,value){
    //     const newReservation = {...reservation};
    //     newReservation[prop] = value;
    //     setReservation(newReservation)
    //     console.log(reservation);
    // }

    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
        // <h3> brand:{" "} <input type="text" id="brand" onChange={(e)=> updateReservation("carBrand",e.target.value)}
        //         value={reservation.carBrand}   /></h3>

    }
    // const onOptionChangeHandler = (e) =>{
    //     console.log();
    // }
//     function useless(){
//         <ul>
//         {reservation.map(item=>(
//        <li key={item.id}>
//            {reservation.id +" "}
//            {reservation.car.id +" "}
//            {reservation.car.brand +" "}
//            {reservation.car.modelYear +" "}
//            {reservation.car.rentalPrice +" "}
//            {reservation.userEntity.id+" "}
//            {reservation.userEntity.username+" "}
//            {reservation.rentalDays+" "}
//            {reservation.bookingDate+" "}
//            {reservation.active }
//        </li>
//    ))}
//        </ul>
//     }
    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservation</button>
                <button>Logout</button>
                <div>
                {/* <h1>Reservation {reservationId}</h1> */}
                {/* {reservation ?(
                    <>
                    <h2>Car Brand: {reservation.reservationId}</h2>
                    </>):(
                        <></>
                )} */}
            </div>
                        
            <div>
            <ul>
             {reservation.map(reservation=>(
            <li key={reservation.id}>
            {reservation.id +" "}
            {reservation.car.id +" "}
            {reservation.car.brand +" "}
            {reservation.car.modelYear +" "}
            {reservation.car.rentalPrice +" "}
            {reservation.userEntity.id+" "}
            {reservation.userEntity.username+" "}
            {reservation.rentalDays+" "}
            {reservation.bookingDate+" "}
            {reservation.active }
       </li>
   ))}
       </ul>
            </div>
        </div>
        </div>
    );
};

export default ReservartionView;