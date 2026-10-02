import { ImageResponse } from "next/og";
import { siteSettings } from "@/lib/data/site";

export const runtime = "edge";
export const alt = `${siteSettings.fullName} — ${siteSettings.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#faf6ec",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              backgroundColor: "#2b50ff",
              color: "#fff",
              border: "4px solid #101010",
              boxShadow: "8px 8px 0 0 #101010",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            {"</>"}
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#101010",
              backgroundColor: "#ffd21e",
              border: "3px solid #101010",
              padding: "6px 16px",
            }}
          >
            {siteSettings.tagline}
          </div>
        </div>

        <div
          style={{
            fontSize: "110px",
            fontWeight: 800,
            color: "#101010",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {siteSettings.fullName}
        </div>

        <div
          style={{
            marginTop: "32px",
            fontSize: "30px",
            color: "#5b5647",
            maxWidth: "900px",
          }}
        >
          {siteSettings.bio.slice(0, 140)}
        </div>
      </div>
    ),
    { ...size },
  );
}
