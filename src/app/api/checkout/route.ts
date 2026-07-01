import { NextResponse } from "next/server";
import { createSingleBuy, isBancardConfigured } from "../../../lib/bancard/client";
import { SITE_URL } from "../../../lib/site";
import { PLANS, isPlanSlug } from "../../checkout/plans";

// Crea la operación de pago en Bancard y devuelve el process_id para montar el
// iframe. Si Bancard todavía no está configurado (sin credenciales), responde
// { configured:false } y el front muestra la alternativa por WhatsApp.
export async function POST(request: Request) {
  let body: { plan?: string; email?: string; name?: string; agencia?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!isPlanSlug(body.plan)) {
    return NextResponse.json({ error: "invalid_plan" }, { status: 400 });
  }
  if (!body.email || !body.email.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const plan = PLANS[body.plan];

  if (!isBancardConfigured()) {
    // Todavía sin credenciales de comercio Bancard.
    return NextResponse.json({ configured: false });
  }

  // TODO: persistir la intención de pago (email, plan, shop_process_id) en la
  // base para reconciliar con la confirmación y provisionar la cuenta.
  const shopProcessId = Date.now();

  const result = await createSingleBuy({
    shopProcessId,
    amount: plan.price,
    currency: plan.currency,
    description: `PUBLIK — Plan ${plan.name}`,
    returnUrl: `${SITE_URL}/checkout/gracias?plan=${plan.slug}`,
    cancelUrl: `${SITE_URL}/checkout?plan=${plan.slug}&cancel=1`,
  });

  if (result.status !== "success" || !result.process_id) {
    return NextResponse.json(
      { error: "bancard_error", detail: result.messages ?? null },
      { status: 502 },
    );
  }

  return NextResponse.json({
    configured: true,
    process_id: result.process_id,
    shop_process_id: shopProcessId,
  });
}
