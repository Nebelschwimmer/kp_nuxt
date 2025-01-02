<template>
  <v-card :loading="loading" :disabled="disabled" variant="text">
    <v-card-text>
      <slot name="form"></slot>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        @click="$emit('validate')"
        :disabled="loading || disabled"
        :prepend-icon="loading ? 'mdi-loading' : ' mdi-check'"
        :loading="Boolean(loading)"
        color="primary"
      >
        {{
          !loading ? $t("actions.submit") : $t("general.data_transfer")
        }}</v-btn
      >
    </v-card-actions>
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
defineEmits(["validate"]);
defineProps<{
  loading?: boolean;
  disabled?: boolean;
}>();
const snackbar = ref(false);
</script>

<style></style>
