<template>
  <VContainer class="py-12">
    <VRow>
      <VCol cols="12" class="text-center mb-8">
        <h2 class="text-h3 font-weight-bold">{{ title }}</h2>
        <p class="text-h6 font-weight-light text-medium-emphasis">
          {{ description }}
        </p>
      </VCol>
    </VRow>

    <VTimeline :side="smAndDown ? 'end' : undefined" align="start">
      <VTimelineItem
        v-for="(item, i) in sortedSteps"
        :key="i"
        dot-color="primary"
        size="large"
        fill-dot
      >
        <template #icon>
          <span class="font-weight-bold">{{ item.order }}</span>
        </template>
        <template v-if="!smAndDown" #opposite>
          <div class="pt-1 text-h5 font-weight-bold text-primary">
            {{ item.step }}
          </div>
        </template>
        <VCard
          class="d-flex flex-column"
          :width="smAndDown ? 'auto' : 400"
          min-height="350"
        >
          <VImg :src="item.image" height="200px" contain />
          <VCardTitle>{{ item.title }}</VCardTitle>
          <VCardText class="flex-grow-1">{{ item.description }}</VCardText>
        </VCard>
      </VTimelineItem>
    </VTimeline>
  </VContainer>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { computed } from "vue";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();

interface Step {
  image: string;
  order: number;
  step: "Discovery" | "Design" | "Development" | "Deployment";
  title: string;
  description: string;
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
});

const sortedSteps = computed(() => {
  return [...props.steps].sort((a, b) => a.order - b.order);
});
</script>
