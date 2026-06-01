import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.coerce.date(),
		category: z.string(),
		postId: z.number(),
		slug: z.string(),
		heroImage: z.string().optional(),
		heroImageCredit: z.string().optional(),
	}),
});

export const collections = { blog };
