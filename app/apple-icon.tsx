import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    background: "#000",
                }}
            >
                <div style={{ width: 100, height: 22, borderRadius: 11, background: "#fff" }} />
                <div style={{ width: 100, height: 22, borderRadius: 11, background: "#fff", opacity: 0.75 }} />
                <div style={{ width: 100, height: 22, borderRadius: 11, background: "#fff", opacity: 0.5 }} />
            </div>
        ),
        { ...size }
    );
}
