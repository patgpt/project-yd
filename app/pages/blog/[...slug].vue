<template>
  <!-- Loading State -->
  <VContainer
    v-if="pending"
    class="d-flex justify-center align-center"
    style="min-height: 400px"
  >
    <VProgressCircular indeterminate color="primary" size="48">
      <template #default>Loading post...</template>
    </VProgressCircular>
  </VContainer>

  <!-- Error State -->
  <VContainer v-else-if="error" class="text-center py-16">
    <VIcon icon="mdi-alert-circle" size="64" class="mb-4 text-error" />
    <h1 class="text-h4 mb-4">Post Not Found</h1>
    <p class="text-body-1 text-medium-emphasis mb-6">
      Sorry, we couldn't find the post you were looking for.
    </p>
    <VBtn
      to="/blog"
      color="primary"
      variant="elevated"
      prepend-icon="mdi-arrow-left"
    >
      Back to Blog
    </VBtn>
  </VContainer>

  <!-- Content -->
  <article v-else-if="post">
    <VContainer class="py-8">
      <VRow>
        <!-- Main Content -->
        <VCol cols="12" lg="8">
          <VCard variant="flat" class="pa-6">
            <!-- Breadcrumbs -->
            <VBreadcrumbs
              :items="breadcrumbItems"
              class="px-0 mb-6"
              density="compact"
            >
              <template #prepend>
                <VIcon icon="mdi-home" size="small" />
              </template>
              <template #divider>
                <VIcon icon="mdi-chevron-right" size="small" />
              </template>
            </VBreadcrumbs>

            <!-- Featured Image -->
            <VImg
              v-if="post.featuredImage"
              :src="post.featuredImage"
              :alt="`Featured image for ${post.title}`"
              height="400"
              cover
              class="mb-8 rounded-lg"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.3)"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <VProgressCircular indeterminate color="grey-lighten-4" />
                </div>
              </template>
            </VImg>

            <!-- Post Header -->
            <header class="mb-8">
              <h1 class="text-h3 text-lg-h2 font-weight-bold mb-4">
                {{ post.title }}
              </h1>

              <!-- Post Meta -->
              <div class="d-flex align-center flex-wrap ga-4 mb-4">
                <VChip
                  variant="tonal"
                  color="primary"
                  prepend-avatar=""
                  class="px-2"
                >
                  <template #prepend>
                    <VAvatar size="24">
                      <VImg
                        :src="post.author?.avatar"
                        :alt="`${post.author?.name} avatar`"
                      />
                    </VAvatar>
                  </template>
                  {{ post.author?.name }}
                </VChip>

                <VChip variant="outlined" prepend-icon="mdi-calendar">
                  <time v-if="post.date" :datetime="post.date">
                    {{ formatDate(post.date) }}
                  </time>
                </VChip>

                <VChip
                  v-if="post.readingTime"
                  variant="outlined"
                  prepend-icon="mdi-clock-time-four-outline"
                >
                  {{ post.readingTime }} read
                </VChip>
              </div>

              <!-- Description -->
              <p
                v-if="post.description"
                class="text-h6 text-medium-emphasis mb-6"
              >
                {{ post.description }}
              </p>
            </header>

            <!-- Content -->
            <div class="post-content">
              <ContentRenderer :value="post" />
            </div>

            <!-- Post Footer -->
            <footer class="mt-12 pt-8 border-t">
              <VRow align="center">
                <VCol cols="auto">
                  <VBtn
                    to="/blog"
                    color="primary"
                    variant="outlined"
                    prepend-icon="mdi-arrow-left"
                  >
                    Back to Blog
                  </VBtn>
                </VCol>
                <VSpacer />
                <VCol cols="auto">
                  <div class="d-flex align-center ga-2">
                    <span class="text-body-2 text-medium-emphasis">Share:</span>
                    <VBtn
                      icon="mdi-twitter"
                      variant="text"
                      size="small"
                      color="primary"
                      :href="twitterShareUrl"
                      target="_blank"
                      :aria-label="`Share ${post.title} on Twitter`"
                    />
                    <VBtn
                      icon="mdi-linkedin"
                      variant="text"
                      size="small"
                      color="primary"
                      :href="linkedinShareUrl"
                      target="_blank"
                      :aria-label="`Share ${post.title} on LinkedIn`"
                    />
                  </div>
                </VCol>
              </VRow>
            </footer>
          </VCard>
        </VCol>

        <!-- Sidebar -->
        <VCol cols="12" lg="4">
          <div class="sticky-sidebar">
            <!-- Author Card -->
            <VCard variant="tonal" class="mb-6">
              <VCardItem class="pb-0">
                <div class="d-flex flex-column align-center text-center">
                  <VAvatar size="80" class="mb-4">
                    <VImg
                      :src="post.author?.avatar"
                      :alt="`${post.author?.name} avatar`"
                    />
                  </VAvatar>
                  <VCardTitle class="text-h6">
                    {{ post.author?.name }}
                  </VCardTitle>
                  <VCardSubtitle
                    v-if="post.author?.bio"
                    class="text-center mt-2"
                  >
                    {{ post.author.bio }}
                  </VCardSubtitle>
                </div>
              </VCardItem>

              <!-- Author Social Links -->
              <VCardActions
                v-if="post.author?.socialLinks?.length"
                class="justify-center pt-2"
              >
                <VBtn
                  v-for="social in post.author.socialLinks"
                  :key="social.platform"
                  :icon="social.icon"
                  :href="social.url"
                  target="_blank"
                  variant="text"
                  size="small"
                  :aria-label="`Visit ${post.author.name} on ${social.platform}`"
                />
              </VCardActions>
            </VCard>

            <!-- Tags -->
            <VCard v-if="post.tags?.length" variant="outlined" class="mb-6">
              <VCardItem>
                <VCardTitle class="text-h6 mb-4">Tags</VCardTitle>
                <div class="d-flex flex-wrap ga-2">
                  <VChip
                    v-for="tag in post.tags"
                    :key="tag"
                    color="primary"
                    variant="tonal"
                    size="small"
                    :to="`/blog?tag=${encodeURIComponent(tag)}`"
                  >
                    {{ tag }}
                  </VChip>
                </div>
              </VCardItem>
            </VCard>

            <!-- Table of Contents -->
            <VCard
              v-if="post.body?.toc?.links?.length"
              variant="outlined"
              class="mb-6"
            >
              <VCardItem>
                <VCardTitle class="text-h6 mb-4">
                  <VIcon icon="mdi-format-list-bulleted" class="mr-2" />
                  Table of Contents
                </VCardTitle>
                <VList
                  density="compact"
                  nav
                  class="py-0"
                  bg-color="transparent"
                >
                  <VListItem
                    v-for="link in post.body.toc.links"
                    :key="link.id"
                    :href="`#${link.id}`"
                    :title="link.text"
                    rounded="xl"
                    class="mb-1"
                  >
                    <template #prepend>
                      <VIcon
                        icon="mdi-pound"
                        size="small"
                        class="text-medium-emphasis"
                      />
                    </template>
                    <VListItemTitle class="text-body-2">
                      {{ link.text }}
                    </VListItemTitle>
                  </VListItem>
                </VList>
              </VCardItem>
            </VCard>

            <!-- Categories -->
            <VCard v-if="post.categories?.length" variant="outlined">
              <VCardItem>
                <VCardTitle class="text-h6 mb-4">Categories</VCardTitle>
                <VList density="compact" class="py-0" bg-color="transparent">
                  <VListItem
                    v-for="category in post.categories"
                    :key="category"
                    :to="`/blog?category=${encodeURIComponent(category)}`"
                    rounded="xl"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-folder-outline" size="small" />
                    </template>
                    <VListItemTitle>{{ category }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VCardItem>
            </VCard>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </article>
</template>

<script lang="ts" setup>
// Get route parameters
const route = useRoute();

// Fetch post data with proper loading and error handling
const {
  data: post,
  pending,
  error,
} = await useLazyAsyncData(
  `blog-post-${route.path}`,
  () => queryCollection("posts").path(route.path).first(),
  {
    server: true,
  },
);

// Handle 404 error for SSR
if (import.meta.server && !post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
  });
}

// SEO Meta tags
useSeoMeta({
  title: () => post.value?.seo?.title || post.value?.title,
  description: () => post.value?.seo?.description || post.value?.description,
  ogTitle: () => post.value?.seo?.title || post.value?.title,
  ogDescription: () => post.value?.seo?.description || post.value?.description,
  ogImage: () => post.value?.seo?.ogImage || post.value?.featuredImage,
  ogType: "article",
  twitterCard: "summary_large_image",
  twitterTitle: () => post.value?.seo?.title || post.value?.title,
  twitterDescription: () =>
    post.value?.seo?.description || post.value?.description,
  twitterImage: () =>
    post.value?.seo?.twitterImage || post.value?.featuredImage,
});

// Computed properties
const breadcrumbItems = computed(() => [
  {
    title: "Home",
    to: "/",
    disabled: false,
  },
  {
    title: "Blog",
    to: "/blog",
    disabled: false,
  },
  {
    title: post.value?.title || "Post",
    disabled: true,
  },
]);

const twitterShareUrl = computed(() => {
  if (!post.value) return "";
  const url = encodeURIComponent(
    `${useRuntimeConfig().public.siteUrl || "https://yellowdog.digital"}${route.path}`,
  );
  const text = encodeURIComponent(`Check out this post: ${post.value.title}`);
  return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
});

const linkedinShareUrl = computed(() => {
  if (!post.value) return "";
  const url = encodeURIComponent(
    `${useRuntimeConfig().public.siteUrl || "https://yellowdog.digital"}${route.path}`,
  );
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
});

// Methods
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

// Handle client-side 404
watch(post, (newPost) => {
  if (import.meta.client && !pending.value && !newPost && !error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: "Post not found",
    });
  }
});
</script>
