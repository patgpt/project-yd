<template>
  <VContainer d-flex justify-center align-with-title class="d-flex flex-column">
    <ContentRenderer v-if="page" :value="page" />
    <div v-else>About not found</div>
  </VContainer>
</template>

<script lang="ts" setup>
const { data: page } = useAsyncData("about-page", () => {
  return queryCollection("landing").first();
});
if (!page) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}
</script>
