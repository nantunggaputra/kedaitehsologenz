// toggle_class_active
const navbarNav = document.querySelector(".navbar-nav");

// onclick_class_active
document.querySelector("#edge-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// hide_class_active
const edgeMenu = document.querySelector("#edge-menu");
document.addEventListener("click", function (e) {
  if (!edgeMenu.contains(e.target)) {
    navbarNav.classList.remove("active");
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
