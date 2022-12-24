import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {

    const [jwt,setJwt] = useLocalState("", "jwt");

    const [assignments,setAssignments] = useState(null);

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

    return (
        <div style={{margin:"2em"}}>
            {/* <h1>Hello World!</h1>
            <div>JWT value is {jwt}</div> */}
            {assignments ? assignments.map((assignments) => (
            <div><Link to = {`/assignment/${assignments.id}`}>
                Assignment ID: {assignments.id}</Link></div>
             )) : (
             <></>
             )}
            <button onClick={()=> createAssignment()}>Submit new Assignment</button>
        </div>
        
    );
};

export default Dashboard;