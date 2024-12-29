<template>
		<LoadingScreen v-if="isLoading" />
    <NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
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
	$background: #faf9f4;
	$surface: #e4e4e4;
	$primary: #60726283;
	$secondary: #e0974a2c;
	$accent: #ff4d00;

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
    filter: opacity(0);
	}

	.bg-gradient {
		background-image: radial-gradient(
				circle at 69% 86%,
				rgba(165, 165, 165, 0.06) 0%,
				rgba(165, 165, 165, 0.06) 25%,
				rgba(193, 193, 193, 0.06) 25%,
				rgba(193, 193, 193, 0.06) 50%,
				rgba(221, 221, 221, 0.06) 50%,
				rgba(221, 221, 221, 0.06) 75%,
				rgba(249, 249, 249, 0.06) 75%,
				rgba(249, 249, 249, 0.06) 100%
			),
			radial-gradient(
				circle at 49% 76%,
				rgba(129, 129, 129, 0.06) 0%,
				rgba(129, 129, 129, 0.06) 25%,
				rgba(164, 164, 164, 0.06) 25%,
				rgba(164, 164, 164, 0.06) 50%,
				rgba(200, 200, 200, 0.06) 50%,
				rgba(200, 200, 200, 0.06) 75%,
				rgba(235, 235, 235, 0.06) 75%,
				rgba(235, 235, 235, 0.06) 100%
			),
			radial-gradient(
				circle at 22% 64%,
				rgba(173, 173, 173, 0.06) 0%,
				rgba(173, 173, 173, 0.06) 25%,
				rgba(119, 119, 119, 0.06) 25%,
				rgba(119, 119, 119, 0.06) 50%,
				rgba(64, 64, 64, 0.06) 50%,
				rgba(64, 64, 64, 0.06) 75%,
				rgba(10, 10, 10, 0.06) 75%,
				rgba(10, 10, 10, 0.06) 100%
			),
			linear-gradient(307deg, $primary, white) !important;
		background-attachment: fixed;
	}

	.base-card {
		background-image: linear-gradient(
      to right,
			rgba(151, 151, 151, 0.2) 0%,
      rgba(151, 151, 151, 0.01) 75%,
			rgba(255, 255, 255, 0.1) 100%
		) !important;
		backdrop-filter: blur(10px) !important;
	}
	.card-title {
		background-color: rgba(0, 0, 0, 0.246) !important;
		backdrop-filter: blur(10px) !important;
	}
	.main-container {
		backdrop-filter: blur(4px);
		background-color: rgba($color: #ffffff, $alpha: 0.8);
	}
	a {
		text-decoration: none;
		color: inherit;
	}
</style>
