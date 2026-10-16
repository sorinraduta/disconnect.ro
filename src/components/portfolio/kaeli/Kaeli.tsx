import type { CSSProperties } from "react";
import type { Locale } from "~/config/routes";
import { PhoneFrame } from "../frames";
import { Photo, Scene, u, type Img } from "../Scene";

/**
 * Kaeli's launch page, kaeli.ro, rebuilt as a component: the cream canvas, the sun behind the logo,
 * the motto, the headline and the address. The headline and the address are the brand's display
 * face outlined to SVG, so the font (licensed for the brand only) is never served from here.
 */

export type KaeliImages = {
    logo: Img;
    headline: string;
    email: string;
};

/** Measured from the outlined SVGs: width ÷ height. */
const HEADLINE_RATIO = { ro: "9795 / 2252", en: "10713 / 2252" };
const EMAIL_RATIO = "8506 / 1102";

const K = {
    cream: "#f7e9dc",
    card: "#fdf9f5",
    sand: "#f5c690",
    clay300: "#ecbb98",
    clay700: "#9f541e",
    ink900: "#2a1d14",
    ink700: "#4a3627",
    ink500: "#7a6553",
    ink200: "#e3d6c8",
};

const BODY = '"DM Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

const COPY = {
    ro: {
        eyebrow: "În curând",
        lede1: "Kaeli creează accesorii pentru femei active, pe reformer, saltea, teren de tenis sau în sală. Un singur kit, pentru fiecare antrenament.",
        lede2: "Facem ultimele retușuri la magazin. Colecția completă vine în curând.",
        contact: "Scrie-ne, sau întreabă-ne orice",
    },
    en: {
        eyebrow: "Opening soon",
        lede1: "Kaeli makes accessories for women in motion, on the reformer, the mat, the court, or the floor of the gym. One kit, every practice.",
        lede2: "We're putting the finishing touches on the shop. The full collection lands here soon.",
        contact: "Say hello, or ask us anything",
    },
};

/** The sun disc of the logo, as light falling on the page. */
const glow: CSSProperties = {
    position: "absolute",
    left: "50%",
    translate: "-50% 0",
    aspectRatio: "1",
    borderRadius: "50%",
    background: `radial-gradient(circle at center, color-mix(in srgb, ${K.sand} 55%, transparent) 0%, color-mix(in srgb, ${K.sand} 22%, transparent) 45%, transparent 70%)`,
    opacity: 0.6,
    pointerEvents: "none",
};

/** The launch page itself, at a desktop's proportions or a phone's. */
function Page({ lang, images, phone = false, priority = false }: { lang: Locale; images: KaeliImages; phone?: boolean; priority?: boolean }) {
    const copy = COPY[lang];
    const s = (desk: number, mobile: number) => u(phone ? mobile : desk);
    const rule: CSSProperties = { width: s(48, 26), height: u(1), background: K.clay300 };

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                background: K.cream,
                color: K.ink700,
                fontFamily: BODY,
                textAlign: "center",
            }}
        >
            <div style={{ ...glow, top: s(-260, -120), width: s(780, 420) }} />
            <span
                style={{
                    position: "absolute",
                    top: s(22, 46),
                    right: s(24, 14),
                    display: "flex",
                    gap: u(1),
                    padding: u(3),
                    borderRadius: 999,
                    background: K.card,
                    outline: `${u(1)} solid ${K.ink200}`,
                    fontSize: s(11, 9),
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                }}
            >
                {(["ro", "en"] as const).map((code) => (
                    <span
                        key={code}
                        style={{
                            padding: `${u(4)} ${s(10, 7)}`,
                            borderRadius: 999,
                            background: code === lang ? K.clay700 : "transparent",
                            color: code === lang ? K.card : K.ink500,
                        }}
                    >
                        {code.toUpperCase()}
                    </span>
                ))}
            </span>

            <div
                style={{
                    position: "absolute",
                    inset: phone ? `${u(84)} ${u(18)} 0` : `${u(34)} ${u(60)} 0`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ width: s(176, 128), aspectRatio: "747 / 675" }}>
                    <Photo img={images.logo} sizes="200px" priority={priority} style={{ objectFit: "contain" }} />
                </div>
                <p style={{ margin: `${s(14, 10)} 0 0`, fontStyle: "italic", fontWeight: 300, fontSize: s(19, 13), color: K.clay700 }}>
                    breath in. bloom out.
                </p>
                <p
                    style={{
                        margin: `${s(12, 9)} 0 0`,
                        display: "flex",
                        alignItems: "center",
                        gap: s(12, 8),
                        fontSize: s(11, 8.5),
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.22em",
                        color: K.clay700,
                    }}
                >
                    <span style={rule} />
                    {copy.eyebrow}
                    <span style={rule} />
                </p>
                <img
                    src={images.headline}
                    alt=""
                    style={{ width: s(lang === "ro" ? 560 : 610, lang === "ro" ? 206 : 216), aspectRatio: HEADLINE_RATIO[lang], marginTop: s(20, 16) }}
                />
                <p style={{ margin: `${s(20, 14)} 0 0`, maxWidth: s(470, 190), fontSize: s(17, 11), fontWeight: 300, lineHeight: 1.7 }}>
                    {copy.lede1}
                </p>
                <p style={{ margin: `${s(10, 8)} 0 0`, maxWidth: s(470, 190), fontSize: s(17, 11), fontWeight: 300, lineHeight: 1.7 }}>
                    {copy.lede2}
                </p>
                <div style={{ marginTop: s(26, 18), paddingTop: s(18, 14), borderTop: `${u(1)} solid ${K.ink200}`, width: s(300, 170) }}>
                    <p style={{ margin: 0, fontSize: s(13, 9.5), color: K.ink500 }}>{copy.contact}</p>
                    <img
                        src={images.email}
                        alt=""
                        style={{ width: s(232, 140), aspectRatio: EMAIL_RATIO, marginTop: s(10, 8), borderBottom: `${u(1)} solid ${K.clay300}`, paddingBottom: u(3) }}
                    />
                </div>
            </div>
        </div>
    );
}

/** kaeli.ro, edge to edge: the page is the cover. */
export function KaeliCover({ lang, images, priority = false, className }: {
    lang: Locale;
    images: KaeliImages;
    priority?: boolean;
    className?: string;
}) {
    return (
        <Scene width={1000} height={720} backdrop={<div style={{ position: "absolute", inset: 0, background: K.cream }} />} className={className}>
            <Page lang={lang} images={images} priority={priority} />
        </Scene>
    );
}

const RAMPS: { name: string; swatches: { step: string; hex: string; aa?: string }[] }[] = [
    {
        name: "Clay",
        swatches: [
            { step: "50", hex: "#fdf7f2" },
            { step: "100", hex: "#f9ebe1" },
            { step: "200", hex: "#f4d7c3" },
            { step: "300", hex: "#ecbb98" },
            { step: "400", hex: "#e49f6d" },
            { step: "500", hex: "#dc8342" },
            { step: "600", hex: "#bb6323", aa: "3.6" },
            { step: "700", hex: "#9f541e", aa: "4.7" },
            { step: "800", hex: "#814418", aa: "6.4" },
            { step: "900", hex: "#673713", aa: "8.3" },
            { step: "950", hex: "#45240d", aa: "11.7" },
        ],
    },
    {
        name: "Sand",
        swatches: [
            { step: "100", hex: "#fcf0df" },
            { step: "300", hex: "#f8d9ae" },
            { step: "500", hex: "#f5c690" },
            { step: "700", hex: "#eeb67b" },
        ],
    },
    {
        name: "Ink",
        swatches: [
            { step: "100", hex: "#f0e5d9" },
            { step: "200", hex: "#e3d6c8" },
            { step: "300", hex: "#c9b8a8" },
            { step: "400", hex: "#a08d7e" },
            { step: "500", hex: "#7a6553", aa: "4.6" },
            { step: "600", hex: "#5e4838", aa: "7.2" },
            { step: "700", hex: "#4a3627", aa: "9.6" },
            { step: "900", hex: "#2a1d14", aa: "13.7" },
        ],
    },
];

const GALLERY = {
    ro: {
        phone: "Pagina de lansare kaeli.ro, pe telefon",
        palette: "Paleta extrasă din logo. Cifrele arată contrastul pe fundalul crem.",
    },
    en: {
        phone: "The kaeli.ro launch page, on a phone",
        palette: "The palette sampled from the logo. Numbers are contrast ratios on the cream canvas.",
    },
};

/** The launch page on a phone, and the palette the brand's design system grew from. */
export function KaeliGallery({ lang, images }: { lang: Locale; images: KaeliImages }) {
    const caption = GALLERY[lang];
    return (
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            <figure className="flex flex-col gap-3">
                <Scene
                    width={420}
                    height={600}
                    className="aspect-[4/5] rounded-2xl"
                    backdrop={<div style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 50% at 50% 30%, ${K.sand}, ${K.cream} 75%)` }} />}
                >
                    <PhoneFrame width={260} height={540} style={{ position: "absolute", left: u(80), top: u(30) }}>
                        <Page lang={lang} images={images} phone />
                    </PhoneFrame>
                </Scene>
                <figcaption className="text-sm text-muted">{caption.phone}</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
                <div className="flex flex-1 flex-col justify-center gap-7 rounded-2xl p-6 md:p-10" style={{ background: K.cream, color: K.ink900 }}>
                    {RAMPS.map((ramp) => (
                        <div key={ramp.name} className="flex flex-col gap-2">
                            <span className="font-mono text-xs tracking-[0.14em] uppercase" style={{ color: K.ink500 }}>
                                {ramp.name}
                            </span>
                            <ul className="grid grid-cols-11 gap-1.5">
                                {ramp.swatches.map((swatch) => (
                                    <li key={swatch.hex} className="flex min-w-0 flex-col gap-1">
                                        <span
                                            className="aspect-square rounded-lg"
                                            style={{ background: swatch.hex, outline: swatch.hex === "#bb6323" ? `2px solid ${K.ink900}` : "1px solid rgba(42,29,20,.08)", outlineOffset: swatch.hex === "#bb6323" ? 2 : 0 }}
                                        />
                                        <span className="truncate text-[0.65rem] leading-tight" style={{ color: K.ink500 }}>
                                            {swatch.step}
                                        </span>
                                        {swatch.aa && <span className="font-mono text-[0.6rem] leading-tight whitespace-nowrap">{swatch.aa}</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <figcaption className="text-sm text-muted">{caption.palette}</figcaption>
            </figure>
        </div>
    );
}
