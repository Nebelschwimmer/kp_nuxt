<template>
	<PageCard>
			<BaseDataIterator
				v-if="persons.length"
				:items="personItems"
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
				footer
				:order="order"
				:order-options="orderOptions"
				new-page-link="/persons/new"
						:list-title="$t('nav.persons_list')"
				@form:open="showForm = true"
				@update:page="updateQueryParams"
				@update:search="handleSearch"
				@update:sort-by="handleSortBy"
				@update:limit="handleLimit"
				@update:order="handleOrder">
			</BaseDataIterator>
			<v-empty-state
				v-if="!persons.length && !loading"
				:title="$t('empty_states.persons')"
				class="mt-10"
				image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
				:action-text="$t('empty_states.actions.add')"
				@click:action="navigateTo('persons/new')">
			</v-empty-state>
	</PageCard>
</template>

<script lang="ts" setup>
	import { usePersonStore } from "~/store/personStore";
	import PageCard from "~/components/Containment/Cards/PageCard.vue";
	import BaseDataIterator from "~/components/Misc/BaseDataIterator.vue";
	const { locale, t } = useI18n();

	const { persons, loading, totalPages, currentPage } =
		storeToRefs(usePersonStore());
	const { fetchFilteredPersons, fetchGenders, fetchSpecialties } =
		usePersonStore();
	const showForm = ref(false);
	const limit = ref(5);
	const offset = ref(0);
	const search = ref("");
	const sortBy = ref("firstname");
	const order = ref("asc");
	const fetchData = async () => {
		await Promise.allSettled([
			fetchFilteredPersons(
				limit.value,
				offset.value,
				search.value,
				sortBy.value,
				order.value,
				locale.value
			),
			fetchGenders(locale.value),
			fetchSpecialties(locale.value),
		]);
	};

	const sortOptions = [
		{ value: "firstname", title: t("forms.person.firstname") },
		{ value: "lastname", title: t("forms.person.lastname") },
	] as selectOption[];

	const orderOptions = [
		{ value: "asc", title: t("actions.asc") },
		{ value: "desc", title: t("actions.desc") },
	] as selectOption[];

	const personItems = computed(() => {
		return persons.value.map((person): CardItem => {
			return {
				title: person.firstname + " " + person.lastname,
				subtitle: person.specialtyNames.join(", "),
				imageSrc: person.avatar || "",
				to: "/persons/" + person.id,
				variant: "text",
				color: "secondary",
			};
		});
	});

	const limitOptions = [
		{ value: 5, title: "5" },
		{ value: 10, title: "10" },
		{ value: 15, title: "15" },
		{ value: 20, title: "20" },
		{ value: 25, title: "25" },
		{ value: 30, title: "30" },
	] as selectOption[];

	const imgOptions = {
		shaded: false,
		height: 100,
		placeholderOptions: {
			displayTitle: true,
			title: t("forms.person.no_photo"),
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
		[limit, offset, sortBy, order, locale],
		async ([newLimit, newOffset, newSortBy, newOrder, newLocale]) => {
			await fetchFilteredPersons(
				newLimit,
				newOffset,
				"",
				newSortBy,
				newOrder,
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
			await fetchFilteredPersons(
				limit.value,
				0,
				newVal,
				sortBy.value,
				order.value,
				locale.value
			);
		}, 1000)
	);

	onMounted(async () => {
		await fetchData();
	});

	definePageMeta({
		layout: "default",
		name: "persons",
		path: "/persons",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
