import type { IconName } from "~/components/Icon.astro";
import type { Locale } from "~/config/routes";

type L = Record<Locale, string>;

export interface Feature {
    icon: IconName;
    label: L;
}

export interface FeatureGroup {
    icon: IconName;
    title: L;
    features: Feature[];
}

export interface Service {
    id: "web" | "design" | "seo" | "marketing";
    icon: IconName;
    title: L;
    short: L;
    description: L;
    items: { icon: IconName; label: L; detail?: L }[];
}

/** Everything included in a Disconnect website, grouped for the services page. */
export const websiteFeatures: FeatureGroup[] = [
    {
        icon: "Palette",
        title: { ro: "Design", en: "Design" },
        features: [
            { icon: "Sparkles", label: { ro: "Design modern, personalizat", en: "Modern, custom design" } },
            { icon: "Smartphone", label: { ro: "Design responsive, mobile-first", en: "Responsive, mobile-first design" } },
            { icon: "Moon", label: { ro: "Dark mode", en: "Dark mode" } },
            { icon: "Accessibility", label: { ro: "Accesibilitate (contrast, alt text, tastatură)", en: "Accessibility (contrast, alt text, keyboard)" } },
            { icon: "Images", label: { ro: "Galerie foto", en: "Photo gallery" } },
            { icon: "Shapes", label: { ro: "Favicon + imagini OpenGraph", en: "Favicon + OpenGraph images" } },
        ],
    },
    {
        icon: "Gauge",
        title: { ro: "Performanță", en: "Performance" },
        features: [
            { icon: "Zap", label: { ro: "Tehnologii moderne (nu WordPress)", en: "Modern tech (not WordPress)" } },
            { icon: "Gauge", label: { ro: "Optimizare viteză", en: "Speed optimisation" } },
            { icon: "Image", label: { ro: "Imagini optimizate", en: "Optimised images" } },
            { icon: "Globe", label: { ro: "CDN + cache", en: "CDN + caching" } },
        ],
    },
    {
        icon: "ScanSearch",
        title: { ro: "Vizibilitate", en: "Visibility" },
        features: [
            { icon: "Search", label: { ro: "SEO / AEO / GEO + copywriting", en: "SEO / AEO / GEO + copywriting" } },
            { icon: "Network", label: { ro: "Sitemap XML + robots.txt", en: "XML sitemap + robots.txt" } },
            { icon: "Bot", label: { ro: "llms.txt pentru AI", en: "llms.txt for AI" } },
            { icon: "Languages", label: { ro: "Multilingv", en: "Multilingual" } },
            { icon: "MapPin", label: { ro: "Integrare Google Maps", en: "Google Maps integration" } },
            { icon: "Star", label: { ro: "Recenzii Google / testimoniale", en: "Google reviews / testimonials" } },
        ],
    },
    {
        icon: "MousePointerClick",
        title: { ro: "Conversie", en: "Conversion" },
        features: [
            { icon: "ShieldCheck", label: { ro: "Formular de contact cu anti-spam", en: "Contact form with spam protection" } },
            { icon: "PhoneCall", label: { ro: "Click-to-call", en: "Click-to-call" } },
            { icon: "MessageCircle", label: { ro: "Buton WhatsApp sticky", en: "Sticky WhatsApp button" } },
            { icon: "Send", label: { ro: "Newsletter", en: "Newsletter" } },
            { icon: "Camera", label: { ro: "Feed Instagram", en: "Instagram feed" } },
            { icon: "Newspaper", label: { ro: "Blog / CMS", en: "Blog / CMS" } },
            { icon: "CircleHelp", label: { ro: "Secțiune FAQ", en: "FAQ section" } },
        ],
    },
    {
        icon: "Server",
        title: { ro: "Infrastructură", en: "Infrastructure" },
        features: [
            { icon: "AtSign", label: { ro: "Domeniu", en: "Domain" } },
            { icon: "Cloud", label: { ro: "Setup găzduire", en: "Hosting setup" } },
            { icon: "Mail", label: { ro: "Email pe domeniu", en: "Email on your domain" } },
            { icon: "Lock", label: { ro: "Certificat SSL", en: "SSL certificate" } },
            { icon: "Workflow", label: { ro: "Configurare DNS", en: "DNS configuration" } },
            { icon: "Wrench", label: { ro: "Mentenanță", en: "Maintenance" } },
        ],
    },
    {
        icon: "ChartLine",
        title: { ro: "Legal & măsurare", en: "Legal & tracking" },
        features: [
            { icon: "FileText", label: { ro: "Termeni și condiții", en: "Terms and conditions" } },
            { icon: "Scale", label: { ro: "Politică de confidențialitate", en: "Privacy policy" } },
            { icon: "Cookie", label: { ro: "Consimțământ cookie (GDPR)", en: "Cookie consent (GDPR)" } },
            { icon: "ChartColumn", label: { ro: "Google Analytics", en: "Google Analytics" } },
            { icon: "Target", label: { ro: "Meta Pixel", en: "Meta Pixel" } },
            { icon: "Activity", label: { ro: "TikTok Pixel", en: "TikTok Pixel" } },
        ],
    },
];

export const services: Service[] = [
    {
        id: "web",
        icon: "MonitorSmartphone",
        title: { ro: "Website-uri", en: "Websites" },
        short: { ro: "Rapide, frumoase, gata să vândă.", en: "Fast, beautiful, ready to sell." },
        description: {
            ro: "Site-uri de prezentare, landing page-uri și aplicații web, construite cu tehnologii moderne. Totul inclus: de la domeniu la analytics.",
            en: "Business websites, landing pages and web apps built on modern technology. Everything included: from domain to analytics.",
        },
        items: [
            { icon: "LayoutTemplate", label: { ro: "Site de prezentare", en: "Business website" } },
            { icon: "Rocket", label: { ro: "Landing page", en: "Landing page" } },
            { icon: "CodeXml", label: { ro: "Aplicații web", en: "Web apps" } },
            { icon: "Wrench", label: { ro: "Mentenanță", en: "Maintenance" } },
        ],
    },
    {
        id: "design",
        icon: "PenTool",
        title: { ro: "Design & branding", en: "Design & branding" },
        short: { ro: "O identitate pe care o ții minte.", en: "An identity people remember." },
        description: {
            ro: "Logo, identitate vizuală și interfețe gândite pentru oameni reali. Brandul tău, coerent peste tot.",
            en: "Logo, visual identity and interfaces designed for real people. Your brand, consistent everywhere.",
        },
        items: [
            { icon: "Shapes", label: { ro: "Logo", en: "Logo" } },
            { icon: "Palette", label: { ro: "Branding", en: "Branding" } },
            { icon: "PanelsTopLeft", label: { ro: "UI/UX", en: "UI/UX" } },
            { icon: "Type", label: { ro: "Ghid de brand", en: "Brand guidelines" } },
        ],
    },
    {
        id: "seo",
        icon: "ScanSearch",
        title: { ro: "SEO · AEO · GEO", en: "SEO · AEO · GEO" },
        short: { ro: "Găsit în Google și în AI.", en: "Found on Google and in AI." },
        description: {
            ro: "Optimizare pentru motoare de căutare, pentru răspunsuri directe și pentru asistenți AI precum ChatGPT, Gemini sau Perplexity.",
            en: "Optimisation for search engines, direct answers and AI assistants like ChatGPT, Gemini or Perplexity.",
        },
        items: [
            { icon: "Search", label: { ro: "SEO", en: "SEO" }, detail: { ro: "Google, Bing", en: "Google, Bing" } },
            {
                icon: "MessageCircleQuestion",
                label: { ro: "AEO", en: "AEO" },
                detail: { ro: "Răspunsuri directe, voce", en: "Direct answers, voice" },
            },
            { icon: "Bot", label: { ro: "GEO", en: "GEO" }, detail: { ro: "ChatGPT, Gemini, Perplexity", en: "ChatGPT, Gemini, Perplexity" } },
            { icon: "Store", label: { ro: "Google Business Profile", en: "Google Business Profile" } },
        ],
    },
    {
        id: "marketing",
        icon: "Megaphone",
        title: { ro: "Marketing & performanță", en: "Marketing & performance" },
        short: { ro: "Campanii care aduc clienți.", en: "Campaigns that bring customers." },
        description: {
            ro: "Strategie, campanii plătite și optimizare continuă. Măsurăm ce contează: lead-uri, vânzări, cost per client.",
            en: "Strategy, paid campaigns and continuous optimisation. We measure what matters: leads, sales, cost per customer.",
        },
        items: [
            { icon: "Compass", label: { ro: "Strategie", en: "Strategy" } },
            { icon: "Target", label: { ro: "Google, Meta & TikTok Ads", en: "Google, Meta & TikTok Ads" } },
            { icon: "TrendingUp", label: { ro: "Optimizare conversii", en: "Conversion optimisation" } },
            { icon: "ChartColumn", label: { ro: "Raportare clară", en: "Clear reporting" } },
        ],
    },
];

/** Short keywords for the home page marquee. */
export const marqueeWords: L[] = [
    { ro: "Website-uri", en: "Websites" },
    { ro: "Branding", en: "Branding" },
    { ro: "UI/UX", en: "UI/UX" },
    { ro: "SEO", en: "SEO" },
    { ro: "AEO", en: "AEO" },
    { ro: "GEO", en: "GEO" },
    { ro: "Google Ads", en: "Google Ads" },
    { ro: "Meta Ads", en: "Meta Ads" },
    { ro: "TikTok Ads", en: "TikTok Ads" },
    { ro: "Logo", en: "Logo" },
    { ro: "Mentenanță", en: "Maintenance" },
    { ro: "Google Business", en: "Google Business" },
];

export const steps: { icon: IconName; title: L; text: L }[] = [
    {
        icon: "Coffee",
        title: { ro: "Discuție", en: "Discover" },
        text: { ro: "Înțelegem afacerea, clienții și obiectivele tale.", en: "We learn your business, customers and goals." },
    },
    {
        icon: "PenTool",
        title: { ro: "Design", en: "Design" },
        text: { ro: "Structură, identitate și interfață, validate cu tine.", en: "Structure, identity and interface, validated with you." },
    },
    {
        icon: "CodeXml",
        title: { ro: "Construcție", en: "Build" },
        text: { ro: "Cod rapid, SEO tehnic, tracking și lansare.", en: "Fast code, technical SEO, tracking and launch." },
    },
    {
        icon: "TrendingUp",
        title: { ro: "Creștere", en: "Grow" },
        text: { ro: "Campanii, optimizare și rapoarte lunare.", en: "Campaigns, optimisation and monthly reports." },
    },
];
