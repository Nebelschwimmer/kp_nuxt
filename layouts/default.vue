import { LoadingScreen } from '../.nuxt/components';
<template>
	<v-app id="inspire">
		<v-layout class="bg-gradient">
			<Header @toggle-drawer="drawer = !drawer" />
			<ClientOnly>
				<v-navigation-drawer
					v-model="drawer"
					:location="$vuetify.display.smAndDown ? 'top' : 'left'">
					<NavDrawerContent />
				</v-navigation-drawer>
			</ClientOnly>
			<v-main class="h-full bg-surface ">
					<NuxtLoadingIndicator />
					<slot />
			</v-main>
			<footer>
				<slot name="footer" />
			</footer>
		</v-layout>
	</v-app>
</template>

<script lang="ts" setup>
	import NavDrawerContent from "~/components/Navigation/NavDrawerContent.vue";
	const drawer = ref(false);
</script>

<style>
.bg-gradient {
	background-image: radial-gradient(circle at 28% 90%, rgba(113, 113, 113,0.03) 0%, rgba(113, 113, 113,0.03) 24%,transparent 24%, transparent 100%),radial-gradient(circle at 84% 65%, rgba(173, 173, 173,0.03) 0%, rgba(173, 173, 173,0.03) 45%,transparent 45%, transparent 100%),radial-gradient(circle at 46% 12%, rgba(141, 141, 141,0.03) 0%, rgba(141, 141, 141,0.03) 22%,transparent 22%, transparent 100%),radial-gradient(circle at 26% 14%, rgba(119, 119, 119,0.03) 0%, rgba(119, 119, 119,0.03) 35%,transparent 35%, transparent 100%),radial-gradient(circle at 81% 90%, rgba(42, 42, 42,0.03) 0%, rgba(42, 42, 42,0.03) 40%,transparent 40%, transparent 100%),radial-gradient(circle at 28% 100%, rgba(234, 234, 234,0.03) 0%, rgba(234, 234, 234,0.03) 56%,transparent 56%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));
}
</style>
