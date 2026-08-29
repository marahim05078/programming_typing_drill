interface Product{ id:number; name:string; price:number; stock:number; }
const products:Product[]=[{id:1,name:"Laptop",price:1200,stock:10},{id:2,name:"Phone",price:800,stock:20}];
function findProduct(id:number):Product|undefined{ return products.find(p=>p.id===id); }
console.log(findProduct(1));
