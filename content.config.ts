import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const createEnum = (options: [string, ...string[]]) => z.enum(options);

const createBaseSchema = () =>
  z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
  });

const createLinkSchema = () =>
  z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    icon: z.string().optional().editor({ input: "icon" }),
    trailing: z.boolean().optional(),
    target: createEnum(["_blank", "_self"]),
    color: createEnum([
      "primary",
      "secondary",
      "accent",
      "error",
      "warning",
      "success",
      "info",
    ]),
    variant: createEnum([
      "raised",
      "outline",
      "text",
      "tonal",
      "flat",
    ]).optional(),
  });

const createHeroSchema = () =>
  createBaseSchema().extend({
    heading: z.string().nonempty(),
    subheading: z.string().nonempty(),
    image: z.string().url().nonempty().editor({ input: "media" }),
    avatar: z.string().url().nonempty().editor({ input: "media" }),
    cta: z.array(createLinkSchema()).optional(),
  });

const createTestimonialsSchema = () =>
  createBaseSchema().extend({
    testimonials: z.array(
      z.object({
        name: z.string().nonempty(),
        role: z.string().nonempty(),
        company: z.string().nonempty(),
        image: z.string().url().nonempty().editor({ input: "media" }),
        content: z.string().min(10).max(500).nonempty(),
      }),
    ),
  });

const createPricingSchema = () =>
  createBaseSchema().extend({
    plans: z.array(
      createBaseSchema().extend({
        price: z.string().nonempty(),
        button: createLinkSchema(),
        features: z.array(z.string().nonempty()),
        highlight: z.boolean().optional(),
        billing_period: z.string().nonempty(),
        billing_cycle: z.string().nonempty(),
      }),
    ),
  });

const createFeaturesSchema = () =>
  createBaseSchema().extend({
    features: z.array(
      z.object({
        icon: z.string().url().nonempty().editor({ input: "icon" }),
        title: z.string().nonempty(),
        description: z.string().min(10).max(500).nonempty(),
      }),
    ),
  });

const createSocialLinkSchema = () =>
  createBaseSchema().extend({
    icon: z.string().url().nonempty().editor({ input: "icon" }),
    link: z.string().url().nonempty(),
    platform: createEnum([
      "facebook",
      "twitter",
      "linkedin",
      "instagram",
      "x",
      "github",
      "youtube",
      "tiktok",
    ]),
  });

const createFrequentlyAskedQuestionsSchema = () =>
  createBaseSchema().extend({
    questions: z.array(
      z.object({
        question: z.string().nonempty(),
        answer: z.string().min(10).max(500).nonempty(),
      }),
    ),
  });

const createProcessSchema = () =>
  createBaseSchema().extend({
    steps: z.array(
      z.object({
        image: z.string().url().nonempty().editor({ input: "media" }),
        order: z.number().int().positive(),
        step: createEnum(["Discovery", "Design", "Development", "Deployment"]),
        title: z.string().nonempty(),
        description: z.string().min(10).max(500).nonempty(),
      }),
    ),
  });

const createCtaSchema = () =>
  createBaseSchema().extend({
    title: z.string().nonempty(),
    description: z.string().min(10).max(500).nonempty(),
    button: createLinkSchema(),
  });

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: "page",
      source: "index.md",
      schema: createBaseSchema().extend({
        featuredImage: z.string().url().default("/hero.png"),
        hero: createHeroSchema(),
        pricing: createPricingSchema(),
        features: createFeaturesSchema(),
        testimonials: createTestimonialsSchema(),
        process: createProcessSchema(),
        socialMediaSection: createSocialLinkSchema(),
        frequentlyAskedQuestions: createFrequentlyAskedQuestionsSchema(),
        cta: createCtaSchema(),
      }),
    }),
    posts: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: z.object({
        title: z.string().min(2).max(80).default("Untitled Post"),
        description: z.string().max(220).default(""),
        featuredImage: z.string().url().default("/hero.png"),
        content: z.string().min(10).max(5000).default(""),
      }),
    }),
  },
});
