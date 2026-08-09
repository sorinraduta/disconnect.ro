import { useEffect, useState } from "react";
import MatrixRain from "./MatrixRain";

const EMAIL = "sorin@disconnect.ro";

const SERVICES = [
    {
        id: "01",
        code: "./web-development",
        title: "WEB DEVELOPMENT",
        body: "Fast, accessible websites built to sell — from a one-page presentation site to a full online shop with payments and stock.",
        stack: [
            "Online shops",
            "Presentation websites",
            "Landing pages",
            "Web apps",
            "Maintenance",
        ],
    },
    {
        id: "02",
        code: "./marketing",
        title: "MARKETING",
        body: "Getting the right people in front of your site and turning them into customers — measured, not guessed.",
        stack: [
            "SEO",
            "Google Ads",
            "Social media",
            "Content",
            "Email campaigns",
        ],
    },
    {
        id: "03",
        code: "./design",
        title: "DESIGN",
        body: "The look and feel of your business, online and off — clear, consistent and built to be used.",
        stack: [
            "Logo & branding",
            "UI/UX design",
            "Web design",
            "Print & packaging",
        ],
    },
];

const BOOT_LINES = [
    "> mounting /dev/disconnect ............ OK",
    "> loading services [web · marketing · design] ... OK",
    "> uplink established ................. READY",
];

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
    const tagline = useTyped(
        "We build, launch and grow digital products for companies that are done waiting."
    );
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

            <div className="relative z-30 mx-auto flex min-h-dvh max-w-5xl flex-col px-5 sm:px-8">
                {/* Top bar */}
                <header className="flex items-center justify-between border-b border-green-400/20 py-4 text-[11px] uppercase tracking-[0.25em] sm:text-xs">
                    <span className="glow">disconnect.ro</span>
                    <span className="flex items-center gap-2 text-green-500/70">
                        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_#00ff41]" />
                        online
                    </span>
                </header>

                {/* Hero */}
                <section className="flex flex-1 flex-col justify-center py-14 sm:py-20">
                    <p className="mb-4 text-xs text-green-500/70 sm:text-sm">
                        [ digital studio · remote / worldwide ]
                    </p>

                    <h1
                        className="glitch text-5xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl"
                        data-text="DISCONNECT"
                    >
                        DISCONNECT
                    </h1>

                    <p className="mt-6 min-h-[3.5rem] max-w-xl text-sm leading-relaxed text-green-300 sm:text-base">
                        {tagline}
                        <span className="caret ml-0.5">_</span>
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a
                            href={`mailto:${EMAIL}?subject=Project%20inquiry`}
                            className="group border border-green-400/60 bg-green-400/5 px-5 py-3 text-xs uppercase tracking-[0.2em] transition-all hover:bg-green-400 hover:text-black hover:shadow-[0_0_20px_rgba(0,255,65,0.45)] sm:text-sm"
                        >
                            <span className="opacity-60 group-hover:opacity-100">
                                {">"}
                            </span>{" "}
                            start a project
                        </a>
                        <button
                            type="button"
                            onClick={copyEmail}
                            className="border border-green-400/20 px-5 py-3 text-xs tracking-wider text-green-300 transition-colors hover:border-green-400/60 hover:text-green-200 sm:text-sm"
                        >
                            {copied ? "copied to clipboard" : EMAIL}
                        </button>
                    </div>
                </section>

                {/* Services */}
                <section className="border-t border-green-400/20 py-12">
                    <h2 className="mb-8 text-xs uppercase tracking-[0.3em] text-green-500/70">
                        ls ./services
                    </h2>

                    <div className="grid gap-px overflow-hidden border border-green-400/20 bg-green-400/20 sm:grid-cols-3">
                        {SERVICES.map((service) => (
                            <article
                                key={service.id}
                                className="group relative bg-[#030705] p-6 transition-colors hover:bg-green-400/5"
                            >
                                <div className="mb-4 flex items-baseline justify-between text-[11px] text-green-500/60">
                                    <span>{service.code}</span>
                                    <span>{service.id}</span>
                                </div>
                                <h3 className="mb-3 text-base font-bold tracking-wide text-green-300 transition-[text-shadow] group-hover:[text-shadow:0_0_12px_rgba(0,255,65,0.7)] sm:text-lg">
                                    {service.title}
                                </h3>
                                <p className="mb-5 text-xs leading-relaxed text-green-400/70 sm:text-sm">
                                    {service.body}
                                </p>
                                <ul className="flex flex-wrap gap-1.5">
                                    {service.stack.map((item) => (
                                        <li
                                            key={item}
                                            className="border border-green-400/25 px-2 py-0.5 text-[10px] uppercase tracking-wider text-green-500/80"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Boot log + contact */}
                <section className="grid gap-8 border-t border-green-400/20 py-12 md:grid-cols-2">
                    <div className="border border-green-400/20 bg-black/40 p-5 text-[11px] leading-6 text-green-500/80 sm:text-xs">
                        {BOOT_LINES.map((line) => (
                            <div key={line}>{line}</div>
                        ))}
                        <div>
                            {">"} <span className="caret">_</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="mb-3 text-lg font-bold tracking-wide text-green-300 sm:text-xl">
                            Got a project? Open a channel.
                        </h2>
                        <p className="mb-5 max-w-sm text-xs leading-relaxed text-green-400/70 sm:text-sm">
                            Tell us what you're building and what's in the way.
                            We reply within one working day.
                        </p>
                        <a
                            href={`mailto:${EMAIL}?subject=Project%20inquiry`}
                            className="glow w-fit text-base underline decoration-green-400/40 underline-offset-8 transition-colors hover:text-green-200 sm:text-lg"
                        >
                            {EMAIL}
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="flex flex-col gap-2 border-t border-green-400/20 py-5 text-[10px] uppercase tracking-[0.2em] text-green-500/50 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
                    <span>© {new Date().getFullYear()} disconnect.ro</span>
                    <span>web development · marketing · design</span>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
