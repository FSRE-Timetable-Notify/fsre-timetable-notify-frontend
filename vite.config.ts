import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const dir = import.meta.dir;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(dir, "./src"),
    },
  },
});
