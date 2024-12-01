export const useFilmStore = defineStore("films", () => {
  const config = useRuntimeConfig();
  const films = ref<FilmListItem[]>([]);
  const genres = ref<GenreListItem[]>([]);
  const loading = ref(false);
  const filmForm = ref<Partial<Film>>({
    id: null,
    name: "",
    genreId: 1,
    genreName: "",
    releaseYear: null,
    directorName: "",
    description: "",
    rating: 0,
  });
  const fetchFilms = async () => {
    try {
      loading.value = true;
      const response = await $fetch<FilmListResponse>(
        `${config.public.apiBase}/films/list`
      );
      films.value = response.items || [];
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const fetchGenres = async () => {
    try {
      loading.value = true;
      const response = await $fetch<GenreListResponse>(
        `${config.public.apiBase}/genres/list`
      );
      genres.value = response.items || [];
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return { films, filmForm, genres, loading, fetchFilms, fetchGenres };
});
