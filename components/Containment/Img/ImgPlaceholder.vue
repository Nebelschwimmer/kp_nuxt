<template>
	<v-card
		height="100%"
		width="100%"
		min-height="100%"
		:loading="loading"
		image="https://cdn.vuetifyjs.com/docs/images/parallax/stars.jpg"
		class="d-flex placeholder-img align-center justify-center flex-column w-100">
		<template v-if="displayTitle">
			<div
				v-if="!loading"
				class="d-flex flex-column align-center justify-center ga-3">
				<v-list-item
					v-if="title"
					class="text-caption text-center"
					lines="one">
					<div class="d-flex flex-column align-center justify-center ga-1">
						<v-icon
							icon="mdi-image-off"
							size="x-small"></v-icon
						>{{ title }}
					</div>
				</v-list-item>
			</div>
		</template>

		<div
			v-else
			class="d-flex flex-column align-center justify-center fill-height">
			<v-progress-circular indeterminate></v-progress-circular
		></div>
	</v-card>
</template>

<script lang="ts" setup>
	defineProps<{
		title?: string;
		displayTitle?: boolean;
		loading?: boolean;
		displayIcon?: boolean;
	}>();
</script>

<style lang="scss">
	.placeholder-img {
		background-color: rgba(104, 104, 104, 0.2) !important;
	}
</style>
