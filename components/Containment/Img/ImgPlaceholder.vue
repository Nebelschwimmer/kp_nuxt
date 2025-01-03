<template>
  <v-card
    height="100%"
    width="100%"
    min-height="100%"
    image="https://cdn.vuetifyjs.com/docs/images/parallax/stars.jpg"
    class="d-flex placeholder-img align-center justify-center flex-column w-100"
  >
    <template v-if="displayTitle">
      <v-icon icon="mdi-image-off" size="x-small"></v-icon>
      <v-label class="text-caption">{{
        title ? title : $t("general.no_img")
      }}</v-label>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  title?: string;
  displayTitle?: boolean;
}>();
</script>

<style scoped lang="scss">
.placeholder-img {
  background-color: rgba(104, 104, 104, 0.2) !important;
}
</style>
