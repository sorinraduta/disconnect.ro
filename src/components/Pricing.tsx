interface PricingTier {
  id: string;
  label: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

const tiers: PricingTier[] = [
  {
    id: "starter",
    label: "Starter",
    price: "De la 800€",
    tagline: "Startup-uri și afaceri la început de drum.",
    features: [
      "Website de prezentare (până la 5 pagini)",
      "Design responsive — mobile + desktop",
      "SEO de bază (meta, sitemap, viteză)",
      "Formular de contact",
      "1 lună suport post-lansare",
    ],
    cta: "Solicită ofertă",
    highlighted: false,
  },
  {
    id: "business",
    label: "Business",
    price: "De la 2.500€",
    tagline: "IMM-uri care vor să crească online.",
    features: [
      "Tot ce include Starter",
      "Magazin online sau funcționalități avansate",
      "Integrări (plăți, CRM, API-uri externe)",
      "Panou de administrare dedicat",
      "3 luni suport post-lansare",
      "Raport lunar de performanță",
    ],
    cta: "Solicită ofertă",
    highlighted: true,
    badge: "Recomandat",
  },
  {
    id: "enterprise",
    label: "Enterprise",
    price: "Discutăm",
    tagline: "Companii cu nevoi complexe și specifice.",
    features: [
      "Software custom / aplicație web",
      "Arhitectură și consultanță tehnică",
      "Echipă dedicată de dezvoltatori",
      "SLA garantat",
      "Suport prioritar nelimitat",
      "Iterații și extinderi continue",
    ],
    cta: "Contactează-ne direct",
    highlighted: false,
  },
];

const Pricing: React.FC = () => (
  <section id="pricing" className="py-28" style={{ backgroundColor: "#f8f8f6" }}>
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-16">
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
        >
          [ 03 / prețuri ]
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-sans)", color: "#0f0f0f" }}
          >
            Pachete
          </h2>
          <p
            className="text-base max-w-xs md:text-right"
            style={{ fontFamily: "var(--font-sans)", color: "#9ca3af", lineHeight: 1.6 }}
          >
            Fiecare proiect e discutat și estimat individual.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`pricing-card${tier.highlighted ? " pricing-card-highlight" : ""} flex flex-col gap-0 relative overflow-hidden`}
            style={
              tier.highlighted
                ? {
                    backgroundColor: "#080808",
                    border: "1px solid rgba(0,255,65,0.35)",
                    boxShadow: "0 0 0 1px rgba(0,255,65,0.05), 0 0 60px rgba(0,255,65,0.1), inset 0 1px 0 rgba(0,255,65,0.1)",
                  }
                : {
                    backgroundColor: "#ffffff",
                    border: "1px solid #e8e8e8",
                  }
            }
          >
            {/* Highlighted: top green accent bar */}
            {tier.highlighted && (
              <div
                className="h-0.5 w-full"
                style={{ background: "linear-gradient(to right, transparent, #00ff41, transparent)" }}
              />
            )}

            <div className="flex flex-col gap-6 p-8 flex-1">
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: tier.highlighted ? "rgba(0,255,65,0.6)" : "#aaa",
                    }}
                  >
                    [ {tier.label} ]
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: tier.highlighted ? "#f0f0ee" : "#0f0f0f",
                    }}
                  >
                    {tier.price}
                  </p>
                  <p
                    className="text-sm mt-1"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: tier.highlighted ? "#555" : "#9ca3af",
                    }}
                  >
                    {tier.tagline}
                  </p>
                </div>
                {tier.badge && (
                  <span
                    className="text-xs px-2.5 py-1 shrink-0"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "#080808",
                      backgroundColor: "#00ff41",
                      fontWeight: 700,
                    }}
                  >
                    {tier.badge}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div
                className="h-px"
                style={{
                  backgroundColor: tier.highlighted ? "rgba(0,255,65,0.12)" : "#f0f0f0",
                }}
              />

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: tier.highlighted ? "#888" : "#374151",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      className="shrink-0 mt-0.5 text-xs"
                      style={{ color: "#00ff41", fontFamily: "var(--font-mono)" }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="mt-4 text-center text-sm py-3.5 px-6 uppercase tracking-[0.12em] font-semibold transition-all duration-300 block"
                style={
                  tier.highlighted
                    ? {
                        backgroundColor: "#00ff41",
                        color: "#080808",
                        fontFamily: "var(--font-mono)",
                      }
                    : {
                        border: "1px solid #d1d5db",
                        color: "#374151",
                        fontFamily: "var(--font-mono)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!tier.highlighted) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,65,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#111";
                  } else {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tier.highlighted) {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d1d5db";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
                  } else {
                    (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                  }
                }}
              >
                {tier.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
