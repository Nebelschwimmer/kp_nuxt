export const useFilmStore = defineStore("people", () => {
  const config = useRuntimeConfig();
  const people = ref<PersonListItem[]>([]);
  const loading = ref(false);

  const fetchPeople = async () => {
    try {
      loading.value = true;
      const response = await $fetch<PersonListResponse>(
        `${config.public.apiBase}/films/list`
      );
      people.value = response.items || [];
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return { people, loading, fetchPeople };
});
