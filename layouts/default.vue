<template>
	<v-layout class="rounded-md">
		<Header
			order="0"
			@toggle-drawer="drawer = !drawer" />
		<v-navigation-drawer
			color="grey-lighten-4"
			location="left"
			width="300"
			class="bg-gradient"
			order="1"></v-navigation-drawer>
		<v-navigation-drawer
			color="grey-lighten-4"
			location="right"
			width="300"
			order="2"></v-navigation-drawer>
		<v-main class="min-h-screen main-container d-flex justify-center">
			<template v-if="$vuetify.display.mobile">
				<ClientOnly>
					<v-navigation-drawer v-model="drawer">
						<NavDrawerContent />
					</v-navigation-drawer>
				</ClientOnly>
			</template>
			<NuxtLoadingIndicator color="#FF6363" />
			<slot />
		</v-main>
	</v-layout>
</template>

<script lang="ts" setup>
	import Header from "~/components/Layout/Header/Header.vue";
	import NavDrawerContent from "~/components/Navigation/NavDrawerContent.vue";
	const drawer = ref(false);
</script>
