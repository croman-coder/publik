import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyForm } from "./property-form";

describe("PropertyForm", () => {
  it("calls onSubmit with parsed values", () => {
    const onSubmit = vi.fn();
    render(<PropertyForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Depto Villa Morra" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Luminoso" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "85000" },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: "Asunción" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0][0].precio).toBe(85000);
    expect(onSubmit.mock.calls[0][0].titulo).toBe("Depto Villa Morra");
  });

  it("does not submit when price is empty", () => {
    const onSubmit = vi.fn();
    render(<PropertyForm onSubmit={onSubmit} />);
    fireEvent.submit(screen.getByRole("button", { name: /save/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
