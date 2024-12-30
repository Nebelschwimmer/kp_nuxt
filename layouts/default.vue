<template>
  <v-layout class="rounded-md">
    <Header />
    <v-main :class="[{ 'bg-gradient': theme.global.current.value.dark }]">
      <NuxtLoadingIndicator color="#ff4d00" />
      <v-container fluid>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="12"
            md="10"
            lg="9"
            xl="7"
            xxl="5"
            class="content border rounded-md"
          >
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import Header from "~/components/Layout/Header/Header.vue";
const drawer = ref(false);
const theme = useTheme();
</script>

<style lang="scss">
$background: #000000;
$surface: #313131;
$primary: rgb(105, 153, 201);
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
    68deg,
    rgba(105, 153, 201, 0.1) 0%,
    rgb(237, 123, 73, 0.06) 50%,
    rgb(237, 123, 73, 0.1) 100%
  ) !important;
}

.base-card {
  backdrop-filter: blur(10px) !important;
  background-color: rgba($color: #000000, $alpha: 0.3) !important;
}
.card-title {
  backdrop-filter: blur(10px) !important;
}
.content {
  min-height: calc(100vh - 64px);
  backdrop-filter: blur(4px);
  background-color: rgba($color: #000000, $alpha: 0.3) !important;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
