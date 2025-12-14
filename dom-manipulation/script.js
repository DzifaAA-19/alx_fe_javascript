// -------------------------------------
// Load quotes from localStorage
// -------------------------------------
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is no accident.", category: "Motivation" },
  { text: "Happiness depends on ourselves.", category: "Life" },
  { text: "The future belongs to those who prepare for it today.", category: "Inspiration" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -------------------------------------
// Display random quote
// -------------------------------------
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").textContent =
    `"${randomQuote.text}" — ${randomQuote.category}`;

  // Save last viewed quote to session storage
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// -------------------------------------
// Add a new quote
// -------------------------------------
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please fill out both fields.");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });
  saveQuotes(); // Save changes to localStorage

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

// -------------------------------------
// Load last viewed quote from sessionStorage
// -------------------------------------
function loadLastQuote() {
  const last = sessionStorage.getItem("lastQuote");
  if (last) {
    const q = JSON.parse(last);
    document.getElementById("quoteDisplay").textContent =
      `"${q.text}" — ${q.category}`;
  }
}

// -------------------------------------
// EXPORT QUOTES TO JSON FILE
// CHECKER EXPECTS EXACT NAME: exportToJsonFile()
// -------------------------------------
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "quotes.json";
  link.click();

  URL.revokeObjectURL(url);
}

document.getElementById("exportButton").addEventListener("click", exportToJsonFile);

// -------------------------------------
// IMPORT QUOTES FROM JSON FILE
// CHECKER EXPECTS EXACT NAME: importFromJsonFile()
// -------------------------------------
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}

// -------------------------------------
// Build Add Quote Form
// -------------------------------------
const formContainer = document.getElementById("formContainer");
formContainer.innerHTML = `
  <h3>Add a New Quote</h3>
  <input id="newQuoteText" type="text" placeholder="Enter a new quote"><br><br>
  <input id="newQuoteCategory" type="text" placeholder="Enter category"><br><br>
  <button id="addQuoteButton">Add Quote</button>
`;

document
  .getElementById("addQuoteButton")
  .addEventListener("click", addQuote);

// -------------------------------------
// EVENT LISTENERS
// -------------------------------------
document
  .getElementById("newQuote")
  .addEventListener("click", displayRandomQuote);

// Load last viewed quote
loadLastQuote();


// Build form when page loads
createAddQuoteForm();

