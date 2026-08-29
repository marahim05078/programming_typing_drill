import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app=express();
app.use(bodyParser.json());

const ItemSchema=new mongoose.Schema({
  name:String,
  description:String,
  price:Number,
  createdAt:{type:Date,default:Date.now}
});
const Item=mongoose.model("Item",ItemSchema);

// CREATE
app.post("/items",async(req,res)=>{
  try{
    const item=new Item(req.body);
    await item.save();
    res.status(201).json(item);
  }catch(err){ res.status(500).json({error:err.message}); }
});

// READ
app.get("/items",async(req,res)=>{
  try{
    const items=await Item.find({});
    res.json(items);
  }catch(err){ res.status(500).json({error:err.message}); }
});

// UPDATE
app.put("/items/:id",async(req,res)=>{
  try{
    const item=await Item.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(item);
  }catch(err){ res.status(500).json({error:err.message}); }
});

// DELETE
app.delete("/items/:id",async(req,res)=>{
  try{
    await Item.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
  }catch(err){ res.status(500).json({error:err.message}); }
});

app.listen(5000,()=>console.log("CRUD API running"));
