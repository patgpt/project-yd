<template>
  <VContainer class="py-12">
    <VRow>
      <VCol cols="12" class="text-center mb-4">
        <h2 class="text-h3 font-weight-bold">{{ title }}</h2>
        <p class="text-h6 font-weight-light text-medium-emphasis">
          {{ description }}
        </p>
      </VCol>
    </VRow>
    <VRow justify="center">
      <VCol cols="auto">
        <VBtn
          v-for="social in socialLinks"
          :key="social.platform"
          :href="social.link"
          target="_blank"
          icon
          class="mx-2"
          size="large"
          variant="text"
        >
          <VIcon :icon="social.icon" size="x-large" />
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface SocialLink {
  icon: string;
  link: string;
  platform: string;
}

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  socialLinks: {
    type: Array as PropType<SocialLink[]>,
    required: true,
  },
});
</script>
