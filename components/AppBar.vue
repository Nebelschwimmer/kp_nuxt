<template>
	<div>
    <v-app-bar
      scroll-behavior="fade-image collapse"
      color="primary">
      <template #prepend>
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
      </template>
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(100,115,201,.3), rgba(25,32,72,.7)" />
      </template>
      <v-container class="mx-auto d-flex align-center justify-center">
        <v-app-bar-title>
          <Logo />
        </v-app-bar-title>
        <v-responsive max-width="350">
          <v-text-field
            v-model="searchQuery"
            density="compact"
            :label="$t('actions.search')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            hide-details
            single-line
            @click:clear="searchQuery = ''">
          </v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
      </v-container>
      <template v-slot:append>
        <template v-if="$vuetify.display.mdAndUp">
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-theme-light-dark"
                v-bind="props" />
            </template>
            <v-list>
              <v-list-subheader>{{ $t("menu.theme.title") }}</v-list-subheader>
              <v-list-item
                v-for="(item, index) in themeOptions"
                :key="index"
                :value="item"
                @click="changeThemeOnClick">
                <v-list-item-title @click="changeThemeOnClick">
                  >{{ item.title }}
                </v-list-item-title>
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-translate"
                v-bind="props">
              </v-btn>
            </template>
            <v-list>
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
          <v-btn>
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
	const theme = useTheme();

	defineEmits<{
		(e: "toggle-drawer"): void;
	}>();

	const changeLanguage = (lang: string) => {
		setLocale(lang);
	};
	const searchQuery = ref("");
	const { setLocale } = useI18n();
	const { t } = useI18n();
	const toggleTheme = () => {
		theme.global.name.value = theme.global.current.value.dark
			? "light"
			: "dark";
	};

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
