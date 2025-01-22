<template>
	<v-app id="inspire">
		<v-layout class="bg-gradient">
			<v-app-bar
				scroll-behavior="fade-image">
				<template
					#prepend
					v-if="$vuetify.display.mobile">
					<v-app-bar-nav-icon
						@click="drawer = !drawer"></v-app-bar-nav-icon>
				</template>
				<v-app-bar-title>
					<Logo />
				</v-app-bar-title>
				<template v-if="$vuetify.display.mdAndUp">
					<div class="d-flex ga-1">
						<NavBtns />
					</div>
				</template>
				<v-spacer></v-spacer>
				<template v-if="$vuetify.display.mdAndUp">
					<ProfileNav />
				</template>

				<v-divider
					vertical
					inset></v-divider>
				<template #append>
					<template v-if="!$vuetify.display.mobile">
						<LanguageChangeBtn stacked />
					</template>
					<template v-else>
						<HeaderOverflowActions />
					</template>
				</template>
			</v-app-bar>
			<ClientOnly>
				<v-navigation-drawer
					v-if="$vuetify.display.mobile"
					v-model="drawer"
					>
					<v-list nav>
						<v-list-item
							:active="$route.name === 'home'"
							:color="$route.name === 'home' ? 'secondary' : ''"
							to="/"
							rounded="lg"
							prepend-icon="mdi-home"
							:title="$t('nav.home')">
						</v-list-item>
					</v-list>
				</v-navigation-drawer>
			</ClientOnly>

			<v-main
				style="min-height: calc(100vh - 64px)"
				v-scroll="onScroll">
				<v-container>
					<v-row>
						<v-col>
							<PageCard>
								<slot />
							</PageCard>
						</v-col>
					</v-row>
				</v-container>

				<GlobalError
					:show="Boolean(filmNetworkError || personNetworkError)"
					type="error"
					:text="filmNetworkError?.message || personNetworkError?.message || ''"
					:title="$t('pages.network_error')"
					@close="handleErrorAlertClose" />
			</v-main>
		</v-layout>
		<v-bottom-navigation
			v-if="$vuetify.display.smAndDown"
			grow
			mode="shift">
			<NavBtns />
		</v-bottom-navigation>
		<v-fab
			v-if="$vuetify.display.mdAndUp"
			:active="showScrollFab"
			icon="mdi-arrow-up"
			color="secondary"
			location="bottom end"
			size="64"
			layout
			app
			appear
			@click="scrollToTop"></v-fab>
	</v-app>
</template>

<script lang="ts" setup>
	import NavBtns from "~/components/Containment/Btns/NavBtns.vue";
	import Logo from "~/components/Misc/Logo.vue";
	import LanguageChangeBtn from "~/components/Containment/Btns/LanguageChangeBtn.vue";
	import GlobalError from "~/components/Misc/GlobalError.vue";
	import { useFilmStore } from "~/store/filmStore";
	import { usePersonStore } from "~/store/personStore";
	import HeaderOverflowActions from "~/components/Containment/Btns/HeaderOverflowActions.vue";
	import ProfileNav from "~/components/Navigation/ProfileNav.vue";
	import PageCard from "~/components/Containment/Cards/PageCard.vue";
	const { networkError: filmNetworkError } = storeToRefs(useFilmStore());
	const { networkError: personNetworkError } = storeToRefs(usePersonStore());

	const drawer = ref(false);
	const showScrollFab = ref(false);
	const offsetTop = ref(0);

	const onScroll = () => {
		offsetTop.value = window.scrollY;
		showScrollFab.value = offsetTop.value > 30;
	};

	const handleErrorAlertClose = () => {
		if (filmNetworkError.value) {
			filmNetworkError.value = null;
		}
		if (personNetworkError.value) {
			personNetworkError.value = null;
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
</script>

<style></style>
