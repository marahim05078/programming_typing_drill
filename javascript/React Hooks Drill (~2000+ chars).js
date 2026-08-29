import React,{useState,useEffect,useContext,useReducer} from "react";

const ThemeContext=React.createContext();

function reducer(state,action){
  switch(action.type){
    case "increment": return {...state,count:state.count+1};
    case "decrement": return {...state,count:state.count-1};
    default: return state;
  }
}

function Counter(){
  const [state,dispatch]=useReducer(reducer,{count:0});
  const theme=useContext(ThemeContext);

  useEffect(()=>{ console.log("Count changed:",state.count); },[state.count]);

  return(
    <div style={{background:theme.background,color:theme.color}}>
      <p>Count: {state.count}</p>
      <button onClick={()=>dispatch({type:"increment"})}>+</button>
      <button onClick={()=>dispatch({type:"decrement"})}>-</button>
    </div>
  );
}

function App(){
  const [theme,setTheme]=useState({background:"black",color:"white"});
  return(
    <ThemeContext.Provider value={theme}>
      <Counter/>
      <button onClick={()=>setTheme({background:"white",color:"black"})}>Toggle Theme</button>
    </ThemeContext.Provider>
  );
}

export default App;
