<template>
	<BasePage
		:loading="loading"
		:error="networkError"
		:total="total"
		@alert:close="networkError = null">
		<template #toolbar>
			<PageToolBar
				title="pages.films.title"
				display-action-btns
				:total-pages="totalPages">
				<template #actions>
					<ActionBtn
						type="add"
						color="accent" 
						@click="$router.push('/films/add')"
						/>
				</template>
			</PageToolBar>
		</template>
		<template #content>
			<v-data-iterator
				:items="films"
				:loading="loading"
				:items-per-page="5">
				<template v-slot:default="props">
					<v-row class="my-2">
						<v-col
							v-for="(item, i) in films"
							:key="i"
							cols="8"
							md="4"
							sm="6">
							<CardItem
								:title="
									item.name +
									(item.releaseYear ? ' (' + item.releaseYear + ')' : '')
								"
								:id="item.id || 0"
								:img-height="300"
								:to="`/films/${item.id}`"
								:image-src="item.preview || ''"
								:no-img-label="$t('pages.films.no_preview')">
								<template #top>
									<div class="d-flex align-center justify-betweeen p-3">
										<v-rating
											:model-value="item.rating"
											active-color="accent"
											density="compact"
											half-increments
											readonly>
											<v-tooltip activator="parent">{{
												$t("pages.films.rating") + " " + item.rating
											}}</v-tooltip>
										</v-rating>
									</div>
								</template>
							</CardItem>
						</v-col>
					</v-row>
				</template>
			</v-data-iterator>
		</template>
	</BasePage>
</template>

<script lang="ts" setup>
	import ActionBtn from "~/components/Containment/Btns/ActionBtn.vue";
	import { useFilmStore } from "~/store/filmStore";
	import CardItem from "~/components/Containment/Cards/CardItem.vue";
	import PageToolBar from "~/components/Layout/Page/PageToolBar.vue";
	import BasePage from "~/components/Layout/Page/BasePage.vue";

	const { films, loading, networkError, total } = storeToRefs(useFilmStore());
	const { fetchFilms } = useFilmStore();
	const showError = computed(() => networkError.value !== null);
	const totalPages = computed(() => Math.ceil(total.value / 4));

	(async function () {
		await fetchFilms();
	})();
</script>
