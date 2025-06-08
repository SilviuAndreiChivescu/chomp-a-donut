import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Header from "@components/Header";
import { ThemeProvider } from "@context/ThemeContext";

describe("Header", () => {
  const renderWithRouter = (route: string) =>
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={[route]}>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );

  it("renders navigation links correctly", () => {
    renderWithRouter("/");
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /donut/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /company/i })).toBeInTheDocument();
  });

  it("highlights active route link", () => {
    renderWithRouter("/list");
    const activeLink = screen.getByRole("link", { name: /donut/i });
    expect(activeLink).toHaveClass("border-b-2 font-semibold");
  });

  it("hides theme toggle on company page", () => {
    renderWithRouter("/company/info");
    expect(screen.queryByLabelText(/switch to/i)).not.toBeInTheDocument();
  });
});
