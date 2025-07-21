<template>
  <VSheet class="py-16" color="primary">
    <VContainer>
      <VRow justify="center" align="center">
        <VCol cols="12" md="8" class="text-center">
          <h2 class="text-h3 font-weight-bold mb-4">{{ title }}</h2>
          <p class="text-h6 font-weight-light mb-8">
            {{ description }}
          </p>
          <VBtn
            :to="button.to"
            :color="button.color === 'primary' ? 'white' : button.color"
            :variant="
              button.variant === 'raised'
                ? 'elevated'
                : button.variant === 'outline'
                  ? 'outlined'
                  : button.variant
            "
            size="x-large"
            class="elevation-4"
          >
            {{ button.label }}
          </VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface Button {
  label: string;
  to: string;
  color?: string;
  variant?: "raised" | "outline" | "text" | "tonal" | "flat";
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
  button: {
    type: Object as PropType<Button>,
    required: true,
  },
});
</script>
