import type { CSSProperties, ReactNode } from "react";
import { u } from "../Scene";
import "./horah.css";

/**
 * The small pieces Horah draws with, at the app's own measurements: glass, glyphs, the progress
 * ring, the switch. Ported from the Horah landing page (`apps/landing/src/home/figures.tsx`), where
 * the app is "drawn in its own shapes, not photographed".
 */

/** A shade of the text colour, the one colour the app allows outside its tokens. */
export const ink = (pct: number) => `color-mix(in srgb, var(--color-text) ${pct}%, transparent)`;

/** One grouped cell, opaque on the glass: the content of a surface is never glass. */
export const CELL: CSSProperties = {
    background: "var(--color-surface)",
    borderRadius: "var(--radius-cell)",
    overflow: "hidden",
};

/** Liquid glass, as a surface anything can be built on. */
export function Glass({ style, children }: { style?: CSSProperties; children: ReactNode }) {
    return (
        <div className="horah-glass" style={style}>
            {children}
        </div>
    );
}

export const GLYPH = {
    cal: "M6.5 6h11A3 3 0 0 1 20.5 9v9.5a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM8.75 4v3.5M15.25 4v3.5M3.5 11h17",
    clock: "M12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zM12 7.5V12l3 2",
    repeat: "M17 2.5l3 3-3 3M4 11V9.5a4 4 0 0 1 4-4h12M7 21.5l-3-3 3-3M20 13v1.5a4 4 0 0 1-4 4H4",
    layers: "M4 8.5 12 4l8 4.5-8 4.5zM4 12.5l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5",
    check: "M20 6L9 17l-5-5",
    spark: "M12 2.5l2 6.2 6.5 2.3-6.5 2.3-2 6.2-2-6.2L3.5 11l6.5-2.3z",
    close: "M6 6l12 12M18 6L6 18",
    done: "M12 3.75a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5zM8.3 12.3l2.5 2.5 4.9-5.2",
    lock: "M7 10.5V8a5 5 0 0 1 10 0v2.5M6.5 10.5h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-6.5a2 2 0 0 1 2-2z",
};

/** A glyph in a 24 box, on a stroke, the way the app draws its icons. */
export function Glyph({ d, size = 16, width = 1.9 }: { d: string; size?: number; width?: number }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={width}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: u(size), height: u(size), display: "block", flex: "none" }}
        >
            <path d={d} />
        </svg>
    );
}

/** The trailing chevron of a row that goes somewhere. */
export function Chevron() {
    return (
        <svg
            viewBox="0 0 8 13"
            fill="none"
            stroke="var(--label-4)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: u(7), height: u(12), flex: "none" }}
        >
            <path d="M1.5 1.5 6.5 6.5l-5 5" />
        </svg>
    );
}

/** A phrase the capture sheet read out of the title, marked where it stands. */
export function Mark({ children }: { children: ReactNode }) {
    return (
        <span
            style={{
                background: "color-mix(in srgb, var(--color-accent) 18%, transparent)",
                color: "var(--accent-ink)",
                borderRadius: "var(--radius-chip)",
                padding: `${u(1)} ${u(4)}`,
            }}
        >
            {children}
        </span>
    );
}

/** A project's completion, as the ring the projects page draws. */
export function Ring({ pct, size = 28 }: { pct: number; size?: number }) {
    if (pct >= 1) {
        return (
            <span
                style={{
                    width: u(size),
                    height: u(size),
                    flex: "none",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-accent)",
                    color: "var(--on-accent)",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Glyph d={GLYPH.check} size={size / 2} width={3.2} />
            </span>
        );
    }
    const r = size / 2 - 3;
    const around = 2 * Math.PI * r;
    return (
        <svg viewBox={`0 0 ${size} ${size}`} style={{ width: u(size), height: u(size), flex: "none", rotate: "-90deg" }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={ink(12)} strokeWidth="2.6" />
            {pct > 0 && (
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeDasharray={`${pct * around} ${around}`}
                />
            )}
        </svg>
    );
}

/** The app's own switch, inert. */
export function Switch({ on }: { on: boolean }) {
    return (
        <span
            style={{
                flex: "none",
                width: u(38),
                height: u(22),
                padding: u(2),
                boxSizing: "border-box",
                borderRadius: "var(--radius-pill)",
                display: "flex",
                alignItems: "center",
                justifyContent: on ? "flex-end" : "flex-start",
                background: on ? "var(--color-accent)" : "var(--fill-strong)",
            }}
        >
            <span
                style={{
                    width: u(18),
                    height: u(18),
                    borderRadius: "var(--radius-pill)",
                    background: "var(--switch-knob)",
                    boxShadow: "var(--shadow-seg)",
                }}
            />
        </span>
    );
}

/** Horah's mark: a dial of hours with one of them kept. */
export function HorahMark({ size }: { size: number }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: u(size), height: u(size), flex: "none" }}>
            <path d="M19.63 10.38A7.8 7.8 0 1 1 13.09 4.28" strokeWidth={1.5} strokeLinecap="round" />
            <path d="M14.67 4.67A7.8 7.8 0 0 1 19.13 8.83" strokeWidth={2.9} strokeLinecap="butt" />
        </svg>
    );
}
