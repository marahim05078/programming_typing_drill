// MongoDB models
import mongoose from "mongoose";
const OrderSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  products:[{productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},quantity:Number}],
  total:Number
});
const Order=mongoose.model("Order",OrderSchema);

// PostgreSQL queries
import { Pool } from "pg";
const pool=new Pool({user:"postgres",host:"localhost",database:"drilldb",password:"secret",port:5432});

async function joinOrders(){
  const res=await pool.query(`
    SELECT o.id,u.username,p.name,oi.quantity
    FROM orders o
    JOIN users u ON o.user_id=u.id
    JOIN order_items oi ON oi.order_id=o.id
    JOIN products p ON oi.product_id=p.id
  `);
  console.log(res.rows);
}

// Hybrid usage
async function hybrid(){
  const mongoOrders=await Order.find({}).populate("userId").populate("products.productId");
  console.log("Mongo Orders:",mongoOrders);
  await joinOrders();
}
