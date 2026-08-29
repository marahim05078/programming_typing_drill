import React,{createContext,useContext,useState} from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

const AuthContext=createContext();

function authReducer(state={user:null},action){
  switch(action.type){
    case "LOGIN": return {user:action.payload};
    case "LOGOUT": return {user:null};
    default: return state;
  }
}

const store=createStore(authReducer);

function LoginButton(){
  const dispatch=useDispatch();
  const {setTheme}=useContext(AuthContext);
  return(
    <button onClick={()=>{dispatch({type:"LOGIN",payload:{username:"Md"}});setTheme("dark");}}>
      Login
    </button>
  );
}

function Profile(){
  const user=useSelector(state=>state.user);
  const {theme}=useContext(AuthContext);
  return(
    <div style={{background:theme==="dark"?"black":"white",color:theme==="dark"?"white":"black"}}>
      {user ? <p>Welcome {user.username}</p> : <p>No user logged in</p>}
    </div>
  );
}

function App(){
  const [theme,setTheme]=useState("light");
  return(
    <AuthContext.Provider value={{theme,setTheme}}>
      <Provider store={store}>
        <LoginButton/>
        <Profile/>
      </Provider>
    </AuthContext.Provider>
  );
}

export default App;
