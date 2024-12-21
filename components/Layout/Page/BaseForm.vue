<template>
	<v-card variant="text">
		<v-container>
			<v-row>
				<v-col>
					<PageLoader :showing="loading" />
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<slot name="form"></slot>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
				@click="$emit('validate')"
				:disabled="disabled"
				color="primary">
				{{ $t("actions.submit") }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
import PageLoader from '~/components/Loaders/PageLoader.vue';
defineEmits(["validate"]);
	defineProps<{
		loading: boolean;
		disabled?: boolean;
	}>();
</script>

<style></style>
