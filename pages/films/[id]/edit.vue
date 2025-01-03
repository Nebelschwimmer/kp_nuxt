<template>
  <BasePage
    toolbar
    :loading="loading"
    :toolbar-options="toolbarOptions"
    :error="networkError ?? null"
    @alert:close="networkError = null"
    @snackbar:close="showSnackbar = false"
    :snackbar="showSnackbar"
    :snackbar-message="$t('toast.messages.success.edit')"
    :to="`/films/${filmForm?.id}`"
  >
    <template #content>
      <v-card>
        <v-toolbar density="compact">
          <v-tabs v-model="activeTab" show-arrows color="primary">
            <v-tab
              prepend-icon="mdi-information"
              id="general_info"
              :text="$t('forms.film.stepper.first')"
              value="general_info"
            ></v-tab>
            <v-tab
              prepend-icon="mdi-view-gallery"
              id="gallery_upload"
              :text="$t('forms.film.stepper.third')"
              value="gallery_upload"
            ></v-tab>
          </v-tabs>
        </v-toolbar>
        <v-tabs-window v-model="activeTab" v-if="!dataLoading" class="mt-8">
          <v-tabs-window-item value="general_info">
            <FilmForm
              :film-form="filmForm"
              :genres="genres"
              :actors="actors"
              :directors="directors"
              :producers="producers"
              :writers="writers"
              :composers="composers"
              :loading="dataLoading"
              :network-error="Boolean(networkError)"
              @error:validation="formError = true"
            />
          </v-tabs-window-item>
          <v-tabs-window-item value="gallery_upload">
            <GalleryUpload
              :gallery="filmForm.gallery ?? []"
              :is-new="false"
              @submit="handleGalleryUploadSubmit"
              @gallery-item:delete="handleDeleteGalleryItems"
            />
          </v-tabs-window-item>
        </v-tabs-window>
        <ConfirmDialog
          v-model="showDialog"
          :text="$t('forms.film.gallery_item_delete_confirm')"
          @confirm="handleDeleteGalleryItems"
          type="warning"
          @cancel="showDialog = false"
        >
        </ConfirmDialog>
      </v-card>
      <v-fab
        v-if="activeTab === 'general_info'"
        class="ma-2"
        :active="!loading"
        icon="mdi-send"
        color="primary"
        absolute
        size="64"
        layout
        app
        appear
        @click="handleGeneralInfoSubmit"
      >
      </v-fab>
    </template>
  </BasePage>
</template>

<script lang="ts" setup>
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
import BasePage from "~/components/Layout/Page/BasePage.vue";
import FilmForm from "~/components/FilmStorageComponents/FilmForm.vue";
import GalleryUpload from "~/components/FilmStorageComponents/GalleryUpload.vue";
import { useFilmStore } from "~/store/filmStore";

const formError = ref(<boolean>false);
const posterError = ref<boolean>(false);
const activeTab = ref<string>("general_info");
const dataLoading = ref<boolean>(false);
const formEditComplete = ref<boolean>(false);
const showSnackbar = ref<boolean>(false);
const showDialog = ref<boolean>(false);
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
    showSnackbar.value = !showSnackbar.value;
  }
};

const handleGalleryUploadSubmit = async (files: File[]) => {
  const id = filmForm.value?.id || 0;
  if (await uploadGallery(files, id)) {
    navigateTo(`/films/${id}`);
  }
};

const handleDeleteGalleryItems = async (links: string[]) => {
  const filmId = filmForm.value?.id || 0;
  const fileNames = links.map(
    (link) => link.split("/").pop()?.split(".").shift() || ""
  );
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
}

const { t } = useI18n();

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
    title: `${filmForm.value?.name}: ${t("pages.films.details")} `,
    to: `/films/${filmForm.value?.id}`,
    icon: "mdi-filmstrip",
  },
  {
    title: t("nav.edit"),
    to: "/films",
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
  await nextTick();
  formEditComplete.value = false;
  activeTab.value = "general_info";
  posterError.value = false;
  formError.value = false;
  let hash = useRoute().hash || "";
  if (hash) {
    activeTab.value = hash.replace("#", "");
  }
});

watch(
  filmForm as Ref<Film>,
  (newVal) => {
    breadcrumbs.value[2] = {
      title: newVal?.name,
      to: `/films/${newVal?.id}`,
    } as Breadcrumb;
  },
  {
    deep: true,
  }
);
</script>
