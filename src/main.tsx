import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import { worker } from "./mocks/browser.ts";
import ErrorBoundary from "@components/ErrorBoundary.tsx";

// NOTE: for production, there should be an enviroment variable that defines the enviroment
// and it should only start the worker for the dev envrioment
await worker.start();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
