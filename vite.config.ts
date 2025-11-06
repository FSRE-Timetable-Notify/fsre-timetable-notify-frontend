import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

const dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/fsre-timetable-notify-frontend/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
});
