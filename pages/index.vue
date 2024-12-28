<template>
	<BasePage
		:error="networkError"
		:loading="loading"
		@alert:close="networkError = null">
		<template #content>
			<v-container>
				<v-row justify="center">
					<v-col
						cols="12"
						xl="10"
						lg="10"
						md="12"
						sm="12">
						<v-card variant="text">
							<template #title>
								<div class="">
									<span class="mr-2 text-h4">#</span>
									<a
										href="/#newest"
										class="font-bold text-h4"
										>{{ $t("pages.home.newest") }}
										</a>
								</div>
								<v-divider></v-divider>
							</template>
							<template #text>
								<v-carousel
									v-model="activeFilm"
									:height="CAROUSEL_HEIGHT"
									cycle
									hide-delimiter-background>
									<v-carousel-item
										v-for="(film, index) in latestFilms"
										v-if="!loading"
										:key="index"
										:value="index">
										<v-card
											variant="text"
											height="100%"
											@click="navigateTo('/films/' + film.id)">
											<template #text>
												<BaseImg
													:img-src="film.preview || ''"
													:img-options="cardImgOptions">
												</BaseImg>
											</template>

											<template #image>
												<BaseImg
													:img-src="film.preview || ''"
													:img-options="bgImgOptions"></BaseImg>
											</template>
											<template #title>
												<div
													class="font-bold text-white text-h4 text-center p-0 text-truncate">
													{{ film.name || "" }}
												</div>
											</template>
										</v-card>
									</v-carousel-item>
									<v-skeleton-loader
										v-else
										:height="CAROUSEL_HEIGHT"
										type="image">
									</v-skeleton-loader>
								</v-carousel>
								<v-list>
									<v-list-item
										v-for="(film, index) in latestFilms"
										v-if="!loading"
										:key="film.id || 0"
										:active="index === activeFilm"
										:title="film.name || ''"
										:subtitle="film.description || ''"
										:value="film.id || 0"
										variant="elevated"
										lines="three"
										class="list-bg"
										@click="navigateTo('/films/' + film.id)">
										<template #prepend>
											<v-avatar rounded="0">
												<BaseImg
													:img-src="film.preview || ''"
													:img-options="avatarImgOptions">
												</BaseImg>
											</v-avatar>
										</template>
									</v-list-item>
									<v-skeleton-loader
										v-else
										v-for="k in 5"
										:key="k"
										height="100"
										type="list-item-avatar-three-line">
									</v-skeleton-loader>
								</v-list>
							</template>
						</v-card>
					</v-col>
				</v-row>
				<v-row>
					<v-col> </v-col>
				</v-row>
			</v-container>
		</template>
	</BasePage>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	import BasePage from "~/components/Layout/Page/BasePage.vue";
	import BaseImg from "~/components/Containment/Img/BaseImg.vue";
	const { latestFilms, loading, networkError } = storeToRefs(useFilmStore());
	const { fetchLatestFilms } = useFilmStore();
	const activeFilm = ref(0);
	onMounted(async () => {
		await fetchLatestFilms();
	});
const { t } = useI18n()
	const CAROUSEL_HEIGHT = 400;

	const cardImgOptions = {
		shaded: false,
		cover: false,
		height: CAROUSEL_HEIGHT - 100,
		placeholderOptions: {
			displayTitle: true,
			title: t("pages.films.no_preview"),
		},
	} as ImgOptions;

	const avatarImgOptions = {
		shaded: false,
		height: 50,
		cover: true,
		placeholderOptions: {
			displayTitle: false,
		},
	};

	const bgImgOptions = {
		shaded: true,
		height: "100%",
		cover: true,
		class: "img-blur",
		placeholderOptions: {
			displayTitle: false,
		},
	};
</script>

<style lang="scss">
	.img-blur {
		filter: blur(12px);
	}
</style>
