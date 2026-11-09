import { track } from "./analytics";

/*
 * Cookie consent, stored in localStorage and mirrored into Google Consent Mode v2.
 * The inline script in GtmHead.astro reads the same key before GTM loads, so the
 * stored shape ({ v, analytics, marketing, at }) must stay in sync with it.
 */

export interface Consent {
    analytics: boolean;
    marketing: boolean;
}

export const CONSENT_KEY = "cookie-consent";
const VERSION = 1;
/** Ask again after a year. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const readConsent = (): Consent | null => {
    try {
        const raw = localStorage.getItem(CONSENT_KEY);
        if (!raw) return null;
        const stored = JSON.parse(raw);
        if (stored?.v !== VERSION || typeof stored.at !== "number" || Date.now() - stored.at > MAX_AGE_MS) return null;
        return { analytics: stored.analytics === true, marketing: stored.marketing === true };
    } catch {
        return null;
    }
};

const writeConsent = (consent: Consent) => {
    try {
        localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: VERSION, ...consent, at: Date.now() }));
    } catch {}
};

type Status = "granted" | "denied";
const status = (on: boolean): Status => (on ? "granted" : "denied");

/** Our two optional categories mapped onto the Consent Mode v2 types. */
export const consentModeState = (consent: Consent | null) => {
    const analytics = status(consent?.analytics ?? false);
    const marketing = status(consent?.marketing ?? false);
    return {
        analytics_storage: analytics,
        ad_storage: marketing,
        ad_user_data: marketing,
        ad_personalization: marketing,
        personalization_storage: marketing,
        functionality_storage: "granted" as Status,
        security_storage: "granted" as Status,
    };
};

/** Cookies the common tags set, by category; removed when the category is declined. */
const COOKIES = {
    analytics: /^(_ga|_gid|_gat)/,
    marketing: /^(_gcl|_fbp|_fbc|_ttp|_tt_)/,
};

const clearCookies = (pattern: RegExp) => {
    // Expire on the bare host and every parent domain (e.g. "disconnect.ro" for "www.disconnect.ro").
    const parts = location.hostname.split(".");
    const domains = [""].concat(parts.slice(0, -1).map((_, index) => parts.slice(index).join(".")));
    document.cookie.split(";").forEach((entry) => {
        const name = entry.split("=")[0]?.trim() ?? "";
        if (!pattern.test(name)) return;
        domains.forEach((domain) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
        });
    });
};

/** Persist the choice, update Consent Mode and let GTM know, so waiting tags can fire. */
export const applyConsent = (consent: Consent) => {
    writeConsent(consent);
    const state = consentModeState(consent);
    window.gtag?.("consent", "update", state);
    if (!consent.analytics) clearCookies(COOKIES.analytics);
    if (!consent.marketing) clearCookies(COOKIES.marketing);
    track("consent_update", { consent_analytics: state.analytics_storage, consent_marketing: state.ad_storage });
};
