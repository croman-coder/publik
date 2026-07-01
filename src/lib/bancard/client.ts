import { createHash } from "crypto";

// ============================================================================
// Cliente de Bancard vPOS (Paraguay)
// ----------------------------------------------------------------------------
// Requiere credenciales de COMERCIO Bancard (Portal de Comercios):
//   BANCARD_PUBLIC_KEY, BANCARD_PRIVATE_KEY, BANCARD_ENV = "staging" | "production"
//
// ⚠️ Las fórmulas de token siguen el contrato público de vPOS 2.0. ANTES de
// producción, verificá cada token contra la documentación oficial y probá en el
// entorno de STAGING de Bancard con tus credenciales reales.
// ============================================================================

const ENV = process.env.BANCARD_ENV === "production" ? "production" : "staging";
export const BANCARD_ENV = ENV;

const BASE =
  ENV === "production"
    ? "https://vpos.infonet.com.py"
    : "https://vpos.infonet.com.py:8888";

const PUBLIC_KEY = process.env.BANCARD_PUBLIC_KEY ?? "";
const PRIVATE_KEY = process.env.BANCARD_PRIVATE_KEY ?? "";

export function isBancardConfigured() {
  return Boolean(PUBLIC_KEY && PRIVATE_KEY);
}

function md5(input: string) {
  return createHash("md5").update(input, "utf8").digest("hex");
}

// PYG no lleva decimales, pero vPOS espera el monto con 2 decimales ("40000.00").
function fmtAmount(amount: number) {
  return amount.toFixed(2);
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = (await res.json()) as {
    status: string;
    process_id?: string;
    messages?: { key: string; dsc: string }[];
  };
  return json;
}

/**
 * create_single_buy — cobro puntual. Devuelve process_id para montar el iframe.
 * token = md5(private_key + shop_process_id + amount + currency)
 */
export async function createSingleBuy(params: {
  shopProcessId: number;
  amount: number;
  currency?: "PYG" | "USD";
  description: string;
  returnUrl: string;
  cancelUrl: string;
}) {
  const currency = params.currency ?? "PYG";
  const amount = fmtAmount(params.amount);
  const token = md5(PRIVATE_KEY + params.shopProcessId + amount + currency);

  return post("/vpos/api/0.3/single_buy", {
    public_key: PUBLIC_KEY,
    operation: {
      token,
      shop_process_id: params.shopProcessId,
      amount,
      currency,
      additional_data: "",
      description: params.description,
      return_url: params.returnUrl,
      cancel_url: params.cancelUrl,
    },
  });
}

/**
 * create_new_card_request — registra (tokeniza) una tarjeta para cobros
 * recurrentes. Devuelve process_id para montar Bancard.Cards.createForm.
 * token = md5(private_key + card_id + user_id + "request_new_card")
 */
export async function createNewCardRequest(params: {
  cardId: number;
  userId: number;
  userCellPhone: string;
  userMail: string;
  returnUrl: string;
}) {
  const token = md5(PRIVATE_KEY + params.cardId + params.userId + "request_new_card");

  return post("/vpos/api/0.3/cards/new", {
    public_key: PUBLIC_KEY,
    operation: {
      token,
      card_id: params.cardId,
      user_id: params.userId,
      user_cell_phone: params.userCellPhone,
      user_mail: params.userMail,
      additional_data: "",
      return_url: params.returnUrl,
    },
  });
}

/**
 * charge — cobra con un alias_token ya registrado (para la renovación mensual).
 * token = md5(private_key + shop_process_id + amount + currency + alias_token)
 */
export async function chargeWithToken(params: {
  shopProcessId: number;
  amount: number;
  currency?: "PYG" | "USD";
  aliasToken: string;
  description: string;
}) {
  const currency = params.currency ?? "PYG";
  const amount = fmtAmount(params.amount);
  const token = md5(
    PRIVATE_KEY + params.shopProcessId + amount + currency + params.aliasToken,
  );

  return post("/vpos/api/0.3/charge", {
    public_key: PUBLIC_KEY,
    operation: {
      token,
      shop_process_id: params.shopProcessId,
      amount,
      currency,
      additional_data: "",
      description: params.description,
      alias_token: params.aliasToken,
      number_of_payments: 1,
    },
  });
}

/**
 * Valida el token de la confirmación (webhook) que envía Bancard.
 * token = md5(private_key + shop_process_id + "confirm" + amount + currency)
 */
export function validateConfirmation(op: {
  token: string;
  shop_process_id: number | string;
  amount: string;
  currency: string;
}) {
  const expected = md5(
    PRIVATE_KEY + op.shop_process_id + "confirm" + op.amount + op.currency,
  );
  return expected === op.token;
}
