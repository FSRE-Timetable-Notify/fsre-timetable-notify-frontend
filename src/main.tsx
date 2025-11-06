import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { setDefaultOptions } from "date-fns";
import { hr } from "date-fns/locale";
import React from "react";
import ReactDOM from "react-dom/client";
import { toast } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import AppLayout from "@/layouts/app-layout.tsx";
import HomePage from "@/pages/home-page.tsx";

import { ThemeProvider } from "./components/theme-mode-provider.tsx";
import "./index.css";
import { handleError } from "./lib/errors.ts";

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

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme">
        <TooltipProvider>
          <AppLayout>
            <HomePage />
          </AppLayout>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
