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
          :to="item.to"
        >
          <NuxtImg height="30" :src="item.image" />
          {{ item.title }}
        </VBtn>
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
    <LazyStructureFooterView />
  </VApp>
</template>

<script lang="ts" setup>
import type { NuxtImg } from "#components";
import { ref } from "vue";

const drawer = ref(false);
const theme = ref("light");
const settings = useAppConfig();
function toggleTheme() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
</script>
