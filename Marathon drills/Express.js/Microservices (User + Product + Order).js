// userService.ts
import express from "express";
const userApp=express();
userApp.use(express.json());
userApp.get("/users",(req,res)=>res.json([{id:1,username:"Md"}]));
userApp.listen(6000,()=>console.log("User service running"));

// productService.ts
import express from "express";
const productApp=express();
productApp.use(express.json());
productApp.get("/products",(req,res)=>res.json([{id:1,name:"Laptop"}]));
productApp.listen(7000,()=>console.log("Product service running"));

// orderService.ts
import express from "express";
const orderApp=express();
orderApp.use(express.json());
orderApp.get("/orders",(req,res)=>res.json([{id:1,userId:1,productId:1}]));
orderApp.listen(9000,()=>console.log("Order service running"));
