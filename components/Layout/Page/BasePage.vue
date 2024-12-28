<template>
	<v-container>
		<PageLoader
			v-if="overlay"
			:showing="Boolean(loading)" />
		<v-row v-if="toolbar">
			<v-col> <slot name="toolbar"></slot></v-col>
		</v-row>
		<v-row>
			<v-col>
				<slot name="content"></slot>
			</v-col>
		</v-row>
		<PageAlert
			:show="Boolean(error)"
			type="error"
			:text="error?.message ?? 'error'"
			:title="$t('pages.network_error')"
			@close="$emit('alert:close')" />
	</v-container>
</template>

<script lang="ts" setup>
	import PageLoader from "~/components/Loaders/PageLoader.vue";
	import PageAlert from "./PageAlert.vue";

	defineEmits(["alert:close"]);
	defineProps<{
		loading?: boolean;
		overlay?: boolean;
		toolbar?: boolean;
		error?: Error | null;
	}>();
</script>

<style></style>
