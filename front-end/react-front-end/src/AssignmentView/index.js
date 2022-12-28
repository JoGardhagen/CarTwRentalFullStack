import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";


const AssignmentView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignment/")[1];
    const [assignment,setAssignment] = useState({
        branch: "",
        githubUrl:"",
    });
    const [reserverationBody,setReservationBody] = useState({
        id: "",
        brand: "",
        modelYear: "",
        rentalPrice:""
    });


    const [id,setId] = useState("");
    const [brand,setBrand] = useState("");
    const [modelYear,setModelYear] = useState("");
    const [rentalPrice,setRentalPrice]= useState("");
    const carBody = {id,brand,modelYear,rentalPrice};

    
    const[carItem,setCarItem] = useState([]);
  
    const [cars,setCars]=useState([]);

    
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


    function updateAssignment(prop,value){
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
        console.log(assignment);
    }
    function updateReservation(prop,value){
        const newReservationOrder = {...reserverationBody};
        newReservationOrder[prop] = value;
        setReservationBody(newReservationOrder)
        console.log(reserverationBody);
    }
    function save(){
        fetch(`/api/assignments/${assignmentId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"PUT",
            body: JSON.stringify(assignment),

        }).then(response => {
            if(response.status ===200)return response.json();
        }).then(assignmentData =>{
            setAssignment(assignmentData);
            console.log(assignmentData);
        });
    }
    useEffect(()=>{
        fetch(`/api/assignments/${assignmentId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"GET",
        }).then(response =>{
            if(response.status === 200) return response.json();
        })
        .then((assignmentData) =>{ 
            setAssignment(assignmentData);
            console.log(assignmentData);
            
        });
    },[])
   const onOptionChangeHandler = (e) =>{
        
        
        selectedCar(e.target.value.split(" "));

        
    }
    function selectedCar(data){
        setId(data[0]);
        setBrand(data[1]);
        setModelYear(data[2]);
        setRentalPrice(data[3]);

        console.log(carBody);
    }
   function toObject(array){
    var arObj = setReservationBody;
    for (var i =0 ; i <array.lenght; i++){
        arObj[i] = array[i];
    }
    return arObj
   }
    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }
    function createNewReservation(){
        console.log("New Reservation");
        fetch("/api/v1/ordercar",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"POST",
            body: JSON.stringify(carBody)
        }).then(response =>{
            if(response.status === 200) return response.json();
        });
        sendMeToReservation();
    }
    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservation</button>
                <button>Logout</button>
            </div>
            <h1>Assignment {assignmentId}</h1>  
            {assignment ? (
            <>
                <h2>Status : {assignment.status}</h2>
                <h3>GitHub URL: <input type="url" id="githuhUrl" onChange={(e)=> updateAssignment("githubUrl",e.target.value)}
                value={assignment.githubUrl}
                />
                </h3>
                <h3>Branch:{" "} <input type="text" id="branch" onChange={(e)=> updateAssignment("branch",e.target.value)}
                value={assignment.branch}
                />
                </h3>
                <button onClick={()=> save()}>Submit assignment</button>
                
                <div>
                    <select onChange={onOptionChangeHandler}>
                        <option>Choose a car</option>
                        {cars.map((car,index) =>{
                            return<option key={car.id}>
                                
                                {car.id +" "}
                                {car.brand +" "}
                                {car.modelYear+" "}
                                {car.rentalPrice+" "}
                                </option>
                        })}
                    </select>
                </div>
                <div>
                    <button onClick={(e)=> createNewReservation()}>New Reservation</button>
                </div>
            </>
            ) : ( 
            <></>
            )}      
        </div>
    );
};

export default AssignmentView;