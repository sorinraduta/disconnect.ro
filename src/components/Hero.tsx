const Hero: React.FC = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center overflow-hidden"
    style={{ backgroundColor: "#080808" }}
  >
    {/* Background glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        top: "-300px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "900px",
        height: "900px",
        background: "radial-gradient(ellipse, rgba(0,255,65,0.055) 0%, transparent 65%)",
      }}
    />

    <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center py-28 lg:py-0 min-h-screen">

        {/* Left — copy */}
        <div className="flex flex-col gap-8">
          {/* Headline */}
          <h1
            className="text-[46px] sm:text-5xl lg:text-[58px] xl:text-[68px] font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: "var(--font-sans)", color: "#f0f0ee" }}
          >
            Produse digitale
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, rgba(0,255,65,0.85) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              care generează
            </span>
            <br />
            rezultate reale.
          </h1>

          {/* Sub */}
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "#777", maxWidth: "400px" }}
          >
            Site-uri, magazine online și software custom pentru afaceri care vor să crească. Livrăm fără surprize.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-lg transition-all duration-300"
              style={{
                fontFamily: "var(--font-sans)",
                backgroundColor: "#00ff41",
                color: "#080808",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#00e63a";
                el.style.boxShadow = "0 8px 32px rgba(0,255,65,0.35)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = "#00ff41";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              Solicită o ofertă gratuită
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm rounded-lg transition-all duration-200"
              style={{ fontFamily: "var(--font-sans)", color: "#666", border: "1px solid #222" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#e8e8e6";
                el.style.borderColor = "#444";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#666";
                el.style.borderColor = "#222";
              }}
            >
              Descoperă serviciile
            </a>
          </div>
        </div>

        {/* Right — floating cards */}
        <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: "460px" }}>

          {/* Main card — project overview */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-58%, -52%) rotate(-2deg)",
              width: "280px",
              backgroundColor: "#0e0e0e",
              border: "1px solid #1e1e1e",
              borderRadius: "14px",
              padding: "20px 22px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium" style={{ fontFamily: "var(--font-sans)", color: "#666" }}>
                Proiect curent
              </span>
              <span
                className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "rgba(0,255,65,0.1)", color: "#00ff41" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Live
              </span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Tip proiect", val: "Magazine online" },
                { label: "Termen", val: "6 săptămâni ✓" },
                { label: "Buget", val: "Respectat ✓" },
              ].map(({ label, val }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: "#555" }}>{label}</span>
                  <span className="text-xs font-medium" style={{ fontFamily: "var(--font-sans)", color: "#c8c8c6" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top right — etapele proiectului */}
          <div
            className="absolute"
            style={{
              top: "10%",
              right: "2%",
              width: "200px",
              backgroundColor: "#0c0c0c",
              border: "1px solid #1a1a1a",
              borderRadius: "12px",
              padding: "16px 18px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            <p className="text-xs font-medium mb-3" style={{ fontFamily: "var(--font-sans)", color: "#888" }}>
              Etapele proiectului
            </p>
            <div className="flex flex-col gap-2">
              {[
                { step: "Design aprobat", done: true },
                { step: "Conținut integrat", done: true },
                { step: "Site publicat", done: true },
              ].map(({ step, done }) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 font-bold"
                    style={{
                      backgroundColor: done ? "rgba(0,255,65,0.15)" : "rgba(255,255,255,0.05)",
                      color: done ? "#00ff41" : "#555",
                    }}
                  >
                    ✓
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-sans)", color: done ? "#c8c8c6" : "#555" }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom left — mini testimonial */}
          <div
            className="absolute"
            style={{
              bottom: "12%",
              left: "2%",
              width: "210px",
              backgroundColor: "#0e0e0e",
              border: "1px solid #1e1e1e",
              borderRadius: "12px",
              padding: "16px 18px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#00ff41">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ fontFamily: "var(--font-sans)", color: "#888" }}>
              "Au livrat exact ce am cerut, la timp și în buget."
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ backgroundColor: "#1a1a1a", color: "#00ff41", fontFamily: "var(--font-mono)" }}
              >
                M
              </div>
              <div>
                <p className="text-xs font-medium" style={{ fontFamily: "var(--font-sans)", color: "#c8c8c6" }}>Maria S.</p>
                <p className="text-[10px]" style={{ fontFamily: "var(--font-sans)", color: "#555" }}>Fondatoare, Atelier M</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default Hero;
