import express,{Request,Response} from "express";
const app=express();
app.use(express.json());

interface Item{ id:number; name:string; description:string; }
let items:Item[]=[{id:1,name:"Alpha",description:"First item"}];

app.get("/items",(req:Request,res:Response)=>{ res.json(items); });
app.post("/items",(req:Request,res:Response)=>{ const newItem:Item={id:items.length+1,...req.body}; items.push(newItem); res.status(201).json(newItem); });
app.put("/items/:id",(req:Request,res:Response)=>{ const id=parseInt(req.params.id); items=items.map(i=>i.id===id?{...i,...req.body}:i); res.json({message:"Updated"}); });
app.delete("/items/:id",(req:Request,res:Response)=>{ const id=parseInt(req.params.id); items=items.filter(i=>i.id!==id); res.json({message:"Deleted"}); });

app.listen(5000,()=>console.log("TS CRUD API running"));
