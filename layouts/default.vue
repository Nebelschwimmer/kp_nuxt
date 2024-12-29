<template>
  <v-layout class="rounded-md">
    <Header order="0" @toggle-drawer="drawer = !drawer" />
    <v-main class="bg-gradient">
      <NuxtLoadingIndicator color="#ff4d00"/>
      <v-container fluid>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="12"
            md="10"
            lg="9"
            xl="7"
            xxl="5"
            class="content"
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
</script>

<style lang="scss">
$background: #faf9f4;
$surface: #e4e4e4;
$primary: #60726283;
$secondary: #e0974a2c;
$accent: #ff4d00;

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
  background-image: radial-gradient(
      circle at 69% 86%,
      rgba(165, 165, 165, 0.06) 0%,
      rgba(165, 165, 165, 0.06) 25%,
      rgba(193, 193, 193, 0.06) 25%,
      rgba(193, 193, 193, 0.06) 50%,
      rgba(221, 221, 221, 0.06) 50%,
      rgba(221, 221, 221, 0.06) 75%,
      rgba(249, 249, 249, 0.06) 75%,
      rgba(249, 249, 249, 0.06) 100%
    ),
    radial-gradient(
      circle at 49% 76%,
      rgba(129, 129, 129, 0.06) 0%,
      rgba(129, 129, 129, 0.06) 25%,
      rgba(164, 164, 164, 0.06) 25%,
      rgba(164, 164, 164, 0.06) 50%,
      rgba(200, 200, 200, 0.06) 50%,
      rgba(200, 200, 200, 0.06) 75%,
      rgba(235, 235, 235, 0.06) 75%,
      rgba(235, 235, 235, 0.06) 100%
    ),
    radial-gradient(
      circle at 22% 64%,
      rgba(173, 173, 173, 0.06) 0%,
      rgba(173, 173, 173, 0.06) 25%,
      rgba(119, 119, 119, 0.06) 25%,
      rgba(119, 119, 119, 0.06) 50%,
      rgba(64, 64, 64, 0.06) 50%,
      rgba(64, 64, 64, 0.06) 75%,
      rgba(10, 10, 10, 0.06) 75%,
      rgba(10, 10, 10, 0.06) 100%
    ),
    linear-gradient(307deg, $primary, white) !important;
  background-attachment: fixed;
}

.base-card {
  background-image: linear-gradient(
    to right,
    rgba(151, 151, 151, 0.2) 0%,
    rgba(151, 151, 151, 0.01) 75%,
    rgba(255, 255, 255, 0.1) 100%
  ) !important;
  backdrop-filter: blur(10px) !important;
}
.card-title {
  background-color: rgba(0, 0, 0, 0.246) !important;
  backdrop-filter: blur(10px) !important;
}
.content {
  backdrop-filter: blur(4px);
  background-color: rgba($color: #ffffff, $alpha: 0.5);
  min-height: calc(100vh - 64px);
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
