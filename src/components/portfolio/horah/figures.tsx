import type { CSSProperties } from "react";
import { u } from "../Scene";
import { CELL, Chevron, GLYPH, Glass, Glyph, Mark, Ring, Switch, ink } from "./parts";

/**
 * Horah's surfaces as specimens: the capture sheet, the projects page, the calendars list and the
 * sealed day. Built from the app's tokens, radii and material rather than screenshots, the same way
 * the Horah landing page draws them. The words inside stay in English, as the app is.
 */

/* ── the capture sheet ─────────────────────────────────────── */

/** One field of the capture sheet: a coloured tile, the field, its answer. */
function Field({ tile, d, label, value, first }: { tile: string; d: string; label: string; value: string; first?: boolean }) {
    return (
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: u(12), minHeight: u(44), padding: `0 ${u(14)}` }}>
            {!first && (
                <span style={{ position: "absolute", top: 0, left: u(54), right: 0, height: u(0.5), background: "var(--color-divider)" }} />
            )}
            <span
                style={{
                    width: u(28),
                    height: u(28),
                    flex: "none",
                    borderRadius: "var(--radius-chip)",
                    background: tile,
                    color: "var(--on-gray)",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Glyph d={d} size={16} width={2.1} />
            </span>
            <span style={{ flex: 1, fontSize: "var(--text-body)", letterSpacing: "-.014em" }}>{label}</span>
            <span style={{ fontSize: "var(--text-body)", color: "var(--label-2)", letterSpacing: "-.014em" }}>{value}</span>
            <Chevron />
        </div>
    );
}

/** The capture sheet, having read "Gym daily at 7": the day, the hour and the rule filled in from the words. */
export function CaptureFigure() {
    const round: CSSProperties = {
        width: u(34),
        height: u(34),
        borderRadius: "var(--radius-pill)",
        display: "grid",
        placeItems: "center",
    };
    return (
        <Glass
            style={{
                width: `min(${u(400)}, 100%)`,
                boxSizing: "border-box",
                padding: u(12),
                borderRadius: "var(--radius-sheet)",
                display: "flex",
                flexDirection: "column",
                gap: u(10),
            }}
        >
            <div style={{ display: "grid", gridTemplateColumns: `${u(34)} 1fr ${u(34)}`, alignItems: "center", gap: u(8) }}>
                <span style={{ ...round, background: "var(--fill)", color: "var(--label-2)" }}>
                    <Glyph d={GLYPH.close} size={13} width={2.6} />
                </span>
                <div style={{ justifySelf: "center", display: "flex", padding: u(2), background: "var(--fill)", borderRadius: "var(--radius-pill)" }}>
                    {["Task", "Event"].map((k, i) => (
                        <span
                            key={k}
                            style={{
                                width: u(58),
                                height: u(26),
                                display: "grid",
                                placeItems: "center",
                                borderRadius: "var(--radius-pill)",
                                fontSize: "var(--text-footnote)",
                                fontWeight: i === 0 ? 590 : 400,
                                background: i === 0 ? "var(--seg-on)" : "transparent",
                                color: i === 0 ? "var(--color-text)" : "var(--label-2)",
                                boxShadow: i === 0 ? "var(--shadow-seg)" : "none",
                            }}
                        >
                            {k}
                        </span>
                    ))}
                </div>
                <span style={{ ...round, background: "var(--color-accent)", color: "var(--on-accent)" }}>
                    <Glyph d={GLYPH.check} size={16} width={2.8} />
                </span>
            </div>

            <div style={CELL}>
                <div style={{ display: "flex", alignItems: "center", minHeight: u(46), padding: `0 ${u(8)} 0 ${u(16)}`, gap: u(10) }}>
                    <svg viewBox="0 0 24 24" style={{ width: u(14), height: u(14), flex: "none" }}>
                        <circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
                    </svg>
                    <span style={{ flex: 1, minWidth: 0, fontSize: "var(--text-body)", letterSpacing: "-.014em", whiteSpace: "nowrap", overflow: "hidden" }}>
                        Gym <Mark>daily</Mark> <Mark>at 7</Mark>
                        <span
                            style={{
                                display: "inline-block",
                                width: u(2),
                                height: u(19),
                                marginLeft: u(2),
                                verticalAlign: u(-4),
                                background: "var(--color-accent)",
                                borderRadius: u(1),
                            }}
                        />
                    </span>
                </div>
                <div style={{ height: u(0.5), marginLeft: u(16), background: "var(--color-divider)" }} />
                <div style={{ minHeight: u(44), padding: `${u(11)} ${u(16)}`, boxSizing: "border-box", fontSize: "var(--text-body)", color: "var(--label-3)" }}>
                    Notes
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: u(6), padding: `0 ${u(6)}`, fontSize: "var(--text-footnote)", color: "var(--label-2)" }}>
                <span style={{ color: "var(--color-accent)", display: "grid" }}>
                    <Glyph d={GLYPH.spark} size={14} />
                </span>
                <span style={{ flex: 1 }}>
                    From title · <span style={{ color: "var(--color-text)" }}>Daily, 07:00</span>
                </span>
                <span style={{ fontWeight: 590, color: "var(--color-accent)" }}>Undo</span>
            </div>

            <div style={CELL}>
                <Field first tile="var(--cal-red)" d={GLYPH.cal} label="Date" value="Today" />
                <Field tile="var(--cal-blue)" d={GLYPH.clock} label="Time" value="07:00 · 1h" />
                <Field tile="var(--cal-purple)" d={GLYPH.repeat} label="Repeat" value="Daily" />
                <Field tile="var(--cal-orange)" d={GLYPH.layers} label="Project" value="Health" />
            </div>
        </Glass>
    );
}

/* ── the projects page ─────────────────────────────────────── */

type Linked = { title: string; when: string; tone: "accent" | "late" | "done" };

function TaskRow({ task, kind }: { task: Linked; kind: "next" | "done" }) {
    const tone = task.tone === "late" ? "var(--red)" : task.tone === "accent" ? "var(--accent-ink)" : "var(--label-3)";
    return (
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: u(12), minHeight: u(40), padding: `0 ${u(12)} 0 ${u(14)}` }}>
            <span style={{ position: "absolute", top: 0, left: u(54), right: 0, height: u(0.5), background: "var(--color-divider)" }} />
            <span style={{ width: u(28), flex: "none", display: "grid", placeItems: "center", color: tone }}>
                <Glyph d={kind === "next" ? GLYPH.cal : GLYPH.done} size={16} />
            </span>
            <span
                style={{
                    flex: 1,
                    minWidth: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "var(--text-subhead)",
                    letterSpacing: "-.01em",
                    color: kind === "next" ? "var(--color-text)" : "var(--label-2)",
                }}
            >
                {task.title}
            </span>
            <span style={{ flex: "none", fontSize: "var(--text-footnote)", fontWeight: kind === "next" ? 590 : 400, color: tone }}>{task.when}</span>
            <Chevron />
        </div>
    );
}

/** One project card: the ring, the name, a quiet line, what is left, and its two tasks. */
export function ProjectCard({ name, pct, open, line, next, done, glass = false }: {
    name: string;
    pct: number;
    open: number;
    line?: string;
    next?: Linked;
    done?: Linked;
    glass?: boolean;
}) {
    const body = (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: u(12), minHeight: u(50), padding: `${u(8)} ${u(12)} ${u(8)} ${u(14)}`, boxSizing: "border-box" }}>
                <Ring pct={pct} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: u(1) }}>
                    <span style={{ fontSize: "var(--text-body)", fontWeight: 590, letterSpacing: "-.015em" }}>{name}</span>
                    {line && <span style={{ fontSize: "var(--text-footnote)", color: "var(--label-3)" }}>{line}</span>}
                </div>
                <span style={{ fontSize: "var(--text-body)", color: "var(--label-3)", fontVariantNumeric: "tabular-nums" }}>{open || ""}</span>
                <Chevron />
            </div>
            {next && <TaskRow task={next} kind="next" />}
            {done && <TaskRow task={done} kind="done" />}
        </>
    );
    return glass ? (
        <Glass style={{ borderRadius: "var(--radius-card)", overflow: "hidden" }}>
            <div>{body}</div>
        </Glass>
    ) : (
        <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-card)", overflow: "hidden" }}>{body}</div>
    );
}

/** The projects page: a card each, how far along, the next thing due and the last thing finished. */
export function ProjectsFigure() {
    return (
        <div style={{ width: `min(${u(420)}, 100%)`, display: "flex", flexDirection: "column", gap: u(10) }}>
            <ProjectCard
                name="Halden Co."
                pct={0.6}
                open={4}
                line="6h planned"
                next={{ title: "Send V2 wireframes", when: "Overdue", tone: "late" }}
                done={{ title: "Write the handover note", when: "yesterday", tone: "done" }}
            />
            <ProjectCard name="Launch" pct={0.25} open={6} line="3h planned" next={{ title: "Book the room", when: "Friday", tone: "accent" }} />
            <ProjectCard name="Writing" pct={1} open={0} line="All done" done={{ title: "Publish the essay", when: "3 days ago", tone: "done" }} />
        </div>
    );
}

/* ── the small pieces that float ───────────────────────────── */

/** The toast that answers "Add": one line, glass, a tick. */
export function ToastFigure({ children = "Task added to Friday" }: { children?: string }) {
    return (
        <Glass
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: u(8),
                height: u(40),
                padding: `0 ${u(16)} 0 ${u(12)}`,
                boxSizing: "border-box",
                borderRadius: "var(--radius-pill)",
                fontSize: "var(--text-subhead)",
                fontWeight: 560,
                whiteSpace: "nowrap",
            }}
        >
            <span
                style={{
                    width: u(20),
                    height: u(20),
                    borderRadius: "var(--radius-pill)",
                    background: "var(--color-accent)",
                    color: "var(--on-accent)",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <Glyph d={GLYPH.check} size={11} width={3.4} />
            </span>
            <span>{children}</span>
        </Glass>
    );
}

/** A capture sheet at a glance: the title as it is being written, read as it goes. */
export function MiniCaptureFigure() {
    return (
        <Glass
            style={{
                width: u(236),
                padding: u(10),
                borderRadius: "var(--radius-popover)",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: u(8),
            }}
        >
            <div style={{ ...CELL, padding: `${u(11)} ${u(12)}`, fontSize: "var(--text-subhead)", letterSpacing: "-.01em", lineHeight: 1.35 }}>
                Dentist <Mark>tomorrow</Mark> <Mark>at 9</Mark>
            </div>
            <div style={{ display: "flex", gap: u(6), padding: `0 ${u(2)}` }}>
                {["Tomorrow", "09:00"].map((c) => (
                    <span
                        key={c}
                        style={{
                            height: u(26),
                            padding: `0 ${u(10)}`,
                            display: "inline-flex",
                            alignItems: "center",
                            borderRadius: "var(--radius-chip)",
                            background: "var(--color-accent)",
                            color: "var(--on-accent)",
                            fontSize: "var(--text-footnote)",
                            fontWeight: 590,
                        }}
                    >
                        {c}
                    </span>
                ))}
            </div>
        </Glass>
    );
}

/* ── calendars ─────────────────────────────────────────────── */

const CALENDARS = [
    { name: "Personal", hue: "var(--cal-blue)", source: "Yours", on: true },
    { name: "Work", hue: "var(--cal-orange)", source: "Yours", on: true },
    { name: "studio@gmail.com", hue: "var(--cal-green)", source: "Google", on: true },
    { name: "Team fixtures", hue: "var(--cal-purple)", source: "Google", on: false },
    { name: "Holidays in Romania", hue: "var(--cal-teal)", source: "Subscribed", on: true },
];

/** Every calendar on one grid: yours, Google's both ways, and the feeds you subscribe to. */
export function CalendarsFigure() {
    return (
        <div
            style={{
                width: `min(${u(340)}, 100%)`,
                background: "var(--color-bg)",
                border: `${u(0.5)} solid var(--hairline)`,
                borderRadius: "var(--radius-card)",
                padding: u(18),
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <p
                style={{
                    margin: `0 0 ${u(6)}`,
                    fontSize: "var(--text-caption-1)",
                    fontWeight: 650,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: ink(46),
                }}
            >
                Calendars
            </p>
            {CALENDARS.map((row, i) => (
                <div
                    key={row.name}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: u(12),
                        minWidth: 0,
                        padding: `${u(11)} 0`,
                        borderTop: i ? `${u(0.5)} solid var(--color-divider)` : undefined,
                    }}
                >
                    <span style={{ flex: "none", width: u(10), height: u(10), borderRadius: "var(--radius-pill)", background: row.hue, opacity: row.on ? 1 : 0.4 }} />
                    <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: u(1) }}>
                        <span
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                fontSize: "var(--text-subhead)",
                                fontWeight: 560,
                                letterSpacing: "-.01em",
                                color: row.on ? "var(--color-text)" : ink(46),
                            }}
                        >
                            {row.name}
                        </span>
                        <span style={{ fontSize: "var(--text-caption-2)", color: ink(40) }}>{row.source}</span>
                    </span>
                    <span style={{ marginLeft: "auto", flex: "none" }}>
                        <Switch on={row.on} />
                    </span>
                </div>
            ))}
        </div>
    );
}

/* ── the sealed day ────────────────────────────────────────── */

const DAY = [
    { at: "08:15", title: "Write the proposal", dur: "1h", hue: "var(--color-accent)" },
    { at: "09:30", title: "Weekly standup", dur: "45m", hue: "var(--cal-blue)" },
    { at: "11:00", title: "Dentist", dur: "1h 15m", hue: "var(--cal-teal)" },
    { at: "15:00", title: "1:1 with Ana", dur: "1h", hue: "var(--cal-purple)" },
    { at: "18:00", title: "Swim", dur: "45m", hue: "var(--color-accent)" },
];

/** What a sealed day looks like to the server: base64 from a fixed seed, so every build draws the same bytes. */
const CIPHER = (() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let seed = 29;
    let out = "";
    for (let i = 0; i < 360; i++) {
        seed = (seed * 1103515245 + 12345) % 2147483648;
        // The high bits: an LCG's low bits repeat on a short cycle.
        out += alphabet[Math.floor(seed / 33554432)];
    }
    return out;
})();

/** The same day, twice: what you see, and what would leave the device for the server. */
export function SealedFigure() {
    const panel: CSSProperties = {
        flex: "1 1 0",
        minWidth: 0,
        background: "var(--color-bg)",
        border: `${u(0.5)} solid var(--hairline)`,
        borderRadius: "var(--radius-card)",
        padding: `${u(16)} ${u(18)} ${u(18)}`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: u(12),
    };
    const caption: CSSProperties = {
        margin: 0,
        fontSize: "var(--text-caption-1)",
        fontWeight: 650,
        letterSpacing: ".06em",
        textTransform: "uppercase",
        color: ink(46),
    };
    return (
        <div style={{ width: `min(${u(620)}, 100%)`, display: "flex", flexWrap: "wrap", gap: u(12) }}>
            <div style={{ ...panel, flexBasis: u(260) }}>
                <p style={caption}>What you see</p>
                {DAY.map((item) => (
                    <div key={item.at} style={{ display: "flex", alignItems: "center", gap: u(10), minWidth: 0 }}>
                        <span style={{ width: u(9), height: u(9), flex: "none", borderRadius: "var(--radius-pill)", background: item.hue }} />
                        <span style={{ flex: "none", fontSize: "var(--text-subhead)", fontWeight: 560, color: ink(54), fontVariantNumeric: "tabular-nums" }}>
                            {item.at}
                        </span>
                        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "var(--text-subhead)", fontWeight: 560 }}>
                            {item.title}
                        </span>
                        <span style={{ flex: "none", fontSize: "var(--text-caption-1)", color: ink(40) }}>{item.dur}</span>
                    </div>
                ))}
            </div>
            <div style={{ ...panel, flexBasis: u(260) }}>
                <p style={{ ...caption, display: "flex", alignItems: "center", gap: u(6) }}>
                    <Glyph d={GLYPH.lock} size={13} width={2.2} />
                    What the server sees
                </p>
                <p
                    style={{
                        margin: 0,
                        fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
                        fontSize: "var(--text-caption-2)",
                        lineHeight: 1.55,
                        color: ink(48),
                        overflowWrap: "anywhere",
                        maxHeight: u(118),
                        overflow: "hidden",
                    }}
                >
                    {CIPHER}
                </p>
                <p style={{ margin: 0, fontSize: "var(--text-caption-2)", color: ink(40) }}>AES-256-GCM, sealed on this device.</p>
            </div>
        </div>
    );
}
