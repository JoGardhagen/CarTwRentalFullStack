import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const NewReservation = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const [cars,setCars]=useState([]);
    const [car,setCar] = useState({});
    const [userEntity,setUserEntity]= useState("")
    const [id,setId] = useState("");
    const [brand,setBrand] = useState("");
    const [modelYear,setModelYear] = useState("");
    const [rentalPrice,setRentalPrice]= useState("");
    const carBody = {id,brand,modelYear,rentalPrice};
    const [reservation,setReservation] = useState({
        car,
        userEntity,
        startDate:"",
        endingDate:""

        
    });
    useEffect(()=>{
        fetch("/api/v1/cars",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method :"GET",
        }).then((response)=>{
            if(response.status === 200) return response.json(); 
        }).then(data=> setCars(data));
        
    },[]);
    function selectedCar(data){
        setId(data[0]);
        setBrand(data[1]);
        setModelYear(data[2]);
        setRentalPrice(data[3]);
        setCar(carBody);
        // updateReservation("id",data[0]);
        // updateReservation("brand",data[1]);
        // updateReservation("modelYear",data[2]);
        // console.log(car);
        // console.log(carBody);
    }function createNewReservation(){
        const reserverationBody ={
            car: carBody,
            startDate : reservation.startDate,
            endingDate : reservation.endingDate,

        };
        console.log("New Reservation");
        fetch("/api/v1/ordercar",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"POST",
            body: JSON.stringify(reserverationBody)
        }).then(response =>{
            if(response.status === 200) return response.json();
        }).then((reservationData)=>{
            // window.location.href =`/reservation/${reservationData.id}`;
            console.log(reservationData);
            // sendMeToReservation();
        })
        // sendMeToReservation();
    }
    const onOptionChangeHandler = (e) =>{
        console.log(e.target.value);
        selectedCar(e.target.value.split(" "));
        // setCar(e.target.value);
    }
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
    function handleSubmit(event) {
        event.preventDefault();
        // setReservation(car);
        createNewReservation();
        console.log(car);
    }
    // const startDateHandler =(e)=>{
    //     console.log(e.target.value);
    // }
    function updateReservation(prop,value){
        const newReservation = {...reservation};
        newReservation[prop] = value;
        setReservation(newReservation)
        console.log(reservation);
    }
    return (
        <div>
            <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservations</button>
                <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button>
                <button>Logout</button>    
                <div>
                <form onSubmit={handleSubmit}>
                <select onChange={onOptionChangeHandler}>
                        <option>Choose a car</option>
                        {cars.map((car,index) =>{
                            return<option key={car.id}>
                                
                                {/* {car} */}
                                {car.id +" "}
                                {car.brand +" "}
                                {car.modelYear+" "}
                                {car.rentalPrice+" "}
                                </option>
                        })}
                    </select>
                    <label htmlFor='startDate'>start</label>
                    <input type="date" ype="date" id="startDate" name="trip-start"
                                min="2022-12-30" max="2023-06-31"  onChange={(e)=> updateReservation("startDate",e.target.value)}
                                value={reservation.startDate}/> 
                    <label htmlFor='endingDate'>ending</label>            
                    <input type="date" ype="date" id="endingDate" name="trip-start"
                                min="2022-12-30" max="2023-06-31"  onChange={(e)=> updateReservation("endingDate",e.target.value)}
                                value={reservation.endingDate}/> 
                    <button type="submit">Submit</button>
                </form>
                </div>

        </div>
    );
};

export default NewReservation;