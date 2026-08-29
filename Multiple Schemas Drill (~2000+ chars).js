import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  roles:[String]
});

const ProductSchema=new mongoose.Schema({
  name:String,
  price:Number,
  stock:Number,
  createdAt:{type:Date,default:Date.now}
});

const OrderSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  products:[{productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},quantity:Number}],
  total:Number,
  status:String,
  createdAt:{type:Date,default:Date.now}
});

export const User=mongoose.model("User",UserSchema);
export const Product=mongoose.model("Product",ProductSchema);
export const Order=mongoose.model("Order",OrderSchema);
