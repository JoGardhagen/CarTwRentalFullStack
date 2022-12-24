import { useEffect} from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import AssignmentView from './AssignmentView';
import Dashboard from "./Dashboard";
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
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

      
    </Routes>
    
  ); 
}

export default App;
