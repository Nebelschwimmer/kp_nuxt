<template>
	<v-card variant="flat">
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
						cover
						:class="[
							'cursor-pointer rounded-md',
							{ 'border-2 border-primary': activeImg === gallery.indexOf(img) },
						]"
						@click="setActiveImage(gallery.indexOf(img))">
						<template #placeholder>
							<ImgPlaceholder />
						</template>
					</v-img>
				</v-col>
			</v-row>
		</v-container>
		<v-dialog
			v-model="showExpandedPic"
			max-width="1200">
			<v-card>
				<v-container>
					<v-row>
							<v-spacer></v-spacer>
							<CloseBtn @click="showExpandedPic = false" />
					</v-row>
					<v-row>
						<v-col>
							<v-img
								:src="gallery[activeImg]"
								contain
								></v-img>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script lang="ts" setup>
	import ImgPlaceholder from "~/components/Placeholders/ImgPlaceholder.vue";
	import CloseBtn from "../Containment/Btns/CloseBtn.vue";
	const props = defineProps<{
		gallery: string[];
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
