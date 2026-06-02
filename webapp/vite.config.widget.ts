import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-widget",
    lib: {
      entry: path.resolve(__dirname, "src/widget/index.ts"),
      name: "GeoChatterWidget",
      formats: ["es", "iife"],
      fileName: (format) => `geochatter-widget.${format}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
