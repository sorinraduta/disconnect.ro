const footerLinks = [
  { label: "Servicii", href: "#services" },
  { label: "Proces", href: "#process" },
  { label: "Prețuri", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

const Footer: React.FC = () => (
  <footer style={{ backgroundColor: "#040404" }}>
    <div
      className="max-w-6xl mx-auto px-6 py-16"
      style={{ borderTop: "1px solid #111" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {/* Brand */}
        <div className="flex flex-col gap-5 md:col-span-1">
          <a href="#home" className="flex items-center gap-2 w-fit">
            <span
              className="text-base font-bold"
              style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
            >
              &gt;_
            </span>
            <span
              className="text-base font-bold tracking-[0.18em] uppercase"
              style={{ fontFamily: "var(--font-mono)", color: "#e8e8e6" }}
            >
              DISCONNECT
            </span>
          </a>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-sans)", color: "#3a3a3a", maxWidth: "240px" }}
          >
            Software care chiar funcționează. Livrat fără surprize.
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: "var(--font-mono)", color: "#2a2a2a" }}
          >
            © {new Date().getFullYear()} disconnect.ro
          </p>
        </div>

        {/* Nav */}
        <div className="flex flex-col gap-3">
          <p
            className="text-xs uppercase tracking-[0.18em] mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "#333" }}
          >
            Navigare
          </p>
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm w-fit transition-colors duration-200 hover:text-white"
              style={{ fontFamily: "var(--font-sans)", color: "#3a3a3a" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <p
            className="text-xs uppercase tracking-[0.18em] mb-3"
            style={{ fontFamily: "var(--font-mono)", color: "#333" }}
          >
            Contact
          </p>
          <a
            href="mailto:contact@disconnect.ro"
            className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2.5 w-fit"
            style={{ fontFamily: "var(--font-sans)", color: "#3a3a3a" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            contact@disconnect.ro
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2.5 w-fit"
            style={{ fontFamily: "var(--font-sans)", color: "#3a3a3a" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-2.5 w-fit"
            style={{ fontFamily: "var(--font-sans)", color: "#3a3a3a" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: "1px solid #0f0f0f" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span
          className="text-xs animate-blink"
          style={{ animationDuration: "6s", fontFamily: "var(--font-mono)" }}
        >
          [ DISCONNECT.RO ]
        </span>
        <span
          className="text-xs"
          style={{ fontFamily: "var(--font-mono)", color: "#1a1a1a" }}
        >
          v2025.1
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
