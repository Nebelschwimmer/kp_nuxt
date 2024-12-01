<template>
  <div>
    <v-app-bar scroll-behavior="fade-image collapse" color="primary">
      <template #prepend>
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
      </template>
      <template v-slot:image>
        <v-img
          gradient="to top left, rgba(100,115,201,.7), rgba(25,32,72,.9)"
        />
      </template>
      <v-app-bar-title>
        <Logo />
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-responsive> </v-responsive>
      <template v-slot:append>
        <ProfileNav/>
        <VerticalDivider />
        <template v-if="$vuetify.display.mdAndUp">
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-theme-light-dark" v-bind="props" />
            </template>
            <v-list>
              <div class="text-center text-caption mb-2">
                {{ $t("menu.theme.title") }}
              </div>
              <v-divider></v-divider>
              <v-list-item
                v-for="(item, index) in themeOptions"
                :key="index"
                :value="item"
              >
                <v-tooltip activator="parent" location="start">
                  {{ item.title }}
                </v-tooltip>
                <v-btn
                  icon
                  density="compact"
                  flat
                  block
                  @click="changeThemeOnClick"
                >
                  <v-icon :icon="item.icon"></v-icon>
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
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
                :value="item"
              >
                <v-list-item-title @click="changeLanguage(item.value)">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-btn icon>
            <v-icon icon="mdi-dots-vertical" size="x-large"></v-icon>
          </v-btn>
          <v-dialog activator="parent" fullscreen>
            <template #default="{ isActive }">
              <MobileActionsMenu
                :theme-options="themeOptions"
                :language-options="languageOptions"
                @close-menu="isActive.value = false"
                @change-theme="changeThemeOnClick"
                @change-language="changeLanguage"
              />
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

const { setLocale } = useI18n();
const { t } = useI18n();
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
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
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>

<style></style>
