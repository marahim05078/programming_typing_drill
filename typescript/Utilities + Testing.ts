export function validateEmail(email:string):boolean{ const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; return regex.test(email); }
export function hashPassword(password:string):string{ return `hashed_${password}`; }
export function generateToken():string{ return Math.random().toString(36).substring(2); }
export function formatDate(date:Date):string{ return date.toISOString(); }

// Jest test
import request from "supertest";
import app from "../app";
describe("User API",()=>{ it("should create user",async()=>{ const res=await request(app).post("/register").send({username:"Md",email:"md@example.com",password:"1234"}); expect(res.statusCode).toBe(201); }); });
