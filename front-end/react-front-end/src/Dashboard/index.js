import React from 'react';
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {

    const [jwt,setJwt] = useLocalState("", "jwt");

    function createAssignment(){
        fetch("/api/assignments",{
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

            <button onClick={()=> createAssignment()}>Submit new Assignment</button>
        </div>
        
    );
};

export default Dashboard;