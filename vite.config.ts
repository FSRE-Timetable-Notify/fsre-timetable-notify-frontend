import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

const dir = import.meta.dir;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
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
