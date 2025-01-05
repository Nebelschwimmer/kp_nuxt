<template>
  <v-app id="inspire">
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
          v-model="drawer"
          v-if="$vuetify.display.mdAndUp"
          location="right"
          class="bg-gradient"
        >
         
        </v-navigation-drawer>
      </ClientOnly>
    
      <v-main
        style="min-height: calc(100vh - 64px)"
        v-scroll="onScroll"
      >
      <v-card class="rounded rounded-md " height="100%">
        <v-toolbar density="compact" class="mt-2" >
            <template #prepend>
              <v-btn stacked  @click="$router.back()">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </template>
          </v-toolbar>
          <v-card-text>
            <slot />
          </v-card-text>
      </v-card>
      <ClientOnly>
        <v-bottom-navigation v-if="$vuetify.display.smAndDown" grow mode="shift">
          <v-btn
            :active="$route.name === 'index'"
            :color="$route.name === 'index' ? 'secondary' : ''"
            to="/"
            icon="mdi-home"
          ></v-btn>
          <v-btn
            :active="$route.name === 'filmDetails'"
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
    </v-main>
  </v-layout>
  <v-fab
        v-if="$vuetify.display.mdAndUp"
        :active="showScrollFab"
        icon="mdi-arrow-up"
        color="secondary"
        location="bottom end"
        size="64"
        layout
        app
        appear
        @click="scrollToTop"s
      ></v-fab>
  </v-app>
</template>

<script lang="ts" setup>
import Header from "~/components/Layout/Header/Header.vue";
import GlobalError from "~/components/global/GlobalError.vue";

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
