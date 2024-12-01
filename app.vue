<template>
  <div>
    <LoadingScreen v-if="isLoading" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
const isLoading = ref(true);

onMounted(async () => {
  await nextTick(() => {
    isLoading.value = false;
  });
});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  transform: translateX(100%);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
