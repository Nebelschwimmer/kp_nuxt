<template>
	<v-sheet
		rounded="lg"
    color="transparent"
		border="dashed thin"
		:class="[
			'drop-target full-height column rounded-borders',
			{ 'drag-enter': isDragged },
		]"
		@dragenter.prevent
		@dragleave.prevent="handleDragLeave"
		@drop.prevent="handleDrop"
		@dragover.prevent="showDraggingArea">
		<BaseImg
			:img-src="preview || ''"
			:img-options="{ ...previewImgOptions }" />
	</v-sheet>
</template>

<script lang="ts" setup>
	import BaseImg from "../Containment/Img/BaseImg.vue";
const emit = defineEmits(["drop"]);
const { t } = useI18n();
	const props = defineProps<{
		height?: number;
		preview?: string;
	}>();

	const isDragged = ref(false);
	const showDraggingArea = () => {
		isDragged.value = true;
	};

	const handleDragLeave = () => {
		isDragged.value = false;
	};

	const handleDrop = (event: DragEvent) => {
		isDragged.value = false;
    const file = event.dataTransfer?.files[0];
		if (file) {
			emit("drop", file);
		}
	};

	const previewImgOptions = {
		shaded: false,
		height: props.height || 300,
    cover: true,
    clearable: true,
		placeholderOptions: {
			displayTitle: true,
			title:  t("general.drag_and_drop"),
		},
	} as ImgOptions;
</script>

<style>
	.drop-target {
		overflow: auto;
		outline: 1px solid rgba(174, 174, 174, 0.406);
	}
	.drag-enter {
		outline: 2px dotted #0fb312;
	}
</style>
