/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "react-zdog-renderer",
      formats: ["es"],
      fileName: (format) => `react-zdog-renderer.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "zdog"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          zdog: "Zdog",
        },
      },
    },
  },
});
