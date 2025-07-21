<template>
  <VSheet class="py-12">
    <VContainer>
      <VRow>
        <VCol cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold">{{ title }}</h2>
          <p class="text-h6 font-weight-light">
            {{ description }}
          </p>
        </VCol>
      </VRow>

      <VRow justify="center">
        <VCol
          v-for="plan in plans"
          :key="plan.title"
          cols="12"
          md="4"
          class="d-flex"
        >
          <VCard
            :elevation="plan.highlight ? 16 : 4"
            class="d-flex flex-column w-100"
            :class="{ 'border-white border-opacity-100': plan.highlight }"
            variant="outlined"
            hover
          >
            <VCardTitle class="text-h5 font-weight-bold text-center pt-4">{{
              plan.title
            }}</VCardTitle>
            <VCardSubtitle class="text-center">{{
              plan.description
            }}</VCardSubtitle>
            <VCardText class="text-center">
              <div class="d-flex align-center justify-center">
                <span class="text-h3 font-weight-bold">{{ plan.price }}</span>
                <span
                  v-if="plan.billing_period"
                  class="ml-1 text-medium-emphasis"
                  >/ {{ plan.billing_period }}</span
                >
              </div>
            </VCardText>

            <VDivider />

            <VList>
              <VListItem v-for="feature in plan.features" :key="feature">
                <template #prepend>
                  <VIcon color="primary">mdi-check</VIcon>
                </template>
                <VListItemTitle>{{ feature }}</VListItemTitle>
              </VListItem>
            </VList>

            <VSpacer />

            <VCardActions class="pa-4">
              <VBtn
                :color="plan.button.color || 'primary'"
                :variant="
                  plan.button.variant === 'raised'
                    ? 'elevated'
                    : plan.button.variant === 'outline'
                      ? 'elevated'
                      : plan.button.variant
                "
                :to="plan.button.to"
                block
                size="large"
              >
                {{ plan.button.label }}
              </VBtn>
            </VCardActions>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>
  </VSheet>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface Plan {
  title: string;
  description: string;
  price: string;
  billing_period?: string;
  features: string[];
  highlight?: boolean;
  button: {
    label: string;
    to: string;
    color?: string;
    variant?: "raised" | "outline" | "text" | "tonal" | "flat";
  };
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
  plans: {
    type: Array as PropType<Plan[]>,
    required: true,
  },
});
</script>
