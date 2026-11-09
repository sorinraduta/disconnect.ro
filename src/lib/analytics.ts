import { PUBLIC_GTM_ID } from "astro:env/client";

/*
 * Google Tag Manager. The container ID comes from the PUBLIC_GTM_ID env variable; tags
 * (GA4, pixels, ads) are configured inside GTM. The site only pushes events to the
 * dataLayer, which GTM picks up as Custom Event triggers. See gtm/README.md.
 */

export const gtmId = PUBLIC_GTM_ID ?? "";
export const hasAnalytics = Boolean(gtmId);

declare global {
    interface Window {
        dataLayer: unknown[];
        /** Defined by the inline script in GtmHead.astro. */
        gtag?: (...args: unknown[]) => void;
        /** Set by gtm.js once the container has loaded. */
        google_tag_manager?: unknown;
    }
}

export type EventParams = Record<string, string | number | boolean | undefined>;

/** Push an event to the dataLayer. Each event name is a Custom Event trigger in GTM. */
export const track = (event: string, params: EventParams = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
};

/**
 * Push an event, then run `done` once GTM has fired its tags, so a navigation that follows
 * does not cut the hit short. Runs `done` right away when GTM is missing or blocked.
 */
export const trackThen = (event: string, params: EventParams, done: () => void) => {
    let called = false;
    const once = () => {
        if (called) return;
        called = true;
        done();
    };
    if (!window.google_tag_manager) {
        track(event, params);
        once();
        return;
    }
    track(event, { ...params, eventCallback: once as never, eventTimeout: 1500 });
    setTimeout(once, 2000);
};
