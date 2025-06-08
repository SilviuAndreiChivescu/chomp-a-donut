import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "../router/routes";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "@context/ThemeContext";

describe("router", () => {
  it("redirects unknown /company/* route to /company/info", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/company/unknown"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByText(/about the company/i)).toBeInTheDocument();
  });

  it("renders DonutList page correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/list"],
    });

    render(
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    );

    expect(await screen.getByRole("status")).toBeInTheDocument();
  });
});
