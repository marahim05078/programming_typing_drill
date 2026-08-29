import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app=express();
app.use(bodyParser.json());

const users=[{id:1,username:"admin",passwordHash:bcrypt.hashSync("1234",10),roles:["admin"]}];

function generateToken(user){
  return jwt.sign({id:user.id,username:user.username,roles:user.roles},"supersecret",{expiresIn:"1h"});
}

function authMiddleware(req,res,next){
  const header=req.headers["authorization"];
  if(!header) return res.status(401).json({error:"No token"});
  const token=header.split(" ")[1];
  try{
    const decoded=jwt.verify(token,"supersecret");
    req.user=decoded;
    next();
  }catch(err){ res.status(403).json({error:"Invalid token"}); }
}

function roleMiddleware(role){
  return (req,res,next)=>{
    if(req.user.roles.includes(role)){ next(); }
    else{ res.status(403).json({error:"Forbidden"}); }
  };
}

app.post("/login",(req,res)=>{
  const {username,password}=req.body;
  const user=users.find(u=>u.username===username);
  if(user && bcrypt.compareSync(password,user.passwordHash)){
    res.json({token:generateToken(user)});
  }else{ res.status(401).json({error:"Invalid credentials"}); }
});

app.get("/admin",authMiddleware,roleMiddleware("admin"),(req,res)=>{
  res.json({message:"Welcome admin"});
});

app.listen(5000,()=>console.log("Auth server running"));
