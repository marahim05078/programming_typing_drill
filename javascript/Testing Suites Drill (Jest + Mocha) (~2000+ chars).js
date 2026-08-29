// Jest test
import request from "supertest";
import app from "../app.js";

describe("Product API",()=>{
  it("should create a product",async()=>{
    const res=await request(app).post("/api/products").send({name:"Laptop",price:1200,stock:10});
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Laptop");
  });
});

// Mocha test
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";
chai.use(chaiHttp);
const expect=chai.expect;

describe("User API",()=>{
  it("should list users",(done)=>{
    chai.request(app).get("/api/users").end((err,res)=>{
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      done();
    });
  });
});
