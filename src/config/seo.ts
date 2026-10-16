import type { Locale, RouteKey } from "./routes";

/**
 * All page metadata lives here: titles, descriptions and keywords per locale.
 * Titles are rendered with `titleTemplate` unless `absoluteTitle` is true.
 * Keep titles under ~60 characters and descriptions between 120 and 160.
 */
export const seo = {
    titleTemplate: "%s · Disconnect",
    themeColor: { light: "#f6f5f0", dark: "#0b0c0b" },
    ogLocale: { ro: "ro_RO", en: "en_US" } satisfies Record<Locale, string>,

    tagline: {
        ro: "Studio digital pentru afaceri mici și mijlocii",
        en: "Digital studio for small and mid-sized businesses",
    } satisfies Record<Locale, string>,

    keywords: {
        ro: [
            "studio digital",
            "agenție web",
            "creare site",
            "web design",
            "branding",
            "SEO",
            "AEO",
            "GEO",
            "marketing online",
            "Google Ads",
            "Meta Ads",
            "afaceri mici și mijlocii",
        ],
        en: [
            "digital studio",
            "web agency",
            "website development",
            "web design",
            "branding",
            "SEO",
            "AEO",
            "GEO",
            "digital marketing",
            "Google Ads",
            "Meta Ads",
            "small business",
        ],
    } satisfies Record<Locale, string[]>,

    pages: {
        home: {
            ro: {
                title: "Disconnect — Studio digital: website, branding și marketing",
                absoluteTitle: true,
                description:
                    "Studio digital pentru afaceri mici și mijlocii. Website-uri rapide, branding, SEO/AEO/GEO și campanii care aduc clienți — o singură echipă, partener pe termen lung.",
            },
            en: {
                title: "Disconnect — Digital studio: websites, branding & marketing",
                absoluteTitle: true,
                description:
                    "Digital studio for small and mid-sized businesses. Fast websites, branding, SEO/AEO/GEO and campaigns that bring customers — one team, a long-term partner.",
            },
        },
        services: {
            ro: {
                title: "Servicii: website, design, SEO și marketing",
                description:
                    "Tot ce ține de digital, într-un singur loc: website-uri moderne, logo și branding, UI/UX, SEO/AEO/GEO, campanii Google, Meta și TikTok, mentenanță.",
            },
            en: {
                title: "Services: websites, design, SEO & marketing",
                description:
                    "Everything digital in one place: modern websites, logo and branding, UI/UX, SEO/AEO/GEO, Google, Meta and TikTok campaigns, and ongoing maintenance.",
            },
        },
        portfolio: {
            ro: {
                title: "Portofoliu",
                description:
                    "Proiecte Disconnect: website-uri, identități vizuale și campanii pentru afaceri locale și branduri în creștere.",
            },
            en: {
                title: "Portfolio",
                description:
                    "Disconnect projects: websites, visual identities and campaigns for local businesses and growing brands.",
            },
        },
        about: {
            ro: {
                title: "Despre noi",
                description:
                    "Disconnect este un studio digital: o echipă restrânsă de specialiști, implicare directă și un singur obiectiv — succesul afacerii tale.",
            },
            en: {
                title: "About us",
                description:
                    "Disconnect is a digital studio: a small team of specialists, hands-on involvement and a single goal — the success of your business.",
            },
        },
        blog: {
            ro: {
                title: "Blog",
                description:
                    "Ghiduri scurte despre website-uri, SEO, AEO, GEO și marketing digital pentru afaceri mici și mijlocii.",
            },
            en: {
                title: "Blog",
                description:
                    "Short guides on websites, SEO, AEO, GEO and digital marketing for small and mid-sized businesses.",
            },
        },
        careers: {
            ro: {
                title: "Cariere",
                description:
                    "Lucrează cu Disconnect: proiecte variate, echipă mică, impact real. Vezi pozițiile deschise sau trimite o aplicație spontană.",
            },
            en: {
                title: "Careers",
                description:
                    "Work with Disconnect: varied projects, a small team, real impact. See open positions or send us an open application.",
            },
        },
        faq: {
            ro: {
                title: "Întrebări frecvente",
                description:
                    "Răspunsuri rapide despre costuri, termene, tehnologii, SEO/AEO/GEO, mentenanță și cum lucrăm cu Disconnect.",
            },
            en: {
                title: "FAQ",
                description:
                    "Quick answers about pricing, timelines, technology, SEO/AEO/GEO, maintenance and how working with Disconnect looks.",
            },
        },
        contact: {
            ro: {
                title: "Contact",
                description:
                    "Spune-ne ce construiești. Îți răspundem în maximum o zi lucrătoare cu pașii următori — fără obligații.",
            },
            en: {
                title: "Contact",
                description:
                    "Tell us what you are building. We reply within one business day with clear next steps — no strings attached.",
            },
        },
        contactThanks: {
            ro: {
                title: "Mesaj trimis",
                description: "Mulțumim! Am primit mesajul tău și revenim în curând.",
            },
            en: {
                title: "Message sent",
                description: "Thank you! We received your message and will get back to you soon.",
            },
        },
        terms: {
            ro: {
                title: "Termeni și condiții",
                description: "Termenii și condițiile de utilizare a site-ului disconnect.ro.",
            },
            en: {
                title: "Terms and conditions",
                description: "Terms and conditions for using the disconnect.ro website.",
            },
        },
        privacy: {
            ro: {
                title: "Politica de confidențialitate",
                description:
                    "Cum colectăm, folosim și protejăm datele personale pe disconnect.ro, conform GDPR.",
            },
            en: {
                title: "Privacy policy",
                description:
                    "How we collect, use and protect personal data on disconnect.ro, in line with the GDPR.",
            },
        },
    } satisfies Record<RouteKey, Record<Locale, PageMeta>>,

    notFound: {
        title: "404 — Conexiune pierdută / Connection lost",
        description: "Pagina nu există. / This page does not exist.",
    },
};

export interface PageMeta {
    title: string;
    description: string;
    absoluteTitle?: boolean;
}

export const pageMeta = (key: RouteKey, lang: Locale): PageMeta => seo.pages[key][lang];

/** Applies the title template, dropping the brand suffix when it would push the title past ~60 characters. */
export const formatTitle = (meta: Pick<PageMeta, "title" | "absoluteTitle">) => {
    if (meta.absoluteTitle) return meta.title;
    const full = seo.titleTemplate.replace("%s", meta.title);
    return full.length <= 60 ? full : meta.title;
};
