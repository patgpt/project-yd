<template>
  <VCard
    :to="post.path"
    class="d-flex flex-column"
    height="100%"
    hover
    variant="elevated"
    elevation="2"
    :aria-label="`Read blog post: ${post.title}`"
  >
    <VImg
      v-if="post.featuredImage"
      :src="post.featuredImage"
      :alt="`Featured image for ${post.title}`"
      height="200"
      cover
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <VProgressCircular indeterminate color="grey-lighten-4" />
        </div>
      </template>
    </VImg>

    <VCardItem>
      <VCardTitle class="text-h6" :title="post.title">{{
        post.title
      }}</VCardTitle>
      <VCardSubtitle class="mt-1">
        <div class="d-flex align-center">
          <VAvatar size="20">
            <VImg
              :src="post.author?.avatar"
              :alt="`${post.author?.name} avatar`"
            />
          </VAvatar>
          <span class="ml-2">{{ post.author?.name }}</span>
          <VDivider vertical class="mx-2" />
          <time v-if="post.date" :datetime="post.date">
            {{ formatDate(post.date) }}
          </time>
        </div>
      </VCardSubtitle>
    </VCardItem>

    <VCardText class="flex-grow-1">
      {{ post.description }}
    </VCardText>

    <VCardActions class="px-4 pb-4">
      <VSpacer />
      <VBtn
        color="primary"
        variant="text"
        size="small"
        append-icon="mdi-arrow-right"
      >
        Read More
      </VBtn>
    </VCardActions>
  </VCard>
</template>
<script lang="ts" setup>
import type { PostsCollectionItem } from "@nuxt/content";

interface PostCardProps {
  post: PostsCollectionItem;
}

defineProps<PostCardProps>();

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}
</script>
