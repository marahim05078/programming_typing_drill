import express from "express";
import bodyParser from "body-parser";
import { authenticate, authorize } from "./middleware/auth.js";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./controllers/userController.js";
import { getProducts, createProduct, updateProduct, deleteProduct } from "./controllers/productController.js";

const app=express();
app.use(bodyParser.json());

// User routes
app.get("/api/users",authenticate,getUsers);
app.get("/api/users/:id",authenticate,getUser);
app.post("/api/users",authenticate,authorize("admin"),createUser);
app.put("/api/users/:id",authenticate,authorize("admin"),updateUser);
app.delete("/api/users/:id",authenticate,authorize("admin"),deleteUser);

// Product routes
app.get("/api/products",getProducts);
app.post("/api/products",authenticate,authorize("editor"),createProduct);
app.put("/api/products/:id",authenticate,authorize("editor"),updateProduct);
app.delete("/api/products/:id",authenticate,authorize("admin"),deleteProduct);

// Nested route example
app.get("/api/users/:id/orders",(req,res)=>{ res.json({message:`Orders for user ${req.params.id}`}); });

app.listen(5000,()=>console.log("Advanced Express app running"));
