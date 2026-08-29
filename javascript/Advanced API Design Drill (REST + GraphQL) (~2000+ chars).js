// REST endpoints
import express from "express";
const app=express();
app.use(express.json());

app.get("/api/posts",(req,res)=>{ res.json([{id:1,title:"Hello"},{id:2,title:"World"}]); });
app.post("/api/posts",(req,res)=>{ res.status(201).json({message:"Created",post:req.body}); });
app.put("/api/posts/:id",(req,res)=>{ res.json({message:"Updated",id:req.params.id}); });
app.delete("/api/posts/:id",(req,res)=>{ res.json({message:"Deleted",id:req.params.id}); });

// GraphQL schema
import { ApolloServer,gql } from "apollo-server-express";

const typeDefs=gql`
  type Post { id:ID!, title:String! }
  type Query { posts:[Post] }
  type Mutation { addPost(title:String!):Post }
`;

const posts=[{id:"1",title:"Hello"},{id:"2",title:"World"}];
const resolvers={
  Query:{ posts:()=>posts },
  Mutation:{ addPost:(_,args)=>{ const post={id:String(posts.length+1),title:args.title}; posts.push(post); return post; } }
};

const server=new ApolloServer({typeDefs,resolvers});
server.applyMiddleware({app,path:"/graphql"});

app.listen(5000,()=>console.log("REST + GraphQL API running"));
