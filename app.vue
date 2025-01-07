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


$primary: rgb(105, 153, 201, 0);
$secondary: #e0974aa8;
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

.bg-gradient {

  background-image: -moz-linear-gradient(top, rgb(78, 78, 78), black) !important;
}

a {
  text-decoration: none;
  color: inherit;
}
.base-card{
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.img-blur {
  filter: grayscale(0.5);
}

p {
  margin-top: 1rem;
  text-indent: 2rem !important;
}
.stained-glass{
background: rgba(27, 27, 27, 0.322) !important;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2) !important;
backdrop-filter: blur(9.8px) !important;
-webkit-backdrop-filter: blur(9.8px) !important;

}
html{ 
  height:100% !important 
}
</style>
