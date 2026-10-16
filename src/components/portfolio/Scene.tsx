import type { CSSProperties, ReactNode } from "react";

/**
 * A length in design pixels: real pixels on its own, scaled to the frame inside a `Scene`.
 * Every measure in a project visual goes through this, so one drawing serves a small card and a
 * full-width hero without a line of JavaScript.
 */
export const u = (n: number) => `calc(var(--u, 1px) * ${n})`;

/** An image already resized by `astro:assets`, ready for an `<img>`. */
export type Img = { src: string; srcSet: string; width: number; height: number };

/** Responsive `<img>` for a project photo. Decorative unless given an `alt`. */
export function Photo({ img, sizes, alt = "", priority = false, style }: {
    img: Img;
    sizes: string;
    alt?: string;
    priority?: boolean;
    style?: CSSProperties;
}) {
    return (
        <img
            src={img.src}
            srcSet={img.srcSet}
            sizes={sizes}
            width={img.width}
            height={img.height}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", ...style }}
        />
    );
}

/**
 * **A drawing at a fixed design size, fitted to whatever frame holds it.** The frame sets its own
 * shape (an aspect-ratio class); the scene becomes a size container, and `--u` is one design pixel
 * at the scale that fits `width` × `height` inside it. `backdrop` fills the whole frame, edge to
 * edge, so a frame of another shape than the drawing shows more background rather than bars.
 */
export function Scene({ width, height, align = "center", backdrop, className, style, children }: {
    width: number;
    height: number;
    /** Where the drawing sits when the frame is taller than it: centred, or resting on the bottom edge. */
    align?: "center" | "bottom";
    backdrop?: ReactNode;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
}) {
    const frame = {
        position: "relative",
        overflow: "hidden",
        containerType: "size",
        "--u": `min(calc(100cqw / ${width}), calc(100cqh / ${height}))`,
        ...style,
    } as CSSProperties;

    return (
        // A picture made of markup: inert keeps its words out of the accessibility tree and out of
        // contrast audits, which judge a brand's own colours as if they were this page's text.
        <div aria-hidden="true" inert className={className} style={frame}>
            {backdrop}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: align === "center" ? "50%" : "auto",
                    bottom: align === "bottom" ? 0 : "auto",
                    width: u(width),
                    height: u(height),
                    translate: align === "center" ? "-50% -50%" : "-50% 0",
                }}
            >
                {children}
            </div>
        </div>
    );
}
