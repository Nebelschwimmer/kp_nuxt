<template>
  <v-card
    height="100%"
    width="100%"
    min-height="100%"
    elevation="2"
    color="grey-darken-3"
    image="https://cdn.vuetifyjs.com/docs/images/parallax/stars.jpg"
    class="d-flex align-center justify-center flex-column w-100"
  >
    <v-icon icon="mdi-image-off" size="x-small"></v-icon>
    <v-label class="text-caption" v-if="displayTitle">{{
      title ? title : $t("general.no_img")
    }}</v-label>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
  displayTitle?: boolean;
}>();
</script>

<style></style>
