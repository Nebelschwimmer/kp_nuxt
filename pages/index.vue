<template>
	<v-container>
		<v-row>
			<PageToolBar
				title="pages.films.title"
				:total-pages="totalPages"
				displayActionBtns>
				<template #actions>
					<ActionBtn
						type="add"
						color="secondary"
						variant="tonal"
						icon="mdi-plus"
						@click="$router.push('/add-film')" />
				</template>
			</PageToolBar>
		</v-row>
		<v-row>
			<v-col class="h-5">
				<PageLoader v-if="loading" />
			</v-col>
		</v-row>
		<v-row v-if="films.length">
			<v-list
				lines="three"
				variant="outlined"
				class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6">
				<v-list-item
					v-for="film in films"
					:key="film?.id || 0"
					:value="film?.id"
					rounded="lg"
					:to="`/film-${film?.id}`">
					<v-list-item-media>
						<v-avatar
							size="300"
							rounded="sm">
							<v-img
								:src="film?.preview || ''"
								height="100%">
								<template #placeholder>
									<v-sheet
										elevation="4"
										color="grey-lighten-5 text-caption"
										class="full-height d-flex align-center justify-center"
										height="100%"
										>{{ $t("pages.films.no_preview") }}</v-sheet
									>
								</template>
							</v-img>
						</v-avatar>
					</v-list-item-media>

					<v-list-item-title class="text-h4">
						{{ film?.name }}
					</v-list-item-title>
					<v-divider></v-divider>

					<v-list-item-subtitle>
						<div>
							<span>{{ $t("pages.films.director") }}: </span>
							<span>{{ film?.directorName }}</span>
						</div>
						<div>
							<span>{{ $t("pages.films.release_year") }}: </span>
							<span>{{ film?.releaseYear }}</span>
						</div>
					</v-list-item-subtitle>
				</v-list-item>
			</v-list>
		</v-row>
		<v-sheet
			v-else-if="!loading"
			elevation="2"
			class="w-33 h-33 mx-auto mt-4">
			<v-banner
				color="warning"
				icon="mdi-alert">
				{{ $t("pages.films.no_films") }}
				<template #actions>
					<div>
						<ActionBtn
							type="add"
							icon="mdi-plus"
							@click="$router.push('/add-film')" />
					</div>
				</template>
			</v-banner>
		</v-sheet>
		<PageAlert
			:show="showError"
			type="error"
			:text="networkError?.message ?? 'error'"
			:title="$t('pages.network_error')"
			@close="networkError = null" />
	</v-container>
</template>

<script lang="ts" setup>
	import ActionBtn from "~/components/Btns/ActionBtn.vue";
	import { useFilmStore } from "~/store/filmStore";
	import PageLoader from "~/components/Loaders/PageLoader.vue";

	const { films, loading, networkError, total } = storeToRefs(useFilmStore());
	const { fetchFilms } = useFilmStore();
	const showError = computed(() => networkError.value !== null);
	const totalPages = computed(() => Math.ceil(total.value / 4));
	onMounted(async () => {
		await fetchFilms();
	});
</script>
