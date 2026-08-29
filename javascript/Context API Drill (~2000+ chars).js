import React,{createContext,useState,useContext} from "react";

const AuthContext=createContext();

function AuthProvider({children}){
  const [user,setUser]=useState(null);
  const login=(username)=>setUser({username});
  const logout=()=>setUser(null);
  return(
    <AuthContext.Provider value={{user,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
}

function Profile(){
  const {user,logout}=useContext(AuthContext);
  return(
    <div>
      {user ? (
        <>
          <p>Welcome {user.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : <p>No user logged in</p>}
    </div>
  );
}

function App(){
  const {login}=useContext(AuthContext);
  return(
    <div>
      <button onClick={()=>login("Md")}>Login</button>
      <Profile/>
    </div>
  );
}

export default function Root(){
  return(
    <AuthProvider>
      <App/>
    </AuthProvider>
  );
}
