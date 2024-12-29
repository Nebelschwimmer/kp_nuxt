<template>
  <v-toolbar :color="color" density="compact">
    <template #image>
      <v-img
        gradient="45deg, rgba(225, 225, 225, .3) 0%, rgba(0, 0, 0, .1) 50%, rgba(155, 155, 155, .3)"
      ></v-img>
    </template>
    <template #prepend>
      <div class="d-flex items-center gap-2 align-center">
        <v-icon v-if="prependIcon" :icon="prependIcon"></v-icon>
        <NuxtLink :to="to" v-if="displayBackBtn">
          <v-btn icon flat @click="$router.back()">
            <v-icon icon="mdi-chevron-left"></v-icon>
            <v-tooltip activator="parent" location="start">{{
              $t("actions.back")
            }}</v-tooltip>
          </v-btn>
        </NuxtLink>
      </div>
    </template>
    <v-toolbar-title>
      <div class="d-flex ga-1 align-center flex-wrap">
        <span
          v-if="breadcrumbs"
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="d-flex ga-1 align-center"
        >
          <v-icon
            v-if="breadcrumb.icon"
            size="x-small"
            :icon="breadcrumb.icon"
          ></v-icon>
          <nuxt-link
            :to="breadcrumb.href"
            :class="[
              'text-body-2',
              {
                ' text-decoration-underline': index === breadcrumbs.length - 1,
              },
            ]"
          >
            {{ breadcrumb.title }}
          </nuxt-link>
          <v-icon
            color=""
            v-if="index < breadcrumbs.length - 1"
            size="x-small"
            icon="mdi-slash-forward"
          ></v-icon>
        </span>
      </div>
    </v-toolbar-title>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon v-if="actions" v-bind="props">
          <v-icon icon="mdi-dots-vertical"></v-icon>
        </v-btn>
      </template>
      <v-list density="compact">
        <v-list-item
          v-for="action in actions"
          :key="action.type"
          :base-color="action.type === 'delete' ? 'error' : ''"
          :prepend-icon="action.icon"
          :title="action.title"
          :to="action.to"
          :value="action.type"
        >
      </v-list-item>
      </v-list>
    </v-menu>
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
