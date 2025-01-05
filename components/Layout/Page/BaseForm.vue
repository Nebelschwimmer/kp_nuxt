<template>
  <v-dialog :model-value="opened" max-width="1000">
    <v-sheet>
      <v-card class="bg-gradient base-card">
        <v-toolbar :title="$t('pages.films.edit')" class="px-3">
          <template #prepend>
            <v-icon :icon="isNew ? 'mdi-plus' : 'mdi-pencil'"></v-icon>
          </template>
          <CloseBtn @click="$emit('close')" />
        </v-toolbar>
        <v-card-text>
          <slot name="form"></slot>
        </v-card-text>
        <v-card-actions>
          <v-btn
            prepend-icon="mdi-check"
            color="primary"
            @click="$emit('submit')"
            >{{ $t("actions.submit") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts" setup>
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
defineEmits(["close", "submit"]);
defineProps<{
  loading?: boolean;
  disabled?: boolean;
  opened?: boolean;
  isNew?: boolean;
}>();
const snackbar = ref(false);
</script>

<style></style>
