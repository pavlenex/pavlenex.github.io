try {
  var stored = localStorage.getItem("pv-theme");
  if (stored === "dark" || (!stored && matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
  if (localStorage.getItem("pv-corporate-mode") !== "false") {
    document.documentElement.classList.add("corporate");
  }
} catch (e) {}
