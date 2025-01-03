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

<style lang="scss">
$background: #000000;
$surface: #1616167e;
$primary: rgb(105, 153, 201, 0);
$secondary: #e0974aa8;
$accent: #ed7b49;
$error: #f44336;
$info: #ffbd69;
$success: #4caf50;
$warning: #fb8c00;

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  filter: opacity(0);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: opacity(0);
}

.bg-gradient {
  background-image: linear-gradient(
    0deg,
    rgba(105, 153, 201, 0.05) 0%,
    rgb(237, 123, 73, 0.06) 50%,
    rgb(237, 123, 73, 0.04) 100%
  ) !important;
}

a {
  text-decoration: none;
  color: inherit;
}
.base-card {
  background-color: rgba($color: #222222, $alpha: 0.6) !important;
}

.card-header {
  background-color: rgba($color: #363636, $alpha: 0.5) !important;
}
.img-blur {
  filter: blur(12px);
  opacity: 0.7;
}
</style>
