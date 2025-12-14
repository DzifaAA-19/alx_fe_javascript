// Initial array of quotes
let quotes = [
  { text: "Success is no accident.", category: "Motivation" },
  { text: "Happiness depends on ourselves.", category: "Life" },
  { text: "The future belongs to those who prepare for it.", category: "Inspiration" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteObj = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    "<em>${quoteObj.text}</em>" <br>
    <strong>Category:</strong> ${quoteObj.category}
  `;
}

// Create form dynamically
function createAddQuoteForm() {
  const form = document.createElement("div");

  form.innerHTML = `
    <h3>Add a New Quote</h3>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" /><br><br>
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" /><br><br>
    <button id="addQuoteBtn">Add Quote</button>
  `;

  formContainer.appendChild(form);

  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Add quote dynamically
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please fill out both fields!");
    return;
  }

  quotes.push({ text, category });

  alert("Quote added!");
  textInput.value = "";
  categoryInput.value = "";

  showRandomQuote();
}

// Event listener
newQuoteBtn.addEventListener("click", showRandomQuote);

// Build form when page loads
createAddQuoteForm();

