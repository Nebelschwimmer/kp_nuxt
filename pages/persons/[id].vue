<template>
  <BasePage
    :loading="loading"
    :error="networkError"
    :toolbar-options="toolbarOptions"
    toolbar
    @alert:close="networkError = null"
  >
    <template #content>
      <DetailCard
        :title="person?.firstname + ' ' + person?.lastname || ''"
        :no-img-label="$t('pages.persons.no_photo') || ''"
        :details="computedPersonDetails"
        :bg-img="person?.photo || ''"
        :edit-link="`/persons/${person?.id}/edit`"
      >
        <template #gallery>
          <PhotoGallery
            :gallery-content="person?.photo || ''"
            :name="person?.firstname + ' ' + person?.lastname || ''"
            :no-content-label="$t('pages.films.no_gallery')"
            @img:edit=""
            @img:share=""
            @img:download=""
          />
        </template>
      </DetailCard>
    </template>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "~/components/Layout/Page/BasePage.vue";
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import { usePersonStore } from "~/store/personStore";
import { storeToRefs } from "pinia";
import PhotoGallery from "~/components/Gallery/PhotoGallery.vue";
const { person, loading, networkError } = storeToRefs(usePersonStore());
const { fetchPersonById } = usePersonStore();
const { locale, t } = useI18n();

const breadcrumbs = ref<Breadcrumb[]>([
  {
    title: t("nav.home"),
    to: "/",
    icon: "mdi-home",
  },
  {
    title: t("nav.persons"),
    to: "/persons",
    icon: "mdi-account-group",
  },
  {
    title: `${person.value?.firstname} ${person.value?.lastname}`,
    to: "/persons",
    icon: "mdi-account-group",
  },
]);

const computedPersonDetails = computed(() => {
  return [
    {
      name: "forms.person.firstname",
      value: person.value?.firstname || "",
      type: "info",
      icon: "mdi-account",
    },
    {
      name: "forms.person.lastname",
      value: person.value?.lastname || "",
      type: "info",
      icon: "mdi-account",
    },
    {
      name: "pages.persons.specialties",
      value: person.value?.specialtyNames.join(", ") || "",
      type: "info",
      icon: "mdi-account",
    },
  ];
})


const toolbarOptions = reactive({
  displayBackBtn: true,
  breadcrumbs: breadcrumbs.value,
});

onMounted(async () => {
  const personId = Number(useRoute().params.id);
  await fetchPersonById(personId, locale.value);
});

watch(
  person as Ref<Person>,
  (newVal) => {
    breadcrumbs.value[2] = {
      title: `${newVal?.firstname} ${newVal?.lastname}`,
      to: "/persons",
    };
  },
  { immediate: true },
);
</script>

<style></style>
