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
