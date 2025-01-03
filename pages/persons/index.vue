<template>
  <BaseDataIterator
    :items="personItems"
    :offset="offset"
    :search="search"
    :loading="loading"
    :totalPages="totalPages"
    :items-per-page="limit"
    :page="currentPage"
    :toolbar-options="toolbarOptions"
    :imgOptions="imgOptions"
    footer
    add-link="/persons/add"
    @update:page="updateQueryParams"
  >
  </BaseDataIterator>
</template>

<script lang="ts" setup>
import { usePersonStore } from "~/store/personStore";
import BaseDataIterator from "~/components/Layout/Page/BaseDataIterator.vue";
const { persons, loading, totalPages, currentPage } =
  storeToRefs(usePersonStore());
const { fetchFilteredPersons } = usePersonStore();

const limit = ref(6);
const offset = ref(0);
const search = ref("");
const { locale } = useI18n();
onMounted(async () => {
  await fetchFilteredPersons(
    limit.value,
    offset.value,
    search.value,
    locale.value
  );
});

const personItems = computed(() => {
  return persons.value.map((person): CardItem => {
    return {
      title: person.firstname + " " + person.lastname,
      subtitle: person.specialtyNames.join(", "),
      imageSrc: person.photo || "",
      to: "/persons/" + person.id,
      variant: "text",
      color: "secondary",
    };
  });
});

const { t } = useI18n();

const breadcrumbs = ref<Breadcrumb[]>([
  {
    title: t("nav.home"),
    to: "/",
    icon: "mdi-home",
  },
  {
    title: t("nav.persons"),
    to: "/persons",
    icon: "mdi-account",
  },
]);

const toolbarOptions = reactive({
  displayBackBtn: true,
  breadcrumbs: breadcrumbs.value,
});

const imgOptions = {
  shaded: false,
  height: 100,
  placeholderOptions: {
    displayTitle: true,
    title: t("forms.person.no_photo"),
  },
} as ImgOptions;

const updateQueryParams = (page: number) => {
  offset.value = (page - 1) * limit.value;
};

watch(
  [offset, limit, search, locale],
  async ([newOffset, newLimit, newSearch, newLocale]) => {
    await fetchFilteredPersons(newLimit, newOffset, newSearch, newLocale);
  },
  {
    immediate: true,
  }
);
</script>

<style></style>
