<template>
	<v-container>
		<v-row>
			<v-col
				:cols="12"
				lg="3">
				<v-card
					rounded="lg"
					variant="text"
					prepend-icon="mdi-filter"
					:title="$t('actions.filters')"
					elevation="10">
					<v-divider></v-divider>
					<div class="mt-2 pa-4">
						<v-select
							:model-value="sortBy"
							:items="sortOptions"
							:label="$t('actions.sort')"
							prepend-inner-icon="mdi-sort"
							@update:model-value="handleSortChange">
						</v-select>
						<v-select
							:model-value="order"
							:items="orderOptions"
							:label="$t('actions.order')"
							prepend-inner-icon="mdi-sort"
							@update:model-value="handleOrderChange">
						</v-select>
						<v-select
							:model-value="limit"
							:label="$t('actions.limit')"
							:items="limitOptions"
							prepend-inner-icon="mdi-format-list-bulleted"
							@update:model-value="handleLimitChange">
						</v-select>
					</div>
				</v-card>
			</v-col>
			<v-col>
				<v-hover>
					<template #default="{ isHovering, props }">
						<v-card
							v-bind="props"
							rounded="lg"
							variant="text"
							elevation="10"
							prepend-icon="mdi-format-list-bulleted"
							:title="listTitle || $t('general.no_data')">
							<v-divider></v-divider>
							<v-card-text class="mt-2">
								<v-data-iterator
									:items="items"
									:loading="loading"
									:items-per-page="limit"
									:search="search">
									<template #header>
										<v-text-field
											:model-value="search"
											:label="$t('actions.search')"
											prepend-inner-icon="mdi-magnify"
											clearable
											width="100%"
											@click:clear="handleSearchChange('')"
											@update:model-value="handleSearchChange">
										</v-text-field>
									</template>
									<template #default="{ items }">
										<v-sheet
											min-height="65dvh"
											border="0">
											<v-list-item
												v-for="(item, i) in items"
												:key="i"
												v-bind="item.raw"
												variant="tonal"
												class="my-2"
												lines="two"
												rounded="lg"
												:to="item.raw.to"
												:title="item.raw.title"
												:subtitle="item.raw.subtitle"
												:value="item">
												<template v-slot:prepend>
													<v-avatar
														rounded="0"
														size="100">
														<BaseImg
															:img-src="item.raw.imageSrc"
															:img-options="imgOptions" />
													</v-avatar>
												</template>
											</v-list-item>
											<v-fab
												:active="isHovering ? true : false"
												color="secondary"
												absolute
												offset
												icon="mdi-plus"
												location="top right"
												size="large"
												:to="newPageLink" />
										</v-sheet>
									</template>

									<template
										v-if="footer"
										#footer>
										<v-footer
											class="justify-space-between text-body-2 mt-10 dark-glass">
											{{ $t("nav.pagination.total") }}: {{ items.length }}
											<ClientOnly>
												<v-pagination
													v-model="currentPage"
													:length="totalPages"
													density="comfortable"
													rounded="lg"
													color="accent"
													:total-visible="items.length"
													@update:model-value="handlePageChange">
												</v-pagination>
											</ClientOnly>
										</v-footer>
									</template>
									<template #loader>
										<v-list>
											<v-skeleton-loader
												v-for="n in limit"
												rounded="lg"
												v-bind="imgOptions"
												class="my-3 stained-glass"
												type="list-item-avatar-three-line">
											</v-skeleton-loader>
										</v-list>
									</template>
								</v-data-iterator>
							</v-card-text>
						</v-card>
					</template>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
	import BaseImg from "~/components/Containment/Img/BaseImg.vue";
	import AddBtn from "../Containment/Btns/AddBtn.vue";
	import PageCard from "../Containment/Cards/PageCard.vue";
	const emit = defineEmits([
		"update:page",
		"form:open",
		"update:search",
		"update:sortBy",
		"update:limit",
		"update:order",
		"delete:item",
	]);
	defineProps<{
		items: any[];
		offset: number;
		totalPages: number;
		search: string;
		sortBy: string;
		order: string;
		loading: boolean;
		page: number;
		paginationLabel?: string;
		footer?: boolean;
		imgOptions: ImgOptions;
		limit: number;
		limitOptions: selectOption[];
		sortOptions: selectOption[];
		orderOptions: selectOption[];
		newPageLink: string;
		listTitle?: string;
	}>();

	const currentPage = ref(1);

	const handlePageChange = (page: number) => {
		currentPage.value = page;
		emit("update:page", page);
	};
	const handleSearchChange = (search: string) => {
		emit("update:search", search);
	};

	const handleSortChange = (sortBy: string) => {
		emit("update:sortBy", sortBy);
	};

	const handleLimitChange = (limit: number) => {
		emit("update:limit", limit);
	};

	const handleOrderChange = (order: string) => {
		emit("update:order", order);
	};
</script>

<style></style>
