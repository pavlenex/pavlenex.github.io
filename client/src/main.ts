import "./index.css";

const detailsToggle = document.getElementById("details-toggle");
if (detailsToggle) {
  const label = detailsToggle.querySelector("span");
  const details = document.querySelectorAll<HTMLElement>(".detail");
  detailsToggle.addEventListener("click", () => {
    const show = detailsToggle.getAttribute("aria-expanded") === "false";
    for (const el of details) el.hidden = !show;
    detailsToggle.setAttribute("aria-expanded", String(show));
    if (label) label.textContent = show ? "Hide details" : "Show details";
  });
}

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  const syncThemeToggle = () => {
    themeToggle.setAttribute(
      "aria-pressed",
      String(document.documentElement.classList.contains("dark")),
    );
  };

  syncThemeToggle();

  themeToggle.addEventListener("click", () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("pv-theme", dark ? "dark" : "light");
    } catch {}
    syncThemeToggle();
  });
}
