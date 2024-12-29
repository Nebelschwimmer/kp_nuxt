<template>
  <div>
    <PageLoader v-if="overlay" :showing="Boolean(loading)" />
    <PageToolBar v-if="toolbar" v-bind="toolbarOptions" />
    <slot name="content"></slot>
    <PageAlert
      :show="Boolean(error)"
      type="error"
      :text="error?.message ?? 'error'"
      :title="$t('pages.network_error')"
      @close="$emit('alert:close')"
    />
  </div>
</template>

<script lang="ts" setup>
import PageLoader from "~/components/Loaders/PageLoader.vue";
import PageAlert from "./PageAlert.vue";
import PageToolBar from "./PageToolBar.vue";
defineEmits(["alert:close"]);
defineProps<{
  loading?: boolean;
  overlay?: boolean;
  toolbar?: boolean;
  error?: Error | null;
  toolbarOptions?: ToolbarOptions;
}>();
</script>

<style></style>
