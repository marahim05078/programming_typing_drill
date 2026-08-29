import { Pool } from "pg";

const pool=new Pool({user:"postgres",host:"localhost",database:"drilldb",password:"secret",port:5432});

async function createTable(){
  await pool.query("CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,username VARCHAR(50),email VARCHAR(100),password VARCHAR(100))");
}

async function insertUser(username,email,password){
  await pool.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3)",[username,email,password]);
}

async function listUsers(){
  const res=await pool.query("SELECT * FROM users");
  console.log(res.rows);
}

async function updateUser(id,email){
  await pool.query("UPDATE users SET email=$1 WHERE id=$2",[email,id]);
}

async function deleteUser(id){
  await pool.query("DELETE FROM users WHERE id=$1",[id]);
}

createTable().then(()=>insertUser("Md","md@example.com","hashed123")).then(()=>listUsers());
