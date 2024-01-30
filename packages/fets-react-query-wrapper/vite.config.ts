// vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MyReactLibrary",
      // the proper extensions will be added
      fileName: "fets-react-query-wrapper",
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ["react", "react-dom", "@tanstack/react-query"],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
