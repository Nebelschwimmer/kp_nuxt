<template>
	<v-row>
		<v-col>
			<FilmPreview
				:preview="film?.preview as string"
				:display-border="true"
				:height="400" />
		</v-col>
		<v-col>
			<v-container>
				<v-row> <h1 class="font-bold text-h4">{{ film?.name }}</h1></v-row>
				<v-row>
					<v-rating
						:length="5"
						:size="32"
						:model-value="film?.rating as number"
						active-color="warning" />
				</v-row>
				<v-row v-for="detail in filmDetailTable">
					<v-col class="font-bold">{{ $t(detail.title) }}: </v-col>
					<v-col>{{
						Array.isArray(film?.[detail.value])
							? computedActorNames
							: film?.[detail.value]
					}}</v-col>
					<v-divider></v-divider>
				</v-row>
			</v-container>
		</v-col>
	</v-row>
</template>

<script lang="ts" setup>
	const props = defineProps<{
		film: Film | null;
	}>();
	const computedActorNames = computed(() => {
		return props.film?.actorNames.join(", ");
	});
	const filmDetailTable = [
		{
			title: "pages.films.release_year",
			value: "releaseYear",
		},
		{
			title: "pages.films.director",
			value: "directorName",
		},
		{
			title: "pages.films.genre",
			value: "genreName",
		},
		{
			title: "pages.films.actors",
			value: "actorNames",
		},
		{
			title: "pages.films.description",
			value: "description",
		},
	] as const;
</script>

<style></style>
