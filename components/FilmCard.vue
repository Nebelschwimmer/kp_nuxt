<template>
	<div>
	  <v-card height="300">
	  	<NuxtLink :to="`/films/${film?.id}`">
	  		<v-card-title class="font-bold text-center">
	  			{{ film?.name }}</v-card-title
	  		>
	  		<FilmPreview :preview="film?.preview as string" :height="200 " />
	  	</NuxtLink>
	  </v-card>
	</div>
</template>

<script lang="ts" setup>
	defineProps<{
		film: FilmListItem | Film | null;
		picWidth?: Number;
		picHeight?: Number;
	}>();

	const img = useImage();
</script>

<style></style>
