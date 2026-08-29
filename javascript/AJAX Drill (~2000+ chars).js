// frontend.js
document.getElementById("loginForm").addEventListener("submit",async(e)=>{
  e.preventDefault();
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  const response=await fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})});
  const data=await response.json();
  console.log("Login response:",data);
});

async function loadUsers(){
  const res=await fetch("/users");
  const users=await res.json();
  const list=document.getElementById("userList");
  list.innerHTML="";
  users.forEach(u=>{
    const li=document.createElement("li");
    li.textContent=`${u.username} (${u.email})`;
    list.appendChild(li);
  });
}
