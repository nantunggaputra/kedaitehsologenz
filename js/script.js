// toggle_class_active_edge-menu
const navbarNav = document.querySelector(".navbar-nav");

// onclick_class_active_edge-menu
document.querySelector("#edge-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// toggle_class_active_search-container
const navbarSearch = document.querySelector(".container");
const navbarSearchBox = document.querySelector("#search-form");
const navbarSearchInput = document.querySelector("#query");
document.querySelector("#search").onclick = (e) => {
  navbarSearch.classList.toggle("active");
  navbarSearchInput.focus();
  e.preventDefault();
};

// hide_class_active
const edgeMenu = document.querySelector("#edge-menu");
const searchContainer = document.querySelector("#search");
document.addEventListener("click", function (e) {
  if (!edgeMenu.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!searchContainer.contains(e.target) && !navbarSearch.contains(e.target)) {
    navbarSearch.classList.remove("active");
  }
});

// custom_search_engine_API
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const query = document.getElementById("query").value;
    if (!query) {
      alert("Please enter a search query");
      return;
    }

    performSearch(query);
  });
});

function performSearch(query) {
  fetch(`http://localhost:8080/api/search?query=${query}`)
    .then((response) => response.json())
    .then((data) => displayResults(data))
    .catch((error) => console.error("Error fetching search results:", error));
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = "No results found.";
    return;
  }

  const ul = document.createElement("ul");
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = `${result.Title} - ${result.Link}`;
    ul.appendChild(li);
  });

  resultsContainer.appendChild(ul);
}

// Fungsi untuk menampilkan hasil pencarian di halaman web
function displayResults(results) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = "No results found.";
    return;
  }

  const ul = document.createElement("ul");
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = `${result.Title} - ${result.Link}`;
    ul.appendChild(li);
  });

  resultsContainer.appendChild(ul);
}

// Menangani formulir pencarian saat disubmit
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah formulir untuk melakukan submit biasa
  const queryInput = document.getElementById("query");
  const query = queryInput.value.trim();

  if (query !== "") {
    sendSearchRequest(query);
  }
});

// input_name
const inputElement = document.getElementById("name");
inputElement.addEventListener("input", function () {
  let inputValue = inputElement.value;
  let cleanValue = inputValue.replace(/[^a-zA-Z]/g, "");
  inputElement.value = cleanValue;
});

// input_number
document.getElementById("phone").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});
