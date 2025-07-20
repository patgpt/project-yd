<template>
  <ContentRenderer v-if="post" :value="post" />
  <div v-else>Post not found</div>
</template>
<script lang="ts" setup>
import { ContentRenderer } from "#components";
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection("posts").path(route.path).first();
});
</script>
