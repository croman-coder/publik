import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PropertyForm } from "./property-form";
import { I18nProvider } from "../i18n/client";

function renderForm(onSubmit: (p: unknown) => void) {
  return render(
    <I18nProvider locale="es">
      <PropertyForm onSubmit={onSubmit} />
    </I18nProvider>
  );
}

describe("PropertyForm", () => {
  it("calls onSubmit with parsed values", () => {
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    fireEvent.change(screen.getByLabelText(/título/i), {
      target: { value: "Depto Villa Morra" },
    });
    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Luminoso" },
    });
    fireEvent.change(screen.getByLabelText(/precio/i), {
      target: { value: "85000" },
    });
    fireEvent.change(screen.getByLabelText(/ciudad/i), {
      target: { value: "Asunción" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /guardar/i }));

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit.mock.calls[0][0].precio).toBe(85000);
    expect(onSubmit.mock.calls[0][0].titulo).toBe("Depto Villa Morra");
  });

  it("does not submit when price is empty", () => {
    const onSubmit = vi.fn();
    renderForm(onSubmit);
    fireEvent.submit(screen.getByRole("button", { name: /guardar/i }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
