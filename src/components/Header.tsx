import { useState, useEffect } from "react";

const navLinks = [
  { label: "Servicii", href: "#services" },
  { label: "Proces", href: "#process" },
  { label: "Prețuri", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: "52px",
        backgroundColor: scrolled ? "rgba(8,8,8,0.85)" : "rgba(8,8,8,0.6)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={closeMenu} className="flex items-center gap-2 group">
          <span
            className="w-[7px] h-[7px] rounded-full transition-all duration-300 group-hover:opacity-80"
            style={{
              backgroundColor: "#00ff41",
              boxShadow: "0 0 8px rgba(0,255,65,0.5)",
            }}
          />
          <span
            className="text-[14px] font-medium tracking-tight"
            style={{ fontFamily: "var(--font-sans)", color: "#d8d8d6" }}
          >
            disconnect<span style={{ color: "#444" }}>.ro</span>
          </span>
        </a>

        {/* Desktop nav — center */}
        <nav className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] px-3.5 py-1.5 transition-colors duration-150 rounded"
              style={{ fontFamily: "var(--font-sans)", color: "#666" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#e8e8e6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#666";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-200"
            style={{
              fontFamily: "var(--font-sans)",
              backgroundColor: "rgba(0,255,65,0.12)",
              color: "#00ff41",
              border: "1px solid rgba(0,255,65,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,255,65,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,65,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(0,255,65,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(0,255,65,0.2)";
            }}
          >
            Contactează-ne
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1.5"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all duration-300"
              style={{
                backgroundColor: "#888",
                transform:
                  i === 0 && menuOpen ? "rotate(45deg) translate(4px, 4px)"
                  : i === 2 && menuOpen ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[52px] z-40 flex flex-col items-center justify-center gap-5"
          style={{ backgroundColor: "rgba(8,8,8,0.97)", backdropFilter: "blur(20px)" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-xl font-medium"
              style={{ fontFamily: "var(--font-sans)", color: "#c8c8c6" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-md"
            style={{
              fontFamily: "var(--font-sans)",
              backgroundColor: "rgba(0,255,65,0.15)",
              color: "#00ff41",
              border: "1px solid rgba(0,255,65,0.3)",
            }}
          >
            Contactează-ne →
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
