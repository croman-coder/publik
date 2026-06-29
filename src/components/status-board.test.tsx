import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBoard } from "./status-board";

describe("StatusBoard", () => {
  it("shows a chip per portal with its state", () => {
    render(
      <StatusBoard
        publications={[
          { portal: "fb_page", estado: "publicada" },
          { portal: "infocasas", estado: "pendiente" },
        ]}
      />,
    );
    expect(screen.getByText(/fb_page/)).toBeInTheDocument();
    expect(screen.getByText(/publicada/)).toBeInTheDocument();
    expect(screen.getAllByText(/pendiente/).length).toBeGreaterThan(0);
  });

  it("renders all 5 portals, defaulting missing ones to pendiente", () => {
    render(<StatusBoard publications={[]} />);
    expect(screen.getAllByText(/pendiente/)).toHaveLength(5);
  });
});
