// middleware/auth.js
import jwt from "jsonwebtoken";

export function authenticate(req,res,next){
  const header=req.headers["authorization"];
  if(!header) return res.status(401).json({error:"No token"});
  const token=header.split(" ")[1];
  try{
    const decoded=jwt.verify(token,"supersecret");
    req.user=decoded;
    next();
  }catch(err){ res.status(403).json({error:"Invalid token"}); }
}

export function authorize(role){
  return (req,res,next)=>{
    if(req.user && req.user.roles.includes(role)){ next(); }
    else{ res.status(403).json({error:"Forbidden"}); }
  };
}

// middleware/logger.js
export function logger(req,res,next){
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}
