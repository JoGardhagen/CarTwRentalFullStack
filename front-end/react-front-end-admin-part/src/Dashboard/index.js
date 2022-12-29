import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {

    const [jwt,setJwt] = useLocalState("", "jwt");

    const [assignments,setAssignments] = useState(null);
    const [reservations,setReservations] = useState([]);

    useEffect(()=>{
        fetch("api/v1/myorders",{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then(response =>{
            if(response.status === 200)return response.json();
        }).then((reservationData)=>{
            setReservations(reservationData);
            console.log(reservationData);
        })
    },[])


    useEffect(() =>{
        fetch("api/assignments",{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then(response => {
            if(response.status === 200)return response.json();
        }).then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
    },[]);

    function createAssignment(){
        fetch("/api/assignments/",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"POST",
        }).then(response =>{
            if(response.status === 200) return response.json();
        })
        .then((assignment)=>{
            window.location.href = `/assignments/${assignment.id}`;
        });
    }
    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToCars(){
        window.location.href = "/cars";
    }
    function sendMeToNewReservation(){
        window.location.href ="/reservation";
    }

    function createNewReservation(){
        console.log("New Reservation");
        fetch("/api/v1/ordercar",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"POST",
            
        }).then(response =>{
            if(response.status === 200) return response.json();
            window.location.href ="/reservation";
        });

        function useless(){
            <ul>
             {reservations.map(reservation=>(
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
        }
    }
   
    return (
        <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button>Reservations</button>
                <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button>
                <button>Logout</button>
            
        <div style={{margin:"2em"}}>
            

            
             <div>
             
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>CAR ID</th>
                            <th>BRAND</th>
                            <th>YEAR</th>
                            <th>PRICE</th>
                            <th>ID_User</th>
                            <th>NAME</th>
                            <th>DAYS</th>
                            <th>BOOKDATE</th>
                            <th>COST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation,index)=>{
                        return(
                            <tr key={index}>
                                <th scope="row">{reservation.id}</th>
                                <td>{reservation.id +" "}</td>
                                   <td> {reservation.car.id +" "}</td>             
                                   <td> {reservation.car.brand +" "}  </td>           
                                   <td> {reservation.car.modelYear +" "}   </td> 
                                   <td> {reservation.car.rentalPrice +" "}  </td>
                                   <td> {reservation.userEntity.id+" "}         </td>
                                   <td> {reservation.userEntity.username+" "}   </td>
                                   <td> {reservation.rentalDays+" "}    </td>
                                   <td> {reservation.bookingDate+" "}   </td>
                                   <td> {reservation.rentalDays * reservation.car.rentalPrice }</td>         
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            <button onClick={()=> createAssignment()}>Submit new Assignment</button>
            {/* <button onClick={()=> createNewReservation()}>New Reservation</button> */}
            {assignments ? assignments.map((assignments) => (
            <div><Link to = {`/assignment/${assignments.id}`}>
                Assignment ID: {assignments.id}</Link></div>
             )) : (
             <></>
             )}
              {/* {reservations?reservations.map((reservation)=>{
                <div><Link to  = {`/reservation/${reservation.id}`}>
                    Reservation : ID {" "+ reservation.id}</Link></div>
             }) : (
                <></>
             )} */}
             {reservations?reservations.map(reservation =>(
                <div>
                    <Link to={`/reservation/${reservation.id}`}>Reservation : ID {reservation.id}</Link>
                </div>
             )):(
                <></>
             )}        
             </div>
             
            

            
            
        </div>
        </div>
        
    );
};

export default Dashboard;