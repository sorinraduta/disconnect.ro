/* Third-party trackers, injected only after the visitor grants consent. */

type Queue = ((...args: unknown[]) => void) & Record<string, unknown>;
type TikTokQueue = unknown[] & Record<string, unknown>;

declare global {
    interface Window {
        __trackersLoaded?: boolean;
        dataLayer: unknown[];
        gtag: (...args: unknown[]) => void;
        fbq?: Queue;
        _fbq?: Queue;
        ttq?: TikTokQueue;
        TiktokAnalyticsObject?: string;
    }
}

const inject = (src: string) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.append(script);
};

const googleAnalytics = (id: string) => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // gtag.js expects the arguments object, not an array.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id);
    inject(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
};

const metaPixel = (id: string) => {
    if (window.fbq) return;
    const fbq = function (...args: unknown[]) {
        const self = fbq as Queue;
        if (typeof self.callMethod === "function") (self.callMethod as (...a: unknown[]) => void)(...args);
        else (self.queue as unknown[]).push(args);
    } as Queue;
    Object.assign(fbq, { push: fbq, loaded: true, version: "2.0", queue: [] });
    window.fbq = window._fbq = fbq;
    inject("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", id);
    fbq("track", "PageView");
};

const tiktokPixel = (id: string) => {
    const name = "ttq";
    window.TiktokAnalyticsObject = name;
    const ttq = (window.ttq ??= [] as unknown as TikTokQueue);
    const methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    const defer = (target: Record<string, unknown>, method: string) => {
        target[method] = (...args: unknown[]) => (target as unknown as unknown[]).push([method, ...args]);
    };
    methods.forEach((method) => defer(ttq, method));
    const src = "https://analytics.tiktok.com/i18n/pixel/events.js";
    ttq._i = { [id]: Object.assign([], { _u: src }) };
    ttq._t = { [id]: Date.now() };
    ttq._o = { [id]: {} };
    inject(`${src}?sdkid=${encodeURIComponent(id)}&lib=${name}`);
    (ttq.page as () => void)();
};

export const loadTrackers = (ids: { ga: string; meta: string; tiktok: string }) => {
    if (window.__trackersLoaded) return;
    window.__trackersLoaded = true;
    if (ids.ga) googleAnalytics(ids.ga);
    if (ids.meta) metaPixel(ids.meta);
    if (ids.tiktok) tiktokPixel(ids.tiktok);
};
