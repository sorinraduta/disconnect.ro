interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ShopIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const services: Service[] = [
  {
    id: "01",
    title: "Software Custom",
    description: "Aplicații web și mobile construite exact pentru procesele tale. De la MVP la sistem enterprise, fără cod de umplutură.",
    features: ["Arhitectură scalabilă", "API-uri & integrări", "Dashboard & admin panel", "Mentenanță continuă"],
    icon: <CodeIcon />,
  },
  {
    id: "02",
    title: "Website de Prezentare",
    description: "Site-uri rapide, optimizate pentru motoarele de căutare, care transformă vizitatorii în clienți.",
    features: ["Design responsive", "SEO tehnic & on-page", "Performanță Core Web Vitals", "Formular de contact & analytics"],
    icon: <GlobeIcon />,
  },
  {
    id: "03",
    title: "Magazin Online",
    description: "Platforme eCommerce robuste cu gestionare stoc, plăți online și integrare curierat — gata să vândă din prima zi.",
    features: ["Plăți online (card, PayPal)", "Gestionare produse & stoc", "Integrare curierat", "Rapoarte vânzări"],
    icon: <ShopIcon />,
  },
];

const Services: React.FC = () => (
  <section id="services" className="py-28" style={{ backgroundColor: "#f8f8f6" }}>
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-16">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
        >
          [ 01 / servicii ]
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", color: "#0f0f0f" }}
          >
            Ce construim
          </h2>
          <p
            className="text-base max-w-xs"
            style={{ fontFamily: "var(--font-sans)", color: "#9ca3af", lineHeight: 1.6 }}
          >
            Trei specializări, un singur standard de calitate.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="service-card group bg-white flex flex-col gap-6 p-8"
            style={{ border: "1px solid #ebebeb" }}
          >
            {/* Top row: number + icon */}
            <div className="flex items-start justify-between">
              <span
                className="text-xs tracking-[0.15em]"
                style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
              >
                {service.id}
              </span>
              <span
                className="p-2 rounded transition-colors duration-300 group-hover:text-[#00ff41]"
                style={{ color: "#c0c0c0", backgroundColor: "#f8f8f8" }}
              >
                {service.icon}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--font-sans)", color: "#0f0f0f" }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-sans)", color: "#6b7280" }}
              >
                {service.description}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ backgroundColor: "#f0f0f0" }} />

            {/* Features */}
            <ul className="flex flex-col gap-2.5 flex-1">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 text-sm"
                  style={{ fontFamily: "var(--font-sans)", color: "#374151" }}
                >
                  <span
                    className="text-xs shrink-0"
                    style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Arrow link */}
            <div
              className="flex items-center gap-1 text-xs uppercase tracking-widest transition-colors duration-200 group-hover:text-black mt-1"
              style={{ fontFamily: "var(--font-mono)", color: "#bbb" }}
            >
              Află mai mult
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
