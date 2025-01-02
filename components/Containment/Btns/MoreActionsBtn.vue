<template>
<v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-if="toolbarActions"
            slim
            density="comfortable"
            v-bind="props"
          >
            <v-icon icon="mdi-dots-vertical"></v-icon>
          </v-btn>
        </template>
        <v-list density="compact">
          <v-list-item
            v-for="(action, index) in toolbarActions"
            :key="index"
            :base-color="action.type === 'delete' ? 'error' : ''"
            :prepend-icon="action.icon"
            :title="action.title"
            :to="action.to"
            :value="action.type"
          >
          </v-list-item>
        </v-list>
      </v-menu>
</template>

<script lang="ts" setup>

defineProps<{
  toolbarActions?: ToolbarAction[];
}>();

</script>

<style>

</style>