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
        :imgSrc="film?.preview || ''"
        :no-img-label="$t('pages.films.no_preview') || ''"
        :details="computedFilmDetails"
        :description="film?.description || ''"
        :starring="filmActors || []"
        :toolbar-actions="toolbarActions"
        :bgImg="film?.gallery[0] || ''"
      >
        <template #rating>
          <v-chip color="primary">
            <v-rating
              :model-value="film?.rating || 0"
              color="primary"
              size="small"
              density="compact"
              half-increments
              readonly
            >
            </v-rating>
            <v-tooltip activator="parent" location="bottom">
              <v-label class="text-caption"
                >{{ $t("pages.films.rating") }}:
                {{ film?.rating || "0.0" }}
              </v-label>
            </v-tooltip>
          </v-chip>
        </template>
        <template #gallery>
          <FilmGallery
            :gallery-content="film?.gallery || []"
            :name="film?.name || ''"
            :no-content-label="$t('pages.films.no_gallery')"
          />
        </template>
        <template #rating_starring>
          <v-container>
            <v-row no-gutters justify="center" align="center">
              <v-col class="align-center text-center">
                {{ $t("pages.films.rating") }}
                :
                <span class="text-h4 text-accent">{{
                  film?.rating || "0.0"
                }}</span>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-col class="text-caption text-center">
                {{
                  film?.assessments || $t("pages.films.no_assessments")
                }}</v-col
              >
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="accent" block rounded="lg">
                  {{ $t("pages.films.assess") }}
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-list-item
                  v-if="filmActors.length"
                  :title="$t('pages.films.starring') + ' :'"
                >
                </v-list-item>
                <v-list-item
                  v-else
                  :title="$t('pages.films.starring')"
                  :subtitle="$t('pages.films.no_actors_data')"
                >
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item
                  v-for="actor in filmActors"
                  :key="actor.id || 0"
                  :value="actor.id"
                  density="compact"
                  :prepend-avatar="actor.photo"
                >
                  <v-list-item-title>
                    <NuxtLink :to="`/persons/${actor.id}`" class="text-accent"
                      >&#8226; {{ actor.name }}</NuxtLink
                    >
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template #actions>
          <ClientOnly>
            <v-rating
              :model-value="film?.rating || 0"
              active-color="accent"
            ></v-rating>
          </ClientOnly>
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
import FilmGallery from "~/components/Gallery/FilmGallery.vue";

const { film, loading, networkError } = storeToRefs(useFilmStore());
const { fetchFilmById } = useFilmStore();
const { locale, t } = useI18n();
const filmActors = computed(() => {
  let actorObj = <ActorObj>{};
  let actorsArr = <ActorObj[]>[];

  if (film.value?.actorNames.length) {
    film.value?.actorNames.forEach((name: string) => {
      const actorId =
        film.value?.actorIds[film.value?.actorNames.indexOf(name as never)];

      actorObj = {
        id: actorId || 0,
        name: name || "",
        photo: "",
      };
      actorsArr.push(actorObj);
    });
  }
  return actorsArr;
});

const computedFilmDetails = computed(() => {
  return [
    {
      name: "forms.film.slogan",
      value: film.value?.slogan || "",
      type: "info",
    },
    {
      name: "forms.film.release_year",
      value: film.value?.releaseYear || "",
      type: "info",
    },
    {
      name: "forms.film.duration",
      value: film.value?.duration || "",
      type: "info",
    },
    {
      name: "forms.film.genres",
      value: film.value?.genreNames.join(", ") || "",
      type: "info",
    },
    {
      name: "forms.film.age",
      value: film.value?.age + "+" || "",
    },
    {
      name: "forms.film.director",
      value: film.value?.directorName || "",
      type: "link",
      to: film.value?.directorId ? `/persons/${film.value?.directorId}` : "",
    },
    {
      name: "forms.film.producer",
      value: film.value?.producerName || "",
      type: "link",
      to: film.value?.producerId ? `/persons/${film.value?.producerId}` : "",
    },
    {
      name: "forms.film.writer",
      value: film.value?.writerName || "",
      type: "link",
      to: film.value?.writerId ? `/persons/${film.value?.writerId}` : "",
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
    title: `${film.value?.name}: ${t("pages.films.details")} `,
    to: "/films",
    icon: "mdi-filmstrip",
  },
]);

const toolbarActions = [
  {
    type: "edit",
    icon: "mdi-pencil",
    title: t("forms.film.edit"),
    disabled: false,
    to: `/films/${film.value?.id}/edit`,
  },
  {
    type: "delete",
    icon: "mdi-delete",
    title: t("pages.films.remove"),
    disabled: false,
  },
] as ToolbarAction[];

const toolbarOptions = reactive({
  displayBackBtn: true,
  prependIcon: "",
  color: "secondary",
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
  { immediate: true }
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
  { immediate: true }
);

definePageMeta({
  key: (route) => route.params.id as string,
  title: "Film Details",
});
</script>

<style></style>
