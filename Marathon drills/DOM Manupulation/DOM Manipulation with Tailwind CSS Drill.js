// Selecting elements
const app=document.getElementById("app");
app.className="p-6 bg-gray-100 min-h-screen";

// Creating a heading
const heading=document.createElement("h1");
heading.textContent="DOM + Tailwind Marathon";
heading.className="text-3xl font-bold text-blue-600 mb-4";
app.appendChild(heading);

// Creating a container
const container=document.createElement("div");
container.className="grid grid-cols-2 gap-4";
app.appendChild(container);

// Adding cards dynamically
for(let i=1;i<=4;i++){
  const card=document.createElement("div");
  card.className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition";
  const title=document.createElement("h2");
  title.textContent=`Card ${i}`;
  title.className="text-xl font-semibold text-gray-800 mb-2";
  const body=document.createElement("p");
  body.textContent="This is a dynamically generated card body.";
  body.className="text-gray-600";
  card.appendChild(title);
  card.appendChild(body);
  container.appendChild(card);
}

// Sibling manipulation
const sibling=document.createElement("p");
sibling.textContent="I am a sibling paragraph styled with Tailwind.";
sibling.className="mt-4 text-sm text-gray-500 italic";
container.insertAdjacentElement("afterend",sibling);

// Nested list
const list=document.createElement("ul");
list.className="list-disc list-inside mt-6";
["Alpha","Beta","Gamma"].forEach(item=>{
  const li=document.createElement("li");
  li.textContent=item;
  li.className="text-gray-700 hover:text-blue-500 cursor-pointer";
  list.appendChild(li);
});
app.appendChild(list);

// Buttons with events
const button=document.createElement("button");
button.textContent="Click Me";
button.className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400";
button.addEventListener("click",()=>{ alert("Button clicked!"); });
app.appendChild(button);

// Form creation
const form=document.createElement("form");
form.className="mt-8 space-y-4 bg-white p-6 rounded shadow";
const inputUser=document.createElement("input");
inputUser.type="text"; inputUser.placeholder="Username";
inputUser.className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300";
const inputPass=document.createElement("input");
inputPass.type="password"; inputPass.placeholder="Password";
inputPass.className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300";
const submitBtn=document.createElement("button");
submitBtn.type="submit"; submitBtn.textContent="Login";
submitBtn.className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600";
form.appendChild(inputUser);
form.appendChild(inputPass);
form.appendChild(submitBtn);
app.appendChild(form);

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  console.log("Form submitted:",inputUser.value,inputPass.value);
});

// Table creation
const table=document.createElement("table");
table.className="mt-10 w-full border-collapse border border-gray-300";
const thead=document.createElement("thead");
const trHead=document.createElement("tr");
["ID","Name","Email"].forEach(h=>{
  const th=document.createElement("th");
  th.textContent=h;
  th.className="border border-gray-300 px-4 py-2 bg-gray-100 text-left";
  trHead.appendChild(th);
});
thead.appendChild(trHead);
table.appendChild(thead);

const tbody=document.createElement("tbody");
for(let i=1;i<=3;i++){
  const tr=document.createElement("tr");
  const td1=document.createElement("td"); td1.textContent=String(i); td1.className="border px-4 py-2";
  const td2=document.createElement("td"); td2.textContent=`User${i}`; td2.className="border px-4 py-2";
  const td3=document.createElement("td"); td3.textContent=`user${i}@example.com`; td3.className="border px-4 py-2";
  tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
  tbody.appendChild(tr);
}
table.appendChild(tbody);
app.appendChild(table);

// Navigation bar
const nav=document.createElement("nav");
nav.className="mt-12 bg-gray-800 text-white p-4 rounded";
const ulNav=document.createElement("ul");
ulNav.className="flex space-x-6";
["Home","About","Contact"].forEach(text=>{
  const liNav=document.createElement("li");
  const aNav=document.createElement("a");
  aNav.href="#";
  aNav.textContent=text;
  aNav.className="hover:text-yellow-400";
  liNav.appendChild(aNav);
  ulNav.appendChild(liNav);
});
nav.appendChild(ulNav);
app.appendChild(nav);

// Deep nested structure
const section=document.createElement("section");
section.className="mt-8 p-6 bg-gray-50 rounded shadow";
const article=document.createElement("article");
article.className="prose max-w-none";
const h3=document.createElement("h3");
h3.textContent="Nested Article Title";
h3.className="text-2xl font-bold text-purple-600";
const pArticle=document.createElement("p");
pArticle.textContent="This article is nested inside a section with Tailwind styling.";
pArticle.className="text-gray-700";
article.appendChild(h3);
article.appendChild(pArticle);
section.appendChild(article);
app.appendChild(section);
