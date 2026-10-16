import type { CSSProperties, ReactNode } from "react";
import { u } from "./Scene";

/** A desktop browser window around a page, with the address it lives at. */
export function BrowserFrame({ width, height, address, style, children }: {
    width: number;
    height: number;
    address: string;
    style?: CSSProperties;
    children: ReactNode;
}) {
    return (
        <div
            style={{
                width: u(width),
                height: u(height),
                display: "flex",
                flexDirection: "column",
                borderRadius: u(14),
                overflow: "hidden",
                background: "#fdfcf9",
                boxShadow: `0 ${u(30)} ${u(70)} rgba(48, 40, 32, 0.28), 0 ${u(4)} ${u(14)} rgba(48, 40, 32, 0.12)`,
                outline: `${u(1)} solid rgba(48, 40, 32, 0.08)`,
                ...style,
            }}
        >
            <div style={{ flex: "none", height: u(34), display: "flex", alignItems: "center", gap: u(7), padding: `0 ${u(14)}`, background: "#f1efe9" }}>
                {["#ee6a5f", "#f5be4f", "#62c554"].map((color) => (
                    <span key={color} style={{ width: u(10), height: u(10), borderRadius: "50%", background: color }} />
                ))}
                <span
                    style={{
                        margin: "0 auto",
                        height: u(20),
                        padding: `0 ${u(36)}`,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: u(6),
                        background: "#fbfaf7",
                        color: "#6b665e",
                        fontSize: u(11),
                        fontFamily: "ui-sans-serif, system-ui, sans-serif",
                        letterSpacing: "0.01em",
                    }}
                >
                    {address}
                </span>
                <span style={{ width: u(44) }} />
            </div>
            <div style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden" }}>{children}</div>
        </div>
    );
}

/** A phone around a page: a dark bezel, rounded screen, and the island at the top. */
export function PhoneFrame({ width, height, style, children }: {
    width: number;
    height: number;
    style?: CSSProperties;
    children: ReactNode;
}) {
    return (
        <div
            style={{
                width: u(width),
                height: u(height),
                padding: u(8),
                boxSizing: "border-box",
                borderRadius: u(40),
                background: "#1f1d1b",
                boxShadow: `0 ${u(30)} ${u(60)} rgba(48, 40, 32, 0.35), inset 0 0 0 ${u(1.5)} rgba(255, 255, 255, 0.08)`,
                ...style,
            }}
        >
            <div style={{ position: "relative", height: "100%", borderRadius: u(32), overflow: "hidden" }}>
                {children}
                <span
                    style={{
                        position: "absolute",
                        top: u(9),
                        left: "50%",
                        translate: "-50% 0",
                        width: u(70),
                        height: u(20),
                        borderRadius: u(12),
                        background: "#1f1d1b",
                    }}
                />
            </div>
        </div>
    );
}
