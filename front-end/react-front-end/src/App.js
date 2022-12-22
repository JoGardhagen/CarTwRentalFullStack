import { useEffect} from 'react';
import './App.css';
import { useLocalState } from './util/useLocalStorage';

function App() {
  
  const [jwt,setJwt] = useLocalState("", "jwt");
  
  useEffect(()=>{
    if(!jwt)
{
    const reqBody={
      "username" :"joakim",
      "password" :1234
    }  
  
    fetch("api/auth/login",{
      headers: {
          "Content-Type": "application/json"
      },
      method:"post",
      body: JSON.stringify(reqBody)
    })
      .then((response) => Promise.all([response.json(), response.headers]))
      .then(([body,headers]) =>
        {
          // setJwt(headers.get("authorization"));
          // console.log(`JWT: ${jwt}`);
          setJwt(headers.get("authorization"));
          
        });
        }
      });
      
      useEffect(() =>{
        // console.log(`the JWT is: ${jwt}`);
        // console.log(`we have the JWT: ${jwt}`);

      },[jwt]);


  return ( 
    <div className="App">
      <h1>Hello World!</h1>
      <div>JWT value is {jwt}</div>
    </div>
  ); 
}

export default App;
