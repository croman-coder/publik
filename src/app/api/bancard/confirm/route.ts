import { NextResponse } from "next/server";
import { validateConfirmation } from "../../../../lib/bancard/client";

// Webhook de confirmación de Bancard. Bancard hace POST acá cuando se resuelve
// una operación. Validamos el token y, si el pago fue aprobado, provisionamos
// la cuenta (crear/activar agencia + suscripción).
export async function POST(request: Request) {
  let body: {
    operation?: {
      token: string;
      shop_process_id: number | string;
      amount: string;
      currency: string;
      response: string; // "S" aprobado
      response_details?: string;
      authorization_number?: string;
    };
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  const op = body.operation;
  if (!op || !validateConfirmation(op)) {
    return NextResponse.json({ status: "error", detail: "invalid_token" }, { status: 400 });
  }

  const aprobado = op.response === "S";

  if (aprobado) {
    // TODO: reconciliar por shop_process_id (buscar la intención de pago) y:
    //   1. crear/activar la agencia + el usuario (app_users, role 'owner')
    //   2. registrar la suscripción (plan, vigencia, monto)
    //   3. habilitar el acceso al dashboard
    // Para recurrente: guardar el alias_token de la tarjeta y programar el
    // cobro mensual (charge) por cron.
  }

  // Bancard espera un 200 con status "success" para dar por recibida la confirmación.
  return NextResponse.json({ status: "success" });
}
