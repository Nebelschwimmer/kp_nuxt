export const useFilmStore = defineStore("films", () => {
	const config = useRuntimeConfig();
	const film = ref<Film|null>(null);
	const films = ref<Film[]>([]);
	const genres = ref<GenreListItem[]>([]);
	const loading = ref(false);
	const total = ref(0);
	const networkError = ref<Error | null>(null);
	const directors = ref<PersonListItem[]>([]);
	const actors = ref<PersonListItem[]>([]);
	const filmForm = ref<Partial<Film>>({
		id: null,
		name: "",
		genreIds: [],
		releaseYear: null,
		directorId: null,
		actorIds: [],
		description: "",
	});
	const fetchFilms = async () => {
		try {
			loading.value = true;
			const response = await $fetch<FilmListResponse>(
				`${config.public.apiBase}/films/filter`
			);
			films.value = response.items || [];
			total.value = response.total || 0;
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const fetchFilmById = async (id: number) => {
		try {
			loading.value = true;
			const response = await $fetch<Film>(
				`${config.public.apiBase}/films/${id}`
			);
			film.value = response;
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const fetchGenres = async (locale: string) => {
		try {
			loading.value = true;
			const response = await $fetch<Array<GenreListItem>>(
				`${config.public.apiBase}/genres/enum/${locale}`
			);
			genres.value = response || [];
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const fetchDirectors = async () => {
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

	const fetchActors = async () => {
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

	const addFilm = async (): Promise<boolean> => {
		try {
			loading.value = true;
			const response = await $fetch<Film>(
				`${config.public.apiBase}/films`,
				{
					method: "POST",
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

	const uploadPreview = async (file: File, id: number): Promise<boolean> => {
		try {
			loading.value = true;
			const formData = new FormData();
			formData.append("preview", file);
			await $fetch(`${config.public.apiBase}/films/${id}/preview`, {
				method: "POST",
				body: formData,
			});
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
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
		total,
		uploadPreview,
		fetchActors,
		fetchFilms,
		fetchGenres,
		fetchDirectors,
		addFilm,
		fetchFilmById,
	};
});
