import request from "supertest";
import app from "../app.js";

describe("User API",()=>{
  it("should create a user",async()=>{
    const res=await request(app).post("/api/users").send({username:"Md",email:"md@example.com",password:"1234"});
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("Md");
  });

  it("should list users",async()=>{
    const res=await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
