import express from "express";
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-oauth2";

const app=express();

passport.use(new OAuth2Strategy({
  authorizationURL:"https://auth.example.com/oauth2/authorize",
  tokenURL:"https://auth.example.com/oauth2/token",
  clientID:"client123",
  clientSecret:"secret456",
  callbackURL:"http://localhost:5000/auth/callback"
},(accessToken,refreshToken,profile,done)=>{
  return done(null,{accessToken,profile});
}));

app.use(passport.initialize());

app.get("/auth",passport.authenticate("oauth2"));

app.get("/auth/callback",passport.authenticate("oauth2",{failureRedirect:"/login"}),(req,res)=>{
  res.json({message:"Authenticated",user:req.user});
});

app.listen(5000,()=>console.log("OAuth2 server running"));
