<template>
  <div>
    <v-select
      :items="items"
      :model-value="modelValue"
      :label="label"
      variant="outlined"
      density="compact"
      item-title="name"
      item-value="id"
      @update:model-value="$emit('update:modelValue', $event)"
      return-object
    >
      <template #prepend-inner>
        <v-icon :icon="icon" />
      </template>
    </v-select>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: Number || Object,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  }
});
</script>

<style></style>
