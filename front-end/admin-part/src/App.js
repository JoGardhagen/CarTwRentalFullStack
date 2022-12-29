import { useEffect} from 'react';
import {  Route, Router, Routes,Switch } from 'react-router-dom';
import './App.css';
import { useLocalState } from './util/useLocalStorage';
function App() {
  const [jwt,setJwt] = useLocalState("", "jwt");
  useEffect(() =>{
    // console.log(`the JWT is: ${jwt}`);
    // console.log(`we have the JWT: ${jwt}`);

  },[jwt]);
  return (
    <div>

    </div>
  );
}

export default App;
