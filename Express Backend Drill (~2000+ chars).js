import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import session from "express-session";
import cookieParser from "cookie-parser";

const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(session({secret:"keyboardcat",resave:false,saveUninitialized:true}));

// Middleware
function logRequest(req,res,next){
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
app.use(logRequest);

// CRUD routes
app.get("/api/items",(req,res)=>{ res.json([{id:1,name:"Item A"},{id:2,name:"Item B"}]); });
app.post("/api/items",(req,res)=>{ const item=req.body; res.status(201).json({message:"Created",item}); });
app.put("/api/items/:id",(req,res)=>{ res.json({message:"Updated",id:req.params.id}); });
app.delete("/api/items/:id",(req,res)=>{ res.json({message:"Deleted",id:req.params.id}); });

// Auth routes
app.post("/api/login",(req,res)=>{ const {username,password}=req.body; if(username==="admin"&&password==="1234"){ res.json({token:"abc123"}); } else { res.status(401).json({error:"Invalid"}); } });
app.post("/api/logout",(req,res)=>{ res.json({message:"Logged out"}); });

app.listen(5000,()=>console.log("Express backend running on port 5000"));
