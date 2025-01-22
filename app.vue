<template>
  <LoadingScreen v-if="isLoading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoadingScreen from "./components/Misc/LoadingScreen.vue";
const isLoading = ref(true);
onMounted(async () => {
  await nextTick(() => {
    isLoading.value = false;
  });
});
</script>

<style lang="scss">
$background: #000000;


$primary: rgb(105, 153, 201, 0);
$secondary: #e0974a69;
$accent: #ed7b49;
$error: #f44336;
$info: #9450a5;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg-gradient {
  background-image: linear-gradient(to left bottom, #000000, #030303, #070707, #0a0a0a, #0d0d0d, #111011, #141314, #171617, #1b1a1a, #1f1d1d, #232121, #272524) !important;
  background-attachment: fixed;
}


a {
  text-decoration: none;
  color: inherit;
}

.img-blur {
  filter: blur(2rem);
}

p {
  margin-top: 1rem;
  text-indent: 2rem !important;
}
.stained-glass{
background: rgba(27, 27, 27, 0.2) !important;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
backdrop-filter: blur(9.8px) !important;
-webkit-backdrop-filter: blur(9.8px) !important;
}
.dark-glass {
  background: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(9.8px) !important;
  -webkit-backdrop-filter: blur(9.8px) !important;
}
.light-glass {
  background: rgba(255, 255, 255, 0.7) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(9.8px) !important;
  -webkit-backdrop-filter: blur(9.8px) !important;
}

</style>
