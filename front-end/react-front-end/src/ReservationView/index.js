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
    const [car,setCar] = useState({});
    const [userEntity,setUserEntity]= useState("")
    const [reservation,setReservation] = useState({
        car,userEntity
    });
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
                <h2>Reservation for {reservation.userEntity.username}</h2>
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