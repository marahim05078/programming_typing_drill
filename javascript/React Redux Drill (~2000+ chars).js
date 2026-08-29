import { createStore } from "redux";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

const initialState={count:0};

function reducer(state=initialState,action){
  switch(action.type){
    case "INCREMENT": return {count:state.count+1};
    case "DECREMENT": return {count:state.count-1};
    default: return state;
  }
}

const store=createStore(reducer);

function Counter(){
  const count=useSelector(state=>state.count);
  const dispatch=useDispatch();
  return(
    <div>
      <p>Count: {count}</p>
      <button onClick={()=>dispatch({type:"INCREMENT"})}>+</button>
      <button onClick={()=>dispatch({type:"DECREMENT"})}>-</button>
    </div>
  );
}

function App(){
  return(
    <Provider store={store}>
      <Counter/>
    </Provider>
  );
}

export default App;
