<template>
  <VParallax height="60vh" :src="image">
    <VContainer class="fill-height">
      <VCard class="pa-8 elevation-12 opacity-90">
        <VRow
          class="justify-center align-center flex-column-reverse flex-md-row"
        >
          <!-- Text Content -->
          <VCol cols="12" md="6">
            <h1 v-if="heading" class="text-h2 font-weight-bold mb-4">
              {{ heading }}
            </h1>
            <h2 v-if="subheading" class="text-h5 font-weight-light mb-6">
              {{ subheading }}
            </h2>
            <div v-if="cta && cta.length">
              <VBtn
                v-for="(button, index) in cta"
                :key="index"
                :to="button.to"
                :color="button.color || 'primary'"
                class="mr-4 mb-4"
                size="large"
              >
                {{ button.label }}
              </VBtn>
            </div>
          </VCol>

          <!-- Image / Avatar -->
          <VCol class="text-center" cols="12" md="6">
            <VAvatar
              v-if="avatar"
              :size="300"
              background-color="primary"
              class="elevation-12 mx-auto mb-8"
            >
              <VImg :src="avatar" />
            </VAvatar>
          </VCol>
        </VRow>
      </VCard>
    </VContainer>
  </VParallax>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface CtaButton {
  label: string;
  to: string;
  color?: string;
  variant?: "raised" | "outline" | "text" | "tonal" | "flat";
}

defineProps({
  heading: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  cta: {
    type: Array as PropType<CtaButton[]>,
    default: () => [],
  },
});
</script>
