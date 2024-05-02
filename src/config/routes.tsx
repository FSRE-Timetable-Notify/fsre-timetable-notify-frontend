import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import RootLayout from "@/layouts/root-layout";
import HomePage from "@/pages/home-page";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "/app/home",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
      },
      {
        path: "",
        element: <Navigate to="/app/home" />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
];

export { routes };
