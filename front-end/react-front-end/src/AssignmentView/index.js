import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignment/")[1];
    const [assignment,setAssignment] = useState({
        branch: "",
        githubUrl:"",
    });
    
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
        console.log(" Has selected -",e.target.value);
   }
    
    return (
        <div>
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
                <ul>
                    {cars.map(car=>(
                        <li key={car.id}>
                            {car.id +" "}
                            {car.brand +" "}
                            {car.modelYear+" "}
                            {car.rentalPrice+" "}
                        </li>
                    ))}
                </ul>
                <div>
                    <select onChange={onOptionChangeHandler}>
                        <option>Choose a car</option>
                        {cars.map((car,index) =>{
                            return<option key={car.id}>// för att hitta bilen behövs car.id
                                
                                {car.id +" "}
                                {car.brand +" "}
                                {car.modelYear+" "}
                                {car.rentalPrice+" "}
                                </option>
                        })}
                    </select>
                </div>
            </>
            ) : ( 
            <></>
            )}      
        </div>
    );
};

export default AssignmentView;