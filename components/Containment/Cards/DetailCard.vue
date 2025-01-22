<template>
	<v-card rounded="lg">
		<template #image>
			<v-img
				:src="cover"
				cover
				height="800"
				class="img-blur"
				gradient="to top, rgba(0,0,0,.2), rgba(0,0,0, 0)">
			</v-img>
		</template>

		<v-img
			v-if="cover"
			cover
			height="300"
			:src="cover">
			<div class="ma-5">
				<slot name="avatar"></slot>
			</div>
		</v-img>
		<v-toolbar class="pa-2 stained-glass">
			<template #append>
				<slot name="toolbar-append"></slot>
			</template>
			<template #title>
				<div
					class="d-flex flex-column ga-1"
					v-if="!loading">
					<span
						class="text-h6 text-truncate text-md-h4 text-lg-h4 font-weight-bold"
						>{{ title }}</span
					>
					<span
						v-if="subtitle"
						class="text-caption text-truncated text-lg-subtitle-1">
						{{ subtitle }}
					</span>
				</div>
				<v-skeleton-loader
					v-else
					type="text"
					height="60"></v-skeleton-loader>
			</template>
			<template #prepend>
				<BackBtn />
			</template>
		</v-toolbar>

		<v-card-text>
			<slot name="text"></slot>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
	import BackBtn from "../Btns/BackBtn.vue";
	defineEmits(["edit"]);
	defineProps<{
		title?: string;
		subtitle?: string;
		loading?: boolean;
		cover?: string;
	}>();
</script>

<style>
	.placeholder-gradient {
		background-image: repeating-linear-gradient(
				0deg,
				hsla(29, 0%, 11%, 0.07) 0px,
				hsla(29, 0%, 11%, 0.07) 50px,
				transparent 50px,
				transparent 100px
			),
			repeating-linear-gradient(
				90deg,
				hsla(29, 0%, 11%, 0.07) 0px,
				hsla(29, 0%, 11%, 0.07) 50px,
				transparent 50px,
				transparent 100px
			),
			linear-gradient(90deg, hsl(207, 0%, 28%), hsl(207, 0%, 28%));
	}
</style>
