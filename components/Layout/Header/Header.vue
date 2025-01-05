<template>
  <v-app-bar
    scroll-behavior="fade-image"
    scroll-threshold="120"
    color="primary"
  >
    <template #image>
      <v-img
        gradient="45deg, rgba(0, 0, 0, 0.3) 0%, rgb(0, 0, 0, 0.1) 50%, rgb(0, 0, 0, 0.2) 100%"
      ></v-img>
    </template>
    <template #prepend>
      <v-app-bar-nav-icon @click="$emit('toggle:drawer')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <nuxt-link to="/"> Kinopoisk Lite </nuxt-link>
    </v-app-bar-title>
    
    <v-btn stacked   @click="toggleDark">
      <v-icon>mdi-weather-sunny</v-icon>
    </v-btn>
    <v-btn stacked class="text-none">
      <v-badge
        color="transparent"
        variant="outlined"
        size="x-small"
        :content="computedBadgeFlag"
      >
        <v-icon>mdi-translate</v-icon>
      </v-badge>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in languageOptions"
            :key="index"
            :active="item.value === locale"
            :color="item.value === locale ? 'primary' : ''"
            :value="item"
            :title="item.title"
            @click="changeLanguage(item.value)"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts" setup>
const theme = useTheme();
defineEmits(["toggle:drawer"]);
const changeLanguage = (lang: string) => {
  setLocale(lang);
};
const { setLocale } = useI18n();
const search = ref("");
const { locale } = useI18n();
const languageOptions = [
  {
    title: "🇷🇺 Русский",
    value: "ru",
    flag: "🇷🇺",
  },
  {
    title: "🇬🇧 English",
    value: "en",
    flag: "🇬🇧",
  },
  {
    title: "🇫🇷 Français",
    value: "fr",
    flag: "🇫🇷",
  },
];

const computedBadgeFlag = computed(() => {
  return languageOptions.find((item) => item.value === locale.value)?.flag;
});
const toggleDark = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? "light"
    : "dark";
}
</script>
