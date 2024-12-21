<template>
	<v-btn
		:color="color"
		:size="size"
		variant="tonal"
		@click="emitAction(type)">
		<v-icon> {{ icon }}</v-icon>
		{{ computedBtnTitle }}
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
	const props = defineProps({
		type: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: false,
			default: "accent",
		},
		size: {
			type: String,
			required: false,
			default: "small",
		},
		icon: {
			type: String,
			required: false,
			default: "mdi-plus",
		},
	});

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
