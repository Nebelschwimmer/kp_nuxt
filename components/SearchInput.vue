<template>
  <div>
    <v-text-field
      v-model="modelValue"
      density="compact"
      :label="$t('actions.search')"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      hide-details
      single-line
      @click:clear="$emit('search:clear')"
      @update:model-value="$emit('update:modelValue', $event)"
    >
    </v-text-field>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["update:modelValue", "search:clear"]);
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
