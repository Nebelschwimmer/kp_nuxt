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
<style>
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		filter: blur(15px);
	}

	.layout-enter-active,
	.layout-leave-active {
		transition: all 0.4s;
	}
	.layout-enter-from,
	.layout-leave-to {
		filter: grayscale(1);
	}
</style>
