// toggle_class_active_edge-menu
const navbarNav = document.querySelector(".navbar-nav");

// onclick_class_active_edge-menu
document.querySelector("#edge-menu").onclick = (e) => {
  navbarNav.classList.toggle("active");
  e.preventDefault();
};

// toggle_class_active_search-container
const navbarSearch = document.querySelector("#search-container");
const navbarSearchBox = document.querySelector("#search-input");
document.querySelector("#search").onclick = (e) => {
  navbarSearch.classList.toggle("active");
  navbarSearchBox.focus();
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
function search() {
  const searchInput = document.getElementById("search-input").value;

  // Memanggil endpoint REST API Go
  function search() {
    const searchInput = document.getElementById("search-input").value;

    // Memanggil endpoint REST API Go di GitHub Pages
    fetch(
      `https://nantunggaputra.github.io/kedaitehsologenz/search?q=${encodeURIComponent(
        searchInput
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        // Hasil redirect tidak dapat dilihat di console karena ini adalah redirect HTTP
        console.log(
          "Redirected successfully, check your browser's address bar for Google search results."
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

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
