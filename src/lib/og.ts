import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import satori from "satori";
import sharp from "sharp";

/** Build-time Open Graph image renderer (1200×630 PNG). */

const require = createRequire(import.meta.url);

const fontFile = (subset: string, weight: number) =>
    require.resolve(`@fontsource/bricolage-grotesque/files/bricolage-grotesque-${subset}-${weight}-normal.woff`);

let fonts: Promise<Parameters<typeof satori>[1]["fonts"]> | undefined;

const loadFonts = () =>
    (fonts ??= Promise.all(
        [500, 700].flatMap((weight) =>
            ["latin", "latin-ext"].map(async (subset) => ({
                // Satori only falls back across differently named families, so each subset gets its own name.
                name: subset === "latin" ? "Bricolage" : "Bricolage Ext",
                data: await readFile(fontFile(subset, weight)),
                weight: weight as 500 | 700,
                style: "normal" as const,
            })),
        ),
    ));

const INK = "#0b0c0b";
const LIME = "#c6f432";
const PAPER = "#f2f2ec";

type Node = { type: string; props: Record<string, unknown> & { style?: Record<string, unknown> } };

const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
    type,
    props: { style, children },
});

const mark = (size: number) =>
    h("div", { display: "flex", position: "relative", width: size, height: size, borderRadius: size / 4, background: "#0e0f0d" }, [
        h("div", {
            position: "absolute",
            left: (size * 12) / 64,
            top: (size * 16) / 64,
            width: (size * 18) / 64,
            height: (size * 36) / 64,
            background: LIME,
            borderRadius: `${(size * 18) / 64}px 0 0 ${(size * 18) / 64}px`,
        }),
        h("div", {
            position: "absolute",
            left: (size * 34) / 64,
            top: (size * 12) / 64,
            width: (size * 18) / 64,
            height: (size * 36) / 64,
            background: PAPER,
            borderRadius: `0 ${(size * 18) / 64}px ${(size * 18) / 64}px 0`,
        }),
    ]);

export type OgInput = {
    title: string;
    eyebrow: string;
    footer?: string;
};

export const renderOgImage = async ({ title, eyebrow, footer = "disconnect.ro" }: OgInput) => {
    const titleSize = title.length > 60 ? 64 : title.length > 36 ? 76 : 92;

    const tree = h(
        "div",
        {
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
            background: INK,
            color: PAPER,
            fontFamily: "Bricolage, Bricolage Ext",
            overflow: "hidden",
        },
        [
            // Brand motif: the two separated halves, cropped on the right.
            h("div", {
                position: "absolute",
                right: 90,
                top: 160,
                width: 230,
                height: 460,
                background: LIME,
                borderRadius: "230px 0 0 230px",
            }),
            h("div", {
                position: "absolute",
                right: -160,
                top: 110,
                width: 230,
                height: 460,
                background: PAPER,
                borderRadius: "0 230px 230px 0",
            }),
            h(
                "div",
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    padding: "64px 72px",
                },
                [
                    h("div", { display: "flex", alignItems: "center", gap: 18 }, [
                        mark(56),
                        h("div", { display: "flex", fontSize: 38, fontWeight: 700, letterSpacing: -1 }, [
                            h("span", {}, "disconnect"),
                            h("span", { color: LIME }, "."),
                        ]),
                    ]),
                    h("div", { display: "flex", flexDirection: "column", gap: 22, maxWidth: 780 }, [
                        h(
                            "div",
                            {
                                display: "flex",
                                alignSelf: "flex-start",
                                padding: "8px 18px",
                                borderRadius: 999,
                                border: `2px solid ${LIME}`,
                                color: LIME,
                                fontSize: 24,
                                fontWeight: 500,
                            },
                            eyebrow,
                        ),
                        h(
                            "div",
                            {
                                fontSize: titleSize,
                                fontWeight: 700,
                                lineHeight: 1.02,
                                letterSpacing: -2.5,
                            },
                            title,
                        ),
                    ]),
                    h("div", { display: "flex", fontSize: 26, fontWeight: 500, color: "#a2a69c" }, footer),
                ],
            ),
        ],
    );

    const svg = await satori(tree as Parameters<typeof satori>[0], {
        width: 1200,
        height: 630,
        fonts: await loadFonts(),
    });

    return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
};
