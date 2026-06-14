//////////////// MOBILE NAV ////////////////
const menu = document.querySelector(".menu");
const hamburger= document.querySelector(".hamburger");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

document.addEventListener('touchstart', function() {});

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.visibility = "hidden";
    closeIcon.style.display = "none";
    menuIcon.style.visibility = "visible";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.visibility = "visible";
    closeIcon.style.display = "inline-block";
    menuIcon.style.visibility = "hidden";
  }
}

hamburger.addEventListener("click", toggleMenu);

//////////////// DROPDOWN ////////////////
const dropdown = document.querySelector(".dropdown");
const dropdownOptions = document.querySelector(".dropdown-options");

document.addEventListener("click", function(event) {
  var navActive = dropdown.contains(event.target);
  if (dropdown.classList.contains("showDropdown")) {
    dropdown.classList.remove("showDropdown");
    dropdownOptions.style.display = "none";
  } else if (navActive) {
    dropdown.classList.add("showDropdown");
    dropdownOptions.style.display = "block";
  } else {
    dropdown.classList.remove("showDropdown");
    dropdownOptions.style.display = "none";
  }
});