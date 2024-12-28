<template>
	<v-card v-if="gallery.length">
		<v-container>
			<v-row>
				<v-col>
					<v-carousel
						v-model="activeImg"
						height="300"
						show-arrows="hover"
						color="accent"
						active-color="primary">
						<v-carousel-item
							v-for="img in gallery"
							:key="img"
							:src="img"
							cover
							class="cursor-pointer"
							@update:model-value="setActiveImage(gallery.indexOf(img))"
							@click="showFullScreenOnClick">
						</v-carousel-item>
					</v-carousel>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					v-for="img in gallery"
					:key="img"
					cols="4">
					<v-img
						:src="img"
						height="100"
						:border="activeImg === gallery.indexOf(img) ? 'accent' : ''"
						cover
						:class="[
							'cursor-pointer rounded-md',
							{
								' border-info': activeImg === gallery.indexOf(img),
							},
						]"
						@click="setActiveImage(gallery.indexOf(img))">
						<template #placeholder>
							<ImgPlaceholder />
						</template>
					</v-img>
				</v-col>
			</v-row>
		</v-container>
		<LightBox
			:model-value="showExpandedPic"
			:img-src="gallery[activeImg]"
			@close="showExpandedPic = false" />
	</v-card>
	<v-sheet
		v-else
		height="300">
		<ImgPlaceholder
			display-title
			:title="noContentLabel" />
	</v-sheet>
</template>

<script lang="ts" setup>
	import LightBox from "../Dialogs/LightBox.vue";
	import ImgPlaceholder from "~/components/Placeholders/ImgPlaceholder.vue";
	defineProps<{
		gallery: string[];
		noContentLabel?: string;
	}>();

	const activeImg = ref(0);
	const showExpandedPic = ref(false);

	const showFullScreenOnClick = () => {
		showExpandedPic.value = true;
	};
	const setActiveImage = (index: number) => {
		activeImg.value = index;
	};
</script>

<style></style>
