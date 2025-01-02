<template>
  <v-toolbar density="compact" rounded="lg">
    <template #prepend v-if="displayBackBtn">
      <v-btn slim icon @click="$router.back()">
        <v-icon icon="mdi-arrow-left"></v-icon>
        <v-tooltip activator="parent" location="bottom">{{
          $t("actions.back")
        }}</v-tooltip>
      </v-btn>
    </template>
    <v-toolbar-title>
      <v-breadcrumbs
        density="compact"
        class="text-subtitle-2"
        :items="breadcrumbs || []"
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            :active="item === breadcrumbs?.at(-1)"
            active-color="accent"
            :disabled="item.disabled"
            :to="item.to"
          >
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-toolbar-title>
    <template v-if="appendIcon" #append>
      <v-icon :icon="appendIcon"></v-icon>
    </template>
  </v-toolbar>
</template>

<script lang="ts" setup>
defineProps<{
  displayBackBtn?: boolean;
  to?: string;
  prependIcon?: string;
  appendIcon?: string;
  color?: string;
  breadcrumbs?: Breadcrumb[];
  addLink?: string;
}>();
</script>
