<template>
  <v-parallax :src="bg" height="600">
    <v-container class="fill-height">
      <v-row
        class="justify-center align-center flex-column-reverse flex-md-row"
      >
        <!-- Text Content -->
        <v-col cols="12" md="6">
          <h1 v-if="$slots.heading" class="text-h1 mb-8">
            <slot name="heading" mdc-unwrap="p" />
          </h1>
          <h3 v-if="$slots.subheading" class="text-h3 mb-8 font-weight-thin">
            <slot name="subheading" mdc-unwrap="p" />
          </h3>
          <v-btn
            v-if="$slots.ctaText"
            class="elevation-4 rounded-xl mb-4"
            color="primary"
            :to="ctaLink"
          >
            <slot name="ctaText" />
          </v-btn>
        </v-col>

        <!-- Image / Avatar -->
        <v-col class="text-center" cols="12" md="6">
          <v-avatar v-if="avatar" :size="300" class="elevation-12 mx-auto mb-8">
            <v-img :src="avatar" />
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script setup>
defineProps({
  bg: {
    type: String,
    default: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
  },
  avatar: {
    type: String,
    default: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  ctaLink: {
    type: String,
    default: "/",
  },
});
</script>
