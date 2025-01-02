<template>
  <v-app-bar
    scroll-off-screen
    :hide-on-scroll="$vuetify.display.smAndDown"
    :collapse="$vuetify.display.smAndDown"
    :collapse-on-scroll="$vuetify.display.smAndDown"
    class="card-title"
  >
    <template #image>
      <v-img
        v-if="theme.global.current.value.dark && !$vuetify.display.smAndDown"
        gradient="45deg, rgba(105, 153, 201, 0.3) 0%, rgb(237, 123, 73, 0.06) 50%, rgb(237, 123, 73, 0.2) 100%"
      ></v-img>
    </template>
    <template #prepend>
      <v-menu class="h-dvh" v-model="menu">
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
        </template>
        <MobileActionsMenu
          @change-language="changeLanguage"
          @close-menu="menu = false"
          :language-options="languageOptions"
        />
      </v-menu>
    </template>

    <v-app-bar-title v-if="$vuetify.display.lgAndUp">
      <nuxt-link to="/">
        <h3
          class="text-h5 text-md-h6 text-lg-h6 text-xl-h5 text-sm-h6 font-weight-bold"
        >
          Kinopoisk Lite
        </h3>
      </nuxt-link>
    </v-app-bar-title>
    <template v-if="$vuetify.display.mdAndUp">
      <div class="d-flex flex-wrap ga-3">
        <v-btn
          variant="tonal"
          density="comfortable"
          slim
          :active="$route.name === 'index'"
          :color="$route.name === 'index' ? 'accent' : ''"
          to="/"
        >
          {{ $t("nav.home") }}
        </v-btn>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="tonal"
              v-bind="props"
              density="comfortable"
              slim
              :active="$route.name === 'films'"
              :color="$route.name === 'films' ? 'accent' : ''"
              append-icon="mdi-menu-down"
            >
              {{ $t("nav.films") }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item value="films" to="/films" prepend-icon="mdi-view-list">
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
              slim
              :active="$route.name === 'persons'"
              :color="$route.name === 'persons' ? 'accent' : ''"
              append-icon="mdi-menu-down"
              v-bind="props"
            >
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

    <template v-if="$vuetify.display.mdAndUp">
      <v-responsive max-width="600">
        <v-text-field
          v-model="search"
          density="comfortable"
          variant="outlined"
          color="primary"
          hide-no-data
          width="100%"
          hide-details
        >
          <template v-slot:prepend-inner>
            <v-icon icon="mdi-magnify"></v-icon>
          </template>
          <template v-slot:append-inner>
            <v-btn icon rounded="0" density="compact">
              <v-icon icon="mdi-filter-variant"></v-icon
            ></v-btn>
          </template>
        </v-text-field>
      </v-responsive>
      <v-spacer></v-spacer>

      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" variant="tonal" slim rounded="0">
            <v-tooltip activator="parent">{{ $t("nav.language") }}</v-tooltip>
            <v-icon icon="mdi-translate"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in languageOptions"
            :key="index"
            rounded="lg"
            :value="item"
          >
            <v-list-item-title
              @click="changeLanguage(item.value)"
              class="text-body-2"
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      <v-responsive max-width="120">
        <ProfileNav :avatar-src="''" />
      </v-responsive>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import MobileActionsMenu from "./MobileActionsMenu.vue";
import ProfileNav from "~/components/Navigation/ProfileNav.vue";
const theme = useTheme();

const changeLanguage = (lang: string) => {
  setLocale(lang);
};
const { setLocale } = useI18n();
const search = ref("");
const menu = ref(false);
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
