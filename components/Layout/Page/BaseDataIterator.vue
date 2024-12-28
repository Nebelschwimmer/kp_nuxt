<template>
	<v-data-iterator
		:items="items"
		:loading="loading">
		<template #header>
			<PageToolBar
				v-bind="toolbarOptions"
				display-actions>
				<template #actions>
					<v-pagination
						v-model="currentPage"
						variant="tonal"
						density="compact"
						:length="totalPages"
						rounded="lg"
						:total-visible="6"
						@update:model-value="handlePageChange"></v-pagination>
				</template>
			</PageToolBar>
		</template>
		<template v-slot:default="{ items }">
			<v-list-item
				v-for="(item, i) in items"
				lines="two"
				v-bind="item.raw"
				:key="i"
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
		</template>
		<template
			v-if="footer"
			#footer>
			<v-footer
				class="justify-space-between text-body-2 mt-4"
				color="surface-variant">
				{{ $t("nav.pagination.total") }}: {{ items.length }}

				<v-pagination
					v-model="currentPage"
					:length="totalPages"
					density="compact"
					rounded="lg"
					:total-visible="items.length"
					@update:model-value="handlePageChange"></v-pagination>
			</v-footer>
		</template>
		<template #loader>
			<v-list>
				<v-skeleton-loader
					v-for="n in itemsPerPage"
					rounded="lg"
					v-bind="imgOptions"
					class="my-3"
					type="list-item-avatar-three-line">
				</v-skeleton-loader>
			</v-list>
		</template>
	</v-data-iterator>
</template>

<script lang="ts" setup>
	import PageToolBar from "./PageToolBar.vue";
	import BaseImg from "~/components/Containment/Img/BaseImg.vue";
	const emit = defineEmits(["update:page"]);
	defineProps<{
		items: any[];
		offset: number;
		totalPages: number;
		search: string;
		loading: boolean;
		itemsPerPage: number;
		page: number;
		paginationLabel?: string;
		footer?: boolean;
		toolbarOptions: ToolbarOptions;
		imgOptions: ImgOptions;
	}>();

	const currentPage = ref(1);

	const handlePageChange = (page: number) => {
		currentPage.value = page;
		emit("update:page", page);
	};
</script>

<style></style>
