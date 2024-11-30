<template>
  <div>
    <div
      v-if="isLoading"
      class="align-center justify-center overlay text-bold  text-h6"
    >
      {{ $t("state.loading") }}...
    </div>

    <v-app id="inspire">
      <v-layout>
        <AppBar @toggle-drawer="drawer = !drawer" />
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
        >
          <NavDrawerContent />
        </v-navigation-drawer>
        <v-main>
          <v-container fluid>
            <NuxtLoadingIndicator />
            <slot />
          </v-container>
        </v-main>
        <footer>
          <slot name="footer" />
        </footer>
      </v-layout>
    </v-app>
  </div>
</template>

<script lang="ts" setup>
import { on } from "events";

const { t } = useI18n();
const drawer = ref(false);
const isLoading = ref(true);

onMounted(async () => {
  await nextTick(() => {
    isLoading.value = false;
  });
});
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
