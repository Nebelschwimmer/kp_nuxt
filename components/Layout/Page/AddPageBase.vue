<template>
	<v-container>
		<v-row
			class="p-3"
			justify="center">
			<v-col
				cols="12"
				xl="10"
				lg="10"
				md="12"
				sm="12">
				<v-card variant="text">
					<v-container>
						<v-row>
							<v-col>
								<PageToolBar
								display-back-btn
								:title="toolbarTitle" />
							</v-col>
						</v-row>
						<v-col>
							<slot name="stepper"></slot>
						</v-col>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
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
