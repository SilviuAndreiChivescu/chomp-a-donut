import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.tsx";
import ErrorBoundary from "@components/ErrorBoundary.tsx";

// Only enable MSW in development
async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ErrorBoundary>
    </StrictMode>
  );
});
