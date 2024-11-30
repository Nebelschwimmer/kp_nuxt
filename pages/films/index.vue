<template>
  <div>
    <v-container>
      <v-row>
        <PageToolBar :display-action-btns="true" title="nav.films">
          <template #actions>
            <ActionBtn type="add" icon="mdi-plus" @click="openModal"/>
          </template>
        </PageToolBar>
      </v-row>
    </v-container>
      <v-container>
        <v-row>
          <v-col v-for="film in films"> <FilmCard :film="film" /></v-col>
        </v-row>
      </v-container>
    <v-dialog v-model="showStoreModal">
      <FilmStoreModal :filmForm="filmForm" :genres="genres" @close-modal="closeModal" />
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
	const config = useRuntimeConfig();
	const films = ref<FilmListItem[]>([]);
  const showStoreModal = ref(false);
  const genres = ref<Genre[]>([]);
const fetchFilms = async () => {
	const { data, status, error, refresh, clear } = await useAsyncData(
  'films',
  () => $fetch<FilmListResponse>(`${config.public.apiBase}/films/list`)
	)
  console.log(status.value)
		films.value = data.value?.items || [];
	};
  const fetchGenres = async () => {
    const { data, status, error, refresh, clear } = await useAsyncData(
      'genres',
      () => $fetch<GenreListResponse>(`${config.public.apiBase}/genres/list`)
    )
    genres.value = data.value?.items || [];
  }
  const filmForm = ref<Partial<Film>>({
    id: null,
    name: '',
    genreId: 1,
    genreName: '',
    releaseYear: null,
    directorName: '',
    description: '',
    rating: 0,
  })
  
  const openModal = () => {
    showStoreModal.value = true
  }
  const closeModal = () => {
    showStoreModal.value = false
  }

	onMounted(async () => {
		await Promise.allSettled([
      fetchFilms(), 
      fetchGenres()]
    );
	});
</script>
