import React, { useEffect, useState } from 'react';
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignment/")[1];
    const [assignment,setAssignment] = useState(null);
    // const [gitHubUrl,setGitHubUrl] = useState("");
    // const [branch,setBranch] = useState("");

    function updateAssignment(prop,value){
        assignment[prop] = value;
        console.log(assignment);
    }
    function save(){
        fetch(`/api/assignments/${assignmentId}`,{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method:"PUT",
            body: JSON.stringify(assignment)

        }).then(response => {
            if(response.status ===200)return response.json()
        }).then(assignmentsData =>{
            setAssignment(assignmentsData);
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
        .then((assignmentsData) =>{ 
            setAssignment(assignmentsData);
            
        });
    },[])
    //<h3>GitHub URL: <input type="url" id="gitHubUrl" onChange={(e)=> setGitHubUrl(e.target.value)}/>
    return (
        <div>
            <h1>Assignment {assignmentId}</h1>  
            {assignment ? (
            <>
                <h2>Status : {assignment.status}</h2>
                <h3>GitHub URL: <input type="url" id="gitHuhUrl" onChange={(e)=> updateAssignment("githubUrl",e.target.value)}
                value={assignment.githubUrl}
                />
                </h3>
                <h3>Branch: <input type="text" id="branch" onChange={(e)=> updateAssignment("branch",e.target.value)}/>
                </h3>
                <button onClick={()=> save()}>Submit assignment</button>
            </>
            ) : ( 
            <></>
            )}      
        </div>
    );
};

export default AssignmentView;