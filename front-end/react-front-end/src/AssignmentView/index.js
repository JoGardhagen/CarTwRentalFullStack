import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignment/")[1];
    const [assignment,setAssignment] = useState(null)

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
        .then((assignmentsData) =>{ 
            setAssignment(assignmentsData);
            
        });
    },[])
    return (
        <div>
            <h1>Assignment {assignmentId}</h1>  
            {assignment ? (
            <>
                <h2>Status : {assignment.status}</h2>
                <h3>GitHub URL: <input type="url" id="gitHubUrl"/>
                </h3>
                <h3>Branch: <input type="text" id="gitHubUrl"/>
                </h3>
                <button>Submit assignment</button>
            </>
            ) : ( 
            <></>
            )}      
        </div>
    );
};

export default AssignmentView;