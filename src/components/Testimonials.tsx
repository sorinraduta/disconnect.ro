interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initial: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Am lansat magazinul online în 6 săptămâni. Echipa a fost mereu disponibilă și au livrat exact ce am cerut — fără compromisuri.",
    author: "Andrei P.",
    role: "Fondator",
    company: "StyleHouse",
    initial: "A",
  },
  {
    quote: "Site-ul nostru de prezentare a dus conversiile de la aproape zero la zeci de lead-uri pe lună. Design curat, viteză excelentă.",
    author: "Maria S.",
    role: "Director Marketing",
    company: "Consulta Group",
    initial: "M",
  },
  {
    quote: "Aplicația custom pe care au construit-o ne-a automatizat complet procesul de ofertare. Am recuperat investiția în mai puțin de 3 luni.",
    author: "Radu C.",
    role: "CEO",
    company: "LogiTech SRL",
    initial: "R",
  },
];

const Testimonials: React.FC = () => (
  <section id="testimonials" className="py-28" style={{ backgroundColor: "#f8f8f6" }}>
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-16">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
        >
          [ 05 / testimoniale ]
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-sans)", color: "#0f0f0f" }}
        >
          Ce spun clienții
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.author}
            className="bg-white flex flex-col gap-6 p-8 group transition-shadow duration-300 hover:shadow-lg"
            style={{ border: "1px solid #ebebeb" }}
          >
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#00ff41">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ fontFamily: "var(--font-sans)", color: "#374151" }}
            >
              "{t.quote}"
            </p>

            {/* Author */}
            <div
              className="flex items-center gap-3 pt-4"
              style={{ borderTop: "1px solid #f3f4f6" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{
                  backgroundColor: "#0f0f0f",
                  color: "#00ff41",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {t.initial}
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ fontFamily: "var(--font-sans)", color: "#0f0f0f" }}
                >
                  {t.author}
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: "var(--font-sans)", color: "#9ca3af" }}
                >
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
