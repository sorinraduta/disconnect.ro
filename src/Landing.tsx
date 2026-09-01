import { useEffect, useState } from "react";
import MatrixRain from "./MatrixRain";

const EMAIL = "contact@disconnect.ro";

const useTyped = (text: string, speed = 45, startDelay = 400) => {
    const [out, setOut] = useState("");

    useEffect(() => {
        let i = 0;
        let interval: number;
        const timeout = window.setTimeout(() => {
            interval = window.setInterval(() => {
                i += 1;
                setOut(text.slice(0, i));
                if (i >= text.length) window.clearInterval(interval);
            }, speed);
        }, startDelay);

        return () => {
            window.clearTimeout(timeout);
            window.clearInterval(interval);
        };
    }, [text, speed, startDelay]);

    return out;
};

const Landing = () => {
    const tagline = useTyped("We build, launch and grow digital products.");
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className="relative min-h-dvh bg-[#030705] font-mono text-green-400 selection:bg-green-400 selection:text-black">
            <MatrixRain />
            <div className="scanlines pointer-events-none fixed inset-0 z-20" />
            <div className="pointer-events-none fixed inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

            <div className="relative z-30 mx-auto flex min-h-dvh max-w-3xl flex-col px-5 sm:px-8">
                {/* Top bar */}
                <header className="flex items-center justify-between py-4 text-[11px] uppercase tracking-[0.25em] sm:text-xs">
                    <span className="glow">disconnect.ro</span>
                    <span className="flex items-center gap-2 text-green-500/70">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_#00ff41]" />
                        online
                    </span>
                </header>

                {/* Center */}
                <main className="flex flex-1 flex-col items-center justify-center py-16 text-center">
                    <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-green-500/70 sm:text-xs">
                        [ digital studio · remote / worldwide ]
                    </p>

                    <h1
                        className="glitch text-5xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl"
                        data-text="DISCONNECT"
                    >
                        DISCONNECT
                    </h1>

                    <p className="mt-6 min-h-[1.75rem] text-sm leading-relaxed text-green-300 sm:text-base">
                        {tagline}
                        <span className="caret ml-0.5">_</span>
                    </p>

                    <a
                        href={`mailto:${EMAIL}?subject=Project%20inquiry`}
                        className="glow mt-12 text-lg underline decoration-green-400/40 underline-offset-8 transition-colors hover:text-green-200 sm:text-2xl"
                    >
                        {EMAIL}
                    </a>

                    <button
                        type="button"
                        onClick={copyEmail}
                        className="mt-5 border border-green-400/25 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-green-500/80 transition-colors hover:border-green-400/60 hover:text-green-200 sm:text-xs"
                    >
                        {copied ? "copied to clipboard" : "copy email"}
                    </button>
                </main>

                {/* Footer */}
                <footer className="py-5 text-center text-[10px] uppercase tracking-[0.2em] text-green-500/50 sm:text-[11px]">
                    © {new Date().getFullYear()} disconnect.ro
                </footer>
            </div>
        </div>
    );
};

export default Landing;
