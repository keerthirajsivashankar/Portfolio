const phrases = [
  "Crafting performant UIs 💡",
  "130+ Day LeetCode Streak 🔥",
  "React.js | Python | Flask",
];

let i = 0,
  j = 0,
  current = "",
  isDeleting = false;
const el = document.getElementById("typed-text");

function typeLoop() {
  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      current = phrases[i].slice(0, ++j);
      el.textContent = current;
    }

    if (isDeleting && j >= 0) {
      current = phrases[i].slice(0, --j);
      el.textContent = current;
    }

    if (j === phrases[i].length) isDeleting = true;
    if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
    }

    setTimeout(typeLoop, isDeleting ? 150 : 150);
  }
}

document.addEventListener("DOMContentLoaded", typeLoop);

//hamburger cde
// Toggle hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

//certifications

function showCert(category) {
  const categories = document.querySelectorAll(".cert-category");
  const buttons = document.querySelectorAll(".tab-button");

  categories.forEach((el) => el.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(category).classList.add("active");
  event.currentTarget.classList.add("active");
}
