
function getTheme() {
  return (
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function setTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const newTheme = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  setTheme(newTheme);
}

setTheme(getTheme());
document.getElementById("themeToggle")?.addEventListener("click", toggleTheme);

document.addEventListener("astro:before-swap", (ev) => {
  ev.newDocument.documentElement.classList.toggle(
    "dark",
    getTheme() === "dark",
  );
});

document.addEventListener("astro:page-load", () => {
  document
    .getElementById("themeToggle")
    ?.addEventListener("click", toggleTheme);
});
