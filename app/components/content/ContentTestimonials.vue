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
      <VCol
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        cols="12"
        md="6"
        lg="4"
        class="d-flex"
      >
        <VCard class="pa-4 d-flex flex-column position-relative" raised>
          <NuxtImg
            src="/images/quote.png"
            height="40"
            width="40"
            alt="Quote Icon"
            class="position-absolute"
            style="left: 0; top: 0; z-index: 10"
          />
          <VCardText class="text-h6 font-italic text-medium-emphasis pt-12">
            "{{ testimonial.content }}"
          </VCardText>
          <VSpacer />
          <VCardActions>
            <VListItem>
              <template #prepend>
                <VAvatar>
                  <VImg :src="testimonial.image" />
                </VAvatar>
              </template>
              <VListItemTitle class="font-weight-bold">{{
                testimonial.name
              }}</VListItemTitle>
              <VListItemSubtitle
                >{{ testimonial.role }},
                {{ testimonial.company }}</VListItemSubtitle
              >
            </VListItem>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
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
  testimonials: {
    type: Array as PropType<Testimonial[]>,
    required: true,
  },
});
</script>
