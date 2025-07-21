# Content Configuration Optimization Design

## Overview

This design optimizes the Nuxt Content configuration to maximize reusability, improve the Studio editing experience, and ensure proper component integration. The approach separates reusable data into dedicated collections while maintaining strong relationships between content types.

## Architecture

### Collection Structure

```
content/
├── index.md                    # Landing page (page type)
├── blog/
│   └── *.md                   # Blog posts (page type)
├── data/
│   ├── authors/
│   │   └── *.yml              # Author profiles (data type)
│   ├── testimonials/
│   │   └── *.yml              # Testimonial entries (data type)
│   ├── faqs/
│   │   └── *.yml              # FAQ items (data type)
│   ├── pricing-plans/
│   │   └── *.yml              # Pricing plans (data type)
│   ├── features/
│   │   └── *.yml              # Feature items (data type)
│   └── social-links/
│       └── *.yml              # Social media links (data type)
```

### Schema Design Principles

1. **Separation of Concerns**: Reusable content stored as data collections
2. **Reference-Based Relationships**: Use IDs/slugs to reference data collections
3. **Studio-Optimized Fields**: Leverage `.editor()` methods for better UX
4. **Component-Ready Structure**: Design schemas to work with Vue component slots

## Components and Interfaces

### Core Schema Utilities

```typescript
// Reusable schema builders
const createEnum = (options: [string, ...string[]]) => z.enum(options)
const createMediaField = (defaultValue?: string) => 
  z.string().url().editor({ input: "media" }).default(defaultValue || "")
const createIconField = () => 
  z.string().editor({ input: "icon" })
const createReferenceField = (collection: string) =>
  z.string().describe(`Reference to ${collection} collection`)
```

### Data Collection Schemas

#### Author Schema
```typescript
const authorSchema = z.object({
  slug: z.string().describe("Unique identifier for the author"),
  name: z.string().min(2).max(50),
  bio: z.string().max(500).default(""),
  avatar: createMediaField("/default-avatar.png"),
  email: z.string().email().optional(),
  socialLinks: z.array(z.object({
    platform: createEnum(["twitter", "linkedin", "github", "website"]),
    url: z.string().url(),
    icon: createIconField()
  })).default([])
})
```

#### Testimonial Schema
```typescript
const testimonialSchema = z.object({
  slug: z.string().describe("Unique identifier for the testimonial"),
  name: z.string().min(2).max(50),
  role: z.string().max(100),
  company: z.string().max(100),
  avatar: createMediaField(),
  content: z.string().min(10).max(500),
  rating: z.number().min(1).max(5).default(5),
  featured: z.boolean().default(false)
})
```

#### FAQ Schema
```typescript
const faqSchema = z.object({
  slug: z.string().describe("Unique identifier for the FAQ"),
  question: z.string().min(5).max(200),
  answer: z.string().min(10).max(1000),
  category: z.string().optional(),
  order: z.number().int().default(0)
})
```

#### Pricing Plan Schema
```typescript
const pricingPlanSchema = z.object({
  slug: z.string().describe("Unique identifier for the pricing plan"),
  name: z.string().min(2).max(50),
  description: z.string().max(200),
  price: z.string(),
  billingPeriod: createEnum(["monthly", "yearly", "one-time"]),
  features: z.array(z.string()),
  highlighted: z.boolean().default(false),
  buttonText: z.string().default("Get Started"),
  buttonLink: z.string().url()
})
```

### Page Collection Schemas

#### Landing Page Schema
```typescript
const landingPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  hero: z.object({
    heading: z.string(),
    subheading: z.string(),
    image: createMediaField(),
    cta: z.array(z.object({
      label: z.string(),
      to: z.string(),
      variant: createEnum(["primary", "secondary"])
    }))
  }),
  // Reference-based sections
  featuredTestimonials: z.array(createReferenceField("testimonials")).default([]),
  pricingPlans: z.array(createReferenceField("pricing-plans")).default([]),
  faqs: z.array(createReferenceField("faqs")).default([])
})
```

#### Blog Post Schema
```typescript
const blogPostSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().max(300),
  featuredImage: createMediaField(),
  author: createReferenceField("authors"),
  publishedAt: z.date(),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  draft: z.boolean().default(false)
})
```

## Data Models

### Collection Definitions

```typescript
export default defineContentConfig({
  collections: {
    // Data Collections (reusable content)
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
      source: 'data/pricing-plans/**/*.yml',
      schema: pricingPlanSchema
    }),
    
    // Page Collections
    landing: defineCollection({
      type: 'page',
      source: 'index.{md,yml}',
      schema: landingPageSchema
    }),
    
    posts: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: blogPostSchema
    })
  }
})
```

### Component Integration

#### Content Component Structure
```vue
<!-- components/content/TestimonialSection.vue -->
<template>
  <section class="testimonials">
    <div class="container">
      <h2 v-if="$slots.title">
        <slot name="title" mdc-unwrap="p" />
      </h2>
      <p v-if="$slots.description" class="description">
        <slot name="description" mdc-unwrap="p" />
      </p>
      <div class="testimonials-grid">
        <TestimonialCard 
          v-for="testimonial in testimonials" 
          :key="testimonial.slug"
          :testimonial="testimonial"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  testimonialRefs?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  testimonialRefs: () => []
})

// Query testimonials based on references
const { data: testimonials } = await useAsyncData('testimonials', () => {
  if (props.testimonialRefs.length === 0) {
    return queryCollection('testimonials').where('featured', '=', true).all()
  }
  return queryCollection('testimonials')
    .where('slug', 'IN', props.testimonialRefs)
    .all()
})
</script>
```

#### MDC Usage Example
```markdown
::testimonial-section{:testimonial-refs='["john-doe", "jane-smith"]'}
#title
What Our Clients Say

#description
Don't just take our word for it - hear from our satisfied customers.
::
```

## Error Handling

### Reference Validation
- Implement validation for collection references
- Provide fallback content when referenced items don't exist
- Log warnings for broken references during build

### Schema Validation
- Use Zod's built-in validation for all fields
- Provide clear error messages for invalid data
- Implement custom validation for complex relationships

## Testing Strategy

### Schema Testing
- Unit tests for schema validation
- Integration tests for collection queries
- Reference integrity tests

### Component Testing
- Test component rendering with various prop combinations
- Test slot content rendering
- Test MDC syntax integration

### Studio Integration Testing
- Verify form generation for all schema types
- Test media and icon picker integration
- Validate reference field behavior

## Performance Considerations

### Query Optimization
- Use `select()` to limit fields in queries
- Implement pagination for large collections
- Cache frequently accessed data

### Build Optimization
- Lazy load non-critical data collections
- Optimize image assets automatically
- Minimize bundle size through selective imports