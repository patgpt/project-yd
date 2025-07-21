<template>
  <div>
    <HeroParallaxPageHero
      v-if="page"
      :background-image-url="page.featuredImage"
      :heading="page.title"
      :subheading="page.description"
    />
    <VContainer
      d-flex
      justify-center
      align-with-title
      class="d-flex flex-column"
    >
      <ContentRenderer v-if="page" :value="page" />
      <div v-else>About not found</div>
    </VContainer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: page } = useAsyncData(route.path, () => {
  return queryCollection("landing").path(route.path).first();
});
if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}
const HeroParallaxPageHero = defineAsyncComponent(
  () => import("../../components/hero/ParallaxPageHero.vue"),
);
</script>
