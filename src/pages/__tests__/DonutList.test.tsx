import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { server } from "../../mocks/server";
import { http, HttpResponse } from "msw";
import { apiRoot } from "../../config";
import DonutList from "@pages/DonutList";

const donutsMock = [
  { id: "1", name: "Glazed", price: 1.5, imageUrl: "glazed.png" },
  { id: "2", name: "Chocolate", price: 2.0, imageUrl: "chocolate.png" },
];

describe("DonutList Component", () => {
  it("renders loading state initially", () => {
    render(<DonutList />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders donut list after successful fetch", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );

    render(<DonutList />);
    await waitFor(() => {
      expect(screen.getByText("Glazed")).toBeInTheDocument();
      expect(screen.getByText("Chocolate")).toBeInTheDocument();
    });
  });

  it("handles empty data", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json([], {
          status: 202,
        });
      })
    );
    render(<DonutList />);
    await waitFor(() => {
      expect(screen.getByText(/no donuts available/i)).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json({
          status: 500,
        });
      })
    );
    render(<DonutList />);
    await waitFor(() => {
      expect(screen.getByText(/fetch donuts/i)).toBeInTheDocument();
      expect(screen.getByText(/retry/i)).toBeInTheDocument();
    });
  });

  it("allows chomping donuts and disables button with opacity", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );
    render(<DonutList />);

    await waitFor(() => screen.getByText("Glazed"));

    const chompButton = screen.getAllByRole("button", {
      name: /chomp-a-donut/i,
    })[0];

    fireEvent.click(chompButton);

    expect(chompButton).toBeDisabled();
    const row = chompButton.closest("tr") || chompButton.parentElement;
    expect(row).toHaveClass("opacity-50");
  });

  it("calculates and displays total price of chomped donuts", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );
    render(<DonutList />);
    await waitFor(() => screen.getByText("Glazed"));

    const chompButtons = screen.getAllByRole("button", {
      name: /chomp-a-donut/i,
    });
    fireEvent.click(chompButtons[0]);
    fireEvent.click(chompButtons[1]);

    expect(
      screen.getByText(/total chomped value: \£3\.5/i)
    ).toBeInTheDocument();
  });

  it("reset button clears chomped state", async () => {
    server.use(
      http.get(`${apiRoot}/donuts`, () => {
        return HttpResponse.json(donutsMock, {
          status: 202,
        });
      })
    );

    render(<DonutList />);
    await waitFor(() => screen.getByText("Glazed"));

    const chompButtons = screen.getAllByRole("button", {
      name: /chomp-a-donut/i,
    });
    fireEvent.click(chompButtons[0]);
    fireEvent.click(chompButtons[1]);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    fireEvent.click(resetButton);

    chompButtons.forEach((button) => {
      expect(button).not.toBeDisabled();
      const row = button.closest("tr") || button.parentElement;
      expect(row).not.toHaveStyle("opacity: 0.5");
    });

    expect(
      screen.queryByText(/total chomped value: \£0.00/i)
    ).toBeInTheDocument();
  });
});
