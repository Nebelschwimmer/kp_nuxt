<template>
  <v-card :loading="loading" :disabled="disabled">
    <slot name="form"></slot>
    <v-snackbar v-model="snackbar">
      {{ $t("toast.messages.succes.add") }}

      <template v-slot:actions>
        <CloseBtn @close="snackbar = false" />
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts" setup>
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
defineProps<{
  loading?: boolean;
  disabled?: boolean;
}>();
const snackbar = ref(false);
</script>

<style></style>
