import type { APIRoute } from "astro";
import { seo } from "~/config/seo";
import { site } from "~/config/site";

export const GET: APIRoute = () =>
    Response.json(
        {
            name: `${site.name} — ${seo.tagline.ro}`,
            short_name: site.name,
            description: seo.pages.home.ro.description,
            lang: "ro",
            start_url: "/",
            scope: "/",
            display: "standalone",
            background_color: seo.themeColor.dark,
            theme_color: seo.themeColor.dark,
            icons: [
                { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
                { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
                { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
            ],
        },
        { headers: { "Content-Type": "application/manifest+json" } },
    );
