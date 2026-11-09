/**
 * Business details used across the site, legal pages, structured data and llms.txt.
 * Empty strings are treated as "not set" and the related UI is hidden.
 */
export interface SiteConfig {
    name: string;
    url: string;
    email: string;
    phone: string;
    whatsapp: string;
    company: { legalName: string; vatId: string; registryNumber: string };
    address: { street: string; city: string; region: string; postalCode: string; country: string };
    foundingYear: number;
    socials: Record<"instagram" | "facebook" | "linkedin" | "tiktok" | "github", string>;
}

export const site: SiteConfig = {
    name: "Disconnect",
    url: "https://disconnect.ro",
    email: "contact@disconnect.ro",

    /** Shown in the footer and contact page, enables click-to-call. Example: "+40 712 345 678". */
    phone: "",
    /** International format, digits only. Enables the sticky WhatsApp button. Example: "40712345678". */
    whatsapp: "",

    /** Legal entity shown on Terms / Privacy and in the footer. */
    company: {
        legalName: "", // e.g. "DISCONNECT STUDIO S.R.L."
        vatId: "", // CUI, e.g. "RO12345678"
        registryNumber: "", // Nr. Reg. Com., e.g. "J40/1234/2025"
    },

    address: {
        street: "",
        city: "",
        region: "",
        postalCode: "",
        country: "RO",
    },

    foundingYear: 2025,

    socials: {
        instagram: "",
        facebook: "",
        linkedin: "",
        tiktok: "",
        github: "https://github.com/sorinraduta",
    },
};

// Tracking is handled by Google Tag Manager; its container ID is the PUBLIC_GTM_ID env variable (see src/lib/analytics.ts).
