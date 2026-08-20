import fs from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type HtmlTagDescriptor } from "vite";

const partialsDir = path.resolve(import.meta.dirname, "client/partials");

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
      name: "html-partials",
      transformIndexHtml: {
        order: "pre" as const,
        handler: (html: string) =>
          html.replace(/<!--\s*include:([\w-]+)\s*-->/g, (_match, name: string) =>
            fs.readFileSync(path.join(partialsDir, `${name}.html`), "utf8").trim(),
          ),
      },
    },
    {
      name: "inject-head-tags",
      transformIndexHtml(_html: string, ctx: { path: string }) {
        const depth = ctx.path.split("/").length - 2;
        const prefix = depth > 0 ? "../".repeat(depth) : "./";
        const tags: HtmlTagDescriptor[] = [
          { tag: "script", attrs: { src: `${prefix}theme.js` }, injectTo: "head-prepend" },
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
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "client/index.html"),
        speaking: path.resolve(import.meta.dirname, "client/speaking/index.html"),
      },
    },
  },
  base: "./",
}));
