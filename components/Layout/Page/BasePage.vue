<template>
  <v-container>

    <v-row>
      <v-col>
        <PageToolBar v-if="toolbar" v-bind="toolbarOptions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!loading">
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
</template>

<script lang="ts" setup>
import PageAlert from "./PageAlert.vue";
import PageToolBar from "./PageToolBar.vue";
defineEmits(["alert:close"]);
defineProps<{
  loading?: boolean;
  toolbar?: boolean;
  error?: Error | null;
  toolbarOptions?: ToolbarOptions;
}>();
</script>

<style></style>
