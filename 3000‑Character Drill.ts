import express,{Request,Response} from "express";
import mongoose,{Schema,Document} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app=express();
app.use(express.json());

interface IUser extends Document{ username:string; email:string; password:string; roles:string[]; }
const UserSchema=new Schema<IUser>({ username:{type:String,required:true}, email:{type:String,required:true}, password:{type:String,required:true}, roles:{type:[String],default:["user"]} });
const User=mongoose.model<IUser>("User",UserSchema);

function generateToken(user:IUser){ return jwt.sign({id:user._id,username:user.username,roles:user.roles},"supersecret",{expiresIn:"1h"}); }

app.post("/register",async(req:Request,res:Response)=>{ const {username,email,password}=req.body; const hash=await bcrypt.hash(password,10); const user=new User({username,email,password:hash}); await user.save(); res.status(201).json(user); });

app.post("/login",async(req:Request,res:Response)=>{ const {username,password}=req.body; const user=await User.findOne({username}); if(user && await bcrypt.compare(password,user.password)){ res.json({token:generateToken(user)}); } else { res.status(401).json({error:"Invalid credentials"}); } });

function authMiddleware(req:Request,res:Response,next:Function){ const header=req.headers["authorization"]; if(!header) return res.status(401).json({error:"No token"}); const token=header.split(" ")[1]; try{ const decoded=jwt.verify(token,"supersecret"); (req as any).user=decoded; next(); }catch(err){ res.status(403).json({error:"Invalid token"}); } }

app.get("/profile",authMiddleware,(req:Request,res:Response)=>{ res.json({message:"Profile data",user:(req as any).user}); });

mongoose.connect("mongodb://localhost:27017/drilldb").then(()=>app.listen(7000,()=>console.log("TS Auth API running")));
