import React,{useState,useEffect,createContext,useContext} from "react";
import { createStore } from "redux";
import { Provider,useDispatch,useSelector } from "react-redux";

const AuthContext=createContext<any>(null);

function authReducer(state={user:null},action:any){
  switch(action.type){
    case "LOGIN": return {user:action.payload};
    case "LOGOUT": return {user:null};
    default: return state;
  }
}
const store=createStore(authReducer);

function LoginForm(){
  const dispatch=useDispatch();
  const {setTheme}=useContext(AuthContext);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  async function handleLogin(){
    const res=await fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})});
    const data=await res.json();
    if(data.token){ dispatch({type:"LOGIN",payload:{username}}); setTheme("dark"); }
  }
  return(<div><input value={username} onChange={e=>setUsername(e.target.value)}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)}/><button onClick={handleLogin}>Login</button></div>);
}

function Profile(){
  const user=useSelector((state:any)=>state.user);
  const {theme}=useContext(AuthContext);
  return(<div style={{background:theme==="dark"?"black":"white",color:theme==="dark"?"white":"black"}}>{user?<p>Welcome {user.username}</p>:<p>No user logged in</p>}</div>);
}

export default function App(){
  const [theme,setTheme]=useState("light");
  return(<AuthContext.Provider value={{theme,setTheme}}><Provider store={store}><LoginForm/><Profile/></Provider></AuthContext.Provider>);
}
