<template>
  <v-stepper
    v-model="step"
    class="base-card"
    :mobile="$vuetify.display.smAndDown"
  >
    <v-stepper-header>
      <v-stepper-item
        :complete="step > 0"
        :current="step === 0"
        :color="step > 0 ? 'success' : 'primary'"
        :title="$t('forms.film.stepper.first')"
        value="1"
      >
      </v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item
        :complete="step > 1"
        :color="step > 1 ? 'success' : 'primary'"
        :current="step === 1"
        :title="$t('forms.film.stepper.third')"
        value="2"
        :subtitle="$t('forms.film.stepper.optional')"
      >
      </v-stepper-item>
    </v-stepper-header>
    <v-stepper-window>
      <v-stepper-window-item value="1">
        <FilmForm
          :disabled="step !== 0"
          :film-form="filmForm"
          :genres="genres"
          :actors="actors"
          :directors="directors"
          :producers="producers"
          :writers="writers"
          :loading="loading"
          :composers="composers"
          :network-error="Boolean(networkError)"
          @submit="handleGeneralInfoSubmit"
        />
      </v-stepper-window-item>
      <v-stepper-window-item value="2"
        ><GalleryUpload is-new @submit="handleGalleryUploadSubmit"
      /></v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/store/filmStore";
import FilmForm from "~/components/FilmStorageComponents/FilmForm.vue";
import GalleryUpload from "~/components/FilmStorageComponents/GalleryUpload.vue";

const {
  genres,
  filmForm,
  film,
  actors,
  composers,
  producers,
  writers,
  directors,
  loading,
  networkError,
} = storeToRefs(useFilmStore());
const {
  addFilm,
  fetchGenres,
  fetchActors,
  fetchDirectors,
  fetchProducers,
  fetchWriters,
  fetchComposers,
  uploadGallery,
  clearFilmForm,
} = useFilmStore();

const step = ref(0);
const dataLoading = ref(false);

async function getData() {
  const { locale } = useI18n();
  dataLoading.value = true;
  await Promise.allSettled([
    fetchGenres(locale.value),
    fetchActors(),
    fetchDirectors(),
    fetchProducers(),
    fetchWriters(),
    fetchComposers(),
  ]);
  dataLoading.value = false;
}

const handleGeneralInfoSubmit = async () => {
  if (await addFilm()) {
    nextStep();
  }
};

const handleGalleryUploadSubmit = async (files: File[]) => {
  const id = film.value?.id || 0;
  if (await uploadGallery(files, id)) {
    nextStep();
  }
};

const nextStep = () => {
  step.value++;
};

onMounted(async () => {
  clearFilmForm();
  await getData();
});
</script>

<style></style>
