import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/drilldb",{useNewUrlParser:true,useUnifiedTopology:true});

const UserSchema=new mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  roles:[String],
  createdAt:{type:Date,default:Date.now}
});

const User=mongoose.model("User",UserSchema);

async function createUser(){
  const user=new User({username:"Md",email:"md@example.com",password:"hashed123",roles:["admin","editor"]});
  await user.save();
  console.log("User created:",user);
}

async function listUsers(){
  const users=await User.find({});
  console.log("Users:",users);
}

async function updateUser(id){
  await User.findByIdAndUpdate(id,{email:"new@example.com"});
}

async function deleteUser(id){
  await User.findByIdAndDelete(id);
}

createUser().then(()=>listUsers());
