// @ts-check
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import { site } from "./src/config/site.ts";

// Unicode ranges from @fontsource-variable/bricolage-grotesque. Romanian needs latin-ext for ă, ș, ț.
const LATIN =
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const LATIN_EXT =
    "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";

export default defineConfig({
    site: site.url,
    trailingSlash: "never",
    output: "static",
    adapter: vercel(),
    // Project visuals are React components rendered at build time; none ship JavaScript.
    integrations: [react()],

    build: {
        // Inline all CSS so pages have zero render-blocking requests.
        inlineStylesheets: "always",
    },

    prefetch: {
        prefetchAll: true,
        defaultStrategy: "hover",
    },

    fonts: [
        {
            provider: fontProviders.local(),
            name: "Bricolage Grotesque",
            cssVariable: "--font-bricolage",
            fallbacks: ["sans-serif"],
            options: {
                variants: [
                    {
                        src: ["./node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2"],
                        weight: "200 800",
                        style: "normal",
                        unicodeRange: [LATIN],
                    },
                    {
                        src: ["./node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-ext-wght-normal.woff2"],
                        weight: "200 800",
                        style: "normal",
                        unicodeRange: [LATIN_EXT],
                    },
                ],
            },
        },
    ],

    env: {
        schema: {
            RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
            CONTACT_TO_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
            CONTACT_FROM_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
});
