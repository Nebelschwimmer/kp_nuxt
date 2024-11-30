interface FilmListItem {
  id: Number,
  name: String
}
interface ListResponse {
  items: FilmListItem[]
}

interface Film {
  id: Number,
  name: String,
  genreId: Number,
  releaseYear: Number,
  actorIDs: Number[],
  directorId: Number,
  preview: String,
  gallery: String[]

}

export const useFilmStore = defineStore('films', () => {
  const config = useRuntimeConfig();
  const films = ref<FilmListItem[]>([]);

  const fetchFilms = async () => {
    try {
      const response = await $fetch<ListResponse>(`${config.public.apiBase}/films/list`);
      films.value = response.items || []
    }
    catch (error) {
      console.error(error)
    }
  }

  return { films, fetchFilms }
})