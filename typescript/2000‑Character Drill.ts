import { Pool } from "pg";
import express,{Request,Response} from "express";

const pool=new Pool({user:"postgres",host:"localhost",database:"drilldb",password:"secret",port:5432});
const app=express();
app.use(express.json());

interface User{ id:number; username:string; email:string; password:string; }

app.get("/users",async(req:Request,res:Response)=>{ const result=await pool.query("SELECT * FROM users"); res.json(result.rows); });

app.post("/users",async(req:Request,res:Response)=>{ const {username,email,password}=req.body; const result=await pool.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3) RETURNING *",[username,email,password]); res.status(201).json(result.rows[0]); });

app.put("/users/:id",async(req:Request,res:Response)=>{ const id=parseInt(req.params.id); const {email}=req.body; await pool.query("UPDATE users SET email=$1 WHERE id=$2",[email,id]); res.json({message:"Updated"}); });

app.delete("/users/:id",async(req:Request,res:Response)=>{ const id=parseInt(req.params.id); await pool.query("DELETE FROM users WHERE id=$1",[id]); res.json({message:"Deleted"}); });

app.listen(6000,()=>console.log("TS + PostgreSQL API running"));
