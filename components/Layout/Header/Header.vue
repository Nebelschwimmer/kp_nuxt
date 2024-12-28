<template>
	<v-app-bar
		scroll-off-screen
		:hide-on-scroll="$vuetify.display.smAndDown"
		:prominent="$vuetify.display.smAndDown"
		color="primary"
		>
		<template #image>
			<v-img gradient="90deg, rgba(0, 0, 0, .1) 0%, rgba(0, 0, 0, .1) 50%, rgba(0, 0, 0, .4)"></v-img>
		</template>
		
		<template v-if="$vuetify.display.smAndDown">
			<v-menu class="h-dvh">
				<template v-slot:activator="{ props }">
					<v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
				</template>
				<MobileActionsMenu
					@change-language="changeLanguage"
					:language-options="languageOptions" />
			</v-menu>
		</template>
		<v-app-bar-title>
			<Logo />
		</v-app-bar-title>
		<v-spacer></v-spacer>
		<template v-if="$vuetify.display.mdAndUp">
			<div class="d-flex flex-wrap ga-3">
				<v-btn
					variant="tonal"
					density="comfortable"
					:active="$route.name === 'index'"
					active-color="secondary"
					to="/">
					{{ $t("nav.home") }}
				</v-btn>

				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn
							variant="tonal"
							v-bind="props"
							:active="$route.name === 'films'"
							active-color="secondary"
							append-icon="mdi-menu-down"
							density="comfortable">
							{{ $t("nav.films") }}
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							value="films"
							to="/films"
							prepend-icon="mdi-view-list">
							{{ $t("nav.films_list") }}</v-list-item
						>
						<v-list-item
							value="films_add"
							to="/films/add"
							prepend-icon="mdi-plus"
							>{{ $t("nav.films_add") }}</v-list-item
						>
					</v-list>
				</v-menu>
				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn
							variant="tonal"
							density="comfortable"
							:active="$route.name === 'persons'"
							active-color="secondary"
							append-icon="mdi-menu-down"
							v-bind="props">
							{{ $t("nav.persons") }}
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							value="persons"
							to="/persons"
							prepend-icon="mdi-view-list"
							>{{ $t("nav.all") }}</v-list-item
						>
						<v-list-item
							value="actors"
							to="/persons/actors"
							prepend-icon="mdi-account"
							>{{ $t("nav.actors") }}</v-list-item
						>
						<v-list-item
							value="directors"
							to="/persons/directors"
							prepend-icon="mdi-account-tie"
							>{{ $t("nav.directors") }}</v-list-item
						>
						<v-divider></v-divider>
						<v-list-item
							value="persons_add"
							to="/persons/add"
							prepend-icon="mdi-plus"
							>{{ $t("nav.persons_add") }}</v-list-item
						>
					</v-list>
				</v-menu>
			</div>
		</template>
		<v-spacer></v-spacer>

		<v-responsive max-width="500">
			<v-text-field
				v-model="search"
				density="comfortable"
				variant="solo-filled"
				color="primary"
				hide-no-data
				hide-details>
				<template v-slot:prepend-inner>
					<v-icon icon="mdi-magnify"></v-icon>
				</template>
				<template v-slot:append-inner>
					<v-btn
						icon
						rounded="0"
						density="compact">
						<v-icon icon="mdi-filter-variant"></v-icon
					></v-btn>
				</template>
			</v-text-field>
		</v-responsive>
		<v-spacer></v-spacer>
		<template v-if="$vuetify.display.mdAndUp">
			<v-menu open-on-hover>
				<template v-slot:activator="{ props }">
					<v-btn
						icon
						v-bind="props"
						variant="tonal"
						slim
						rounded="0">
						<v-tooltip activator="parent">{{ $t("nav.language") }}</v-tooltip>
						<v-icon icon="mdi-translate"></v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="(item, index) in languageOptions"
						:key="index"
						rounded="lg"
						density="compact"
						:value="item">
						<v-list-item-title @click="changeLanguage(item.value)" 	class="text-body-2">{{
							item.title
						}}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</template>
		<v-spacer></v-spacer>
		<v-responsive max-width="120">
			<ProfileNav :avatar-src="''" />
		</v-responsive>
	</v-app-bar>
</template>

<script lang="ts" setup>
	import Logo from "./Logo.vue";
	import MobileActionsMenu from "./MobileActionsMenu.vue";
	import ProfileNav from "~/components/Navigation/ProfileNav.vue";

	defineEmits<{
		(e: "toggle-drawer"): void;
	}>();

	const changeLanguage = (lang: string) => {
		setLocale(lang);
	};
	const { setLocale } = useI18n();
	const search = ref("");
	const languageOptions = [
		{
			title: "🇷🇺 Русский",
			value: "ru",
		},
		{
			title: "🇬🇧 English",
			value: "en",
		},
		{
			title: "🇫🇷 Français",
			value: "fr",
		},
	];
</script>

<style lang="scss" scoped></style>
