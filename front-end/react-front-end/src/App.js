import { useEffect} from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from "./Dashboard";
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { useLocalState } from './util/useLocalStorage';

function App() {
  
  const [jwt,setJwt] = useLocalState("", "jwt");
  
//   useEffect(()=>{
//     if(!jwt)
// {
//     const reqBody={
//       "username" :"joakim",
//       "password" :1234
//     }  
  
//     fetch("api/auth/login",{
//       headers: {
//           "Content-Type": "application/json"
//       },
//       method:"post",
//       body: JSON.stringify(reqBody)
//     })
//       .then((response) => Promise.all([response.json(), response.headers]))
//       .then(([body,headers]) =>
//         {
//           // setJwt(headers.get("authorization"));
//           // console.log(`JWT: ${jwt}`);
//           setJwt(headers.get("authorization"));
          
//         });
//         }
//       });
      
      useEffect(() =>{
        // console.log(`the JWT is: ${jwt}`);
        // console.log(`we have the JWT: ${jwt}`);

      },[jwt]);


  return ( 
    <Routes>
      <Route path="/dashboard" element={ 
       <PrivateRoute>
       <Dashboard/> 
       </PrivateRoute>
      }/>
      <Route path="/" element={ <Homepage/> }/>
      <Route path="/login" element={<Login/>}/>

      
    </Routes>
    
  ); 
}

export default App;
