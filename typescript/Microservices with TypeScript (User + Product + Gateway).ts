// userService.ts
import express,{Request,Response} from "express";
const app=express();
app.use(express.json());

interface User{ id:number; username:string; email:string; }
const users:User[]=[{id:1,username:"Md",email:"md@example.com"}];

app.get("/users",(req:Request,res:Response)=>{ res.json(users); });
app.post("/users",(req:Request,res:Response)=>{ const user:User={id:users.length+1,...req.body}; users.push(user); res.status(201).json(user); });

app.listen(6000,()=>console.log("User service running on 6000"));

// productService.ts
import express,{Request,Response} from "express";
const app=express();
app.use(express.json());

interface Product{ id:number; name:string; price:number; }
const products:Product[]=[{id:1,name:"Laptop",price:1200}];

app.get("/products",(req:Request,res:Response)=>{ res.json(products); });
app.post("/products",(req:Request,res:Response)=>{ const product:Product={id:products.length+1,...req.body}; products.push(product); res.status(201).json(product); });

app.listen(7000,()=>console.log("Product service running on 7000"));

// gateway.ts
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
const app=express();

app.use("/users",createProxyMiddleware({target:"http://localhost:6000",changeOrigin:true}));
app.use("/products",createProxyMiddleware({target:"http://localhost:7000",changeOrigin:true}));

app.listen(8000,()=>console.log("API Gateway running on 8000"));
