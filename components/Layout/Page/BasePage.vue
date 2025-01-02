<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-if="$vuetify.display.mdAndUp">
          <PageToolBar v-bind="toolbarOptions" />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-3">
          <slot name="content"></slot>
        </v-col>
      </v-row>
      <PageAlert
        :show="Boolean(error)"
        type="error"
        :text="error?.message ?? 'error'"
        :title="$t('pages.network_error')"
        @close="$emit('alert:close')"
      />
    </v-container>
    <v-snackbar
      :model-value="snackbar"
      color="success"
      rounded="lg"
      :timeout="DELAY"
    >
      <v-chip>{{ snackbarMessage }}</v-chip>
      <template v-slot:actions>
        <CloseBtn @close="closeSnackbar" />
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import PageAlert from "./PageAlert.vue";
import PageToolBar from "./PageToolBar.vue";
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
const emit = defineEmits(["alert:close", "snackbar:close"]);
const DELAY = 2000;
const props = defineProps<{
  loading?: boolean;
  toolbar?: boolean;
  error?: Error | null;
  toolbarOptions?: ToolbarOptions;
  snackbar?: boolean;
  snackbarMessage?: string;
  to?: string;
}>();

const closeSnackbar = () => {
  emit("snackbar:close");
  navigateTo(props.to ?? "/");
};

watch(
  () => props.snackbar,
  (value) => {
    if (value) {
      setTimeout(closeSnackbar, DELAY);
    }
  }
);
</script>

<style></style>
