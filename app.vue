<template>
  <LoadingScreen v-if="isLoading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import LoadingScreen from "./components/Loaders/LoadingScreen.vue";
const isLoading = ref(true);
onMounted(async () => {
  await nextTick(() => {
    isLoading.value = false;
  });
});
</script>
