<template>
	<v-card
		class="base-card"
		rounded="lg"
		:to="to"
		:img="imageSrc">
		<v-img
			:src="imageSrc"
			:height="imgHeight || 200"
			cover>
			<div class="card-title position-absolute top-0 left-0 right-0 z-10"
				><slot name="top"></slot
			></div>
			<template #placeholder>
				<ImgPlaceholder
					:height="imgHeight"
					:title="noImgLabel" />
			</template>
			<v-card-title
				class="text-center card-title position-absolute bottom-0 z-10 left-0 right-0">
				<span class="font-bold text-h5 text-primary"> {{ title }}</span>
			</v-card-title>
		</v-img>
	</v-card>
</template>

<script lang="ts" setup>
	import ImgPlaceholder from "~/components/Placeholders/ImgPlaceholder.vue";
	const props = defineProps<{
		id?: number;
		to?: string;
		imageSrc?: string;
		imgHeight?: number;
		noImgLabel?: string;
		title: string;
	}>();
</script>
