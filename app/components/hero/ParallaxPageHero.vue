<template>
  <v-parallax v-if="backgroundImageUrl" :src="backgroundImageUrl" height="400">
    <div
      class="d-flex flex-column fill-height justify-center align-center text-white"
    >
      <h1 class="text-h2 font-weight-thin mb-4">{{ heading }}</h1>
      <h4 class="subheading">{{ subheading }}</h4>
    </div>
  </v-parallax>
</template>

<script lang="ts" setup>
defineProps({
  backgroundImageUrl: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
});
</script>
