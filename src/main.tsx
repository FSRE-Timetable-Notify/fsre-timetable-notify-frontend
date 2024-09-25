import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { routes } from "./config/routes.tsx";
import { ThemeProvider } from "./components/theme-mode-provider.tsx";
import { setDefaultOptions } from "date-fns";
import { hr } from "date-fns/locale";
import { handleError } from "./lib/errors.ts";
import { toast } from "sonner";

const router = createBrowserRouter(routes);

setDefaultOptions({
  locale: hr,
  weekStartsOn: 1,
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      handleError(error);
    },
    onSuccess: () => {
      toast.dismiss();
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
