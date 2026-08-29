// controllers/userController.js
import User from "../models/User.js";

export async function getUsers(req,res){
  try{
    const users=await User.find({});
    res.json(users);
  }catch(err){ res.status(500).json({error:err.message}); }
}

export async function getUser(req,res){
  try{
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"Not found"});
    res.json(user);
  }catch(err){ res.status(500).json({error:err.message}); }
}

export async function createUser(req,res){
  try{
    const {username,email,password}=req.body;
    const user=new User({username,email,password});
    await user.save();
    res.status(201).json(user);
  }catch(err){ res.status(500).json({error:err.message}); }
}

export async function updateUser(req,res){
  try{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(user);
  }catch(err){ res.status(500).json({error:err.message}); }
}

export async function deleteUser(req,res){
  try{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
  }catch(err){ res.status(500).json({error:err.message}); }
}
