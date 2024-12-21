import { LoadingScreen } from '../.nuxt/components';
<template>
	<v-app id="inspire">
		<v-layout class="bg-gradient">
			<Header @toggle-drawer="drawer = !drawer" />
			<v-main>
				<template v-if="$vuetify.display.mobile">
					<ClientOnly>
						<v-navigation-drawer v-model="drawer">
							<NavDrawerContent />
						</v-navigation-drawer>
					</ClientOnly>
				</template>
				<NuxtLoadingIndicator color="#FF6363" />
				<main class="container mx-auto max-w-screen-xl">
					<slot />
				</main>
			</v-main>
			<footer>
				<slot name="footer" />
			</footer>
		</v-layout>
	</v-app>
</template>

<script lang="ts" setup>
	import Header from "~/components/Layout/Header/Header.vue";
	import NavDrawerContent from "~/components/Navigation/NavDrawerContent.vue";
	const drawer = ref(false);
</script>

<style></style>
