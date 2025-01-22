export const usePersonStore = defineStore("persons", () => {
	const config = useRuntimeConfig();
	const persons = ref<Person[]>([]);
	const person = ref<Person | null>(null);
	const loading = ref(false);
	const currentPage = ref(1);
	const totalPages = ref(0);
	const networkError = ref<Error | null>();
	const genders = ref<Gender[]>([]);
	const specialties = ref<Specialty[]>([]);
	const personForm = ref({} as PersonForm);
	const GALLERY_SIZE = 8;
	const fetchFilteredPersons = async (
		limit: number,
		offset: number,
		search: string,
		sortBy: string,
		order: string,
		locale: string
	) => {
		try {
			loading.value = true;
			const response = await $fetch<PersonListResponse>(
				`${config.public.apiBase}/persons/filter?limit=${limit}&offset=${offset}&search=${search}&sortBy=${sortBy}&order=${order}&locale=${locale}`
			);
			currentPage.value = response.currentPage || 1;
			totalPages.value = response.totalPages || 0;
			persons.value = response.items || [];
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const fetchPersonById = async (id: number, locale: string) => {
		try {
			loading.value = true;
			const response = await $fetch<Person>(
				`${config.public.apiBase}/persons/${id}/${locale}`
			);
			person.value = response;
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const fetchPersonForm = async (id: number) => {
		try {
			loading.value = true;
			const response = await $fetch<PersonForm>(
				`${config.public.apiBase}/persons/${id}/form`
			);
			personForm.value = response;
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}	
	}

	const fetchGenders = async (locale: string) => {
		try {
			loading.value = true;
			const response = await $fetch<Array<Gender>>(
				`${config.public.apiBase}/genders/translations/${locale}`
			);
			genders.value = response || [];
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const fetchSpecialties = async (locale: string) => {
		try {
			loading.value = true;
			const response = await $fetch<Array<Specialty>>(
				`${config.public.apiBase}/specialties/translations/${locale}`
			);
			specialties.value = response || [];
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

	const addPerson = async (): Promise<boolean> => {
		try {
			loading.value = true;
			const response = await $fetch<Person>(
				`${config.public.apiBase}/persons`,
				{
					method: "POST",
					body: personForm.value,
				}
			);
			personForm.value = response;
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const editPerson = async (): Promise<boolean> => {
		try {
			loading.value = true;
			const response = await $fetch<Person>(
				`${config.public.apiBase}/persons/${personForm.value.id}`,
				{
					method: "PUT",
					body: personForm.value,
				}
			);
			personForm.value = response;
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const uploadPhotos = async (photos: File[], id: number): Promise<boolean> => {
		try {
			loading.value = true;
			const formData = new FormData();
			photos.forEach((photo) => {
				formData.append("photos[]", photo)
			});
			const response =await $fetch<Person>(
				`${config.public.apiBase}/persons/${id}/photos`,
				{
					method: "POST",
					body: formData,
				}
			);
			personForm.value = response;
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const uploadCover = async (cover: File, id: number): Promise<boolean> => {
		try {
			loading.value = true;
			const formData = new FormData();
			formData.append("cover", cover)
			const response = await $fetch<Person>(
				`${config.public.apiBase}/persons/${id}/cover`,
				{
					method: "POST",
					body: formData,
				}
			);
			personForm.value = response;
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const clearPersonForm = () => {
		personForm.value = {} as PersonForm;
	};

	return {
		persons,
		person,
		personForm,
		loading,
		networkError,
		genders,
		specialties,
		totalPages,
		currentPage,
		GALLERY_SIZE,
		fetchFilteredPersons,
		fetchPersonById,
		fetchGenders,
		fetchSpecialties,
		addPerson,
		uploadPhotos,
		clearPersonForm,
		editPerson,
		fetchPersonForm,
		uploadCover
	};
});
