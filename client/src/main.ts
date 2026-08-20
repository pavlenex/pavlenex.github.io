import "./index.css";

const typedPre = document.getElementById("typed-pre");
const typedLink = document.getElementById("typed-link");
const typedPost = document.getElementById("typed-post");
if (
  typedPre &&
  typedLink &&
  typedPost &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const pre = typedPre.textContent ?? "";
  const link = typedLink.textContent ?? "";
  const post = typedPost.textContent ?? "";
  const total = pre.length + link.length + post.length;
  typedPre.textContent = "";
  typedLink.textContent = "";
  typedPost.textContent = "";
  let n = 0;
  const timer = setInterval(() => {
    n += 1;
    typedPre.textContent = pre.slice(0, n);
    typedLink.textContent = link.slice(0, Math.max(0, n - pre.length));
    typedPost.textContent = post.slice(0, Math.max(0, n - pre.length - link.length));
    if (n >= total) clearInterval(timer);
  }, 45);
}

const detailsToggle = document.getElementById("details-toggle");
if (detailsToggle) {
  const details = document.querySelectorAll<HTMLElement>(".detail");
  detailsToggle.addEventListener("click", () => {
    const show = detailsToggle.getAttribute("aria-expanded") === "false";
    for (const el of details) el.hidden = !show;
    detailsToggle.setAttribute("aria-expanded", String(show));
    detailsToggle.textContent = show ? "Hide details" : "Show details";
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
