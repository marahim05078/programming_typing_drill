import express,{Request,Response} from "express";
import mongoose,{Schema,Document} from "mongoose";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app=express();
app.use(express.json());

// PostgreSQL setup
const pool=new Pool({user:"postgres",host:"localhost",database:"drilldb",password:"secret",port:5432});

// MongoDB setup
interface IUser extends Document{ username:string; email:string; password:string; roles:string[]; }
const UserSchema=new Schema<IUser>({ username:{type:String,required:true}, email:{type:String,required:true}, password:{type:String,required:true}, roles:{type:[String],default:["user"]} });
const User=mongoose.model<IUser>("User",UserSchema);

// JWT helper
function generateToken(user:IUser){ return jwt.sign({id:user._id,username:user.username,roles:user.roles},"supersecret",{expiresIn:"1h"}); }

// Routes
app.post("/register",async(req:Request,res:Response)=>{ const {username,email,password}=req.body; const hash=await bcrypt.hash(password,10); const user=new User({username,email,password:hash}); await user.save(); res.status(201).json(user); });
app.post("/login",async(req:Request,res:Response)=>{ const {username,password}=req.body; const user=await User.findOne({username}); if(user && await bcrypt.compare(password,user.password)){ res.json({token:generateToken(user)}); } else { res.status(401).json({error:"Invalid credentials"}); } });
app.get("/users",async(req:Request,res:Response)=>{ const result=await pool.query("SELECT * FROM users"); res.json(result.rows); });

mongoose.connect("mongodb://localhost:27017/drilldb").then(()=>app.listen(5000,()=>console.log("TS Enterprise Backend running")));
