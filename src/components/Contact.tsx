import { useState } from "react";

interface FormState { name: string; email: string; message: string; }

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState<boolean>(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Proiect nou — disconnect.ro");
    const body = encodeURIComponent(`Nume: ${form.name}\nEmail: ${form.email}\n\nMesaj:\n${form.message}`);
    window.location.href = `mailto:contact@disconnect.ro?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputBase: React.CSSProperties = {
    backgroundColor: "#111",
    border: "1px solid #222",
    color: "#e8e8e6",
    fontFamily: "var(--font-sans)",
    fontSize: "0.875rem",
    outline: "none",
    width: "100%",
    padding: "13px 16px",
    transition: "border-color 0.2s",
    borderRadius: 0,
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,255,65,0.45)";
  };
  const onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    (e.currentTarget as HTMLElement).style.borderColor = "#222";
  };

  return (
    <section
      id="contact"
      className="py-28 scanlines"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#00ff41" }}
              >
                [ 07 / contact ]
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-sans)", color: "#f0f0ee" }}
              >
                Să construim
                <br />
                ceva împreună
              </h2>
              <p
                className="text-base leading-relaxed max-w-sm"
                style={{ fontFamily: "var(--font-sans)", color: "#555" }}
              >
                Ai un proiect în minte? Descrie-l pe scurt și îți răspundem în maximum 24h cu o propunere de discuție.
              </p>
            </div>

            {/* Contact info block */}
            <div
              className="flex flex-col gap-4 p-6"
              style={{ border: "1px solid #1e1e1e" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center shrink-0"
                  style={{ border: "1px solid rgba(0,255,65,0.2)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <a
                  href="mailto:contact@disconnect.ro"
                  className="text-sm hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-sans)", color: "#888" }}
                >
                  contact@disconnect.ro
                </a>
              </div>

              <div
                className="h-px"
                style={{ backgroundColor: "#1a1a1a" }}
              />

              <p
                className="text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "var(--font-mono)", color: "#333" }}
              >
                // răspundem în &lt; 24h
              </p>
            </div>
          </div>

          {/* Right — form */}
          {sent ? (
            <div
              className="flex flex-col items-center justify-center gap-5 py-20"
              style={{ border: "1px solid rgba(0,255,65,0.15)" }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ border: "1px solid rgba(0,255,65,0.3)", color: "#00ff41" }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.25rem" }}>✓</span>
              </div>
              <div className="text-center">
                <p
                  className="text-base font-semibold mb-1"
                  style={{ fontFamily: "var(--font-sans)", color: "#e8e8e6" }}
                >
                  Mesajul e pregătit!
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "var(--font-sans)", color: "#555" }}
                >
                  Clientul tău de email s-a deschis. Trimite-l și te contactăm în curând.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-[0.12em] mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: "#444" }}
                  >
                    Numele tău
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="Ion Popescu"
                    style={inputBase}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-[0.12em] mb-2"
                    style={{ fontFamily: "var(--font-mono)", color: "#444" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="ion@companie.ro"
                    style={inputBase}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-[0.12em] mb-2"
                  style={{ fontFamily: "var(--font-mono)", color: "#444" }}
                >
                  Proiectul tău
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  placeholder="Descrie pe scurt ce vrei să construiești..."
                  style={{ ...inputBase, resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                className="mt-1 py-4 px-6 text-sm uppercase tracking-[0.15em] font-bold transition-all duration-300 hover:brightness-110 animate-glow"
                style={{
                  backgroundColor: "#00ff41",
                  color: "#080808",
                  fontFamily: "var(--font-mono)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                [ Trimite mesajul ]
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
