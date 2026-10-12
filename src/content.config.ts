import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const localized = z.object({ ro: z.string(), en: z.string() });

/** Blog posts live in blog/<locale>/<slug>.md. Matching posts share a translationKey. */
const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string().max(80),
        description: z.string().max(170),
        published: z.coerce.date(),
        updated: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        translationKey: z.string(),
        draft: z.boolean().default(false),
    }),
});

/** One JSON file per project, translated fields inline. Set `concept: true` for non-client work. */
const portfolio = defineCollection({
    loader: glob({ pattern: "*.json", base: "./src/content/portfolio" }),
    schema: z.object({
        order: z.number(),
        name: z.string(),
        concept: z.boolean().default(false),
        year: z.number(),
        url: z.url().optional(),
        industry: localized,
        title: localized,
        summary: localized,
        services: z.array(z.enum(["web", "design", "seo", "marketing"])),
        colors: z.object({ bg: z.string(), fg: z.string(), accent: z.string() }),
        challenge: localized,
        solution: localized,
        results: z.array(localized),
        draft: z.boolean().default(false),
    }),
});

/** Open roles live in careers/<locale>/<slug>.md. */
const careers = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/careers" }),
    schema: z.object({
        title: z.string(),
        description: z.string().max(170),
        type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACTOR", "INTERN"]),
        remote: z.boolean().default(true),
        location: z.string(),
        published: z.coerce.date(),
        validThrough: z.coerce.date().optional(),
        translationKey: z.string(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { blog, portfolio, careers };
