// Load quotes from localStorage or defaults
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is no accident.", category: "Motivation" },
  { text: "Happiness depends on ourselves.", category: "Life" },
  { text: "The future belongs to those who prepare for it today.", category: "Inspiration" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// -----------------------------------
// populateCategories (EXACT name ALX wants)
// -----------------------------------
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  let categories = new Set();
  quotes.forEach(q => categories.add(q.category));

  // Reset dropdown
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Populate
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    categoryFilter.value = saved;
    filterQuote();   // Must call EXACT function
  }
}

// -----------------------------------
// filterQuote (EXACT name ALX wants)
// -----------------------------------
function filterQuote() {
  const selected = document.getElementById("categoryFilter").value;

  // Save to localStorage
  localStorage.setItem("selectedCategory", selected);

  const quoteDisplay = document.getElementById("quoteDisplay");

  if (selected === "all") {
    quoteDisplay.textContent = "Showing all quotes — click 'Show New Quote'.";
    return;
  }

  // Filter logic
  const filtered = quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];

  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// -----------------------------------
// Display a random quote
// -----------------------------------
function displayRandomQuote() {
  const selected = document.getElementById("categoryFilter").value;

  // Respect selected filter
  if (selected !== "all") {
    filterQuote();
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("quoteDisplay").textContent =
    `"${quote.text}" — ${quote.category}`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// -----------------------------------
// Add Quote
// -----------------------------------
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter text and category.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  populateCategories(); // Update the category list immediately

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

// -----------------------------------
// Load last viewed quote
// -----------------------------------
function loadLastQuote() {
  const saved = sessionStorage.getItem("lastQuote");
  if (saved) {
    const q = JSON.parse(saved);
    document.getElementById("quoteDisplay").textContent =
      `"${q.text}" — ${q.category}`;
  }
}

// -----------------------------------
// IMPORT / EXPORT (unchanged)
// -----------------------------------
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

function importFromJsonFile(event) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported!");
  };

  reader.readAsText(event.target.files[0]);
}

// -----------------------------------
// BUILD FORM
// -----------------------------------
document.getElementById("formContainer").innerHTML = `
  <h3>Add a New Quote</h3>
  <input id="newQuoteText" type="text" placeholder="Enter quote"><br><br>
  <input id="newQuoteCategory" type="text" placeholder="Enter category"><br><br>
  <button id="addQuoteButton">Add Quote</button>
`;

document.getElementById("addQuoteButton").addEventListener("click", addQuote);
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// -----------------------------------
// INITIALIZATION
// -----------------------------------
populateCategories();
loadLastQuote();
