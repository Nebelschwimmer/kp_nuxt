<template>
	<v-container>
    <v-row>
      <v-col> <slot name="toolbar"></slot></v-col>
		</v-row>
		<v-row>
			<v-col>
        <PageLoader :showing="loading" />
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
		loading: boolean;
		error: Error | null;
	}>();
</script>

<style></style>
