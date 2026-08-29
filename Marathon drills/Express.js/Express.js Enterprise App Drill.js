// app.ts
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
import path from "path";

const app=express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({secret:"enterpriseSecret",resave:false,saveUninitialized:true}));

// PostgreSQL setup
const pool=new Pool({user:"postgres",host:"localhost",database:"enterprise",password:"secret",port:5432});

// MongoDB setup
interface IUser extends Document{ username:string; email:string; password:string; roles:string[]; }
const UserSchema=new Schema<IUser>({ username:{type:String,required:true}, email:{type:String,required:true}, password:{type:String,required:true}, roles:{type:[String],default:["user"]} });
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

// Controllers
app.post("/register",async(req:Request,res:Response)=>{ const {username,email,password}=req.body; const hash=await bcrypt.hash(password,10); const user=new User({username,email,password:hash}); await user.save(); res.status(201).json(user); });
app.post("/login",async(req:Request,res:Response)=>{ const {username,password}=req.body; const user=await User.findOne({username}); if(user && await bcrypt.compare(password,user.password)){ res.json({token:generateToken(user)}); } else { res.status(401).json({error:"Invalid credentials"}); } });
app.get("/users",authMiddleware,roleMiddleware("admin"),async(req:Request,res:Response)=>{ const result=await pool.query("SELECT * FROM users"); res.json(result.rows); });

// CRUD for products
app.get("/products",async(req,res)=>{ const result=await pool.query("SELECT * FROM products"); res.json(result.rows); });
app.post("/products",authMiddleware,roleMiddleware("editor"),async(req,res)=>{ const {name,price}=req.body; const result=await pool.query("INSERT INTO products(name,price) VALUES($1,$2) RETURNING *",[name,price]); res.status(201).json(result.rows[0]); });
app.put("/products/:id",authMiddleware,roleMiddleware("editor"),async(req,res)=>{ const id=parseInt(req.params.id); const {price}=req.body; await pool.query("UPDATE products SET price=$1 WHERE id=$2",[price,id]); res.json({message:"Updated"}); });
app.delete("/products/:id",authMiddleware,roleMiddleware("admin"),async(req,res)=>{ const id=parseInt(req.params.id); await pool.query("DELETE FROM products WHERE id=$1",[id]); res.json({message:"Deleted"}); });

// Template engine (EJS)
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.get("/profile",(req,res)=>{ res.render("profile",{user:{name:"Md",email:"md@example.com"}}); });

// AJAX example
app.get("/ajax/data",(req,res)=>{ res.json({status:"ok",items:[1,2,3,4]}); });

// Error handling
app.use((err:any,req:Request,res:Response,next:NextFunction)=>{ console.error(err.stack); res.status(500).json({error:"Something went wrong"}); });

// Utilities
function validateEmail(email:string){ const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; return regex.test(email); }
function formatDate(date:Date){ return date.toISOString(); }

// Testing (Jest/Mocha style)
import request from "supertest";
describe("Enterprise API",()=>{ it("should register user",async()=>{ const res=await request(app).post("/register").send({username:"Md",email:"md@example.com",password:"1234"}); expect(res.statusCode).toBe(201); }); });

// ESLint config (JSON)
const eslintConfig={ env:{browser:true,es2021:true,node:true},extends:["eslint:recommended","plugin:@typescript-eslint/recommended"],parserOptions:{ecmaVersion:12,sourceType:"module"},rules:{semi:["error","always"],quotes:["error","double"],"no-unused-vars":["warn"],"no-console":["off"]} };

// Dockerfile
/*
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","start"]
*/

// Kubernetes deployment
/*
apiVersion: apps/v1
kind: Deployment
metadata: { name: enterprise-backend }
spec:
  replicas: 3
  selector: { matchLabels: { app: backend } }
  template:
    metadata: { labels: { app: backend } }
    spec:
      containers:
        - name: backend
          image: enterprise-backend:latest
          ports: [{ containerPort: 5000 }]
*/

// CI/CD pipeline (GitHub Actions)
 /*
name: Enterprise CI/CD
on: { push: { branches: [ main ] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with: { node-version: "18" }
      - run: npm install
      - run: npm test
      - run: npm run build
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: azure/k8s-deploy@v1
        with:
          manifests: |
            kubernetes-deployment.yaml
            kubernetes-service.yaml
*/
