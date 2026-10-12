import { absoluteUrl, type Locale } from "~/config/routes";
import { seo } from "~/config/seo";
import { site } from "~/config/site";

/** JSON-LD builders (schema.org). Combined into one @graph per page by the base layout. */

type Thing = Record<string, unknown>;

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

const url = (pathname: string) => absoluteUrl(pathname, site.url);

const sameAs = Object.values(site.socials).filter(Boolean);

const postalAddress = () => {
    const { street, city, region, postalCode, country } = site.address;
    if (!city) return undefined;
    return {
        "@type": "PostalAddress",
        streetAddress: street || undefined,
        addressLocality: city,
        addressRegion: region || undefined,
        postalCode: postalCode || undefined,
        addressCountry: country,
    };
};

export const organization = (lang: Locale): Thing => ({
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.company.legalName || undefined,
    url: url("/"),
    logo: { "@type": "ImageObject", url: url("/icon-512.png"), width: 512, height: 512 },
    image: url(`/og/${lang}/home.png`),
    slogan: seo.tagline[lang],
    description: seo.pages.home[lang].description,
    email: site.email,
    telephone: site.phone || undefined,
    foundingDate: String(site.foundingYear),
    address: postalAddress(),
    vatID: site.company.vatId || undefined,
    areaServed: [
        { "@type": "Country", name: "Romania" },
        { "@type": "Place", name: "Europe" },
    ],
    knowsLanguage: ["ro", "en"],
    knowsAbout: [
        "Web development",
        "Web design",
        "UI/UX design",
        "Branding",
        "Logo design",
        "Search engine optimization",
        "Answer engine optimization",
        "Generative engine optimization",
        "Digital marketing",
        "Google Ads",
        "Meta Ads",
        "TikTok Ads",
        "Google Business Profile",
    ],
    sameAs: sameAs.length ? sameAs : undefined,
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phone || undefined,
        availableLanguage: ["Romanian", "English"],
    },
});

export const website = (): Thing => ({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: url("/"),
    name: site.name,
    inLanguage: ["ro", "en"],
    publisher: { "@id": ORG_ID },
});

export interface Crumb {
    name: string;
    href: string;
}

export const webPage = (opts: {
    lang: Locale;
    pathname: string;
    name: string;
    description: string;
    type?: string;
    image?: string;
    crumbs?: Crumb[];
}): Thing[] => {
    const pageUrl = url(opts.pathname);
    const page: Thing = {
        "@type": opts.type ?? "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: opts.name,
        description: opts.description,
        inLanguage: opts.lang,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: opts.image ? { "@type": "ImageObject", url: url(opts.image) } : undefined,
    };

    if (!opts.crumbs?.length) return [page];

    const breadcrumbId = `${pageUrl}#breadcrumb`;
    page.breadcrumb = { "@id": breadcrumbId };
    return [
        page,
        {
            "@type": "BreadcrumbList",
            "@id": breadcrumbId,
            itemListElement: opts.crumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: crumb.name,
                item: url(crumb.href),
            })),
        },
    ];
};

export const faqPage = (pathname: string, items: { question: string; answer: string }[]): Thing => ({
    "@type": "FAQPage",
    "@id": `${url(pathname)}#faq`,
    mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
});

export const blogPosting = (opts: {
    lang: Locale;
    pathname: string;
    title: string;
    description: string;
    image: string;
    published: Date;
    updated?: Date;
    tags: string[];
    wordCount: number;
}): Thing => ({
    "@type": "BlogPosting",
    "@id": `${url(opts.pathname)}#article`,
    mainEntityOfPage: { "@id": `${url(opts.pathname)}#webpage` },
    headline: opts.title,
    description: opts.description,
    image: url(opts.image),
    datePublished: opts.published.toISOString(),
    dateModified: (opts.updated ?? opts.published).toISOString(),
    inLanguage: opts.lang,
    keywords: opts.tags.join(", "),
    wordCount: opts.wordCount,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
});

export const jobPosting = (opts: {
    pathname: string;
    title: string;
    description: string;
    datePosted: Date;
    validThrough?: Date;
    employmentType: string;
    remote: boolean;
}): Thing => ({
    "@type": "JobPosting",
    "@id": `${url(opts.pathname)}#job`,
    title: opts.title,
    description: opts.description,
    datePosted: opts.datePosted.toISOString().slice(0, 10),
    validThrough: opts.validThrough?.toISOString(),
    employmentType: opts.employmentType,
    hiringOrganization: { "@id": ORG_ID },
    jobLocationType: opts.remote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: opts.remote ? { "@type": "Country", name: "Romania" } : undefined,
    jobLocation: postalAddress() ? { "@type": "Place", address: postalAddress() } : undefined,
    directApply: false,
});

export const serviceCatalog = (
    lang: Locale,
    pathname: string,
    services: { name: string; description: string; items: string[] }[],
): Thing => ({
    "@type": "OfferCatalog",
    "@id": `${url(pathname)}#catalog`,
    name: lang === "ro" ? "Servicii Disconnect" : "Disconnect services",
    itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            provider: { "@id": ORG_ID },
            areaServed: { "@type": "Country", name: "Romania" },
            serviceOutput: service.items.join(", "),
        },
    })),
});
