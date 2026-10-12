export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

/** Every static page, with its translated path per locale. */
export const routes = {
    home: { ro: "/", en: "/en" },
    services: { ro: "/servicii", en: "/en/services" },
    portfolio: { ro: "/portofoliu", en: "/en/portfolio" },
    about: { ro: "/despre", en: "/en/about" },
    blog: { ro: "/blog", en: "/en/blog" },
    careers: { ro: "/cariere", en: "/en/careers" },
    faq: { ro: "/intrebari-frecvente", en: "/en/faq" },
    contact: { ro: "/contact", en: "/en/contact" },
    contactThanks: { ro: "/contact/multumim", en: "/en/contact/thank-you" },
    terms: { ro: "/termeni-si-conditii", en: "/en/terms" },
    privacy: { ro: "/politica-de-confidentialitate", en: "/en/privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;
export type Alternates = Record<Locale, string>;

/** Pages excluded from the sitemap and marked noindex. */
export const unlistedRoutes: RouteKey[] = ["contactThanks"];

export const path = (key: RouteKey, lang: Locale) => routes[key][lang];

export const alternatesFor = (key: RouteKey): Alternates => routes[key];

export const childPath = (key: RouteKey, lang: Locale, slug: string) =>
    `${routes[key][lang]}/${slug}`;

export const otherLocale = (lang: Locale): Locale => (lang === "ro" ? "en" : "ro");

export const absoluteUrl = (pathname: string, base: string | URL) => {
    const url = new URL(pathname, base).href;
    return pathname === "/" ? url : url.replace(/\/$/, "");
};
