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
	const personForm = ref<Partial<Person>>({
		id: null,
		firstname: "",
		lastname: "",
		photo: "",
		birthday: "",
		genderId: 1,
		specialtyIds: [],
		actedInFilms: [],
		producedFilms: [],
		writtenFilms: [],
	});

	const fetchFilteredPersons = async (limit: number, offset: number, search: string, locale: string) => {
		try {
			loading.value = true;
			const response = await $fetch<PersonListResponse>(
				`${config.public.apiBase}/persons/filter?limit=${limit}&offset=${offset}&search=${search}&locale=${locale}`
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

	const fetchPersonById = async (id: number) => {
		try {
			loading.value = true;
			const response = await $fetch<Person>(
				`${config.public.apiBase}/persons/${id}`
			);
			person.value = response;
		} catch (error: any) {
			networkError.value = error;
		} finally {
			loading.value = false;
		}
	};

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
			const response = await $fetch<Person>(`${config.public.apiBase}/persons`, {
				method: "POST",
				body: personForm.value,
			});
			person.value = response;
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const uploadPhoto = async (file: File, id	: number): Promise<boolean> => {
		try {
			loading.value = true;
			const formData = new FormData();
			formData.append("photo", file);
			await $fetch<Partial<Person>>(
				`${config.public.apiBase}/persons/${id}/photo`,
				{
					method: "POST",
					body: formData,
				}
			);
			return true;
		} catch (error: any) {
			networkError.value = error;
			return false;
		} finally {
			loading.value = false;
		}
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
		fetchFilteredPersons,
		fetchPersonById,
		fetchGenders,
		fetchSpecialties,
		addPerson,
		uploadPhoto
	};
});
