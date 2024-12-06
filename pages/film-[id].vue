<template>
	<v-container>
		<v-row>
			<PageToolBar display-back-btn />
		</v-row>
		<v-row>
			<v-col>
				<v-card elevation="2">
					<v-container fluid>
						<v-row dense>
							<v-card-title>
								<h1 class="font-bold text-h4">{{ film?.name }}</h1>
							</v-card-title>
						</v-row>
						<v-row dense>
							<v-rating
								:length="5"
								:model-value="film?.rating"
								active-color="warning" />
						</v-row>

						<v-row dense>
							<v-col>
								<v-img :src="film?.preview || ''"></v-img>
							</v-col>

							<v-col>
								<v-sheet>
									<v-list>
										<v-list-item>
											<v-list-item-title
												>{{ $t("forms.film.release_year") }}:
												{{ film?.releaseYear }}</v-list-item-title
											>
											<template #prepend>
												<v-icon icon="mdi-calendar" />
											</template>
										</v-list-item>
										<v-divider></v-divider>
										<v-list-item>
											<v-list-item-title
												>{{ $t("forms.film.genres") }}:
												{{ film?.genres && film?.genres.length === 0 ? "-" : film?.genres }}</v-list-item-title
											>
											<template #prepend>
												<v-icon icon="mdi-movie-filter" />
											</template>
										</v-list-item>
									</v-list>
								</v-sheet>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	const { film } = storeToRefs(useFilmStore());
	const { fetchFilmById } = useFilmStore();

	const computedActorNames = computed(() => {
		return film.value?.actorNames.join(", ");
	});

	(async function () {
		const filmId = Number(useRoute().params.id);
		await fetchFilmById(filmId);
	})();
</script>

<style></style>
