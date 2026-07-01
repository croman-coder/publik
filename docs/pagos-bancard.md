# Pagos — Bancard vPOS (suscripción)

Modelo: **cuenta = pago primero**. El flujo es
`Precios → /checkout?plan=X → pago con Bancard → confirmación → se provisiona la cuenta`.

## Qué está construido

- **Checkout** `/checkout?plan=inicial|profesional|agencia`: resumen del plan + formulario
  (nombre, agencia, email, WhatsApp) + botón "Pagar con Bancard".
- **`POST /api/checkout`**: crea la operación `single_buy` en Bancard y devuelve el `process_id`
  para montar el iframe. Si todavía no hay credenciales → responde `configured:false` y el front
  muestra la **alternativa por WhatsApp** (pago manual).
- **`POST /api/bancard/confirm`**: webhook de confirmación. Valida el token de Bancard.
- **`src/lib/bancard/client.ts`**: cliente vPOS (`single_buy`, `new_card`/tokenización, `charge`,
  firma de tokens, validación de confirmación).

## Qué necesitás vos (para activarlo)

1. **Cuenta de comercio Bancard** habilitada (se gestiona con tu banco / Bancard). Sin esto no se
   puede cobrar con tarjeta.
2. Del **Portal de Comercios** de Bancard: `public_key` y `private_key`.
3. Registrar la **URL de confirmación** en Bancard: `https://TU-DOMINIO/api/bancard/confirm`.

### Variables de entorno (Vercel → Settings → Environment Variables)

| Key | Valor |
|---|---|
| `BANCARD_PUBLIC_KEY` | tu public key |
| `BANCARD_PRIVATE_KEY` | tu private key (secreta) |
| `BANCARD_ENV` | `staging` para probar · `production` para cobrar real |

Con eso, `/api/checkout` deja de responder `configured:false` y el checkout monta el iframe real.

## Pendiente (fase 2, cuando tengas credenciales)

- **Provisionar la cuenta al confirmar el pago** (`/api/bancard/confirm`): crear/activar la agencia
  + `app_users` (rol `owner`) y registrar la suscripción. Requiere una tabla `subscriptions`
  (plan, vigencia, monto, `shop_process_id`, `alias_token`).
- **Recurrencia mensual**: usar `create_new_card_request` (tokenizar la tarjeta → `alias_token`),
  guardar el token, y un **cron mensual** que llame a `charge` con el `alias_token`.
- **Gate de acceso**: en `/login` y `/dashboard`, verificar que la agencia tenga suscripción activa;
  si no, redirigir a `/checkout`.

## ⚠️ Importante

Las **fórmulas de token** en `client.ts` siguen el contrato público de vPOS 2.0. **Verificá cada
token contra la documentación oficial de Bancard y probá primero en STAGING** con tus credenciales
reales antes de cobrar en producción. Es dinero: no lo pongas en `production` sin una prueba exitosa
end-to-end en staging.
