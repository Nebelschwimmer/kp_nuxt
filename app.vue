<template>
	<div>
		<LoadingScreen v-show="isLoading" />
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
<script setup lang="ts">
	import LoadingScreen from "./components/Loaders/LoadingScreen.vue";
	const isLoading = ref(true);
	onMounted(async () => {
		await nextTick(() => {
			isLoading.value = false;
		});
	});
</script>
<style lang="scss">
	$background: #000000;
	$surface: #201120;
	$primary: #e82384;
	$secondary: #6a1e55;

	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		filter: opacity(0);
	}

	.layout-enter-active,
	.layout-leave-active {
		transition: all 0.4s;
	}
	.layout-enter-from,
	.layout-leave-to {
		filter: grayscale(1);
	}

	.bg-gradient {
		background-image: linear-gradient(0deg, rgb(18, 9, 32),rgb(39, 39, 90),rgb(52, 31, 87),rgb(13, 2, 8));
	}

	.base-card {
		background-image: radial-gradient(
			circle at center center,
			rgb(53, 17, 52, 0.8) 0%,
			rgba(0, 0, 0, 0.1) 100%
		) !important;
		backdrop-filter: blur(10px) !important;
	}
	.card-title {
		background-color: rgba(0, 0, 0, 0.246) !important;
		backdrop-filter: blur(10px) !important;
	}
</style>
