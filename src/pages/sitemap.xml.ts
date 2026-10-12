import type { APIRoute } from "astro";
import { absoluteUrl, locales, routes, unlistedRoutes, type Alternates, type RouteKey } from "~/config/routes";
import { site } from "~/config/site";
import { getPosts, getProjects, getRoles, postPath, projectAlternates, rolePath, translatedAlternates } from "~/lib/content";

interface Entry {
    alternates: Partial<Alternates>;
    lastmod?: Date;
}

const url = (pathname: string) => absoluteUrl(pathname, site.url);

/** Hand-built so every URL lists its translations (hreflang), including translated slugs. */
export const GET: APIRoute = async () => {
    const entries: Entry[] = [];

    for (const key of Object.keys(routes) as RouteKey[]) {
        if (!unlistedRoutes.includes(key)) entries.push({ alternates: routes[key] });
    }

    for (const project of await getProjects()) entries.push({ alternates: projectAlternates(project) });

    const posts = await getPosts();
    for (const post of posts) {
        entries.push({
            alternates: translatedAlternates(post, posts, postPath),
            lastmod: post.data.updated ?? post.data.published,
        });
    }

    const roles = await getRoles();
    for (const role of roles) entries.push({ alternates: translatedAlternates(role, roles, rolePath) });

    // Each translation is its own <url>; collapse duplicates produced by translated entries.
    const seen = new Set<string>();
    const urls = entries.flatMap(({ alternates, lastmod }) =>
        locales
            .filter((lang) => alternates[lang] && !seen.has(alternates[lang]!))
            .map((lang) => {
                seen.add(alternates[lang]!);
                const links = locales
                    .filter((other) => alternates[other])
                    .map((other) => `<xhtml:link rel="alternate" hreflang="${other}" href="${url(alternates[other]!)}"/>`);
                if (links.length > 1) {
                    links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${url((alternates.ro ?? alternates.en)!)}"/>`);
                }
                return [
                    "<url>",
                    `<loc>${url(alternates[lang]!)}</loc>`,
                    lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : "",
                    ...(links.length > 1 ? links : []),
                    "</url>",
                ].join("");
            }),
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

    return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
