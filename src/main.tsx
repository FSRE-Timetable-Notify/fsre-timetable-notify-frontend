import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { hr } from "date-fns/locale";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast } from "sonner";
import { ThemeProvider } from "./components/theme-mode-provider.tsx";
import { routes } from "./config/routes.tsx";
import "./index.css";
import { handleError } from "./lib/errors.ts";

const router = createBrowserRouter(routes, {
  basename: "/fsre-timetable-notify-frontend/",
});

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
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
