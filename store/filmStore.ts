export const useFilmStore = defineStore("films", () => {
  const config = useRuntimeConfig();
  const film = ref<Film | null>(null);
  const films = ref<Film[]>([]);
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(0);
  const genres = ref<Genre[]>([]);
  const loading = ref<boolean>(false);
  const posterLoading = ref<boolean>(false);
  const galleryLoading = ref<boolean>(false);
  const total = ref<number>(0);
  const latestFilms = ref<Film[]>([]);
  const networkError = ref<Error | null>(null);
  const directors = ref<Person[]>([]);
  const actors = ref<Person[]>([]);
  const producers = ref<Person[]>([]);
  const writers = ref<Person[]>([]);
  const composers = ref<Person[]>([]);
  const filmForm = ref({} as FilmForm);

  const fetchFilteredFilms = async (
    limit: number,
    offset: number,
    search: string,
    locale: string
  ): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<FilmListResponse>(
        `${config.public.apiBase}/films/filter?limit=${limit}&offset=${offset}&search=${search}&locale=${locale}`
      );
      films.value = response.items || [];
      currentPage.value = response.currentPage || 1;
      totalPages.value = response.totalPages || 0;
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchLatestFilms = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<FilmListResponse>(
        `${config.public.apiBase}/films/latest`
      );
      latestFilms.value = response.items || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchFilmById = async (id: number, locale: string): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<Film>(
        `${config.public.apiBase}/films/${id}/${locale}`
      );
      film.value = response;
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };
  const fetchFilmForm = async (id: number, locale: string): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<Film>(
        `${config.public.apiBase}/films/${id}/${locale}`
      );
      filmForm.value = response;
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchGenres = async (locale: string): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<Array<Genre>>(
        `${config.public.apiBase}/genres/translations/${locale}`
      );
      genres.value = response || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchDirectors = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<PersonListResponse>(
        `${config.public.apiBase}/directors/list`
      );
      directors.value = response.items || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchActors = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<PersonListResponse>(
        `${config.public.apiBase}/actors/list`
      );
      actors.value = response.items || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchProducers = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<PersonListResponse>(
        `${config.public.apiBase}/producers/list`
      );
      producers.value = response.items || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const fetchWriters = async (): Promise<void> => {
    try {
      loading.value = true;
      const response = await $fetch<PersonListResponse>(
        `${config.public.apiBase}/writers/list`
      );
      writers.value = response.items || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };
  const fetchComposers = async () => {
    try {
      loading.value = true;
      const response = await $fetch<PersonListResponse>(
        `${config.public.apiBase}/composers/list`
      );
      composers.value = response.items || [];
    } catch (error: any) {
      networkError.value = error;
    } finally {
      loading.value = false;
    }
  };

  const addFilm = async (): Promise<boolean> => {
    try {
      loading.value = true;
      const response = await $fetch<Film>(`${config.public.apiBase}/films`, {
        method: "POST",
        body: filmForm.value,
      });
      film.value = response;
      return true;
    } catch (error: any) {
      networkError.value = error;
      return false;
    } finally {
      loading.value = false;
    }
  };

  const editFilm = async (): Promise<boolean> => {
    try {
      loading.value = true;
      const response = await $fetch<Film>(
        `${config.public.apiBase}/films/${filmForm.value.id}`,
        {
          method: "PUT",
          body: filmForm.value,
        }
      );
      film.value = response;
      return true;
    } catch (error: any) {
      networkError.value = error;
      return false;
    } finally {
      loading.value = false;
    }
  };





  const uploadGallery = async (
    gallery: File[],
    id: number
  ): Promise<boolean> => {
    try {
      loading.value = true;
      galleryLoading.value = true;
      const formData = new FormData();
      gallery.forEach((file) => {
        formData.append("gallery[]", file);
      });
      await $fetch(`${config.public.apiBase}/films/${id}/gallery`, {
        method: "POST",
        body: formData,
      });
      return true;
    } catch (error: any) {
      networkError.value = error;
      return false;
    } finally {
      loading.value = false;
      galleryLoading.value = false;
    }
  };

  const deleteGalleryItems = async (
    fileNames: string[],
    
  ): Promise<boolean> => {
    try {
      loading.value = true;
      galleryLoading.value = true;
      const id = film.value?.id || 0;
      const response = await $fetch<FilmForm>(
        `${config.public.apiBase}/films/${id}/gallery`,
        {
          method: "DELETE",
          body: JSON.stringify({ fileNames: fileNames }),
        }
      );
      filmForm.value = response;
      return true;
    } catch (error: any) {
      networkError.value = error;
      return false;
    } finally {
      loading.value = false;
      galleryLoading.value = false;
    }
  };

  const clearFilmForm = (): void => {
    filmForm.value = {} as Film;
  };

  const downloadGalleryItem = async (index: number) => {
    try {
      const name = film.value?.name || "";
      const uri = film.value?.gallery[index] || "";
      const link = document.createElement("a");
      link.setAttribute("download", name);
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: any) {
      networkError.value = error;
    }
  };

  return {
    film,
    films,
    filmForm,
    genres,
    directors,
    loading,
    networkError,
    actors,
    producers,
    writers,
    total,
    composers,
    currentPage,
    totalPages,
    latestFilms,
    posterLoading,
    galleryLoading,
    fetchActors,
    fetchFilteredFilms,
    fetchGenres,
    fetchDirectors,
    addFilm,
    fetchFilmById,
    uploadGallery,
    fetchProducers,
    fetchWriters,
    fetchComposers,
    fetchLatestFilms,
    fetchFilmForm,
    editFilm,
    clearFilmForm,
    deleteGalleryItems,
    downloadGalleryItem,
  };
});
