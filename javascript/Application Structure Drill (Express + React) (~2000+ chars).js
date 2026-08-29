// server.js
import express from "express";
import path from "path";
const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname,"client/build")));

app.get("/api/data",(req,res)=>{ res.json([{id:1,name:"Alpha"},{id:2,name:"Beta"}]); });

app.get("*",(req,res)=>{ res.sendFile(path.join(__dirname,"client/build","index.html")); });

app.listen(5000,()=>console.log("Fullstack app running"));

// client/src/App.js
import React,{useState,useEffect} from "react";

function App(){
  const [data,setData]=useState([]);
  useEffect(()=>{
    fetch("/api/data").then(res=>res.json()).then(setData);
  },[]);
  return(
    <div>
      <h1>Fullstack Demo</h1>
      <ul>{data.map(d=><li key={d.id}>{d.name}</li>)}</ul>
    </div>
  );
}

export default App;
