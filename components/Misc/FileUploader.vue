<template>
  <v-file-upload
    :model-value="files"
    show-size
    color="transparent"
    density="compact"
    clearable
    accept="image/*"
    width="100%"
    :multiple="multiple"
    :title="$t('general.drag_and_drop')"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-slot:item="{ props: itemProps }">
      <v-file-upload-item v-bind="itemProps" lines="one" nav>
  

        <template v-slot:clear="{ props: clearProps }">
          <v-btn color="primary" v-bind="clearProps"></v-btn>
        </template>
      </v-file-upload-item>
    </template>
  </v-file-upload>
</template>

<script lang="ts" setup>
defineEmits(["update:modelValue"]);
defineProps<{
  files: File[];
  multiple: boolean;
}>();
</script>

<style></style>
