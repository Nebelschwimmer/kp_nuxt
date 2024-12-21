export const usePersonStore = defineStore("persons", () => {
	const config = useRuntimeConfig();
	const persons = ref<Person[]>([]);
	const person = ref<Person | null>(null);
	const loading = ref(false);
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

	const fetchPersons = async () => {
		try {
			loading.value = true;
			const response = await $fetch<PersonListResponse>(
				`${config.public.apiBase}/persons/filter`
			);
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

	return {
		persons,
		person,
		personForm,
		loading,
		networkError,
		genders,
		specialties,
		fetchPersons,
		fetchPersonById,
		fetchGenders,
		fetchSpecialties,
		addPerson
	};
});
