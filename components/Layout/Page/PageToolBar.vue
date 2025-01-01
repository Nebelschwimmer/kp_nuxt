<template>
  <v-toolbar  density="compact" class="card-title" color="grey-darken-4">
    <template #image>
      <v-img
        gradient="45deg, rgba(105, 153, 201, 0.1) 0%, rgb(237, 123, 73, 0.06) 50%, rgb(237, 123, 73, 0.01) 100%"
      ></v-img>
    </template>
    <template #prepend>
      <v-btn  slim icon @click="$router.back()">
        <v-icon icon="mdi-arrow-left"></v-icon>
        <v-tooltip activator="parent" location="bottom">{{
          $t("actions.back")
        }}</v-tooltip>
      </v-btn>
    </template>
    <v-toolbar-title>
      <v-breadcrumbs
        density="compact"
        class="text-body-2"
        :items="breadcrumbs || []"
      >
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :active="item === breadcrumbs?.at(-1)" active-color="accent" :disabled="item.disabled" :to="item.to">
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
  actions?: ToolbarAction[];
}>();
</script>

<style lang="scss">
.toolbar-gradient {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.15) 25%,
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.05) 75%
  );
}
</style>
