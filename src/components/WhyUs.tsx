interface Promise {
  id: string;
  title: string;
  description: string;
}

const promises: Promise[] = [
  {
    id: "01",
    title: "Termen fix, garantat",
    description: "Înainte să semnăm, știi exact când primești produsul. Dacă întârziem, compensăm — nu inventăm scuze.",
  },
  {
    id: "02",
    title: "Prețul convenit = prețul final",
    description: "Fără costuri ascunse sau extra-uri de nicăieri. Ce agreăm la început, aia plătești. Punct.",
  },
  {
    id: "03",
    title: "Codul îți aparține 100%",
    description: "Nu ești legat de noi pe vecie. Primești acces complet la tot ce construim — poți continua cu orice altă echipă.",
  },
  {
    id: "04",
    title: "Răspuns în maxim 24h",
    description: "Orice întrebare, orice feedback — nu te lăsăm să aștepți 3–5 zile lucrătoare. Răspundem azi.",
  },
];

const WhyUs: React.FC = () => (
  <section
    id="why-us"
    className="py-28 scanlines"
    style={{ backgroundColor: "#080808" }}
  >
    <div className="max-w-6xl mx-auto px-6 relative z-10">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-16">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
        >
          [ 04 / de_ce_noi ]
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", color: "#f0f0ee" }}
          >
            De ce Disconnect
          </h2>
          <p
            className="text-sm max-w-xs md:text-right"
            style={{ fontFamily: "var(--font-mono)", color: "#444", lineHeight: 1.6 }}
          >
            // nu promisiuni vagi.<br />
            // angajamente concrete.
          </p>
        </div>
      </div>

      {/* Promise grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0" style={{ border: "1px solid #1a1a1a" }}>
        {promises.map((p, i) => (
          <div
            key={p.id}
            className="flex flex-col gap-5 p-8 group transition-colors duration-300 hover:bg-white/[0.02]"
            style={{
              borderRight: i % 2 === 0 ? "1px solid #1a1a1a" : "none",
              borderBottom: i < 2 ? "1px solid #1a1a1a" : "none",
            }}
          >
            {/* Number */}
            <span
              className="text-xs tracking-[0.2em]"
              style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
            >
              [ {p.id} ]
            </span>

            {/* Title */}
            <h3
              className="text-xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-sans)", color: "#e8e8e6" }}
            >
              {p.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-sans)", color: "#555" }}
            >
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
