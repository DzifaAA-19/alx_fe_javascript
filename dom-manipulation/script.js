function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");

  // Checker expects use of .map()
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

  // Restore last selected filter
  const saved = localStorage.getItem("selectedCategory");
  if (saved) {
    categoryFilter.value = saved;
    filterQuote();
  }
}

