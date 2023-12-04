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

// toggle_class_active_shopping-cart
const navbarShopping = document.querySelector(".shopping-cart");
document.querySelector("#shopping-cart-button").onclick = (e) => {
  navbarShopping.classList.toggle("active");
  e.preventDefault();
};

// hide_class_active
const edgeMenu = document.querySelector("#edge-menu");
const searchContainer = document.querySelector("#search");
const shoppingCart = document.querySelector("#shopping-cart-button");
document.addEventListener("click", function (e) {
  if (!edgeMenu.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
  if (!searchContainer.contains(e.target) && !navbarSearch.contains(e.target)) {
    navbarSearch.classList.remove("active");
  }
  if (!shoppingCart.contains(e.target) && !navbarShopping.contains(e.target)) {
    navbarShopping.classList.remove("active");
  }
});

// custom_search_engine
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = document.getElementById("query").value;
    if (!query) {
      alert("Please fill out the search field.");
      return;
    }

    sendSearchRequest(query);
  });
});

function sendSearchRequest(query) {
  const cx = "12d8bf80438ff4582";

  const searchUrl = `https://cse.google.com/cse?cx=${cx}#gsc.tab=0&gsc.q=teh solo ${encodeURIComponent(
    query
  )}&gsc.sort=`;

  window.open(searchUrl, "_blank");
}

// eye_box
const itemDetailModal = document.querySelector("#item-detail-modal");
const itemDetailButton2 = document.querySelector(".item-detail-button-2");
itemDetailButton2.onclick = (e) => {
  itemDetailModal.style.display = "flex";
  e.preventDefault();
};

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
