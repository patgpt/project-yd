<template>
  <VApp :theme="theme">
    <VNavigationDrawer v-model="drawer" temporary>
      <VList nav>
        <VListItem
          v-for="item in settings.navigation"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
        />
      </VList>
    </VNavigationDrawer>

    <VAppBar color="primary" elevation="2">
      <VAppBarNavIcon
        class="d-lg-none"
        icon="mdi-menu"
        @click.stop="drawer = !drawer"
      />
      <VAppBarTitle>Yellowdog Digital</VAppBarTitle>
      <VSpacer />

      <VList v-if="settings.navigation" bg-color="transparent">
        <VBtn
          v-for="item in settings.navigation"
          :key="item.title"
          :text="item.title"
          :prepend-icon="item.icon"
          :to="item.to"
        />
      </VList>

      <VBtn
        :icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
        @click="toggleTheme"
      />
    </VAppBar>

    <VMain>
      <NuxtPage />
      <ContentNewsletter />
    </VMain>

    <VFooter elevation="2" color="black" class="d-flex flex-column pa-4">
      <VRow
        width="100%"
        class="d-flex justify-center w-100 pa-4 text-center align-center"
      >
        <VCol cols="4" class="text-center">
          <NuxtImg
            src="/yellowdog-japanese-sticker.png"
            width="200"
            height="200"
            alt="Yellowdog Digital Logo"
            class="mb-4"
          />
        </VCol>
        <VCol cols="4" class="text-center d-flex flex-column align-center">
          <span class="text-caption">Follow us on social media</span>
          <div>
            <VBtn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              :icon="icon"
              variant="text"
            />
          </div>
          <span class="text-caption mt-2">
            <p>
              Please feel free to reach out to us with any questions or
              feedback.
            </p>
            <p>We are always happy to hear from you!</p>
          </span>
        </VCol>

        <VCol cols="4" class="text-center">
          <NuxtImg
            src="/yellowdog-sticker.png"
            width="200"
            height="200"
            alt="Yellowdog Digital Logo"
            class="mb-4"
          />
        </VCol>

        <VDivider class="my-4" />

        <VCol class="text-caption text-center">
          {{ new Date().getFullYear() }} — <strong>Yellowdog Digital</strong>
        </VCol>
      </VRow></VFooter
    >
  </VApp>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const drawer = ref(false);
const theme = ref("light");
const settings = useAppConfig();
function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

const icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
</script>
