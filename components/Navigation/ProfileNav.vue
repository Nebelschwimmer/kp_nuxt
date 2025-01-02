<template>
  <div class="border rounded-md m-1">
    <NuxtLink to="/profile">
      <v-avatar>
        <v-img v-if="avatarSrc" :src="avatarSrc"></v-img>
        <v-icon v-else icon="mdi-account-circle"></v-icon>
      </v-avatar>
    </NuxtLink>
    <v-btn icon density="compact">
      <v-icon icon="mdi-login"></v-icon>
    </v-btn>
    <v-btn icon density="compact">
      <v-icon icon="mdi-logout"></v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name?: string;
  avatarSrc: string;
}>();
</script>

<style></style>
