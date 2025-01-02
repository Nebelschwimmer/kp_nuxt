<template>
  <v-layout class="rounded-md bg-gradient">
    <Header @toggle:drawer="drawer = !drawer" />
    <ClientOnly>
      <v-navigation-drawer v-model="drawer">
        <v-list subheader>
          <v-list-subheader :title="$t('nav.title')"></v-list-subheader>
          <v-list-item
            nav
            :active="$route.name === 'index'"
            :color="$route.name === 'index' ? 'secondary' : ''"
            to="/"
            prepend-icon="mdi-home"
            :title="$t('nav.home')"
          >
          </v-list-item>
          <v-list-item
            nav
            :active="$route.name === 'films'"
            :color="$route.name === 'films' ? 'secondary' : ''"
            prepend-icon="mdi-filmstrip"
            :title="$t('nav.films')"
            to="/films"
          >
          </v-list-item>
          <v-list-item
            nav
            to="/persons"
            :active="$route.name === 'persons'"
            :color="$route.name === 'persons' ? 'secondary' : ''"
            prepend-icon="mdi-account-circle"
            :title="$t('nav.persons')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </ClientOnly>
    <v-main class="content">
      <slot />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import Header from "~/components/Layout/Header/Header.vue";
const drawer = ref(false);
</script>

<style lang="scss">
$background: #000000;
$surface: #313131;
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
    68deg,
    rgba(105, 153, 201, 0.1) 0%,
    rgb(237, 123, 73, 0.06) 50%,
    rgb(237, 123, 73, 0.1) 100%
  ) !important;
}

.content {
  min-height: calc(100vh - 64px);
  backdrop-filter: blur(4px);
  background-color: rgba($color: #000000, $alpha: 0.1) !important;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
