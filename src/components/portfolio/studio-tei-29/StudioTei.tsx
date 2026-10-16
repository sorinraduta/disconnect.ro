import type { CSSProperties } from "react";
import type { Locale } from "~/config/routes";
import { BrowserFrame, PhoneFrame } from "../frames";
import { Photo, Scene, u, type Img } from "../Scene";

/**
 * Studio Tei 29, from its own material: the studio's photographs, its logo and the hero of
 * studiotei29.ro as the site draws it. The headline is the site's Moneta Sans, outlined to an SVG
 * so the licensed font itself is never served from here.
 */

export type StudioTeiImages = {
    hero: Img;
    studio: Img;
    instructors: Img;
    details: Img;
    entrance: Img;
    logo: string;
    logoLight: string;
    title: string;
};

const BRAND = {
    whiteBeige: "#f6f5ec",
    peachCream: "#efe7da",
    chalkBeige: "#e1daca",
    neutral: "#c1b6a4",
    brandyRose: "#b29079",
    charcoal: "#303030",
};

const SANS = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

const COPY = {
    ro: {
        nav: ["Despre", "Ședințe", "Contact", "Blog"],
        eyebrow: "Studio de Pilates · București",
        subtitle: "Aparate BASI, grupuri mici și instructori certificați internațional, într-un spațiu gândit pentru calm și precizie.",
        book: "Rezervă în aplicație",
        sessions: "Vezi ședințele",
    },
    en: {
        nav: ["About", "Sessions", "Contact", "Blog"],
        eyebrow: "Pilates studio · Bucharest",
        subtitle: "BASI apparatus, small groups and internationally certified instructors, in a space designed for calm and precision.",
        book: "Book in the app",
        sessions: "View sessions",
    },
};

/** The site's hero: the studio behind a charcoal veil, the headline, the two calls to action. */
function Hero({ lang, images, phone = false, priority = false }: { lang: Locale; images: StudioTeiImages; phone?: boolean; priority?: boolean }) {
    const copy = COPY[lang];
    const label: CSSProperties = { fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.16em" };
    const button: CSSProperties = {
        ...label,
        height: u(phone ? 30 : 34),
        padding: `0 ${u(phone ? 14 : 18)}`,
        display: "grid",
        placeItems: "center",
        borderRadius: 999,
        fontSize: u(phone ? 8 : 9.5),
        fontWeight: 600,
        whiteSpace: "nowrap",
    };

    return (
        <div style={{ position: "absolute", inset: 0, color: BRAND.whiteBeige }}>
            {/* One `sizes` for the desktop and the phone, so both pick the same file and it downloads once. */}
            <Photo img={images.hero} sizes="(min-width: 768px) 50vw, 64vw" priority={priority} style={{ position: "absolute", inset: 0 }} />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(36,34,32,.55), rgba(36,34,32,.35) 50%, rgba(36,34,32,.6))",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: u(phone ? 40 : 18),
                    left: u(phone ? 16 : 28),
                    right: u(phone ? 16 : 28),
                    display: "flex",
                    alignItems: "center",
                    gap: u(24),
                }}
            >
                <img src={images.logoLight} alt="" style={{ height: u(phone ? 16 : 20), aspectRatio: "961.68 / 189.87" }} />
                <span style={{ flex: 1 }} />
                {phone ? (
                    <span style={{ display: "flex", flexDirection: "column", gap: u(4) }}>
                        {[0, 1].map((i) => (
                            <span key={i} style={{ width: u(18), height: u(1.5), background: BRAND.whiteBeige }} />
                        ))}
                    </span>
                ) : (
                    <>
                        {copy.nav.map((item) => (
                            <span key={item} style={{ ...label, fontSize: u(10), letterSpacing: "0.08em", fontWeight: 500 }}>
                                {item}
                            </span>
                        ))}
                        <span style={{ flex: 1 }} />
                        <span
                            style={{
                                display: "flex",
                                gap: u(6),
                                padding: u(4),
                                borderRadius: 999,
                                background: "rgba(48,48,48,.35)",
                                outline: `${u(1)} solid rgba(246,245,236,.18)`,
                            }}
                        >
                            <span style={{ width: u(13), height: u(13), borderRadius: "50%", background: "linear-gradient(90deg,#002b7f 33%,#fcd116 33% 66%,#ce1126 66%)" }} />
                            <span style={{ width: u(13), height: u(13), borderRadius: "50%", background: "rgba(246,245,236,.55)" }} />
                        </span>
                    </>
                )}
            </div>

            <div
                style={{
                    position: "absolute",
                    inset: phone ? `${u(150)} ${u(18)} auto` : `${u(150)} ${u(80)} auto`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <span style={{ ...label, fontSize: u(phone ? 7.5 : 9), letterSpacing: "0.3em", opacity: 0.75 }}>{copy.eyebrow}</span>
                <img src={images.title} alt="" style={{ width: u(phone ? 196 : 430), aspectRatio: "8346 / 1098", marginTop: u(phone ? 14 : 18) }} />
                <span
                    style={{
                        fontFamily: SANS,
                        fontSize: u(phone ? 10.5 : 13),
                        lineHeight: 1.6,
                        maxWidth: u(phone ? 190 : 430),
                        marginTop: u(phone ? 14 : 18),
                        opacity: 0.85,
                    }}
                >
                    {copy.subtitle}
                </span>
                <span style={{ display: "flex", flexDirection: phone ? "column" : "row", gap: u(phone ? 8 : 12), marginTop: u(phone ? 18 : 26) }}>
                    <span style={{ ...button, background: BRAND.brandyRose }}>{copy.book}</span>
                    <span style={{ ...button, outline: `${u(1)} solid rgba(246,245,236,.6)` }}>{copy.sessions}</span>
                </span>
            </div>
        </div>
    );
}

/** studiotei29.ro on a desktop and a phone, over the brand's warm ground and the circle of its logo. */
export function StudioTeiCover({ lang, images, priority = false, className }: {
    lang: Locale;
    images: StudioTeiImages;
    priority?: boolean;
    className?: string;
}) {
    const backdrop = (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${BRAND.whiteBeige} 10%, ${BRAND.peachCream} 60%, ${BRAND.chalkBeige})` }}>
            <div
                style={{
                    position: "absolute",
                    right: "-8%",
                    top: "50%",
                    width: "62%",
                    aspectRatio: "1",
                    translate: "0 -50%",
                    borderRadius: "50%",
                    border: `${u(2)} solid color-mix(in srgb, ${BRAND.brandyRose} 45%, transparent)`,
                }}
            />
        </div>
    );

    return (
        <Scene width={1200} height={800} backdrop={backdrop} className={className}>
            <BrowserFrame width={900} height={600} address="studiotei29.ro" style={{ position: "absolute", left: u(70), top: u(90) }}>
                <Hero lang={lang} images={images} priority={priority} />
            </BrowserFrame>
            <PhoneFrame width={236} height={480} style={{ position: "absolute", left: u(904), top: u(236) }}>
                <Hero lang={lang} images={images} phone />
            </PhoneFrame>
        </Scene>
    );
}

const PALETTE = [
    { name: "White Beige", hex: BRAND.whiteBeige },
    { name: "Peach Cream", hex: BRAND.peachCream },
    { name: "Chalk Beige", hex: BRAND.chalkBeige },
    { name: "Neutral", hex: BRAND.neutral },
    { name: "Brandy Rose", hex: BRAND.brandyRose },
    { name: "Charcoal", hex: BRAND.charcoal },
];

const ALT = {
    ro: {
        studio: "Sala Studio Tei 29, cu aparatele BASI și lumină naturală",
        instructors: "Două instructoare Studio Tei 29 pe un reformer",
        details: "Vestiarul studioului, cu oglinzi ovale luminate",
        entrance: "Intrarea în Studio Tei 29, cu logo-ul pe fațadă",
        palette: "Paleta brandului, implementată ca design tokens",
    },
    en: {
        studio: "The Studio Tei 29 room, with BASI apparatus and natural light",
        instructors: "Two Studio Tei 29 instructors on a reformer",
        details: "The studio's changing room, with lit oval mirrors",
        entrance: "The Studio Tei 29 entrance, with the logo on the facade",
        palette: "The brand palette, built in as design tokens",
    },
};

/** The studio's photographs as the site uses them, and the palette the site is built on. */
export function StudioTeiGallery({ lang, images }: { lang: Locale; images: StudioTeiImages }) {
    const alt = ALT[lang];
    const tile = "overflow-hidden rounded-2xl bg-bg-soft";
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* The wide photos fill whatever height the portrait beside them gives the row. */}
            <figure className={`${tile} relative aspect-[3/2] md:col-span-2 md:aspect-auto`}>
                <Photo img={images.studio} alt={alt.studio} sizes="(min-width: 1280px) 800px, (min-width: 768px) 66vw, calc(100vw - 40px)" style={{ position: "absolute", inset: 0 }} />
            </figure>
            <figure className={`${tile} aspect-[3/4]`}>
                <Photo img={images.instructors} alt={alt.instructors} sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, calc(100vw - 40px)" />
            </figure>
            <figure className={`${tile} aspect-[3/4]`}>
                <Photo img={images.details} alt={alt.details} sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, calc(100vw - 40px)" />
            </figure>
            <figure className={`${tile} relative aspect-[3/2] md:col-span-2 md:aspect-auto`}>
                <Photo img={images.entrance} alt={alt.entrance} sizes="(min-width: 1280px) 800px, (min-width: 768px) 66vw, calc(100vw - 40px)" style={{ position: "absolute", inset: 0 }} />
            </figure>
            <figure
                className="flex flex-col gap-8 rounded-2xl p-6 md:col-span-3 md:flex-row md:items-center md:p-10"
                style={{ background: BRAND.whiteBeige, color: BRAND.charcoal }}
            >
                <img src={images.logo} alt="Studio Tei 29" width={961} height={190} loading="lazy" className="h-9 w-auto self-start md:h-11 md:self-center" />
                <ul className="grid flex-1 grid-cols-3 gap-3 sm:grid-cols-6">
                    {PALETTE.map((swatch) => (
                        <li key={swatch.hex} className="flex flex-col gap-2">
                            <span className="aspect-square rounded-xl" style={{ background: swatch.hex, outline: "1px solid rgba(48,48,48,.12)" }} />
                            <span className="text-xs leading-tight font-medium">{swatch.name}</span>
                            <span className="font-mono text-[0.7rem] uppercase opacity-70">{swatch.hex}</span>
                        </li>
                    ))}
                </ul>
                <figcaption className="sr-only">{alt.palette}</figcaption>
            </figure>
        </div>
    );
}
