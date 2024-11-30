import { default } from '../i18n/locales/en-US';
<template>
  <v-toolbar  density="compact" class="mb-2">
    <v-btn v-if="displayBackBtn" icon>
        <NuxtLink to="/films">
          <v-icon>mdi-arrow-left</v-icon>
        </NuxtLink>
          <v-tooltip
          activator="parent"
          location="start"
        >{{ $t("actions.back") }}</v-tooltip>
    </v-btn>
    <v-toolbar-title v-if="title" class="font-bold text-caption">{{ $t(title) }}</v-toolbar-title>
    <template v-if="displayActionBtns">
      <slot name="actions"></slot>
    </template>
  </v-toolbar>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: "actions.title"
  },
  displayBackBtn: {
    type: Boolean,
    required: false,
    default: false
  },
  displayActionBtns: {
    type: Boolean,
    required: false,
    default: false
  }
})

</script>

