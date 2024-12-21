<template>
	<BasePage
		:loading="loading"
		:error="networkError"
		:total="total"
		@alert:close="networkError = null">
		<template #content>
			<v-data-iterator
				:items="films"
				:loading="loading"
				:items-per-page="2">
				<template #header>
					<div class="text-h4 text-accent font-bold">
						{{ $t("pages.home.newest") }}
					</div>
				</template>
				<template v-slot:default="props">
					<v-row
						v-for="(film, i) in films"
						:key="i"
						class="my-2">
						<v-col>
							<v-list-item
								:to="`/films/${film.id}`"
								variant="tonal"
								color="primary"
								class="base-card">
								<v-container>
									<v-row>
										<v-col>
											<v-list-item-media>
												<v-img
													:src="film.preview || ''"
													height="300"
													cover>
													<template #placeholder>
														<ImgPlaceholder />
													</template>
												</v-img>
											</v-list-item-media>
										</v-col>
										<v-col>
											<v-row>
												<v-col>
													<v-list-item-title
														class="font-bold text-primary text-h4"
														>{{ film.name }} ({{
															film.releaseYear
														}})</v-list-item-title
													>
												</v-col>
											</v-row>
											<v-row>
												<v-col>
													<v-rating
														:model-value="film.rating || 0"
														active-color="warning"
														readonly
														size="small"
														density="compact"></v-rating>
												</v-col>
											</v-row>
											<v-row>
												<v-col>
													<v-list-item-subtitle class="text-body-1">
														{{ film.description }}
													</v-list-item-subtitle>
												</v-col>
											</v-row>
											<v-row>
												<v-col>
													<v-list-item-subtitle class="text-body-1">
														{{ film.directorName }}
													</v-list-item-subtitle>
												</v-col>
											</v-row>
											<v-row>
												<FilmGallery
													v-if="film.gallery?.length"
													:gallery="film.gallery" />
											</v-row>
										</v-col>
									</v-row>
								</v-container>
							</v-list-item>
						</v-col>
					</v-row>
				</template>
				<template v-slot:loader>
					<v-row
						v-for="(_, k) in [0, 1, 2, 3]"
						:key="k">
						<v-col>
							<v-skeleton-loader
								class="border"
								height="300"
								type="card"></v-skeleton-loader>
						</v-col>
					</v-row>
				</template>
			</v-data-iterator>
		</template>
	</BasePage>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	import BasePage from "~/components/Layout/Page/BasePage.vue";
	import ImgPlaceholder from "~/components/Placeholders/ImgPlaceholder.vue";
	import FilmGallery from "~/components/Gallery/FilmGallery.vue";
	const { films, loading, networkError, total } = storeToRefs(useFilmStore());
	const { fetchFilms } = useFilmStore();

	onMounted(() => {
		fetchFilms();
	});
	(async function () {
		await fetchFilms();
	});
</script>

<style></style>
