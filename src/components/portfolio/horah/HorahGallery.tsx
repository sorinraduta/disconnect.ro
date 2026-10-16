import type { ReactNode } from "react";
import type { Locale } from "~/config/routes";
import { CalendarsFigure, CaptureFigure, ProjectsFigure, SealedFigure } from "./figures";

const CAPTIONS = {
    ro: {
        capture: "Capture: titlul e citit pe loc. „Gym daily at 7” devine zi, oră și repetare.",
        sealed: "Aceeași zi, de două ori: ce vezi tu și ce primește serverul.",
        projects: "Proiecte: inelul arată cât e gata, dedesubt stă următorul lucru de făcut.",
        calendars: "Calendarele tale, Google și abonamentele, pe aceeași grilă.",
    },
    en: {
        capture: "Capture reads the title as you type. “Gym daily at 7” becomes a day, an hour and a repeat.",
        sealed: "The same day, twice: what you see, and what the server receives.",
        projects: "Projects: the ring shows how far along, with the next thing due underneath.",
        calendars: "Your calendars, Google's and your subscriptions, on one grid.",
    },
};

/** Where a figure stands: the app's page colour, lifted toward the accent at the top. */
function Stage({ caption, children }: { caption: string; children: ReactNode }) {
    return (
        <figure className="flex flex-col gap-3">
            <div
                aria-hidden="true"
                inert
                className="horah flex min-h-80 flex-1 items-center justify-center overflow-hidden rounded-2xl px-4 py-8 sm:px-8 md:py-12"
                style={{
                    background:
                        "radial-gradient(70% 60% at 50% 40%, color-mix(in srgb, var(--color-accent) 16%, transparent), transparent 72%)," +
                        " linear-gradient(180deg, color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)), var(--color-bg) 78%)",
                    border: "0.5px solid var(--hairline)",
                }}
            >
                {children}
            </div>
            <figcaption className="text-sm text-muted">{caption}</figcaption>
        </figure>
    );
}

/** Four of Horah's surfaces, drawn by the app's own rules rather than photographed. */
export function HorahGallery({ lang }: { lang: Locale }) {
    const caption = CAPTIONS[lang];
    return (
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2">
            <Stage caption={caption.capture}>
                <CaptureFigure />
            </Stage>
            <Stage caption={caption.projects}>
                <ProjectsFigure />
            </Stage>
            <Stage caption={caption.calendars}>
                <CalendarsFigure />
            </Stage>
            <Stage caption={caption.sealed}>
                <SealedFigure />
            </Stage>
        </div>
    );
}
