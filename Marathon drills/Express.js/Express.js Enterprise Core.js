import express,{Request,Response,NextFunction} from "express";
import mongoose,{Schema,Document} from "mongoose";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";

const app=express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(session({secret:"enterpriseSecret",resave:false,saveUninitialized:true}));

// PostgreSQL pool
const pool=new Pool({user:"postgres",host:"localhost",database:"enterprise",password:"secret",port:5432});

// MongoDB user model
interface IUser extends Document{ username:string; email:string; password:string; roles:string[]; }
const UserSchema=new Schema<IUser>({ username:String,email:String,password:String,roles:[String] });
const User=mongoose.model<IUser>("User",UserSchema);

// JWT helper
function generateToken(user:IUser){ return jwt.sign({id:user._id,username:user.username,roles:user.roles},"supersecret",{expiresIn:"1h"}); }

// Middleware
function authMiddleware(req:Request,res:Response,next:NextFunction){
  const header=req.headers["authorization"];
  if(!header) return res.status(401).json({error:"No token"});
  const token=header.split(" ")[1];
  try{ const decoded=jwt.verify(token,"supersecret"); (req as any).user=decoded; next(); }
  catch(err){ res.status(403).json({error:"Invalid token"}); }
}
function roleMiddleware(role:string){
  return (req:Request,res:Response,next:NextFunction)=>{
    if((req as any).user.roles.includes(role)){ next(); }
    else{ res.status(403).json({error:"Forbidden"}); }
  };
}

// Routes
app.post("/register",async(req,res)=>{ const {username,email,password}=req.body; const hash=await bcrypt.hash(password,10); const user=new User({username,email,password:hash}); await user.save(); res.status(201).json(user); });
app.post("/login",async(req,res)=>{ const {username,password}=req.body; const user=await User.findOne({username}); if(user && await bcrypt.compare(password,user.password)){ res.json({token:generateToken(user)}); } else { res.status(401).json({error:"Invalid credentials"}); } });
app.get("/users",authMiddleware,roleMiddleware("admin"),async(req,res)=>{ const result=await pool.query("SELECT * FROM users"); res.json(result.rows); });
