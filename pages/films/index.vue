<template>
	<PageCard>
	
				<BaseDataIterator
					v-if="films.length"
					:items="filmItems"
					:search="search"
					:offset="offset"
					:loading="loading"
					:total-pages="totalPages"
					:page="currentPage"
					:img-options="imgOptions"
					:sort-by="sortBy"
					:sort-options="sortOptions"
					:limit="limit"
					:limit-options="limitOptions"
					:order="order"
					:order-options="orderOptions"
					:list-title="$t('nav.films_list')"
					new-page-link="/films/new"
					footer
					@update:page="updateQueryParams"
					@update:search="handleSearch"
					@update:sort-by="handleSortBy"
					@update:limit="handleLimit"
					@update:order="handleOrder">
				</BaseDataIterator>
			<v-empty-state
				v-if="!films.length && !loading"
				:title="$t('empty_states.films')"
				class="mt-10"
				icon="mdi-filmstrip-off"
				:action-text="$t('empty_states.actions.add')"
				@click:action="navigateTo('films/new')">
			</v-empty-state>
	</PageCard>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
import BaseDataIterator from "~/components/Misc/BaseDataIterator.vue";
	import PageCard from "~/components/Containment/Cards/PageCard.vue";
	const { films, loading, totalPages, currentPage } =
		storeToRefs(useFilmStore());
	const { fetchFilteredFilms } = useFilmStore();
	const { locale, t } = useI18n();
	const limit = ref(5);
	const offset = ref(0);
	const search = ref("");
	const order = ref("asc");
	const sortBy = ref("name");

	const sortOptions = [
		{ value: "name", title: t("forms.film.name") },
		{ value: "year_of_release", title: t("forms.film.release_year") },
	] as selectOption[];

	const limitOptions = [
		{ value: 5, title: "5" },
		{ value: 10, title: "10" },
		{ value: 15, title: "15" },
		{ value: 20, title: "20" },
		{ value: 25, title: "25" },
		{ value: 30, title: "30" },
	] as selectOption[];

	const orderOptions = [
		{ value: "asc", title: t("actions.asc") },
		{ value: "desc", title: t("actions.desc") },
	] as selectOption[];

	const fetchData = async () => {
		await Promise.allSettled([
			fetchFilteredFilms(
				limit.value,
				offset.value,
				search.value,
				order.value,
				sortBy.value,
				locale.value
			),
		]);
	};

	const filmItems = computed(() => {
		return films.value.map((film): CardItem => {
			return {
				title:
					film.name +
					" (" +
					(film.releaseYear ? film.releaseYear.toString() : "") +
					")",
				subtitle: film.description || "",
				imageSrc: film.cover || film.gallery[0] || '',
				to: "/films/" + film.id,
			};
		});
	});

	const imgOptions = {
		shaded: false,
		height: 100,
		placeholderOptions: {
			displayTitle: true,
			title: t("pages.films.no_preview"),
		},
	} as ImgOptions;

	const updateQueryParams = (page: number) => {
		offset.value = (page - 1) * limit.value;
	};

	const handleSearch = (value: string) => {
		search.value = value;
	};

	const handleSortBy = (value: string) => {
		sortBy.value = value;
	};

	const handleLimit = (value: number) => {
		limit.value = value;
	};

	const handleOrder = (value: string) => {
		order.value = value;
	};

	const debounce = (fn: Function, delay: number) => {
		let timeoutId: number;
		return (...args: any[]) => {
			clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				fn(...args);
			}, delay);
		};
	};

	watch(
		[limit, offset, order, sortBy, locale],
		async ([newLimit, newOffset, newOrder, newSortBy, newLocale]) => {
			await fetchFilteredFilms(
				newLimit,
				newOffset,
				"",
				newOrder,
				newSortBy,
				newLocale
			);
		},
		{
			immediate: true,
		}
	);

	watch(
		search,
		debounce(async (newVal: string) => {
			await fetchFilteredFilms(
				limit.value,
				0,
				newVal,
				order.value,
				sortBy.value,
				locale.value
			);
		}, 1000)
	);

	onMounted(async () => {
		await fetchData();
	});

	definePageMeta({
		layout: "default",
		name: "films",
		path: "/films",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
