<template>
  <div>
    <DetailCard
      :title="film?.name + ' (' + film?.releaseYear + ')' || ''"
      :subtitle="film?.slogan || ''"
      :bg-img="film?.gallery[0] || ''"
      :avatar="film?.gallery[0] || ''"
      :loading="loading"
    >
      <template #rating>
        <ClientOnly>
          <v-rating
            :model-value="film?.rating || 0"
            color="yellow-darken-3"
            half-increments
            readonly
          ></v-rating>
        </ClientOnly>
      </template>
      <template #gallery> </template>
      <template #text>
        <v-container class="rounded-lg pa-2">
          <v-row>
            <v-col v-bind="{ ...firstColumnParams }" tag="aside">
              <v-card :title="computedFilmDetails.subheader">
                <v-list-item
                  v-for="(detail, index) in computedFilmDetails.list"
                  :key="index"
                  rounded="lg"
                  :subtitle="$t(detail.name)"
                  :value="index"
                  lines="one"
                  :prepend-icon="detail.icon"
                  density="compact"
                  :to="detail.to"
                >
                  <v-list-item-title :class="{ 'text-primary': detail.to }">
                    {{ detail.value || $t("general.no_data") }}
                  </v-list-item-title>
                </v-list-item>
              </v-card>
              <v-card :title="filmActors.subheader">
                <v-list-item
                  v-for="(detail, index) in filmActors.list"
                  :key="index"
                  rounded="lg"
                  density="compact"
                  prepend-icon="mdi-account"
                  :title="detail.name"
                  lines="one"
                  base-color="primary"
                  :value="detail.name"
                  :to="detail.to"
                >
                </v-list-item>
              </v-card>
            </v-col>
            <v-divider v-if="$vuetify.display.mdAndUp" vertical></v-divider>
            <v-col v-bind="{ ...secondColumnParams }" tag="section">
              <v-row>
                <v-col>
                  <v-card :title="$t('pages.films.description')">
                    <template #append>
                      <v-btn
                        size="small"
                        icon
                        :variant="editDescriptionMode ? 'outlined' : 'tonal'"
                        :color="editDescriptionMode ? 'error' : 'primary'"
                        @click="editDescriptionMode = !editDescriptionMode"
                      >
                        <v-icon>{{
                          editDescriptionMode ? "mdi-close" : "mdi-pencil"
                        }}</v-icon>
                      </v-btn>
                    </template>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-sheet
                        v-if="!editDescriptionMode"
                        color="transparent"
                        class="text-body-1 overflow-y-auto"
                      >
                        <div
                          v-for="(paragraph, index) in film?.description.split(
                            '\n'
                          )"
                          :key="index"
                        >
                          <p>
                            {{ paragraph }}
                          </p>
                        </div>
                      </v-sheet>
                      <template v-else>
                        <v-confirm-edit
                          v-model="filmForm.description"
                          @save="sumbitEdit"
                        >
                          <template #default="{ model: proxyModel, actions }">
                            <v-card variant="outlined">
                              <template #text>
                                <v-textarea
                                  v-model="proxyModel.value"
                                  :messages="$t('pages.films.edit_description')"
                                  auto-grow
                                  rows="5"
                                ></v-textarea>
                              </template>
                              <template #actions>
                                <v-spacer></v-spacer>
                                <component :is="actions"></component>
                              </template>
                            </v-card>
                          </template>
                        </v-confirm-edit>
                      </template>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <FilmGallery :film="film" />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <slot name="rating"></slot>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </DetailCard>

    <v-dialog v-model="showEditDialog" max-width="1000">
      <v-sheet rounded="lg">
        <v-card :loading="loading" variant="tonal">
          <v-toolbar :image="film?.gallery[0]" class="px-3" color="transparent">
            <template #image>
              <v-img
                gradient="135deg, rgba(0, 0, 0, 0.7) 0%,  rgb(0, 0, 0, 0.9) 100%"
              ></v-img>
            </template>
            <template #prepend>
              <v-icon icon="mdi-pencil"></v-icon>
            </template>
            <v-toolbar-title class="text-h5">
              {{ $t("pages.films.edit") + " " + film?.name }}
            </v-toolbar-title>
            <CloseBtn @click="showEditDialog = false" />
          </v-toolbar>
          <v-card-text>
            <FilmForm
              :film-form="filmForm"
              :genres="genres"
              :actors="actors"
              :directors="directors"
              :producers="producers"
              :writers="writers"
              :loading="loading"
              :composers="composers"
              :network-error="Boolean(networkError)"
            ></FilmForm>
          </v-card-text>
          <v-card-actions>
            <v-btn
              prepend-icon="mdi-check"
              color="primary"
              @click="sumbitEdit"
              >{{ $t("actions.submit") }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-sheet>
    </v-dialog>
    <v-snackbar
      v-model="showSnackbar"
      color="success"
      prepend-icon="mdi-check"
      :timeout="TIMEOUT"
      location="top"
    >
      {{ $t("toast.messages.success.edit") }}
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import { useFilmStore } from "~/store/filmStore";
import { storeToRefs } from "pinia";
import FilmForm from "~/components/FilmStorageComponents/FilmForm.vue";
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
import FilmGallery from "~/components/Misc/FilmGallery.vue";

const TIMEOUT = 2000;
const editDescriptionMode = ref(false);
const firstColumnParams = {
  cols: 12,
  sm: 12,
  md: 4,
  lg: 5,
  xl: 3,
};
const secondColumnParams = {
  cols: 12,
  sm: 12,
  md: 8,
  lg: 7,
  xl: 9,
};
const showSnackbar = ref(false);

const {
  film,
  genres,
  filmForm,
  actors,
  composers,
  producers,
  writers,
  directors,
  loading,
  networkError,
} = storeToRefs(useFilmStore());
const {
  editFilm,
  fetchFilmForm,
  fetchFilmById,
  fetchGenres,
  fetchActors,
  fetchDirectors,
  fetchProducers,
  fetchWriters,
  fetchComposers,
  uploadGallery,
  clearFilmForm,
} = useFilmStore();
const { locale, t } = useI18n();
const showEditDialog = ref(false);
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
  return {
    subheader: t("pages.films.starring"),
    list: actorsArr,
  };
}) as ComputedRef<DetailList>;

const computedFilmDetails = computed(() => {
  return {
    subheader: t("pages.general_info"),
    list: [
      {
        name: "forms.film.release_year",
        value: film.value?.releaseYear || "",
        icon: "mdi-calendar",
      },
      {
        name: "forms.film.duration",
        value: film.value?.duration || "",
        icon: "mdi-timer",
      },
      {
        name: "forms.film.genres",
        value: film.value?.genreNames.join(", ") || "",
        icon: "mdi-filmstrip",
      },
      {
        name: "forms.film.age",
        value: film.value?.age + "+" || "",
        icon: "mdi-account-supervisor",
      },
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
    ],
  };
}) as ComputedRef<DetailList>;

const sumbitEdit = async () => {
  if (await editFilm()) {
    await fetchData();
    await nextTick();
    showEditDialog.value = false;
    showSnackbar.value = true;

    editDescriptionMode.value = !editDescriptionMode.value;
  }
};

watch(
  locale,
  async (newVal) => {
    const filmId = Number(useRoute().params.id);
    await fetchFilmById(filmId, newVal);
  },
  { immediate: true }
);

const fetchData = async () => {
  const filmId = Number(useRoute().params.id);
  await Promise.allSettled([
    fetchFilmById(filmId, locale.value),
    fetchFilmForm(filmId, locale.value),
    fetchGenres(locale.value),
    fetchActors(),
    fetchDirectors(),
    fetchProducers(),
    fetchWriters(),
    fetchComposers(),
  ]);
};

onMounted(async () => {
  clearFilmForm();
  const filmId = Number(useRoute().params.id);
  await fetchData();
});

setTimeout(() => {
  if (showSnackbar.value) {
    showSnackbar.value = false;
  }
}, TIMEOUT);

definePageMeta({
  key: (route) => route.params.id as string,
  title: "Film Details",
});
</script>

<style></style>
