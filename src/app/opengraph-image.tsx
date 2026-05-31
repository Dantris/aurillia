import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aurillia Webentwicklung";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(117,244,255,0.18), transparent 34%), radial-gradient(circle at 12% 8%, rgba(231,184,77,0.12), transparent 30%)",
          color: "#f4f7fb",
          padding: "70px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              background: "linear-gradient(135deg, #75f4ff, #e7b84d)",
              transform: "rotate(45deg)",
            }}
          />
          AURILLIA
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 910,
              fontSize: 86,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: 0,
            }}
          >
            Websites, die Angebote klarer machen.
          </div>
          <div
            style={{
              maxWidth: 800,
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(244,247,251,0.78)",
            }}
          >
            Webentwicklung / Mobile Apps / KI-Assistenten
          </div>
        </div>
      </div>
    ),
    size,
  );
}
