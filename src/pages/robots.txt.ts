import type { APIRoute } from "astro";
import { site } from "~/config/site";

// AI crawlers are welcome: being quoted by assistants is part of GEO.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"];

export const GET: APIRoute = () => {
    const body = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        "",
        ...aiCrawlers.flatMap((bot) => [`User-agent: ${bot}`, "Allow: /", "Disallow: /api/", ""]),
        `Sitemap: ${new URL("/sitemap.xml", site.url).href}`,
        "",
    ].join("\n");

    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
