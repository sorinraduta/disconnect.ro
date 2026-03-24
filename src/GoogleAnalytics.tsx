import { useEffect } from "react";

const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

const GoogleAnalytics = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_ANALYTICS_ID}`;
        document.head.appendChild(script);

        return () => {
            script.remove();
        };
    }, []);

    return (
        <noscript>
            <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_ANALYTICS_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
            ></iframe>
        </noscript>
    );
};

export default GoogleAnalytics;
