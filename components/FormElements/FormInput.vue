<template>
  <v-text-field
    :model-value="modelValue"
    color="primary"
    :label="label"
    variant="outlined"
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
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  clearable: {
    type: Boolean,
    required: false,
    default: false,
  },
  innerIcon: {
    type: String, 
    required: false,
  }
})

defineEmits(["update:modelValue"]);

</script>


