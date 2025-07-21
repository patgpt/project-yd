<template>
  <VContainer d-flex justify-center align-with-title class="d-flex flex-column">
    <h2 class="text-xl-center mb-4">Blog</h2>
    <p class="text-muted text-center mb-6">
      Welcome to our blog! Here you will find the latest updates, insights, and
      stories from our team.
    </p>

    <!-- Render the first post as a featured post -->
    <ContentRenderer v-if="herpPost" :value="herpPost" />
    <!-- traverse the remaining posts -->
    <!-- Design a post card component -->
    <div v-for="post in posts" :key="post.id">
      <NuxtLink
        :to="`/blog/${post.stem}`"
        class="d-block mb-4 text-decoration-none"
      >
        <VCard class="pa-4">
          <VCardTitle class="text-h5 mb-2">{{ post.title }}</VCardTitle>
          <VCardSubtitle class="text-caption text-muted mb-2">
            <!-- {{ post.id | formatDate }} -->
          </VCardSubtitle>
          <VCardText class="text-body-2 text-muted">
            {{ post.description }}
          </VCardText>
          <VCardActions>
            <VBtn color="primary" variant="text">Read More</VBtn>
          </VCardActions>
        </VCard>
      </NuxtLink>
      <ContentRenderer :value="post" />
    </div>
    <!-- Here will be the pagination controls -->
  </VContainer>
</template>

<script lang="ts" setup>
const { data: pages } = useAsyncData("blog-page", () => {
  return queryCollection("posts").all();
});

if (!pages.value || pages.value.length === 0) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const herpPost = pages.value.at(0);
if (!herpPost) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
  });
}
const posts = pages.value;
</script>
