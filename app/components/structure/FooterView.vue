<template>
  <VFooter elevation="2" color="black" class="d-flex flex-column pa-4">
    <VRow
      width="100%"
      class="d-flex justify-center w-100 pa-4 text-center align-center"
    >
      <VCol cols="4" class="text-center">
        <NuxtImg
          :src="settings.footer.logoLeft.src"
          width="200"
          height="200"
          :alt="settings.footer.logoLeft.alt"
          class="mb-4"
          format="webp"
        />
      </VCol>
      <VCol cols="4" class="text-center d-flex flex-column align-center">
        <h3 class="text-title">{{ settings.title }}</h3>
        <span class="text-caption">{{ settings.description }}</span>
        <div>
          <VBtnGroup
            v-if="settings.socialMedia.links.length"
            class="mt-4"
            color="primary"
            rounded
            size="large"
            :items="settings.socialMedia.links"
          >
            <VBtn
              v-for="item in settings.socialMedia.links"
              :key="item.icon"
              class="mx-4"
              :icon="item.icon"
              variant="text"
              target="_blank"
              rel="noopener noreferrer"
              :href="item.link"
              :aria-label="item.platform"
            />
          </VBtnGroup>
        </div>
        <span class="text-caption mt-2">
          <p>
            Please feel free to reach out to us with any questions or feedback.
          </p>
          <p>We are always happy to hear from you!</p>
        </span>
      </VCol>

      <VCol cols="4" class="text-center">
        <NuxtImg
          :src="settings.footer.logoRight.src"
          width="200"
          height="200"
          :alt="settings.footer.logoRight.alt"
          class="mb-4"
          format="webp"
        />
      </VCol>

      <VDivider class="my-4" />

      <VCol class="text-caption text-center">
        <strong>{{ settings.footer.copyright }}</strong>
      </VCol>
    </VRow>
  </VFooter>
</template>

<script lang="ts" setup>
const settings = useAppConfig();
</script>
