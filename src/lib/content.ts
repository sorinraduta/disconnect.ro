import { getCollection, type CollectionEntry } from "astro:content";
import { childPath, type Alternates, type Locale } from "~/config/routes";

export type Post = CollectionEntry<"blog">;
export type Project = CollectionEntry<"portfolio">;
export type Role = CollectionEntry<"careers">;

/** Entries in locale folders have ids like "ro/my-post". */
export const entryLang = (entry: Post | Role) => entry.id.split("/")[0] as Locale;
export const entrySlug = (entry: Post | Role) => entry.id.split("/").slice(1).join("/");

export const postPath = (post: Post) => childPath("blog", entryLang(post), entrySlug(post));
export const rolePath = (role: Role) => childPath("careers", entryLang(role), entrySlug(role));
export const projectPath = (project: Project, lang: Locale) => childPath("portfolio", lang, project.id);

export const getPosts = async (lang?: Locale) =>
    (await getCollection("blog", (post) => !post.data.draft && (!lang || entryLang(post) === lang))).sort(
        (a, b) => b.data.published.getTime() - a.data.published.getTime(),
    );

export const getRoles = async (lang?: Locale) =>
    (await getCollection("careers", (role) => !role.data.draft && (!lang || entryLang(role) === lang))).sort(
        (a, b) => b.data.published.getTime() - a.data.published.getTime(),
    );

export const getProjects = async () =>
    (await getCollection("portfolio", (project) => !project.data.draft)).sort((a, b) => a.data.order - b.data.order);

/** Paths of the same entry in every locale it was translated to. */
export const translatedAlternates = <T extends Post | Role>(
    entry: T,
    all: T[],
    toPath: (entry: T) => string,
): Partial<Alternates> =>
    Object.fromEntries(
        all
            .filter((other) => other.data.translationKey === entry.data.translationKey)
            .map((other) => [entryLang(other), toPath(other)]),
    );

export const projectAlternates = (project: Project): Alternates => ({
    ro: projectPath(project, "ro"),
    en: projectPath(project, "en"),
});

export const wordCount = (text = "") => text.split(/\s+/).filter(Boolean).length;

export const readingMinutes = (text = "") => Math.max(1, Math.round(wordCount(text) / 220));
