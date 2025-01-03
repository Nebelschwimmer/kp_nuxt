<template>
  <v-layout class="rounded rounded-md">
    <Header @toggle:drawer="drawer = !drawer"></Header>
    <ClientOnly>
      <v-navigation-drawer v-model="drawer" :rail="$vuetify.display.mdAndDown">
        <v-list nav height="100%" class="bg-gradient">
          <v-list-item
            :active="$route.name === 'index'"
            :color="$route.name === 'index' ? 'secondary' : ''"
            to="/"
            prepend-icon="mdi-home"
            :title="$t('nav.home')"
          >
          </v-list-item>
          <v-list-item
            :active="$route.name === 'films'"
            :color="$route.name === 'films' ? 'secondary' : ''"
            prepend-icon="mdi-filmstrip"
            :title="$t('nav.films')"
            to="/films"
          >
          </v-list-item>
          <v-list-item
            to="/persons"
            :active="$route.name === 'persons'"
            :color="$route.name === 'persons' ? 'secondary' : ''"
            prepend-icon="mdi-account-circle"
            :title="$t('nav.persons')"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-if="$vuetify.display.mdAndUp"
        location="right"
        class="bg-gradient"
      >
      </v-navigation-drawer>
    </ClientOnly>
    <v-main v-scroll="onScroll" style="min-height: 100dvh" class="bg-gradient">
      <div class="pa-2">
        <v-toolbar density="compact" class="mb-2" rounded="lg">
          <template #prepend>
            <v-btn icon="mdi-arrow-left" @click="$router.back()"></v-btn>
          </template>
        </v-toolbar>
        <slot />
      </div>
    </v-main>
    <ClientOnly>
      <v-bottom-navigation v-if="$vuetify.display.smAndDown" grow mode="shift">
        <v-btn
          :active="$route.name === 'index'"
          :color="$route.name === 'index' ? 'secondary' : ''"
          to="/"
          icon="mdi-home"
        ></v-btn>
        <v-btn
          :active="$route.name === 'films'"
          :color="$route.name === 'films' ? 'secondary' : ''"
          to="/films"
          icon="mdi-filmstrip"
        ></v-btn>
        <v-btn
          :active="$route.name === 'persons'"
          :color="$route.name === 'persons' ? 'secondary' : ''"
          to="/persons"
          icon="mdi-account-circle"
        ></v-btn>
      </v-bottom-navigation>
    </ClientOnly>
    <GlobalError
      :show="Boolean(filmNetworkError || personNetworkError)"
      type="error"
      :text="filmNetworkError?.message || personNetworkError?.message || ''"
      :title="$t('pages.network_error')"
      @close="handleErrorAlertClose"
    />
    <v-fab
      v-if="$vuetify.display.mdAndUp"
      :active="showScrollFab"
      class="mr-6"
      icon="mdi-arrow-up"
      color="secondary"
      location="bottom end"
      size="64"
      layout
      app
      appear
      @click="scrollToTop"
    ></v-fab>
  </v-layout>
</template>

<script lang="ts" setup>
import Header from "~/components/Layout/Header/Header.vue";
import GlobalError from "~/components/Global/GlobalError.vue";

import { useFilmStore } from "~/store/filmStore";
import { usePersonStore } from "~/store/personStore";
import { storeToRefs } from "pinia";
const { networkError: filmNetworkError } = storeToRefs(useFilmStore());
const { networkError: personNetworkError } = storeToRefs(usePersonStore());

const drawer = ref(true);
const showScrollFab = ref(false);
const offsetTop = ref(0);

const onScroll = () => {
  offsetTop.value = window.scrollY;
  showScrollFab.value = offsetTop.value > 30;
};

const handleErrorAlertClose = () => {
  if (filmNetworkError.value) {
    filmNetworkError.value = null;
  }
  if (personNetworkError.value) {
    personNetworkError.value = null;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>
