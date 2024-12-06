<template>
  <v-responsive max-width="260">
    <NuxtLink to="/profile">
      <v-avatar color="surface-variant">
        <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        <v-tooltip activator="parent" location="bottom">{{ $t('profile.title') }}</v-tooltip>
      </v-avatar>
    </NuxtLink>
    <v-btn icon>
      <v-icon icon="mdi-login"></v-icon>
      <v-tooltip activator="parent" location="bottom">{{ $t('actions.login') }}</v-tooltip>
    </v-btn>
    <v-btn icon>
      <v-icon icon="mdi-logout"></v-icon>
      <v-tooltip activator="parent" location="bottom">{{ $t('profile.logout') }}</v-tooltip>
    </v-btn>
  </v-responsive>
</template>

<script lang="ts" setup></script>

<style></style>
