import { default } from '../i18n/locales/en-US';
<template>
  <div>
    <v-btn :color="color" variant="tonal" :size="size" icon @click="emitAction(type)">
      <v-icon> {{ icon }}</v-icon>
      <v-tooltip activator="parent" location="start">
        {{ computedBtnToolTip }}
      </v-tooltip>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const emit = defineEmits(["add", "edit", "delete"]);
const emitAction = (type: string) => {
  switch (type) {
    case "add":
      emit("add");
      break;
    case "edit":
      emit("edit");
      break;
    case "delete":
      emit("delete");
      break;
    default:
      emit("add");
      break;
  }
}
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false,
    default: "secondary"
  },
  size: {
    type: String,
    required: false,
    default: "small"
  },
  icon: {
    type: String,
    required: false,
    default: "mdi-plus"
  }
})


const computedBtnToolTip = computed(() => {
  switch (props.type) {
    case "add":
      return t("actions.add");
    case "edit":
      return t("actions.edit");
    case "delete":
      return t("actions.delete");
    default:
      return t("actions.add");
  }
})


</script>

<style>

</style>