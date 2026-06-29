import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBoard } from "./status-board";
import { I18nProvider } from "../i18n/client";

function renderBoard(
  publications: Parameters<typeof StatusBoard>[0]["publications"]
) {
  return render(
    <I18nProvider locale="es">
      <StatusBoard publications={publications} />
    </I18nProvider>
  );
}

describe("StatusBoard", () => {
  it("shows a chip per portal with its state", () => {
    renderBoard([
      { portal: "fb_page", estado: "publicada" },
      { portal: "infocasas", estado: "pendiente" },
    ]);
    expect(screen.getByText(/Facebook/)).toBeInTheDocument();
    expect(screen.getByText(/Publicada/)).toBeInTheDocument();
    expect(screen.getAllByText(/Pendiente/).length).toBeGreaterThan(0);
  });

  it("renders all 5 portals, defaulting missing ones to pending", () => {
    renderBoard([]);
    expect(screen.getAllByText(/Pendiente/)).toHaveLength(5);
  });
});
