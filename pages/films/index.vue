<template>
      <v-container tag="section">
        <v-row>
          <v-col>
            <BaseDataIterator
              :items="filmItems"
              :offset="offset"
              :search="search"
              :loading="loading"
              :total-pages="totalPages"
              :items-per-page="limit"
              :page="currentPage"
              :toolbar-options="toolbarOptions"
              :img-options="imgOptions"
              :add-link="'/films/add'"
              footer
              @update:page="updateQueryParams"
            >
            </BaseDataIterator>
          </v-col>
        </v-row>
      </v-container>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/store/filmStore";

import BaseDataIterator from "~/components/Layout/Page/BaseDataIterator.vue";
const { films, loading, totalPages, currentPage, networkError } =
  storeToRefs(useFilmStore());
const { fetchFilteredFilms } = useFilmStore();
const { locale, t } = useI18n();
const limit = ref(5);
const offset = ref(0);
const search = ref("");

onMounted(async () => {
  await fetchFilteredFilms(
    limit.value,
    offset.value,
    search.value,
    locale.value
  );
});

const filmItems = computed(() => {
  return films.value.map((film): CardItem => {
    return {
      title:
        film.name +
        " (" +
        (film.releaseYear ? film.releaseYear.toString() : "") +
        ")",
      subtitle: film.description || "",
      imageSrc: film.gallery[0] || "",
      to: "/films/" + film.id,
    };
  });
});

const breadcrumbs = [
  {
    title: t("nav.home"),
    to: "/",
    icon: "mdi-home",
  },
  {
    title: t("nav.films"),
    to: "/films",
    icon: "mdi-filmstrip",
  },
] as Breadcrumb[];

const toolbarActions = [
  {
    type: "add",
    icon: "mdi-plus",
    title: t("forms.film.add"),
    disabled: false,
    to: `/films/add`,
  },
] as ToolbarAction[];

const toolbarOptions = {
  displayBackBtn: false,
  breadcrumbs: breadcrumbs,
  actions: toolbarActions,
} as ToolbarOptions;

const imgOptions = {
  shaded: false,
  height: 100,
  placeholderOptions: {
    displayTitle: true,
    title: t("pages.films.no_preview"),
  },
} as ImgOptions;

const updateQueryParams = (page: number) => {
  offset.value = (page - 1) * limit.value;
};

watch(
  [offset, limit, search, locale],
  async ([newOffset, newLimit, newSearch, newLocale]) => {
    await fetchFilteredFilms(newLimit, newOffset, newSearch, newLocale);
  },
  {
    immediate: true,
  }
);
</script>

<style></style>
