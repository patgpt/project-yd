<template>
  <div v-if="page">
    <ContentHero
      v-if="page.hero"
      :value="page.hero"
      title="ok"
      :subtitle="page.hero.subheading"
      :bg="page.hero.image"
      :cta-link="page.cta.button.to"
      :avatar="page.hero.avatar"
      :cta-label="page.cta.button.label"
      :cta-color="page.cta.button.color"
      :cta-variant="page.cta.button.variant"
      :heading="page.hero.heading"
      :subheading="page.hero.subheading"
      :image="page.hero.image"
    />
    <ContentFeatures
      v-if="page.features"
      :items="page.features.items"
      :title="page.features.title"
      :description="page.features.description"
    />
    <ContentPricing
      v-if="page.pricing"
      :plans="page.pricing.plans"
      :title="page.pricing.title"
      :description="page.pricing.description"
    />
    <ContentTestimonials
      v-if="page.testimonials"
      :testimonials="page.testimonials.testimonials"
      :title="page.testimonials.title"
      :description="page.testimonials.description"
    />

    <ContentProcess
      v-if="page.process"
      :steps="page.process.steps"
      :title="page.process.title"
      :description="page.process.description"
    />
    <ContentFrequentlyAskedQuestions
      v-if="page.frequentlyAskedQuestions"
      :questions="page.frequentlyAskedQuestions.questions"
      :title="page.frequentlyAskedQuestions.title"
      :description="page.frequentlyAskedQuestions.description"
    />
    <ContentSocialMedia
      v-if="page.socialMediaSection"
      :social-links="page.socialMediaSection.links"
      :title="page.socialMediaSection.title"
      :description="page.socialMediaSection.description"
    />
    <ContentCta
      v-if="page.cta"
      :title="page.cta.title"
      :description="page.cta.description"
      :button="page.cta.button"
      :cta-link="page.cta.button.to"
      :cta-label="page.cta.button.label"
      :cta-color="page.cta.button.color"
      :cta-variant="page.cta.button.variant"
    />
  </div>

  <div v-else>Home not found</div>
</template>

<script lang="ts" setup>
const { data: page } = useAsyncData("landing-page", () => {
  return queryCollection("landing").first();
});
if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}
</script>
