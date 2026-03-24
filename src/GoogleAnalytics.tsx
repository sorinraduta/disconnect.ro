import { useEffect } from "react";

const GOOGLE_TAG_MANAGER_ID = import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID;

const GoogleAnalytics = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_MANAGER_ID}`;
        document.head.appendChild(script);

        const dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", GOOGLE_TAG_MANAGER_ID);

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
