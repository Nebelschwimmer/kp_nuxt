<template>
  <v-container class="w-66">
    <v-row>
      <PageToolBar display-back-btn />
    </v-row>
    <v-row>
      <FilmDetail :film="film || null" />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const film = ref<Film | null>();
const fetchData = async (id : Number) => {
  const { data, status, error, refresh, clear } = await useAsyncData(
    'films',
    () => $fetch<Film>(`${config.public.apiBase}/films/${id}`)
  )
  film.value = data.value || null;

}


(async function () {
  const filmId = Number(useRoute().params.id);
	await fetchData(filmId);
	})();


</script>

<style></style>
