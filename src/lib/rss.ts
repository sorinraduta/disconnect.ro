import rss from "@astrojs/rss";
import { absoluteUrl, routes, type Locale } from "~/config/routes";
import { seo } from "~/config/seo";
import { site } from "~/config/site";
import { getPosts, postPath } from "~/lib/content";

export const blogFeed = async (lang: Locale) =>
    rss({
        title: `${site.name} Blog`,
        description: seo.pages.blog[lang].description,
        site: absoluteUrl(routes.blog[lang], site.url),
        items: (await getPosts(lang)).map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.published,
            link: postPath(post),
            categories: post.data.tags,
        })),
        customData: `<language>${lang}</language>`,
        trailingSlash: false,
    });
