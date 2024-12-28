<template>
	<v-btn
		:color="color"
		:size="size"
		density="comfortable"
		icon
		rounded="0"
		:to="to"
		@click="emitAction(type)">
		<v-icon> {{ computedIcon }}</v-icon>
		<template v-if="showLabel">{{ computedBtnTitle }}</template>
	</v-btn>
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
	};
	const props = defineProps<{
		type: string;
		color?: string;
		size?: string;
		icon?: string;
		disabled?: boolean;
		to?: string;
		showLabel?: boolean;
	}>();
	

	const computedBtnTitle = computed(() => {
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
	});

	const computedIcon = computed(() => {
		switch (props.type) {
			case "add":
				return "mdi-plus";
			case "edit":
				return "mdi-pencil";
			case "delete":
				return "mdi-delete";
			default:
				return "mdi-plus";
		}
	})
</script>

<style lang="scss">
.custom-btn{
  color: #fff !important;
  background-image: linear-gradient(
    45deg,
    rgba(135, 135, 135, 0.5) 0%,
    rgba(223, 106, 238, 0.5) 50%,
    rgba(255, 0, 170, 0.5) 100%
  ) !important;
  border-radius: 10px !important;
  transition: all 0.2s ease-in-out;
  &:hover{
    color: #fff !important;
    background-image: linear-gradient(
      45deg,
      rgba(135, 135, 135, 0.1) 0%,
      rgba(223, 106, 238, 0.1) 50%,
      rgba(255, 0, 170, 0.1) 100%
    ) !important;
  }
}
</style>
