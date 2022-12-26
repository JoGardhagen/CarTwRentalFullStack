import { useEffect} from 'react';
import {  Route, Router, Routes,Switch } from 'react-router-dom';
import './App.css';
import AssignmentView from './AssignmentView';
import Cars from './Cars';
import Dashboard from "./Dashboard";
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import { useLocalState } from './util/useLocalStorage';


function App() {
  
  const [jwt,setJwt] = useLocalState("", "jwt");
  

      
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
      <Route path="/cars" element={
        <PrivateRoute>
          <Cars></Cars>
        </PrivateRoute>
      }/>
      <Route
      path="/assignment/:id"
        element={
          <PrivateRoute>
            <AssignmentView/>
          </PrivateRoute>
        }
      />
      <Route path="/" element={ <Homepage/> }/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      
    </Routes>
    
  ); 
}

export default App;
