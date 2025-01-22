<template>
	<div>
		<v-card v-if="latestFilms.length">
			<v-card-title>
				<span class="text-h5 text-lg-h4 font-weight-bold"
					>#{{ $t("pages.home.newest") }}</span
				>
				<v-divider></v-divider>
			</v-card-title>

				<v-container>
					<v-row>
						<v-col cols="12"  v-for="film in latestFilms" :key="film.id + 'latest'">
							<v-card
								
								:height="
									$vuetify.display.smAndDown ? MOBILE_CARD_HEIGHT : CARD_HEIGHT
								"
								class="cursor-pointer"
								@click="navigateTo('films/' + film.id)"
								border
								v-scroll="onScroll">
								<template #image>
									<v-img
										v-if="film.gallery.length"
										cover
										:src="film.cover || film.gallery[0]">
									</v-img>
									<v-empty-state
										v-else
										width="100%"
										:title="$t('empty_states.gallery')"
										icon="mdi-image-off"
										:action-text="$t('empty_states.actions.navigate')"
										@click:action="navigateTo('films/' + film.id)">
									</v-empty-state>
								</template>
								<v-sheet class="stained-glass text-center">
									<span
										:class="[
											'font-weight-bold text-h5 text-lg-h5',
											{ 'text-white': !$vuetify.theme.global.current.dark },
										]"
										>{{ film.name + " (" + film.releaseYear + ")" }}</span
									>
								</v-sheet>
							</v-card>
						</v-col>
					</v-row>
				</v-container>
		</v-card>
		<v-skeleton-loader
			v-else-if="loading"
			type="card, image"
			:height="CARD_HEIGHT"></v-skeleton-loader>
		<v-empty-state
			v-if="!loading && !latestFilms.length"
			:title="$t('empty_states.films')"
			class="mt-10"
			icon="mdi-filmstrip-off"
			:action-text="$t('empty_states.actions.add')"
			@click:action="navigateTo('films/new')"></v-empty-state>
	</div>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	const { latestFilms, loading } = storeToRefs(useFilmStore());
	const { fetchLatestFilms } = useFilmStore();
	const CARD_HEIGHT = 350;
	const MOBILE_CARD_HEIGHT = 350;
	const offsetTop = ref(0);
	const rowsNumber = ref(0);
	const showRow = ref(false);
	const onScroll = () => {
		offsetTop.value = window.scrollY;
		if (offsetTop.value > CARD_HEIGHT) {
			showRow.value = true;
		}
	};

	onMounted(async () => {
		await fetchLatestFilms();
		rowsNumber.value = latestFilms.value.length / 2;
	});

	definePageMeta({
		name: "home",
		path: "/",
		key: (route) => route.fullPath,
	});
</script>
