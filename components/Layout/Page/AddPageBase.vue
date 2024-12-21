<template>
	<v-container>
		<v-row>
			<v-col>
				<PageToolBar
					display-back-btn
					:title="toolbarTitle" />
			</v-col>
		</v-row>
		<v-card
			class="base-card h-screen"
			variant="text">
			<v-container>
				<v-row
					class="p-3"
					justify="center">
					<v-col
						cols="8"
						md="6"
						sm="4">
						<slot name="stepper"></slot>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
		<PageAlert
			:show="Boolean(networkError)"
			type="error"
			:text="networkError?.message ?? 'error'"
			:title="$t('pages.network_error')"
			@close="$emit('alert:close')" />
	</v-container>
</template>

<script lang="ts" setup>
	import PageAlert from "~/components/Layout/Page/PageAlert.vue";
	import PageToolBar from "./PageToolBar.vue";

	defineEmits(["alert:close"]);
	defineProps<{
		networkError: Error | null;
		toolbarTitle: string;
	}>();
</script>

<style></style>
