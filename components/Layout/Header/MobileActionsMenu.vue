<template>
  <div class="fill-height d-flex flex-column">
    <v-btn
      icon="mdi-close"
      density="compact"
      flat
      @click="$emit('close-menu')"
    ></v-btn>

    <NavDrawerContent>
      <template #default>
        <v-select
          density="compact"
          :label="$t('nav.language')"
          :items="languageOptions"
          prepend-icon="mdi-translate"
          @update:model-value="$emit('change-language', $event)"
        >
        </v-select>
      </template>
    </NavDrawerContent>
  </div>
</template>

<script lang="ts" setup>
import NavDrawerContent from "~/components/Navigation/NavDrawerContent.vue";
defineEmits<{
  (e: "close-menu"): void;
  (e: "change-language", value: string): void;
}>();
defineProps<{
  languageOptions: { title: string; value: string }[];
}>();
</script>

<style></style>
