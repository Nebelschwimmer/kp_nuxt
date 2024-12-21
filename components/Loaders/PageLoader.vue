<template>
  <v-sheet
    class="d-flex column align-center bg-transparent full-height justify-center flex-wrap text-center mx-auto px-2"
  >
    <template v-if="showing">
      <span>{{ $t("state.loading") }}...</span>
      <v-progress-linear indeterminate color="accent"></v-progress-linear>
    </template>
  </v-sheet>
</template>

<script lang="ts" setup>
defineProps<{
  showing: boolean;
}>();
</script>
<style></style>
