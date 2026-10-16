import { Scene, u } from "../Scene";
import { MiniCaptureFigure, ProjectCard, ToastFigure } from "./figures";
import { ink } from "./parts";
import { WeekCalendar } from "./WeekCalendar";

/**
 * Horah's landing hero, as a cover: the headline over a soft field of the accent and two calendar
 * hues, the week view rising from the bottom edge, and three pieces of the app floating beside it.
 */
export function HorahCover({ className }: { className?: string }) {
    const backdrop = (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "radial-gradient(40% 46% at 30% 30%, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent 70%)," +
                    " radial-gradient(34% 40% at 74% 26%, color-mix(in srgb, var(--cal-purple) 22%, transparent), transparent 70%)," +
                    " radial-gradient(38% 36% at 56% 72%, color-mix(in srgb, var(--cal-teal) 16%, transparent), transparent 72%)," +
                    " var(--color-bg)",
            }}
        />
    );

    return (
        <Scene width={1200} height={800} align="bottom" backdrop={backdrop} className={["horah", className].filter(Boolean).join(" ")}>
            <p
                style={{
                    position: "absolute",
                    top: u(58),
                    left: 0,
                    right: 0,
                    margin: 0,
                    textAlign: "center",
                    fontSize: u(42),
                    fontWeight: 700,
                    letterSpacing: "-.04em",
                    lineHeight: 1.05,
                }}
            >
                Hours you don’t give away.
            </p>
            <p style={{ position: "absolute", top: u(118), left: 0, right: 0, margin: 0, textAlign: "center", fontSize: u(17), color: ink(62) }}>
                A calendar and the tasks that belong on it.
            </p>

            <div style={{ position: "absolute", left: u(160), top: u(184) }}>
                <WeekCalendar width={880} height={660} />
            </div>

            <div style={{ position: "absolute", left: u(36), top: u(250), rotate: "-5deg" }}>
                <MiniCaptureFigure />
            </div>
            <div style={{ position: "absolute", left: u(930), top: u(140), rotate: "4deg" }}>
                <ToastFigure />
            </div>
            <div style={{ position: "absolute", left: u(900), top: u(330), width: u(262), rotate: "3deg" }}>
                <ProjectCard glass name="Launch" pct={0.4} open={5} next={{ title: "Book the room", when: "Friday", tone: "accent" }} />
            </div>
        </Scene>
    );
}
