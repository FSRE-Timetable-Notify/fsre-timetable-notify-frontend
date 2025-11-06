import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

const dir = import.meta.dir;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dir, "./src"),
    },
  },
  base: "/fsre-timetable-notify-frontend/",
});
