import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyInfo from "@pages/CompanyInfo";

describe("CompanyInfo page", () => {
  it("renders company info text", () => {
    render(
      <MemoryRouter>
        <CompanyInfo />
      </MemoryRouter>
    );
    expect(screen.getByText(/about the company/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /chomp-a-donut thrives on making it's customer's smile with its fantastic range of donuts/i
      )
    ).toBeInTheDocument();
  });

  it("no theme toggle button", () => {
    render(
      <MemoryRouter>
        <CompanyInfo />
      </MemoryRouter>
    );

    expect(screen.queryByLabelText(/switch to/i)).not.toBeInTheDocument();
  });
});
