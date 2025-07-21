# Implementation Plan

## Overview

This implementation plan converts the current monolithic content configuration into a modular, reusable system optimized for Nuxt Studio editing. Tasks are organized to build incrementally from core utilities to complete integration.

## Tasks

- [ ] 1. Create core schema utilities and helpers
  - Create reusable schema builder functions for common patterns
  - Implement media, icon, and reference field helpers
  - Set up enum creation utilities for consistent dropdown options
  - _Requirements: 2.1, 2.2, 2.3, 4.1_

- [ ] 2. Implement data collection schemas
  - [ ] 2.1 Create author data collection schema
    - Define author schema with slug, name, bio, avatar, and social links
    - Configure Studio form inputs for media picker (avatar) and icon picker (social links)
    - Set up validation rules for required fields and data types
    - _Requirements: 1.1, 1.4, 2.1, 2.2, 2.3_

  - [ ] 2.2 Create testimonial data collection schema
    - Define testimonial schema with slug, name, role, company, content, and rating
    - Configure media picker for avatar field
    - Add featured flag for easy filtering
    - _Requirements: 1.1, 1.2, 2.1, 2.2_

  - [ ] 2.3 Create FAQ data collection schema
    - Define FAQ schema with slug, question, answer, category, and order
    - Set up proper field lengths and validation
    - Configure category enum for consistent categorization
    - _Requirements: 1.1, 1.2, 2.1, 2.4_

  - [ ] 2.4 Create pricing plan data collection schema
    - Define pricing plan schema with slug, name, description, price, and features
    - Configure billing period enum and feature array management
    - Add highlighted flag and button configuration
    - _Requirements: 1.1, 1.3, 2.1, 2.4, 2.5_

- [ ] 3. Update page collection schemas to use references
  - [ ] 3.1 Refactor landing page schema
    - Replace inline testimonials with reference array to testimonials collection
    - Replace inline pricing with reference array to pricing-plans collection
    - Replace inline FAQs with reference array to faqs collection
    - Maintain hero section as inline content for page-specific customization
    - _Requirements: 1.1, 1.2, 1.3, 5.1, 5.2_

  - [ ] 3.2 Refactor blog post schema
    - Replace inline author object with reference to authors collection
    - Simplify schema by removing redundant nested objects
    - Maintain SEO fields as inline content for post-specific optimization
    - _Requirements: 1.4, 5.1, 4.1_

- [ ] 4. Create Vue components with slot support
  - [ ] 4.1 Create TestimonialSection component
    - Implement component that accepts testimonial references as props
    - Add slots for title and description with mdc-unwrap support
    - Query testimonials collection based on provided references
    - Handle fallback to featured testimonials when no references provided
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 4.2 Create PricingSection component
    - Implement component that accepts pricing plan references as props
    - Add slots for section title and description
    - Query pricing-plans collection and render pricing cards
    - Support highlighting of specific plans
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 4.3 Create FAQSection component
    - Implement component that accepts FAQ references as props
    - Add slots for section title and description
    - Query faqs collection and render accordion-style FAQ items
    - Support category-based filtering
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [ ] 4.4 Create AuthorCard component
    - Implement component that accepts author reference as prop
    - Query authors collection for author details
    - Render author information with avatar, bio, and social links
    - Handle missing author references gracefully
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 5. Update content.config.ts with new schema structure
  - Replace existing monolithic schemas with modular data and page collections
  - Configure proper source paths for data collections in data/ directory
  - Set up collection relationships and reference validation
  - Test schema validation with sample content
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3_

- [ ] 6. Create sample data files for testing
  - [ ] 6.1 Create sample author YAML files
    - Create 2-3 sample authors with complete profile information
    - Include avatar images and social media links
    - Test Studio form editing experience
    - _Requirements: 1.4, 2.1, 2.2, 2.3_

  - [ ] 6.2 Create sample testimonial YAML files
    - Create 5-6 sample testimonials with varied content
    - Include customer avatars and company information
    - Mark some as featured for default display
    - _Requirements: 1.1, 1.2, 2.1, 2.2_

  - [ ] 6.3 Create sample FAQ YAML files
    - Create 8-10 sample FAQ items covering common questions
    - Organize into categories for better management
    - Set appropriate order values for display sequence
    - _Requirements: 1.1, 1.2, 2.1, 2.4_

  - [ ] 6.4 Create sample pricing plan YAML files
    - Create 3-4 pricing tiers with different feature sets
    - Configure one plan as highlighted/recommended
    - Include proper pricing and billing information
    - _Requirements: 1.1, 1.3, 2.1, 2.4, 2.5_

- [ ] 7. Update existing content files to use new schema
  - [ ] 7.1 Update landing page content
    - Replace inline testimonials with references to testimonial slugs
    - Replace inline pricing with references to pricing plan slugs
    - Replace inline FAQs with references to FAQ slugs
    - Test content rendering with new component structure
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 7.2 Update blog post content
    - Replace inline author objects with author slug references
    - Verify author information displays correctly
    - Test author card component integration
    - _Requirements: 5.1, 5.4_

- [ ] 8. Test Studio integration and form generation
  - Verify all data collections generate proper Studio forms
  - Test media picker functionality for avatar and image fields
  - Test icon picker functionality for social media and feature icons
  - Validate enum dropdowns render correctly
  - Test array field management for features and social links
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 9. Implement query optimization and performance enhancements
  - Add selective field querying using select() method
  - Implement caching for frequently accessed data collections
  - Optimize component queries to minimize database calls
  - Test performance with larger datasets
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 10. Create documentation and usage examples
  - Document the new schema structure and relationships
  - Create examples of component usage in Markdown files
  - Document Studio editing workflows for content editors
  - Provide migration guide from old schema structure
  - _Requirements: 4.4, 3.5_