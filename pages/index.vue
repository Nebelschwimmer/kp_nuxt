<template>
  <v-container>
    <v-row>
      <v-col v-if="loading">
        <v-progress-linear indeterminate color="primary" />
      </v-col>
    </v-row>
    <v-row>
      <PageToolBar :display-action-btns="true" title="nav.films">
        <template #actions>
          <ActionBtn type="add" icon="mdi-plus" @click="openModal" />
        </template>
      </PageToolBar>
    </v-row>
    <v-row>
      <v-col>
       {{ films }}
      </v-col>
    </v-row>
    <v-dialog v-model="showStoreModal">
      <FilmStoreModal
        :filmForm="filmForm"
        :genres="genres"
        @close-modal="closeModal"
      />
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
const showStoreModal = ref(false);
import { useFilmStore } from "~/store/filmStore";

const { films, genres, filmForm, loading } = storeToRefs(useFilmStore());
const { fetchFilms, fetchGenres } = useFilmStore();

onMounted(async () => {
 await Promise.allSettled([fetchFilms(), fetchGenres()]);
});

const openModal = () => {
  showStoreModal.value = true;
};
const closeModal = () => {
  showStoreModal.value = false;
};
</script>
