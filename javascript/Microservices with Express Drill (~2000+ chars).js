// userService.js
import express from "express";
const app=express();
app.use(express.json());
app.get("/users",(req,res)=>{ res.json([{id:1,username:"Md"}]); });
app.listen(6000,()=>console.log("User service running"));

// productService.js
import express from "express";
const app=express();
app.use(express.json());
app.get("/products",(req,res)=>{ res.json([{id:1,name:"Laptop"}]); });
app.listen(7000,()=>console.log("Product service running"));

// gateway.js
import express from "express";
import httpProxy from "http-proxy-middleware";
const app=express();
app.use("/users",httpProxy.createProxyMiddleware({target:"http://localhost:6000",changeOrigin:true}));
app.use("/products",httpProxy.createProxyMiddleware({target:"http://localhost:7000",changeOrigin:true}));
app.listen(8000,()=>console.log("API Gateway running"));
