// models/User.js
import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  roles:{type:[String],default:["user"]},
  createdAt:{type:Date,default:Date.now}
});

export default mongoose.model("User",UserSchema);
