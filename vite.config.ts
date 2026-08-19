import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type HtmlTagDescriptor } from "vite";

const csp = [
  "default-src 'none'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
].join("; ");

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    {
      name: "inject-head-tags",
      transformIndexHtml() {
        const tags: HtmlTagDescriptor[] = [
          { tag: "script", attrs: { src: "./theme.js" }, injectTo: "head-prepend" },
        ];
        if (command === "build") {
          tags.unshift({
            tag: "meta",
            attrs: { "http-equiv": "Content-Security-Policy", content: csp },
            injectTo: "head-prepend",
          });
        }
        return tags;
      },
    },
  ],
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "docs"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  base: "./",
}));
