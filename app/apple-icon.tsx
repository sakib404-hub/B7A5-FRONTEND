import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: "#059669",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: "40px",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        G
      </div>
    ),
    {
      ...size,
    }
  );
}
