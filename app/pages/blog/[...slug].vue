<template>
  <VContainer d-flex justify-center align-with-title class="d-flex flex-column">
    <ContentRenderer v-if="post" :value="post" />
    <div v-else>No posts homie</div>
  </VContainer>
</template>
<script lang="ts" setup>
import { ContentRenderer } from "#components";
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection("posts").path(route.path).first();
});
</script>
