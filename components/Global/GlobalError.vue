<template>
  <v-bottom-sheet :model-value="show" persistent inset>
    <v-banner
      :color="type"
      :icon="computedIconNames"
      :title="title"
      :text="text"
    >
      <template #text>
        <div>{{ title }}</div>
        <div>
          {{ text }}
        </div>
      </template>
      <template #actions>
        <CloseBtn @close="$emit('close')" />
      </template>
    </v-banner>
  </v-bottom-sheet>
</template>

<script lang="ts" setup>
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
defineEmits(["close"]);
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "success",
  },
  title: {
    type: String,
    required: false,
  },
});

const computedIconNames = computed(() => {
  switch (props.type) {
    case "success":
      return "mdi-check";
    case "error":
      return "mdi-alert";
    case "warning":
      return "mdi-alert";
    default:
      return "mdi-check";
  }
});
</script>

<style></style>
