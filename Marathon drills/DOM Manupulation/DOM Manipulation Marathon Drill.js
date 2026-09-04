// Selecting elements
const heading = document.getElementById("mainHeading");
const paragraphs = document.getElementsByTagName("p");
const items = document.querySelectorAll(".list-item");
const container = document.querySelector("#container");

// Changing text and attributes
heading.textContent = "DOM Manipulation Marathon";
heading.setAttribute("data-status", "active");
heading.style.color = "blue";
heading.style.fontSize = "24px";

// Creating new elements
const newDiv = document.createElement("div");
newDiv.id = "newSection";
newDiv.className = "section highlight";
newDiv.textContent = "This is a dynamically created div.";
container.appendChild(newDiv);

// Nested elements
const ul = document.createElement("ul");
for (let i = 1; i <= 5; i++) {
  const li = document.createElement("li");
  li.textContent = `Item ${i}`;
  ul.appendChild(li);
}
newDiv.appendChild(ul);

// Sibling manipulation
const sibling = document.createElement("p");
sibling.textContent = "I am a sibling paragraph.";
newDiv.insertAdjacentElement("afterend", sibling);

// Traversing DOM
console.log("First child:", container.firstChild);
console.log("Last child:", container.lastChild);
console.log("Parent node:", heading.parentNode);
console.log("Next sibling:", heading.nextElementSibling);
console.log("Previous sibling:", heading.previousElementSibling);

// Removing elements
if (container.lastChild) {
  container.removeChild(container.lastChild);
}

// Cloning elements
const clonedHeading = heading.cloneNode(true);
container.appendChild(clonedHeading);

// Event handling
const button = document.createElement("button");
button.textContent = "Click Me";
button.addEventListener("click", () => {
  alert("Button clicked!");
});
container.appendChild(button);

// Dynamic attributes
button.setAttribute("data-clicked", "false");
button.addEventListener("click", () => {
  button.setAttribute("data-clicked", "true");
});

// Styling multiple elements
items.forEach((item, index) => {
  item.style.backgroundColor = index % 2 === 0 ? "#eee" : "#ccc";
});

// Creating nested structure
const card = document.createElement("div");
card.className = "card";
const cardHeader = document.createElement("h2");
cardHeader.textContent = "Card Title";
const cardBody = document.createElement("p");
cardBody.textContent = "This is the card body.";
card.appendChild(cardHeader);
card.appendChild(cardBody);
container.appendChild(card);

// Replace child
const replacement = document.createElement("span");
replacement.textContent = "Replaced content!";
if (cardBody.parentNode) {
  cardBody.parentNode.replaceChild(replacement, cardBody);
}

// Insert before
const intro = document.createElement("p");
intro.textContent = "Intro paragraph before heading.";
container.insertBefore(intro, heading);

// Multiple attributes
heading.setAttribute("title", "Main Heading");
heading.setAttribute("role", "banner");

// Class manipulation
heading.classList.add("highlight", "bold");
heading.classList.remove("bold");
heading.classList.toggle("hidden");

// Dataset usage
heading.dataset.info = "extra-data";
console.log("Dataset:", heading.dataset.info);

// Creating deeply nested elements
const nav = document.createElement("nav");
const ulNav = document.createElement("ul");
["Home", "About", "Contact"].forEach((text) => {
  const liNav = document.createElement("li");
  const aNav = document.createElement("a");
  aNav.href = "#";
  aNav.textContent = text;
  liNav.appendChild(aNav);
  ulNav.appendChild(liNav);
});
nav.appendChild(ulNav);
container.appendChild(nav);

// Traversal with children
Array.from(container.children).forEach((child) =>
  console.log("Child:", child.tagName),
);

// Removing attribute
heading.removeAttribute("role");

// Creating multiple siblings
const sibling1 = document.createElement("div");
sibling1.textContent = "Sibling 1";
const sibling2 = document.createElement("div");
sibling2.textContent = "Sibling 2";
container.appendChild(sibling1);
container.appendChild(sibling2);

// InsertAdjacent variations
heading.insertAdjacentHTML("beforebegin", "<p>Inserted before heading</p>");
heading.insertAdjacentHTML("afterend", "<p>Inserted after heading</p>");
heading.insertAdjacentHTML("afterbegin", "<span>Inside heading start</span>");
heading.insertAdjacentHTML("beforeend", "<span>Inside heading end</span>");

// Deep DOM traversal
function traverse(node) {
  console.log("Node:", node.nodeName);
  node.childNodes.forEach((child) => traverse(child));
}
traverse(container);

// Creating forms
const form = document.createElement("form");
form.id = "loginForm";
const inputUser = document.createElement("input");
inputUser.type = "text";
inputUser.name = "username";
inputUser.placeholder = "Username";
const inputPass = document.createElement("input");
inputPass.type = "password";
inputPass.name = "password";
inputPass.placeholder = "Password";
const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Login";
form.appendChild(inputUser);
form.appendChild(inputPass);
form.appendChild(submitBtn);
container.appendChild(form);

// Handling form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted:", inputUser.value, inputPass.value);
});

// Creating tables
const table = document.createElement("table");
const thead = document.createElement("thead");
const trHead = document.createElement("tr");
["ID", "Name", "Email"].forEach((h) => {
  const th = document.createElement("th");
  th.textContent = h;
  trHead.appendChild(th);
});
thead.appendChild(trHead);
table.appendChild(thead);
const tbody = document.createElement("tbody");
for (let i = 1; i <= 3; i++) {
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  td1.textContent = String(i);
  const td2 = document.createElement("td");
  td2.textContent = `User${i}`;
  const td3 = document.createElement("td");
  td3.textContent = `user${i}@example.com`;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tbody.appendChild(tr);
}
table.appendChild(tbody);
container.appendChild(table);
