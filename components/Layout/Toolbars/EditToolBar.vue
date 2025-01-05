import { title } from 'process';
<template>
  <v-toolbar density="comfortable" class="px-2"   color="transparent">
    <template #prepend>
      <v-icon :icon="icon"></v-icon>
    </template>
    <v-toolbar-title>
     {{
        !editMode ? $t(title) : ($t(title) + " (" + $t("actions.editing") + ")")
      }}
    </v-toolbar-title>

    <v-btn
      
    icon

      :color="editMode ? 'warning' : 'secondary'"
      @click="$emit('toggle:editMode')"
    >
      <v-icon>{{ editMode ? "mdi-close" : "mdi-pencil" }}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts" setup>
defineEmits(["toggle:editMode"]);
defineProps<{
  title: string;
  icon: string;
  editMode: boolean;
}>();
</script>

<style></style>
