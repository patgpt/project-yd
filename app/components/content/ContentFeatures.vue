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

    <VRow>
      <VCol v-for="feature in items" :key="feature.title" cols="12" md="4">
        <VCard class="text-center pa-4" raised>
          <VAvatar color="primary" size="64" class="mb-4">
            <VIcon size="x-large" :icon="feature.icon" />
          </VAvatar>
          <VCardTitle class="text-h5 font-weight-bold">{{
            feature.title
          }}</VCardTitle>
          <VCardText class="text-medium-emphasis">{{
            feature.description
          }}</VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<
      {
        icon: string;
        title: string;
        description: string;
      }[]
    >,
    required: true,
  },
});
</script>
