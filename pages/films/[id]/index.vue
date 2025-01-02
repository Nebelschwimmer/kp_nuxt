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
        :title="film?.name + ' (' + film?.releaseYear + ')' || ''"
        :no-img-label="$t('pages.films.no_preview') || ''"
        :details="computedFilmDetails"
        :description="film?.description || ''"
        :list-two="computedFilmPersons || []"
        :list-three="filmActors || []"
        :bg-img="film?.gallery[0] || ''"
        :rating="film?.rating || 0"
        :edit-link="`/films/${film?.id}/edit`"
        :group-names="groupNames || []"
      >
        <template #gallery>
          <PhotoGallery
            :gallery-content="film?.gallery || []"
            :name="film?.name || ''"
            :no-content-label="$t('pages.films.no_gallery')"
            @img:edit="goToEditPage"
            @img:share="copyGalleryItemLinkOnClick"
            @img:download="downloadGalleryItem"
          />
        </template>
      </DetailCard>
    </template>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "~/components/Layout/Page/BasePage.vue";
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import { useFilmStore } from "~/store/filmStore";
import { storeToRefs } from "pinia";
import PhotoGallery from "~/components/Gallery/PhotoGallery.vue";
const showSnackbar = ref(false);
const { film, loading, networkError } = storeToRefs(useFilmStore());
const { fetchFilmById, downloadGalleryItem } = useFilmStore();
const { locale, t } = useI18n();
const filmActors = computed(() => {
  let actorObj = <CardDetails>{};
  let actorsArr = <CardDetails[]>[];

  if (film.value?.actorNames.length) {
    film.value?.actorNames.forEach((name: string) => {
      const actorId =
        film.value?.actorIds[film.value?.actorNames.indexOf(name as never)];

      actorObj = {
        name: name,
        value: "",
        to: "/persons/" + actorId,
        icon: "mdi-account",
      };
      actorsArr.push(actorObj);
    });
  }
  return actorsArr;
});

const groupNames = [
  t('pages.general_info'),
  t('pages.films.team'),
  t('pages.films.starring'),
];

const computedFilmDetails = computed(() => {
  return [
    {
      name: "forms.film.slogan",
      value: film.value?.slogan || "",
      type: "info",
      icon: "mdi-format-quote-close",
    },
    {
      name: "forms.film.release_year",
      value: film.value?.releaseYear || "",
      type: "info",
      icon: "mdi-calendar",
    },
    {
      name: "forms.film.duration",
      value: film.value?.duration || "",
      type: "info",
      icon: "mdi-timer",
    },
    {
      name: "forms.film.genres",
      value: film.value?.genreNames.join(", ") || "",
      type: "info",
      icon: "mdi-filmstrip",
    },
    {
      name: "forms.film.age",
      value: film.value?.age + "+" || "",
      type: "info",
      icon: "mdi-account-group",
    },
  ];
}) as ComputedRef<Array<CardDetails>>;

  const computedFilmPersons = computed(() => {
    return [
    {
      name: "forms.film.director",
      value: film.value?.directorName || "",
      to: film.value?.directorId ? `/persons/${film.value?.directorId}` : "",
      icon: "mdi-account-tie",
    },
    {
      name: "forms.film.producer",
      value: film.value?.producerName || "",
      to: film.value?.producerId ? `/persons/${film.value?.producerId}` : "",
      icon: "mdi-account-tie",
    },
    {
      name: "forms.film.writer",
      value: film.value?.writerName || "",
      to: film.value?.writerId ? `/persons/${film.value?.writerId}` : "",
      icon: "mdi-account-tie",
    },
    {
      name: "forms.film.composer",
      value: film.value?.composerName || "",
      to: film.value?.composerId ? `/persons/${film.value?.composerId}` : "",
      icon: "mdi-account-tie",
    },
    ];
  }) as ComputedRef<Array<CardDetails>>;

const actionBtnProps = reactive({
  type: "edit",
  text: "forms.film.edit",
  to: `/films/${film.value?.id}/edit`,
  icon: "mdi-pencil",
}) as ActionBtnProps;

const breadcrumbs = ref<Breadcrumb[]>([
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
  {
    title: film.value?.name || "",
    to: "/films",
    icon: "mdi-filmstrip",
  },
]);


const toolbarOptions = reactive({
  displayBackBtn: true,
  breadcrumbs: breadcrumbs.value,
});

onMounted(async () => {
  const filmId = Number(useRoute().params.id);
  await fetchFilmById(filmId, locale.value);
});

watch(
  locale,
  async (newVal) => {
    const filmId = Number(useRoute().params.id);
    await fetchFilmById(filmId, newVal);
  },
  { immediate: true },
);

watch(
  film as Ref<Film>,
  (newVal) => {
    actionBtnProps.to = `/films/${newVal?.id}/edit`;
    breadcrumbs.value[2] = {
      title: `${newVal?.name}: ${t("pages.films.details")} `,
      to: "/films",
    };
  },
  { immediate: true },
);

const copyGalleryItemLinkOnClick = async (fileName: string) => {
  await navigator.clipboard.writeText(
    window.location.origin + "/films/" + film.value?.id + "/" + fileName,
  );
  showSnackbar.value = true;
};

const goToEditPage = () => {
  const router = useRouter();
  router.push(`/films/${film.value?.id}/edit#gallery_upload`);
};

definePageMeta({
  key: (route) => route.params.id as string,
  title: "Film Details",
});
</script>

<style></style>
