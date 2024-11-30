<template>
  <v-text-field
    :model-value="modelValue"
    :rules="rules as any"
    :label="label"
    :variant="variant as any"
    :clearable="clearable"
    density="compact"
    :prepend-inner-icon="innerIcon"
    @update:model-value="$emit('update:modelValue', $event)"
  </v-text-field>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  rules: {
    type: Array,
    required: false,
    default: () => []
  },
  label: {
    type: String,
    required: false
  },
  variant: {
    type: String,
    required: false,
    default: "outlined"
  },
  clearable: {
    type: Boolean,
    required: false,
    default: true
  },
  innerIcon: {
    type: String,
    required: false,
    default:''
  }
})
</script>


