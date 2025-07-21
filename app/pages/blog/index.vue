<template>
  <div>
    <!-- Loading State -->
    <VContainer
      v-if="pending"
      class="d-flex justify-center align-center"
      style="min-height: 400px"
    >
      <VProgressCircular indeterminate color="primary" size="48">
        <template #default>Loading posts...</template>
      </VProgressCircular>
    </VContainer>

    <!-- Error State -->
    <VContainer v-else-if="error" class="text-center">
      <VAlert
        type="error"
        variant="tonal"
        class="mb-4"
        :text="error.message || 'Failed to load blog posts'"
      />
      <VBtn color="primary" variant="outlined" @click="refresh()">
        Try Again
      </VBtn>
    </VContainer>

    <!-- Content -->
    <VContainer v-else-if="posts?.length" class="py-8">
      <header class="text-center mb-8">
        <h1 class="text-h3 text-md-h2 mb-4">Blog</h1>
        <p
          class="text-h6 text-medium-emphasis mx-auto"
          style="max-width: 600px"
        >
          Welcome to our blog! Here you will find the latest updates, insights,
          and stories from our team.
        </p>
      </header>

      <!-- Featured Post -->
      <section
        v-if="featuredPost"
        class="mb-12"
        aria-labelledby="featured-heading"
      >
        <h2 id="featured-heading" class="text-h4 mb-6">Featured Post</h2>
        <VRow justify="center">
          <VCol cols="12" lg="10" xl="8">
            <VCard
              :to="featuredPost.path"
              hover
              variant="elevated"
              elevation="4"
              class="featured-post-card"
            >
              <VRow no-gutters>
                <VCol cols="12" md="6">
                  <VImg
                    :src="featuredPost.featuredImage"
                    :alt="`Featured image for ${featuredPost.title}`"
                    height="300"
                    cover
                    gradient="to right, rgba(0,0,0,.3), rgba(0,0,0,.1)"
                  />
                </VCol>
                <VCol cols="12" md="6" class="d-flex flex-column">
                  <VCardItem>
                    <VCardTitle class="text-h4 mb-2">
                      {{ featuredPost.title }}
                    </VCardTitle>
                    <VCardSubtitle class="mb-3">
                      <div class="d-flex align-center">
                        <VAvatar size="24" class="mr-2">
                          <VImg
                            :src="featuredPost.author?.avatar"
                            :alt="`${featuredPost.author?.name} avatar`"
                          />
                        </VAvatar>
                        <span>{{ featuredPost.author?.name }}</span>
                        <VDivider vertical class="mx-3" />
                        <time
                          v-if="featuredPost.date"
                          :datetime="featuredPost.date"
                        >
                          {{ formatDate(featuredPost.date) }}
                        </time>
                      </div>
                    </VCardSubtitle>
                  </VCardItem>
                  <VCardText class="text-body-1 flex-grow-1">
                    {{ featuredPost.description }}
                  </VCardText>
                  <VCardActions class="px-6 pb-4">
                    <VBtn
                      color="primary"
                      variant="elevated"
                      append-icon="mdi-arrow-right"
                    >
                      Read Full Post
                    </VBtn>
                  </VCardActions>
                </VCol>
              </VRow>
            </VCard>
          </VCol>
        </VRow>
      </section>

      <!-- Recent Posts Grid -->
      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" class="text-h4 mb-6">
          {{ featuredPost ? "More Posts" : "Recent Posts" }}
        </h2>
        <VRow>
          <VCol
            v-for="post in displayPosts"
            :key="post.path || post.title"
            cols="12"
            sm="6"
            lg="4"
            class="mb-6"
          >
            <BlogPostCard :post="post" />
          </VCol>
        </VRow>

        <!-- Load More Button -->
        <div v-if="hasMorePosts" class="text-center mt-8">
          <VBtn
            color="primary"
            variant="outlined"
            size="large"
            :loading="loadingMore"
            @click="loadMore"
          >
            Load More Posts
          </VBtn>
        </div>
      </section>
    </VContainer>

    <!-- Empty State -->
    <VContainer v-else class="text-center py-16">
      <VIcon
        icon="mdi-post-outline"
        size="64"
        class="mb-4 text-medium-emphasis"
      />
      <h2 class="text-h5 mb-2">No Blog Posts Yet</h2>
      <p class="text-body-1 text-medium-emphasis mb-6">
        We're working on some great content. Check back soon!
      </p>
      <VBtn color="primary" variant="outlined" @click="refresh()">
        Refresh
      </VBtn>
    </VContainer>
  </div>
</template>

<script lang="ts" setup>
import type { PostsCollectionItem } from "@nuxt/content";

// Meta tags
useSeoMeta({
  title: "Blog - Yellowdog Digital",
  description:
    "Latest updates, insights, and stories from the Yellowdog Digital team.",
});

// Constants
const POSTS_PER_PAGE = 6;

// Reactive state
const currentPage = ref(1);
const loadingMore = ref(false);

// Fetch posts with proper error handling
const {
  data: allPosts,
  pending,
  error,
  refresh,
} = await useLazyAsyncData("blog-posts", () => queryCollection("posts").all(), {
  default: () => [] as PostsCollectionItem[],
  server: true,
});

// Computed properties
const posts = computed(() => (allPosts.value as PostsCollectionItem[]) || []);

const featuredPost = computed(() => {
  const postList = posts.value;
  return Array.isArray(postList) && postList.length > 0 ? postList[0] : null;
});

const displayPosts = computed(() => {
  const postList = posts.value;
  if (!Array.isArray(postList)) return [];

  const startIndex = featuredPost.value ? 1 : 0;
  const endIndex = startIndex + currentPage.value * POSTS_PER_PAGE;
  return postList.slice(startIndex, endIndex);
});

const hasMorePosts = computed(() => {
  const postList = posts.value;
  if (!Array.isArray(postList)) return false;

  const startIndex = featuredPost.value ? 1 : 0;
  const totalDisplayed = startIndex + currentPage.value * POSTS_PER_PAGE;
  return totalDisplayed < postList.length;
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

async function loadMore() {
  if (loadingMore.value || !hasMorePosts.value) return;

  loadingMore.value = true;

  // Simulate loading delay for better UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  currentPage.value += 1;
  loadingMore.value = false;
}

// Handle SSR
if (import.meta.server) {
  const postList = allPosts.value as PostsCollectionItem[];
  if (!postList || !Array.isArray(postList) || postList.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "No blog posts found",
    });
  }
}
</script>

<style scoped>
.featured-post-card {
  border-radius: 16px;
  transition: all 0.3s ease;
}

.featured-post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

@media (max-width: 960px) {
  .featured-post-card .v-img {
    height: 250px !important;
  }
}
</style>
