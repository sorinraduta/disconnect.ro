import { useEffect, useRef } from "react";

const GLYPHS =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>/\\{}[]$#*+=";

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const fontSize = 16;
        let columns = 0;
        let drops: number[] = [];

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const nextColumns = Math.ceil(window.innerWidth / fontSize);
            drops = Array.from(
                { length: nextColumns },
                (_, i) =>
                    drops[i] ??
                    -Math.floor(Math.random() * (window.innerHeight / fontSize))
            );
            columns = nextColumns;
        };

        resize();
        window.addEventListener("resize", resize);

        let frame = 0;
        let raf = 0;

        const draw = () => {
            frame += 1;
            // Slow the rain down: repaint glyphs every 3rd frame.
            if (frame % 3 === 0) {
                ctx.fillStyle = "rgba(3, 7, 5, 0.08)";
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
                ctx.font = `${fontSize}px "JetBrains Mono", ui-monospace, monospace`;

                for (let i = 0; i < columns; i++) {
                    const char =
                        GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                    const x = i * fontSize;
                    const y = drops[i] * fontSize;

                    ctx.fillStyle =
                        Math.random() > 0.985
                            ? "rgba(190, 255, 214, 0.9)"
                            : "rgba(0, 255, 65, 0.35)";
                    ctx.fillText(char, x, y);

                    if (y > window.innerHeight && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i] += 1;
                }
            }
            raf = requestAnimationFrame(draw);
        };

        if (reduceMotion) {
            ctx.fillStyle = "rgba(3, 7, 5, 1)";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        } else {
            raf = requestAnimationFrame(draw);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 opacity-40"
        />
    );
};

export default MatrixRain;
