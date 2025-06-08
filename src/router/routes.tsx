import { Navigate } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import DonutList from "@pages/DonutList";
import CompanyInfo from "@pages/CompanyInfo";
import { CompanyInfoLayout } from "@layouts/CompanyInfoLayout";
import RouteErrorFallback from "@pages/RouteErrorFallback";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, element: <Home /> },
      { path: "list", element: <DonutList /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: "/company",
    element: <CompanyInfoLayout />,
    errorElement: <RouteErrorFallback />,

    children: [
      { path: "info", element: <CompanyInfo /> },
      { path: "*", element: <Navigate to="/company/info" replace /> },
    ],
  },
  {
    path: "*",
    errorElement: <RouteErrorFallback />,
    element: <Navigate to="/" replace />,
  },
];
