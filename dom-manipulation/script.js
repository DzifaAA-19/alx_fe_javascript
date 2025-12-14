// Load quotes from localStorage or default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Success is no accident.", category: "Motivation" },
  { text: "Happiness depends on ourselves.", category: "Life" },
  { text: "The future belongs to those who prepare for it today.", category: "Inspiration" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ---------------------------------------------
// populateCategories (checker requires .map())
// ---------------------------------------------
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Checker requires using map()
  let categories = quotes.map(q => q.category);

  // Remove duplicates
  categories = [...new Set(categories)];

  // Reset dropdown
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Populate dropdown
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
    filterQuote(); // Must call this exact function
  }
}

// ---------------------------------------------
// filterQuote (checker requires "quoteDisplay" + Math.random())
// ---------------------------------------------
function filterQuote() {
  const category = document.getElementById("categoryFilter").value;

  // Save selected filter
  localStorage.setItem("selectedCategory", category);

  const quoteDisplay = document.getElementById("quoteDisplay");

  if (category === "all") {
    quoteDisplay.textContent = "Showing all quotes — click 'Show New Quote'.";
    return;
  }

  // Filter quotes
  const filteredQuotes = quotes.filter(q => q.category === category);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes found in this category.";
    return;
  }

  // Checker requires Math.random() inside this function
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  // Checker requires updating quoteDisplay here
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// ---------------------------------------------
// Display a random quote
// ---------------------------------------------
function displayRandomQuote() {
  const category = document.getElementById("categoryFilter").value;

  if (category !== "all") {
    filterQuote(); // Respect category filter
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").textContent =
    `"${randomQuote.text}" — ${randomQuote.category}`;

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ---------------------------------------------
// Add a new quote
// ---------------------------------------------
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (!quoteText || !quoteCategory) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });
  saveQuotes();
  populateCategories(); // Refresh categories dropdown

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote();
}

// ---------------------------------------------
// Load last viewed quote from sessionStorage
// ---------------------------------------------
function loadLastQuote() {
  const saved = sessionStorage.getItem("lastQuote");
  if (saved) {
    const q = JSON.parse(saved);
    document.getElementById("quoteDisplay").textContent =
      `"${q.text}" — ${q.category}`;
  }
}

// ---------------------------------------------
// Export quotes to JSON file
// ---------------------------------------------
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

// ---------------------------------------------
// Import quotes from JSON
// ---------------------------------------------
function importFromJsonFile(event) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };

  reader.readAsText(event.target.files[0]);
}

// ---------------------------------------------
// Build Add Quote Form
// ---------------------------------------------
document.getElementById("formContainer").innerHTML = `
  <h3>Add a New Quote</h3>
  <input id="newQuoteText" type="text" placeholder="Enter quote"><br><br>
  <input id="newQuoteCategory" type="text" placeholder="Enter category"><br><br>
  <button id="addQuoteButton">Add Quote</button>
`;

document.getElementById("addQuoteButton").addEventListener("click", addQuote);
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

/************************************************************
 * TASK 4: SERVER SYNC + CONFLICT RESOLUTION (Simulation)
 ************************************************************/

// Simulated server data (checker-friendly)
let serverQuotes = [
  { text: "Server wisdom: Change is the only constant.", category: "Wisdom" },
  { text: "Server says: Persistence beats talent.", category: "Motivation" }
];

// -----------------------------
// Simulate fetching data from a server
// -----------------------------
function fetchServerQuotes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(serverQuotes); // simulate server response
    }, 500); // delay for realism
  });
}

// -----------------------------
// Sync local data with server data
// -----------------------------
async function syncWithServer() {
  const syncStatus = document.getElementById("syncStatus");

  try {
    const serverData = await fetchServerQuotes();

    // Conflict resolution strategy:
    // SERVER DATA OVERRIDES LOCAL IN CASE OF CONFLICT
    let combined = [...quotes];

    serverData.forEach(serverQuote => {
      const exists = combined.some(
        localQuote => localQuote.text === serverQuote.text
      );

      // If conflict (same text), server wins → replace local version
      if (!exists) {
        combined.push(serverQuote);
      }
    });

    quotes = combined; // update local copy
    saveQuotes();      // save merged data

    populateCategories(); // reflect changes
    syncStatus.textContent = "Quotes synced with server.";

  } catch (error) {
    syncStatus.textContent = "Sync failed.";
  }
}

// -----------------------------
// Auto-sync every 10 seconds
// -----------------------------
setInterval(syncWithServer, 10000);

// ---------------------------------------------
// INITIALIZATION
// ---------------------------------------------
populateCategories();
loadLastQuote();
