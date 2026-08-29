import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'zod'; // <-- Mengimpor langsung dari zod agar huruf 'z' tidak dicoret lagi

const products = defineCollection({
  loader: file("src/content/products/list.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['hydraulic', 'pneumatic', 'services']),
    image: z.string(),
    specification: z.array(z.string()).optional(),
    ctaLink: z.string()
  })
});

export const collections = { products };
