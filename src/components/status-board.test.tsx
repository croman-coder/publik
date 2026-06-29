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
    expect(screen.getByText(/Facebook/)).toBeInTheDocument();
    expect(screen.getByText(/Published/)).toBeInTheDocument();
    expect(screen.getAllByText(/Pending/).length).toBeGreaterThan(0);
  });

  it("renders all 5 portals, defaulting missing ones to pending", () => {
    render(<StatusBoard publications={[]} />);
    expect(screen.getAllByText(/Pending/)).toHaveLength(5);
  });
});
