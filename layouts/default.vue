import { LoadingScreen } from '../.nuxt/components';
<template>
    <v-app id="inspire">
      <v-layout>
        <Header @toggle-drawer="drawer = !drawer" />
        <ClientOnly>
          <v-navigation-drawer
            v-model="drawer"
            :location="$vuetify.display.smAndDown ? 'top' : 'left'"
          >
            <NavDrawerContent />
          </v-navigation-drawer>
        </ClientOnly>
        <v-main>
          <v-container fluid>
            <NuxtLoadingIndicator :height="5" color="rose"/>
            <slot />
          </v-container>
        </v-main>
        <footer>
          <slot name="footer" />
        </footer>
      </v-layout>
    </v-app>
</template>

<script lang="ts" setup>
const drawer = ref(false);
</script>


