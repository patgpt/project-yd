import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// ===== CORE SCHEMA UTILITIES =====

const createEnum = <T extends readonly [string, ...string[]]>(options: T) => 
  z.enum(options);

const createMediaField = (defaultValue = "") => 
  z.string().url().editor({ input: "media" }).default(defaultValue);

const createIconField = () => 
  z.string().editor({ input: "icon" });

const createReferenceField = (collection: string) =>
  z.string().describe(`Reference to ${collection} collection`);

const createReferenceArrayField = (collection: string) =>
  z.array(z.string()).describe(`Array of references to ${collection} collection`).default([]);

// ===== REUSABLE SCHEMAS =====

const createLinkSchema = () =>
  z.object({
    label: z.string().min(1, "Label is required"),
    to: z.string().min(1, "URL is required"),
    icon: createIconField().optional(),
    target: createEnum(["_blank", "_self"]).optional(),
    variant: createEnum(["primary", "secondary", "outline", "ghost"]).optional(),
  });

// ===== DATA COLLECTION SCHEMAS =====

const authorSchema = z.object({
  slug: z.string().describe("Unique identifier for the author"),
  name: z.string().min(2).max(50),
  bio: z.string().max(500).default(""),
  avatar: createMediaField("/default-avatar.png"),
  email: z.string().email().optional(),
  socialLinks: z.array(z.object({
    platform: createEnum([
      "twitter", "x", "linkedin", "github", "website", 
      "facebook", "instagram", "youtube", "tiktok"
    ]),
    url: z.string().url(),
    icon: createIconField()
  })).default([])
});

const testimonialSchema = z.object({
  slug: z.string().describe("Unique identifier for the testimonial"),
  name: z.string().min(2).max(50),
  role: z.string().max(100),
  company: z.string().max(100),
  avatar: createMediaField(),
  content: z.string().min(10).max(500),
  rating: z.number().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  order: z.number().int().default(0)
});

const faqSchema = z.object({
  slug: z.string().describe("Unique identifier for the FAQ"),
  question: z.string().min(5).max(200),
  answer: z.string().min(10).max(1000),
  category: z.string().optional(),
  order: z.number().int().default(0),
  featured: z.boolean().default(false)
});

const pricingPlanSchema = z.object({
  slug: z.string().describe("Unique identifier for the pricing plan"),
  name: z.string().min(2).max(50),
  description: z.string().max(200),
  price: z.string(),
  billingPeriod: createEnum(["monthly", "yearly", "one-time"]),
  billingCycle: z.string().default("month"),
  features: z.array(z.string()),
  highlighted: z.boolean().default(false),
  popular: z.boolean().default(false),
  buttonText: z.string().default("Get Started"),
  buttonLink: z.string().url(),
  order: z.number().int().default(0)
});

const featureSchema = z.object({
  slug: z.string().describe("Unique identifier for the feature"),
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  icon: createIconField(),
  image: createMediaField().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0)
});

const socialLinkSchema = z.object({
  slug: z.string().describe("Unique identifier for the social link"),
  platform: createEnum([
    "facebook", "twitter", "x", "linkedin", "instagram", 
    "github", "youtube", "tiktok", "discord"
  ]),
  url: z.string().url(),
  icon: createIconField(),
  label: z.string().optional()
});

// ===== PAGE COLLECTION SCHEMAS =====

const seoSchema = z.object({
  title: z.string().max(60).optional(),
  description: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: createMediaField().optional(),
  twitterImage: createMediaField().optional(),
  canonical: z.string().url().optional(),
  robots: z.object({
    index: z.boolean().default(true),
    follow: z.boolean().default(true),
    noarchive: z.boolean().default(false),
    nosnippet: z.boolean().default(false),
  }).default({
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
  })
}).default({});

const heroSchema = z.object({
  heading: z.string().min(5).max(100),
  subheading: z.string().min(10).max(300),
  image: createMediaField(),
  avatar: createMediaField().optional(),
  cta: z.array(createLinkSchema()).default([])
});

// Landing page schema using references
const landingPageSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(300),
  featuredImage: createMediaField("/hero.png"),
  hero: heroSchema,
  
  // Reference-based sections for reusability
  featuredTestimonials: createReferenceArrayField("testimonials"),
  pricingPlans: createReferenceArrayField("pricingPlans"),
  featuredFaqs: createReferenceArrayField("faqs"),
  featuredFeatures: createReferenceArrayField("features"),
  socialLinks: createReferenceArrayField("socialLinks"),
  
  seo: seoSchema
});

// Blog post schema with author reference
const blogPostSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().max(300),
  featuredImage: createMediaField("/hero.png"),
  
  // Temporary: Allow inline author object until we migrate to references
  author: z.union([
    createReferenceField("authors"),
    z.object({
      name: z.string(),
      bio: z.string().optional(),
      avatar: z.string().optional(),
      socialLinks: z.array(z.object({
        platform: z.string(),
        icon: z.string(),
        url: z.string().url()
      })).optional()
    })
  ]),
  
  date: z.string().optional(), // Use string for now to avoid date parsing issues
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  readingTime: z.string().optional().editor({ hidden: true }),
  
  seo: seoSchema
});

// ===== COLLECTION DEFINITIONS =====

export default defineContentConfig({
  collections: {
    // ===== DATA COLLECTIONS (Reusable Content) =====
    
    authors: defineCollection({
      type: 'data',
      source: 'data/authors/**/*.yml',
      schema: authorSchema
    }),
    
    testimonials: defineCollection({
      type: 'data',
      source: 'data/testimonials/**/*.yml',
      schema: testimonialSchema
    }),
    
    faqs: defineCollection({
      type: 'data',
      source: 'data/faqs/**/*.yml',
      schema: faqSchema
    }),
    
    pricingPlans: defineCollection({
      type: 'data',
      source: 'data/pricingPlans/**/*.yml',
      schema: pricingPlanSchema
    }),
    
    features: defineCollection({
      type: 'data',
      source: 'data/features/**/*.yml',
      schema: featureSchema
    }),
    
    socialLinks: defineCollection({
      type: 'data',
      source: 'data/socialLinks/**/*.yml',
      schema: socialLinkSchema
    }),
    
    // ===== PAGE COLLECTIONS =====
    
    landing: defineCollection({
      type: 'page',
      source: 'index.{md,yml}',
      schema: landingPageSchema
    }),
    
    posts: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: blogPostSchema
    }),
    
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
      schema: z.object({
        title: z.string().min(5).max(100),
        description: z.string().max(300),
        featuredImage: createMediaField().optional(),
        seo: seoSchema
      })
    })
  }
});