<template>
	<div>
		<v-app-bar
			scroll-behavior="fade-image collapse"
			flat
			density="comfortable"
			color="primary"
			class="bg-gradient"
			:prominent="$vuetify.display.smAndDown"
			>
			<template #prepend>
				<v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
			</template>
			<template v-slot:image>
				<v-img
					gradient="to left, " />
			</template>
			<v-app-bar-title>
				<Logo />
			</v-app-bar-title>
			<v-spacer></v-spacer>
			<v-responsive max-width="360">
				<v-container>
					<v-row>
						<v-col>
							<v-btn
								density="comfortable"
								variant="text"
                to="/"
								>{{ $t("nav.films") }}</v-btn
							>
						</v-col>
            <v-col>
							<v-btn
								density="comfortable"
								to="/people"
								>{{ $t("nav.people") }}</v-btn
							>
						</v-col>
            <v-col>
							<v-btn
								density="comfortable"
								to="/genres"
								>{{ $t("nav.genres") }}</v-btn
							>
						</v-col>
					</v-row>
				</v-container>
			</v-responsive>
      <v-spacer></v-spacer>
			<template v-slot:append>
				<ProfileNav />
				<VerticalDivider />
				<template v-if="$vuetify.display.mdAndUp">
					<v-menu open-on-hover>
						<template v-slot:activator="{ props }">
							<v-btn
								icon
								v-bind="props">
								<v-icon icon="mdi-translate"></v-icon>
							</v-btn>
						</template>
						<v-list>
							<div class="text-center text-caption mb-2">
								{{ $t("nav.language") }}
							</div>
							<v-divider></v-divider>
							<v-list-item
								v-for="(item, index) in languageOptions"
								:key="index"
								:value="item">
								<v-list-item-title @click="changeLanguage(item.value)">{{
									item.title
								}}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</template>
				<template v-else>
					<v-btn icon>
						<v-icon
							icon="mdi-dots-vertical"
							size="x-large"></v-icon>
					</v-btn>
					<v-dialog
						activator="parent"
						fullscreen>
						<template #default="{ isActive }">
							<MobileActionsMenu
								:theme-options="themeOptions"
								:language-options="languageOptions"
								@close-menu="isActive.value = false"
								@change-theme="changeThemeOnClick"
								@change-language="changeLanguage" />
						</template>
					</v-dialog>
				</template>
			</template>
		</v-app-bar>
	</div>
</template>

<script lang="ts" setup>
	import { useTheme } from "vuetify";
	import ProfileNav from "./Navigation/ProfileNav.vue";
	const theme = useTheme();

	defineEmits<{
		(e: "toggle-drawer"): void;
	}>();

	const changeLanguage = (lang: string) => {
		setLocale(lang);
	};

	const { setLocale } = useI18n();
	const { t } = useI18n();

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

	const themeOptions = [
		{
			title: t("menu.theme.dark"),
			value: "dark",
			icon: "mdi-weather-night",
		},
		{
			title: t("menu.theme.light"),
			value: "light",
			icon: "mdi-white-balance-sunny",
		},
	];
	const changeThemeOnClick = () => {
		theme.global.name.value = theme.global.current.value.dark
			? "light"
			: "dark";
	};
</script>

<style></style>
