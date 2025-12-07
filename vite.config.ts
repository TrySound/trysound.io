import { glob, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig, Plugin } from "vite";

const blog = (): Plugin => {
  return {
    name: "blog",

    async config(config) {
      const input: string[] = [];
      for await (const rel of glob("**/*.html")) {
        if (rel.startsWith("node_modules") || rel.startsWith("dist")) {
          continue;
        }
        input.push(resolve(config.root ?? __dirname, rel));
      }
      return {
        build: {
          rollupOptions: {
            input,
          },
        },
      };
    },

    async transformIndexHtml(html) {
      const header = await readFile("./_header.html", "utf-8");
      const footer = await readFile("./_footer.html", "utf-8");
      return html
        .replaceAll("{{header}}", header)
        .replaceAll("{{footer}}", footer);
    },

    configureServer(server) {
      server.watcher.add(`_header.html`);
      server.watcher.add(`_footer.html`);
    },
  };
};

export default defineConfig({
  plugins: [blog()],
});
