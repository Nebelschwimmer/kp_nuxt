<template>
	<v-hover :disabled="!imgSrc || !imgOptions.removable">
		<template #default="{ props, isHovering }">
			<v-img
				:src="imgSrc || ''"
				rounded="lg"
				v-bind="{
					...imgOptions,
					...props,
				}"
				:gradient="imgOptions.shaded || isHovering ? gradientStr : undefined"
				:cover="imgOptions.cover"
				:class="[
					'position-relative',
					imgOptions.class,
					{ 'cursor-pointer': imgOptions.clickable || imgOptions.removable },
				]"
				:aspect-ratio="imgOptions.aspectRatio"
				@click="openLightBox">
				<template #placeholder>
					<ImgPlaceholder v-bind="imgOptions.placeholderOptions" />
				</template>
				<LightBox
					v-if="imgOptions.clickable"
					:model-value="showLightBox"
					:img-src="imgSrc"
					@close="showLightBox = false" />
				<v-expand-transition v-if="imgOptions.removable">
					<div
						v-if="isHovering"
						class="d-flex transition-ease-in-ease-in-out v-card--reveal"
						style="height: 100%">
						<v-btn
							color="error"
							class="opacity-90"
							block
							prepend-icon="mdi-close"
							@click.prevent.stop="$emit('remove')">
							{{ $t("actions.remove") }}
						</v-btn>
					</div>
				</v-expand-transition>
			</v-img>
		</template>
	</v-hover>
</template>

<script lang="ts" setup>
	defineEmits(["remove"]);
	import LightBox from "~/components/Dialogs/LightBox.vue";
	import ImgPlaceholder from "~/components/Placeholders/ImgPlaceholder.vue";
	const props = defineProps<{
		imgSrc: string;
		imgOptions: ImgOptions;
	}>();

	const FIRST_COLOR = "rgba(148, 148, 148, 0.2)";
	const SECOND_COLOR = "rgba(165, 165, 165, 0.8)";
	const gradientStr = `to top right, ${FIRST_COLOR}, ${SECOND_COLOR}`;

	const showLightBox = ref(false);
	const openLightBox = () => {
		if (props.imgOptions.clickable) {
			showLightBox.value = true;
		}
	};
</script>

<style lang="scss" scoped>
	$firstColor: rgba(148, 148, 148, 0.2);
	$secondColor: rgba(165, 165, 165, 0.1);
</style>
