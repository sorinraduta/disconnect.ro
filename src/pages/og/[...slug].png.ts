import type { APIRoute, GetStaticPaths } from "astro";
import { locales, routes, unlistedRoutes, type RouteKey } from "~/config/routes";
import { seo } from "~/config/seo";
import { useTranslations } from "~/i18n/ui";
import { entryLang, entrySlug, getPosts, getProjects } from "~/lib/content";
import { renderOgImage, type OgInput } from "~/lib/og";

/** One Open Graph image per page, rendered at build time: /og/<lang>/<page>.png */

const homeHeadline = { ro: "Tot ce ține de digital. Un singur partener.", en: "Everything digital. One partner." };

export const getStaticPaths = (async () => {
    const paths: { params: { slug: string }; props: OgInput }[] = [];

    for (const lang of locales) {
        const t = useTranslations(lang);
        const keys = (Object.keys(routes) as RouteKey[]).filter((key) => !unlistedRoutes.includes(key));
        for (const key of keys) {
            const isHome = key === "home";
            paths.push({
                params: { slug: `${lang}/${key}` },
                props: {
                    title: isHome ? homeHeadline[lang] : seo.pages[key][lang].title,
                    eyebrow: isHome ? seo.tagline[lang] : t.nav[key as keyof typeof t.nav] ?? "Disconnect",
                },
            });
        }

        for (const project of await getProjects()) {
            paths.push({
                params: { slug: `${lang}/portfolio/${project.id}` },
                props: {
                    title: `${project.data.name} — ${project.data.title[lang]}`,
                    eyebrow: `${t.nav.portfolio}${project.data.concept ? ` · ${t.concept}` : ""}${project.data.comingSoon ? ` · ${t.comingSoon}` : ""}`,
                },
            });
        }
    }

    for (const post of await getPosts()) {
        paths.push({
            params: { slug: `${entryLang(post)}/blog/${entrySlug(post)}` },
            props: { title: post.data.title, eyebrow: `Blog · ${post.data.tags.slice(0, 2).join(" · ")}` },
        });
    }

    return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
    const png = await renderOgImage(props as OgInput);
    return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
