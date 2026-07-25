interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Înțelegem obiectivele, publicul țintă și constrângerile proiectului. Ieșim cu un brief clar.",
  },
  {
    number: "02",
    title: "Design & Arhitectură",
    description: "Wireframe, stack tehnic și estimare realistă. Aprobăm împreună înainte să scriem o linie de cod.",
  },
  {
    number: "03",
    title: "Dezvoltare Iterativă",
    description: "Sprint-uri de două săptămâni cu demo și feedback continuu. Ești în buclă pe tot parcursul.",
  },
  {
    number: "04",
    title: "Lansare & Suport",
    description: "Deploy, monitorizare, mentenanță și iterații post-lansare. Nu dispărem după ce livrăm.",
  },
];

const Process: React.FC = () => (
  <section
    id="process"
    className="py-28 scanlines"
    style={{ backgroundColor: "#080808" }}
  >
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-20">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
        >
          [ 02 / process ]
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", color: "#f0f0ee" }}
          >
            Cum lucrăm
          </h2>
          <p
            className="text-base max-w-xs text-right hidden md:block"
            style={{ fontFamily: "var(--font-sans)", color: "#444", lineHeight: 1.6 }}
          >
            Transparent de la prima discuție până la lansare.
          </p>
        </div>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative">
        {/* Connecting line — desktop only */}
        <div
          className="hidden md:block absolute"
          style={{
            top: "20px",
            left: "calc(12.5%)",
            right: "calc(12.5%)",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(0,255,65,0.15) 15%, rgba(0,255,65,0.15) 85%, transparent)",
          }}
        />

        {steps.map((step, i) => (
          <div
            key={step.number}
            className="relative flex flex-col md:items-center gap-5 md:text-center px-0 md:px-6"
          >
            {/* Mobile vertical connector */}
            {i < steps.length - 1 && (
              <div
                className="md:hidden absolute left-5 top-11"
                style={{
                  width: "1px",
                  height: "calc(100% + 32px)",
                  background: "linear-gradient(to bottom, rgba(0,255,65,0.2), transparent)",
                }}
              />
            )}

            {/* Number badge */}
            <div
              className="relative z-10 w-10 h-10 flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                fontFamily: "var(--font-mono)",
                color: "#00ff41",
                border: "1px solid rgba(0,255,65,0.35)",
                backgroundColor: "#080808",
                boxShadow: "0 0 16px rgba(0,255,65,0.08)",
              }}
            >
              {step.number}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 pl-6 md:pl-0">
              <h3
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-sans)", color: "#e8e8e6" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-sans)", color: "#555" }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
