import { ImageResponse } from "next/og";

export const alt = "PUBLIK: Publicá tus propiedades en todos los portales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const words = [
  { t: "Publicá", accent: false },
  { t: "en", accent: false },
  { t: "todos", accent: true },
  { t: "los", accent: true },
  { t: "portales", accent: true },
  { t: "desde", accent: false },
  { t: "un", accent: false },
  { t: "solo", accent: false },
  { t: "lugar.", accent: false },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0a0b0d",
          backgroundImage:
            "radial-gradient(900px 520px at 82% 0%, rgba(249,115,22,0.28), transparent 60%)",
          color: "#f5f4f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 52,
                height: 52,
                borderRadius: 15,
                background: "linear-gradient(135deg,#fdba74,#ea580c)",
                marginRight: 20,
              }}
            />
            <div style={{ display: "flex", fontSize: 42, fontWeight: 800, letterSpacing: "0.04em" }}>
              PUBLIK
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#cdccc9",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: 999,
              padding: "12px 24px",
            }}
          >
            Para agentes inmobiliarios · Paraguay
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
          }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              style={{
                display: "flex",
                marginRight: "0.26em",
                color: w.accent ? "#f97316" : "#f5f4f2",
              }}
            >
              {w.t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#9b9a98" }}>
          Infocasas · Facebook · Marketplace · Instagram · Clasipar
        </div>
      </div>
    ),
    { ...size },
  );
}
