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

    <VRow justify="center">
      <VCol cols="12" md="8">
        <VExpansionPanels variant="inset" class="my-4">
          <VExpansionPanel
            v-for="item in questions"
            :key="item.question"
            :title="item.question"
            :text="item.answer"
          />
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface Question {
  question: string;
  answer: string;
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
  questions: {
    type: Array as PropType<Question[]>,
    required: true,
  },
});
</script>
