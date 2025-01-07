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
// this cse url has been disabled
// please use your own cse url
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let searchCount = 0;
    let lastSearchTime = 0;
    try {
      if (typeof Storage !== "undefined") {
        lastSearchTime = parseInt(localStorage.getItem("lastSearchTime")) || 0;
        searchCount = parseInt(localStorage.getItem("searchCount")) || 0;
      }
    } catch (error) {
      console.error("An error occurred while accessing web storage:", error);
    }
    const currentTime = Date.now();
    if (lastSearchTime) {
      let timeDiff = currentTime - lastSearchTime;
      let hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
      if (hoursDiff >= 24) {
        searchCount = 1;
        lastSearchTime = currentTime;
      } else {
        if (searchCount >= 10) {
          console.log("You have exceeded the search query limit.");
          return;
        } else {
          searchCount++;
        }
      }
    } else {
      lastSearchTime = currentTime;
      searchCount = 1;
    }
    try {
      if (typeof Storage !== "undefined") {
        localStorage.setItem("lastSearchTime", lastSearchTime.toString());
        localStorage.setItem("searchCount", searchCount.toString());
      }
    } catch (error) {
      console.error("An error occurred while accessing web storage:", error);
    }
    const query = document.getElementById("query").value;
    if (!query) {
      alert("Please enter a search query.");
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
  window.location.href = searchUrl;
}

// eye_box
const itemDetailModal2 = document.querySelector("#item-detail-modal-2");
const itemDetailModal3 = document.querySelector("#item-detail-modal-3");
const itemDetailButton2 = document.querySelector(".item-detail-button-2");
const itemDetailButton3 = document.querySelector(".item-detail-button-3");
const closeIcon2 = document.querySelector(".modal-container .close-icon-2");
const closeIcon3 = document.querySelector(".modal-container .close-icon-3");
itemDetailButton2.onclick = (e) => {
  itemDetailModal2.style.display = "flex";
  e.preventDefault();
};
itemDetailButton3.onclick = (e) => {
  itemDetailModal3.style.display = "flex";
  e.preventDefault();
};
closeIcon2.onclick = (e) => {
  itemDetailModal2.style.display = "none";
  e.preventDefault();
};
closeIcon3.onclick = (e) => {
  itemDetailModal3.style.display = "none";
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
