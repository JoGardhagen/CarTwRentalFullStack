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
    // 

    const [id,setId] = useState("");
    const [brand,setBrand] = useState("");
    const [modelYear,setModelYear] = useState("");
    const [rentalPrice,setRentalPrice]= useState("");
    const carBody = {id,brand,modelYear,rentalPrice};

    
    const[carItem,setCarItem] = useState([]);
    // const [gitHubUrl,setGitHubUrl] = useState("");
    // const [branch,setBranch] = useState("");
    const [cars,setCars]=useState([]);

    // const fetchData = () =>{
    //     return fetch("/api/v1/cars",)
    //     .then((response)=>response.json())
    //     .then(data=> setCars(data));

    // }
    // useEffect(()=>{
    //     fetchData();
    // })
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
        // console.log(" Has selected -",e.target.value.split(" "));
        // data = e.target.value.split(" ");
        
        selectedCar(e.target.value.split(" "));

        // setId(e.target.value.split(" ")[0]);
        // setBrand(e.target.value.split(" ")[1]);
        // setModelYear(e.target.value.split(" ")[2]);
        // setRentalPrice(e.target.value.split(" ")[3]);

        // console.log(carBody);
        // e.target.value.split(" ");
        // updateReservation("id",e.target.value.split(" ")[0])
       
        // const data = e.target.value.split(" ");
        // data.forEach(element => {
            // updateReservation("id",e.target.value.split(" ")[0]);
            // updateReservation("brand",e.target.value.split(" ")[1]);
            // updateReservation("modelYear",e.target.value.split(" ")[2]);
            // updateReservation("rentalPrice",e.target.value.split(" ")[3]);
        // });
        // for(var i = 0; i > data.lenght; i ++){
        //     console.log(data[i]);
        // {cars.map((car,index) =>{

        //     updateReservation("id",car.id)
        //     updateReservation("brand",car.brand);
        //     updateReservation("modelYear",car.modelYear);
        //     updateReservation("rentalPrice",car.rentalPrice);
        //         // {car.id +" "}
        //         // {car.brand +" "}
        //         // {car.modelYear+" "}
        //         // {car.rentalPrice+" "}
                
        // })}
            
        // }
        // updateReservation("id",data[0]);
        // updateReservation("brand",data[1]);
        // updateReservation("modelYear",data[2]);
        // updateReservation("rentalPrice",data[3]);
        
        
        //console.log(data);
        //setReservationBody(JSON.stringify(data));
        // toObject(data);
        // setCarItem(e.target.value.split(" "));
        // let i = 0;
        // carItem.forEach(element => {
        //     console.log(element)
        //     // setReservationBody[i]  = element ;
        //     // i++;
        // });
        // // const myArray = carItem;
        // // console.log(carItem);  
        // // // console.log(toObject(carItem)); 
        // // toObject(myArray);
        // var arObj = setReservationBody;
        // console.log(reserverationBody);
        
        
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