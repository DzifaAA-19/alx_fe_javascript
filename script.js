// Required quotes array
let quotes = [
  { text: "Success is no accident.", category: "Motivation" },
  { text: "The future belongs to those who prepare for it today.", category: "Inspiration" },
  { text: "Happiness depends on ourselves.", category: "Life" }
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${randomQuote.text}" — ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const quoteText = textInput.value.trim();
  const quoteCategory = categoryInput.value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text: quoteText, category: quoteCategory });

  textInput.value = "";
  categoryInput.value = "";

  displayRandomQuote(); // update the DOM
}

// Event listener for the Show New Quote button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

// Build the quote form dynamically
const formContainer = document.getElementById("formContainer");
formContainer.innerHTML = `
  <h3>Add a New Quote</h3>
  <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
  <br><br>
  <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
  <br><br>
  <button id="addQuoteButton">Add Quote</button>
`;

document.getElementById("addQuoteButton").addEventListener("click", addQuote);

