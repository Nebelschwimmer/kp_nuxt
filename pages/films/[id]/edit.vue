<template>
  <BasePage
  toolbar
  :loading="loading"
  :toolbar-options="toolbarOptions"
  :error="networkError ?? null"
  @alert:close="networkError = null"
  >
  <template #content>
      <v-row no-gutters>
        <v-col xl="3" lg="3" md="3" sm="12">
          <v-tabs
            v-model="activeTab"
            color="primary"
            :direction="$vuetify.display.smAndDown ? 'horizontal' : 'vertical'"
          >
            <v-tab
              prepend-icon="mdi-information"
              id="general_info"
              :text="$t('forms.film.stepper.first')"
              value="general_info"
            ></v-tab>
            <v-tab
              prepend-icon="mdi-image"
              id="poster_upload"
              :text="$t('forms.film.stepper.second')"
              value="poster_upload"
            ></v-tab>
            <v-tab
              prepend-icon="mdi-view-gallery"
              id="gallery_upload"
              :text="$t('forms.film.stepper.third')"
              value="gallery_upload"
            ></v-tab>
          </v-tabs>
        </v-col>
        <v-col>
          <v-tabs-window v-model="activeTab" v-if="!dataLoading">
            <v-tabs-window-item value="general_info" eager>
              <FilmForm
                :film-form="filmForm"
                :genres="genres"
                :actors="actors"
                :directors="directors"
                :producers="producers"
                :writers="writers"
                :composers="composers"
                :loading="loading"
                :network-error="Boolean(networkError)"
                @submit="handleGeneralInfoSubmit"
                @error:validation="formError = true"
              />
            </v-tabs-window-item>
            <v-tabs-window-item value="poster_upload">
              <PosterUpload
                edit-mode
                :poster="poster"
                :loading="loading"
                :poster-uploaded="posterUploaded"
                @submit="handlePosterUploadSubmit"
                @poster:delete="handlePosterDelete"
                @poster:replace="handlePosterReplace"
                @error:validation="posterError = true"
              />
            </v-tabs-window-item>
            <v-tabs-window-item value="gallery_upload">
              <GalleryUpload
                :gallery="filmForm.gallery ?? []"
                @submit="handleGalleryUploadSubmit"
                @gallery-item:delete="handleDeleteGalleryItems"
                @error:validation="galleryError = true"
              />
            </v-tabs-window-item>
          </v-tabs-window>
          <v-skeleton-loader v-else height="700" type="card">
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
  </BasePage>
</template>

<script lang="ts" setup>
import BasePage from "~/components/Layout/Page/BasePage.vue";
import FilmForm from "~/components/FilmStorageComponents/FilmForm.vue";
import PageToolBar from "~/components/Layout/Page/PageToolBar.vue";
import PosterUpload from "~/components/FilmStorageComponents/PosterUpload.vue";
import GalleryUpload from "~/components/FilmStorageComponents/GalleryUpload.vue";
import { useFilmStore } from "~/store/filmStore";


const formError = ref(false);
const posterError = ref(false);
const galleryError = ref(false);
const activeTab = ref("general_info");
const dataLoading = ref(false);
const formEditComplete = ref(false);
const posterUploaded = ref(false);
const poster = ref<string | null>(null);
const {
  genres,
  filmForm,
  actors,
  composers,
  producers,
  writers,
  directors,
  networkError,
  loading,
  posterLoading,
  galleryLoading,
} = storeToRefs(useFilmStore());
const {
  editFilm,
  fetchFilmForm,
  fetchGenres,
  fetchActors,
  fetchDirectors,
  fetchProducers,
  fetchWriters,
  fetchComposers,
  uploadPreview,
  uploadGallery,
  deletePreview,
  deleteGalleryItems,
} = useFilmStore();

const handleGeneralInfoSubmit = async () => {
  if (await editFilm()) {
    formError.value = false;
    formEditComplete.value = true;
  }
};

const handlePosterUploadSubmit = async (file: File) => {
  const id = filmForm.value?.id || 0;
  poster.value = null;
  if (await uploadPreview(file, id)) {
    posterUploaded.value = true;
    posterError.value = false;
    poster.value = filmForm.value?.preview;
  }
};

const handlePosterDelete = async () => {
  const id = filmForm.value?.id || 0;
  await deletePreview(id);
  poster.value = null;
};

const handlePosterReplace = async (file: File) => {
  const id = filmForm.value?.id || 0;
  poster.value = null;
  await deletePreview(id);
  if (await uploadPreview(file, id)) {
    posterUploaded.value = true;
    posterError.value = false;
    poster.value = filmForm.value?.preview;
  }
};

const handleGalleryUploadSubmit = async (files: File[]) => {
  const id = filmForm.value?.id || 0;
  if (await uploadGallery(files, id)) {
    navigateTo(`/films/${id}`);
  }
};

const handleDeleteGalleryItems = async (fileNames: string[]) => {
  const filmId = filmForm.value?.id || 0;
  await deleteGalleryItems(fileNames, filmId);
};

async function getData() {
  const { locale } = useI18n();
  const filmId = Number(useRoute().params.id);
  dataLoading.value = true;
  await Promise.allSettled([
    fetchFilmForm(filmId, locale.value),
    fetchGenres(locale.value),
    fetchActors(),
    fetchDirectors(),
    fetchProducers(),
    fetchWriters(),
    fetchComposers(),
  ]);
  dataLoading.value = false;
  poster.value = filmForm.value?.preview;
}

const { t } = useI18n();

const breadcrumbs = ref<Breadcrumb[]>([
  {
    title: t("nav.home"),
    href: "/",
    icon: "mdi-home",
  },
  {
    title: t("nav.films"),
    href: "/films",
    icon: "mdi-filmstrip",
  },
  {
    title: `${filmForm.value?.name}: ${t("pages.films.details")} `,
    href: `/films/${filmForm.value?.id}`,
    icon: "mdi-filmstrip",
  },
  {
    title: t("nav.edit"),
    href: "/films",
    icon: "mdi-pencil",
  },
]);

const toolbarOptions = reactive({
  displayBackBtn: true,
  color: "secondary",
  breadcrumbs: breadcrumbs.value,
});

onMounted(async () => {
  await getData();
  formEditComplete.value = false;
  posterUploaded.value = false;
  activeTab.value = "general_info";
  posterError.value = false;
  formError.value = false;
  let hash = useRoute().hash || "";
  if (hash) {
    console.log(Number(hash.slice(1)))
    activeTab.value = hash.replace("#", "");
  }
});

watch(
  filmForm as Ref<Film>,
  (newVal) => {
    poster.value = newVal?.preview;
    breadcrumbs.value[2].title = `${newVal?.name}: ${t("pages.films.details")} `;

  },
  {
    deep: true,
  }
);
</script>
