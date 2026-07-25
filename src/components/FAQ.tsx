import { useState } from "react";

interface FAQItem { question: string; answer: string; }

const faqs: FAQItem[] = [
  {
    question: "Cât durează un proiect tipic?",
    answer: "Depinde de complexitate. Un site de prezentare: 3–4 săptămâni. Un magazin online: 6–10 săptămâni. Software custom: estimăm detaliat după discovery, nu înainte.",
  },
  {
    question: "Lucrați cu clienți din afara României?",
    answer: "Da. Lucrăm remote cu clienți din UE și nu numai. Comunicăm fluent în română și engleză și suntem obișnuiți cu diferențele de fus orar.",
  },
  {
    question: "Ce tehnologii folosiți?",
    answer: "Stack-ul este ales în funcție de proiect, nu de preferințele noastre. Lucrăm cu React, Next.js, Node.js, Python, PostgreSQL și altele. Importantă e soluția potrivită pentru problema ta.",
  },
  {
    question: "Oferiți mentenanță după lansare?",
    answer: "Da. Toate pachetele includ o perioadă de suport. Pentru mentenanță pe termen lung avem contracte dedicate cu SLA clar.",
  },
  {
    question: "Pot vedea exemple de proiecte anterioare?",
    answer: "Absolut. Trimite-ne un mesaj și îți trimitem un portofoliu relevant pentru tipul de proiect care te interesează.",
  },
  {
    question: "Cum încep?",
    answer: "Simplu: completează formularul de mai jos sau scrie-ne pe email. Îți răspundem în maximum 24h cu o propunere de întâlnire sau call de 30 de minute.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-28" style={{ backgroundColor: "#f0f0ee" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Left — label + heading (sticky on desktop) */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-24 flex flex-col gap-4">
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
              >
                [ 06 / faq ]
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-sans)", color: "#0f0f0f" }}
              >
                Întrebări frecvente
              </h2>
              <p
                className="text-sm leading-relaxed mt-2"
                style={{ fontFamily: "var(--font-sans)", color: "#9ca3af" }}
              >
                Nu găsești răspunsul? Scrie-ne direct.
              </p>
              <a
                href="#contact"
                className="mt-2 text-sm underline underline-offset-4 hover:text-black transition-colors w-fit"
                style={{ fontFamily: "var(--font-sans)", color: "#9ca3af" }}
              >
                contact@disconnect.ro
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="md:col-span-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{ borderTop: i === 0 ? "1px solid #d8d8d6" : "none" }}
              >
                <div style={{ borderBottom: "1px solid #d8d8d6" }}>
                  <button
                    className="w-full flex items-center justify-between py-5 text-left gap-6 group"
                    onClick={() => toggle(i)}
                  >
                    <span
                      className="text-sm font-medium leading-relaxed"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: openIndex === i ? "#0f0f0f" : "#374151",
                      }}
                    >
                      {faq.question}
                    </span>
                    <span
                      className="shrink-0 w-6 h-6 flex items-center justify-center text-xs transition-transform duration-200"
                      style={{
                        fontFamily: "var(--font-mono)",
                        color: "#00ff41",
                        border: "1px solid rgba(0,255,65,0.3)",
                        transform: openIndex === i ? "rotate(45deg)" : "none",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {openIndex === i && (
                    <div className="pb-5 pr-10">
                      <p
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-sans)", color: "#6b7280" }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
