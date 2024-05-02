import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./config/routes.tsx";
import { ThemeProvider } from "./components/theme-mode-provider.tsx";
import { setDefaultOptions } from "date-fns";
import { hr } from "date-fns/locale";

const router = createBrowserRouter(routes);

setDefaultOptions({
  locale: hr,
  weekStartsOn: 1,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
