import type { CSSProperties } from "react";
import { u } from "../Scene";
import { Glass, ink } from "./parts";

/**
 * Horah's week view, held still: the frame, the header with its segmented control, the hours from
 * 08:00 to 20:00 and a plausible week of events and tasks, at the app's own measurements. Ported
 * from the live calendar on horah.dev (`DemoCalendar.tsx`), minus every gesture.
 */

type Item = { title: string; day: number; at: number; dur: number; kind: "event" | "task"; hue?: string; done?: boolean };

const h = (hours: number, minutes = 0) => hours * 60 + minutes;

/** Monday is 0. Today is the Wednesday. */
const WEEK: Item[] = [
    { title: "Retro", day: 0, at: h(9), dur: 60, kind: "event", hue: "green" },
    { title: "Flat viewing", day: 0, at: h(16), dur: 45, kind: "event", hue: "orange" },
    { title: "Lunch with Mara", day: 1, at: h(12, 30), dur: 60, kind: "event", hue: "pink" },
    { title: "Book the flights", day: 1, at: h(14), dur: 30, kind: "task", done: true },
    { title: "Write the proposal", day: 2, at: h(8, 15), dur: 60, kind: "task" },
    { title: "Weekly standup", day: 2, at: h(9, 30), dur: 45, kind: "event", hue: "blue" },
    { title: "Dentist", day: 2, at: h(11), dur: 75, kind: "event", hue: "teal" },
    { title: "1:1 with Ana", day: 2, at: h(15), dur: 60, kind: "event", hue: "purple" },
    { title: "Swim", day: 2, at: h(18), dur: 45, kind: "task" },
    { title: "Design review", day: 3, at: h(10), dur: 90, kind: "event", hue: "orange" },
    { title: "Ship the notes", day: 3, at: h(16), dur: 45, kind: "task" },
    { title: "Dinner, Ana’s parents", day: 3, at: h(18, 30), dur: 90, kind: "event", hue: "pink" },
    { title: "Quarter planning", day: 4, at: h(11), dur: 120, kind: "event", hue: "blue" },
    { title: "Pick up the keys", day: 4, at: h(17, 30), dur: 30, kind: "task" },
    { title: "Train to Porto", day: 5, at: h(8, 40), dur: 150, kind: "event", hue: "teal" },
    { title: "Climbing", day: 6, at: h(10), dur: 120, kind: "event", hue: "green" },
    { title: "Call Mum", day: 6, at: h(18), dur: 30, kind: "task" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [13, 14, 15, 16, 17, 18, 19];
const TODAY = 2;
const NOW = h(13, 40);

const FROM = 8;
const TO = 20;
const SPAN = (TO - FROM) * 60;
const GUTTER = 38;
const RIGHT = 12;

const pct = (min: number) => `${((min - FROM * 60) / SPAN) * 100}%`;
const span = (dur: number) => `${(dur / SPAN) * 100}%`;

/** An event wears its calendar's colour; a task wears the accent, lighter, with a circle to tick. */
function Block({ item, gridHeight }: { item: Item; gridHeight: number }) {
    const tint = item.kind === "task" ? "var(--color-accent)" : `var(--cal-${item.hue})`;
    const event = item.kind === "event";
    const cramped = (item.dur / SPAN) * gridHeight < 22;
    const style: CSSProperties = {
        position: "absolute",
        top: `calc(${pct(item.at)} + ${u(1)})`,
        height: `calc(${span(item.dur)} - ${u(3)})`,
        left: 0,
        right: 0,
        boxSizing: "border-box",
        padding: cramped ? `0 ${u(5)}` : `${u(4)} ${u(6)}`,
        borderRadius: u(8),
        overflow: "hidden",
        display: "flex",
        alignItems: cramped ? "center" : "flex-start",
        gap: u(4),
        background: item.done ? ink(8) : `color-mix(in srgb, ${tint} ${event ? 28 : 14}%, var(--color-bg))`,
        borderLeft: `${u(3)} solid ${item.done ? ink(28) : tint}`,
    };
    return (
        <div style={style}>
            {item.kind === "task" &&
                (item.done ? (
                    <span
                        style={{
                            width: u(9),
                            height: u(9),
                            marginTop: cramped ? 0 : u(2),
                            flex: "none",
                            borderRadius: "var(--radius-pill)",
                            background: "var(--color-accent)",
                        }}
                    />
                ) : (
                    <svg viewBox="0 0 24 24" style={{ width: u(10), height: u(10), marginTop: cramped ? 0 : u(2), flex: "none" }}>
                        <circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-accent)" strokeWidth="2.6" />
                    </svg>
                ))}
            <span
                style={{
                    minWidth: 0,
                    flex: 1,
                    fontSize: "var(--text-caption-2)",
                    lineHeight: 1.2,
                    letterSpacing: "-.01em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: event && !cramped ? "normal" : "nowrap",
                    color: item.done ? ink(42) : event ? tint : "var(--color-text)",
                    textDecoration: item.done ? "line-through" : "none",
                }}
            >
                {item.title}
            </span>
        </div>
    );
}

export function WeekCalendar({ width, height }: { width: number; height: number }) {
    // Header, weekday row and margins take about 112 design pixels; the hours get the rest.
    const gridHeight = height - 128;
    const hours = Array.from({ length: TO - FROM + 1 }, (_, i) => FROM + i);
    const chip: CSSProperties = { borderRadius: "var(--radius-control)", background: ink(8) };

    return (
        <Glass style={{ width: u(width), height: u(height), padding: u(8), boxSizing: "border-box", borderRadius: "var(--radius-sheet)", overflow: "hidden" }}>
            <div
                style={{
                    height: "100%",
                    background: "var(--color-bg)",
                    borderRadius: "var(--radius-cell)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div style={{ flex: "none", display: "flex", alignItems: "center", gap: u(10), padding: `${u(12)} ${u(10)} ${u(6)} ${u(12)}` }}>
                    <span style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "var(--text-caption-2)", color: ink(50) }}>Week of 13 Oct</span>
                        <span style={{ fontSize: "var(--text-title-3)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.1 }}>Today</span>
                    </span>
                    <span style={{ flex: 1 }} />
                    <span style={{ display: "flex", gap: u(2) }}>
                        {["M15 18l-6-6 6-6", "M9 18l6-6-6-6"].map((d) => (
                            <span key={d} style={{ ...chip, width: u(26), height: u(26), display: "grid", placeItems: "center", color: ink(62) }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: u(16), height: u(16) }}>
                                    <path d={d} />
                                </svg>
                            </span>
                        ))}
                    </span>
                    <span style={{ ...chip, display: "flex", gap: u(2), padding: u(2) }}>
                        {["Day", "Week", "Month"].map((v) => (
                            <span
                                key={v}
                                style={{
                                    height: u(22),
                                    padding: `0 ${u(10)}`,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: "var(--radius-chip)",
                                    background: v === "Week" ? "var(--seg-on)" : "transparent",
                                    boxShadow: v === "Week" ? "var(--shadow-seg)" : "none",
                                    fontSize: "var(--text-caption-1)",
                                    fontWeight: 650,
                                    color: v === "Week" ? "var(--color-text)" : ink(46),
                                }}
                            >
                                {v}
                            </span>
                        ))}
                    </span>
                </div>

                <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", margin: `${u(2)} ${u(4)} ${u(14)} ${u(8)}` }}>
                    <div style={{ display: "flex", gap: u(2), paddingLeft: u(GUTTER), paddingRight: u(RIGHT), paddingBottom: u(6), flex: "none" }}>
                        {WEEKDAYS.map((w, i) => (
                            <span key={w} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: u(2) }}>
                                <span style={{ fontSize: "var(--text-caption-2)", color: ink(42) }}>{w}</span>
                                <span
                                    style={{
                                        width: u(22),
                                        height: u(22),
                                        display: "grid",
                                        placeItems: "center",
                                        borderRadius: "50%",
                                        fontSize: "var(--text-caption-1)",
                                        fontWeight: 600,
                                        fontVariantNumeric: "tabular-nums",
                                        background: i === TODAY ? "var(--color-accent)" : "transparent",
                                        color: i === TODAY ? "var(--on-accent)" : "var(--color-text)",
                                    }}
                                >
                                    {DATES[i]}
                                </span>
                            </span>
                        ))}
                    </div>

                    <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
                        {hours.map((hour) => (
                            <div key={hour}>
                                <div style={{ position: "absolute", left: u(GUTTER), right: u(RIGHT), top: pct(hour * 60), height: u(0.5), background: "var(--color-divider)" }} />
                                <div
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        width: u(GUTTER - 8),
                                        textAlign: "right",
                                        top: `calc(${pct(hour * 60)} - ${u(7)})`,
                                        fontSize: "var(--text-caption-2)",
                                        lineHeight: 1.2,
                                        color: ink(38),
                                    }}
                                >
                                    {String(hour).padStart(2, "0")}:00
                                </div>
                            </div>
                        ))}
                        <div style={{ position: "absolute", inset: 0, left: u(GUTTER), right: u(RIGHT), display: "flex", gap: u(2) }}>
                            {WEEKDAYS.map((w, i) => (
                                <div
                                    key={w}
                                    style={{
                                        flex: 1,
                                        minWidth: 0,
                                        position: "relative",
                                        borderRadius: "var(--radius-chip)",
                                        background: i === TODAY ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "transparent",
                                    }}
                                >
                                    {WEEK.filter((item) => item.day === i).map((item) => (
                                        <Block key={item.title} item={item} gridHeight={gridHeight} />
                                    ))}
                                    {i === TODAY && (
                                        <>
                                            <div style={{ position: "absolute", left: 0, right: 0, top: pct(NOW), height: u(1.5), background: "var(--color-accent)", borderRadius: u(1) }} />
                                            <div
                                                className="horah-now"
                                                style={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: `calc(${pct(NOW)} - ${u(3.25)})`,
                                                    width: u(8),
                                                    height: u(8),
                                                    borderRadius: "50%",
                                                    background: "var(--color-accent)",
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Glass>
    );
}
