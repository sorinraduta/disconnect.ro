import { absoluteUrl, routes, type Locale, type RouteKey } from "~/config/routes";
import { seo } from "~/config/seo";
import { site } from "~/config/site";
import { faq } from "~/data/faq";
import { services, websiteFeatures } from "~/data/services";
import { entryLang, getPosts, getProjects, postPath, projectPath } from "~/lib/content";

/** Builders for /llms.txt and /llms-full.txt (https://llmstxt.org): a plain-text map of the site for AI assistants. */

const url = (pathname: string) => absoluteUrl(pathname, site.url);

const listed: RouteKey[] = ["home", "services", "portfolio", "about", "blog", "careers", "faq", "contact"];
const legal: RouteKey[] = ["terms", "privacy"];

const pageLinks = (keys: RouteKey[], lang: Locale) =>
    keys.map((key) => `- [${seo.pages[key][lang].title}](${url(routes[key][lang])}): ${seo.pages[key][lang].description}`);

const facts = () =>
    [
        `- Name: ${site.name}${site.company.legalName ? ` (${site.company.legalName})` : ""}`,
        `- Type: digital studio (web development, design, SEO/AEO/GEO, digital marketing)`,
        `- Audience: small and mid-sized businesses (main focus), also large companies`,
        `- Languages: Romanian, English`,
        `- Area served: Romania and abroad, remote`,
        `- Email: ${site.email}`,
        site.phone && `- Phone: ${site.phone}`,
        site.address.city && `- Location: ${[site.address.city, site.address.country].join(", ")}`,
        `- Website: ${url("/")}`,
    ].filter(Boolean);

export const buildLlmsTxt = async () => {
    const posts = await getPosts();
    const postLines = (lang: Locale) =>
        posts.filter((post) => entryLang(post) === lang).map((post) => `- [${post.data.title}](${url(postPath(post))}): ${post.data.description}`);

    return [
        `# ${site.name}`,
        "",
        `> ${seo.pages.home.en.description}`,
        "",
        `${site.name} is a digital studio and long-term partner, not a vendor: one team that handles everything digital for a business, from identity and code to campaigns and growth.`,
        "",
        "## Key facts",
        ...facts(),
        "",
        "## Services",
        ...services.map((service) => `- ${service.title.en}: ${service.description.en}`),
        "",
        "## Pages (English)",
        ...pageLinks(listed, "en"),
        "",
        "## Pagini (Română)",
        ...pageLinks(listed, "ro"),
        "",
        "## Blog",
        ...postLines("en"),
        ...postLines("ro"),
        "",
        "## Optional",
        `- [Full content for LLMs](${url("/llms-full.txt")}): services, FAQ and articles in one file`,
        ...pageLinks(legal, "en"),
        ...pageLinks(legal, "ro"),
        "",
    ].join("\n");
};

export const buildLlmsFullTxt = async () => {
    const posts = await getPosts();
    const projects = await getProjects();

    const section = (lang: Locale) => {
        const ro = lang === "ro";
        return [
            `## ${ro ? "Servicii" : "Services"}`,
            "",
            ...services.flatMap((service) => [
                `### ${service.title[lang]}`,
                service.description[lang],
                ...service.items.map((item) => `- ${item.label[lang]}${item.detail ? ` (${item.detail[lang]})` : ""}`),
                "",
            ]),
            `### ${ro ? "Inclus în fiecare website" : "Included in every website"}`,
            ...websiteFeatures.map((group) => `- ${group.title[lang]}: ${group.features.map((feature) => feature.label[lang]).join(", ")}`),
            "",
            `## ${ro ? "Portofoliu" : "Portfolio"}`,
            "",
            ...projects.map(
                (project) =>
                    `- [${project.data.name}](${url(projectPath(project, lang))})${project.data.concept ? " (concept)" : ""}${project.data.comingSoon ? (ro ? " (în curând)" : " (coming soon)") : ""}: ${project.data.summary[lang]}`,
            ),
            "",
            `## ${ro ? "Întrebări frecvente" : "Frequently asked questions"}`,
            "",
            ...faq[lang].flatMap((item) => [`### ${item.question}`, item.answer, ""]),
            `## ${ro ? "Articole" : "Articles"}`,
            "",
            ...posts
                .filter((post) => entryLang(post) === lang)
                .flatMap((post) => [`### ${post.data.title}`, `URL: ${url(postPath(post))}`, "", (post.body ?? "").trim(), ""]),
        ];
    };

    return [
        `# ${site.name}`,
        "",
        `> ${seo.pages.home.en.description}`,
        "",
        "## Key facts",
        ...facts(),
        "",
        "---",
        "",
        "# English",
        "",
        ...section("en"),
        "---",
        "",
        "# Română",
        "",
        ...section("ro"),
    ].join("\n");
};
