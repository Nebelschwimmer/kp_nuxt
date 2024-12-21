<template>
	<BasePage
		:loading="loading"
		:error="networkError"
		@alert:close="networkError = null">
		<template #toolbar>
			<PageToolBar
				display-back-btn
				:title="'pages.films.details'" />
		</template>
		<template #content>
			<DetailCard
				:title="film?.name || ''"
				:subtitle="''"
				:rating="film?.rating || 0"
				:imgSrc="film?.preview || ''"
				:noImgLabel="$t('pages.films.no_preview') || ''"
				:details="computedFilmDetails"
				:description="film?.description || ''">
				<template #gallery>
					<FilmGallery
						v-if="film?.gallery.length"
						:gallery="film?.gallery || []" />
					<span v-else>{{ $t("pages.films.no_gallery") }}</span>
				</template>
				<template #rating_starring>
					<v-row
						class="text-center font-bold"
						justify="center">
						<v-col>
							<v-row
								align="center"
								no-gutters>
								<v-col class="text-h3 text-accent"
									>{{ film?.rating }}
									<v-tooltip
										activator="parent"
										location="top">
										{{ $t("pages.films.rating") }}
									</v-tooltip>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="text-center">
						<v-col class="text-caption">
							{{ film?.assessments || $t("pages.films.no_assessments") }}</v-col
						>
					</v-row>
					<v-row>
						<v-col>
							<v-list
								density="compact"
								:lines="false"
								variant="flat"
								color="primary"
								class="shadow-lg text-center">
								<v-list-item
									v-if="filmActors.length"
									:title="$t('pages.films.starring')">
								</v-list-item>
								<v-list-item
									v-else
									:title="$t('pages.films.no_actors_data')">
								</v-list-item>
		
								<v-list-item
									v-for="actor in filmActors"
									:key="actor.id || 0"
									:value="actor.id">
									<v-list-item-title>
										<NuxtLink
											:to="`/persons/${actor.id}`"
											class="text-accent"
											>{{ actor.name }}</NuxtLink
										>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-col>
					</v-row>
				</template>
				<template #actions>
					<ClientOnly>
						<v-rating
							:model-value="film?.rating || 0"
							active-color="accent"></v-rating>
					</ClientOnly>
				</template>
			</DetailCard>
		</template>
	</BasePage>
</template>

<script lang="ts" setup>
	import BasePage from "~/components/Layout/Page/BasePage.vue";
	import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
	import { useFilmStore } from "~/store/filmStore";
	import { storeToRefs } from "pinia";
	import PageToolBar from "~/components/Layout/Page/PageToolBar.vue";
	import FilmGallery from "~/components/Gallery/FilmGallery.vue";
	import { useDate } from "vuetify";

	const { film, genres, loading, networkError } = storeToRefs(useFilmStore());
	const { fetchFilmById, fetchGenres, matchGenreIdsWithNames } = useFilmStore();

	const filmActors = computed(() => {
		interface ActorObj {
			id: number;
			name: string;
		}
		let actorObj = <ActorObj>{};
		let actorsArr = <ActorObj[]>[];

		if (film.value?.actorNames.length) {
			film.value?.actorNames.forEach((name: string) => {
				const actorId =
					film.value?.actorIds[film.value?.actorNames.indexOf(name as never)];
				actorObj = {
					id: actorId || 0,
					name: name,
				};
				actorsArr.push(actorObj);
			});
		}
		return actorsArr;
	});

	const fetchData = async (filmId: number) => {
		const { locale } = useI18n();
		await Promise.allSettled([
			fetchFilmById(filmId),
			fetchGenres(locale.value),
		]);
	};

	(async function () {
		const filmId = Number(useRoute().params.id);
		await fetchData(filmId);
	})();

	const computedFilmDetails = computed(() => {
		const genreNames = matchGenreIdsWithNames(
			film.value?.genreIds || [],
			genres.value
		);
		const date = useDate();
		const filmDuration = new Date(film.value?.duration || 0);
		const durationString =
			date.getHours(filmDuration) + ":" + date.getMinutes(filmDuration);
		return [
			{
				name: "forms.film.release_year",
				value: film.value?.releaseYear || "",
				type: "info",
			},
			{
				name: "forms.film.duration",
				value: durationString || "",
				type: "info",
			},
			{
				name: "forms.film.genres",
				value: genreNames.join(", ") || "",
				type: "info",
			},
			{
				name: "forms.film.age",
				value: film.value?.age + "+" || "",
			},
			{
				name: "forms.film.director",
				value: film.value?.directorName || "",
				type: "link",
				to: `/persons/${film.value?.directorId}`,
			},
			{
				name: "forms.film.producer",
				value: film.value?.producerName || "",
				type: "link",
				to: `/persons/${film.value?.producerId}`,
			},
			{
				name: "forms.film.writer",
				value: film.value?.writerName || "",
				type: "link",
				to: `/persons/${film.value?.writerId}`,
			},
		];
	}) as ComputedRef<Array<CardDetails>>;

	(async function () {
		const filmId = Number(useRoute().params.id);
		await fetchData(filmId);
	})();
</script>

<style></style>
