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
  // Fungsi untuk mengirim permintaan ke server dan menangani respons
  function sendSearchRequest(query) {
    // Ganti dengan URL server Go Anda
    /*
    const apiUrl = 'https://contoh-my-go-server.herokuapp.com/api/search?query=' + encodeURIComponent(query);
    */
    const apiUrl =
      "http://localhost:8080/api/search?query=" + encodeURIComponent(query);

    // Menggunakan Fetch API untuk mengirim permintaan ke server
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Menangani data respons dari server
        displaySearchResults(data);
      })
      .catch((error) => {
        // Menangani kesalahan yang mungkin terjadi selama permintaan
        console.error("Error fetching data:", error);
      });
  }

  // Fungsi untuk menampilkan hasil pencarian di halaman web
  function displaySearchResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    // Membuat elemen HTML untuk setiap hasil pencarian
    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.innerHTML = `<a href="${result.Link}" target="_blank">${result.Title}

</a>`;
      resultsContainer.appendChild(resultElement);
    });
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
