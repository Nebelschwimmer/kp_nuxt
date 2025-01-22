<template>
	<v-dialog
		:model-value="modelValue"
		max-width="400">
			<v-card class="dark-glass">
				<template #append>
					<CloseBtn @click="$emit('cancel', false)" />
				</template>
				<template #prepend>
					<v-icon icon="mdi-alert"></v-icon>
				</template>
				<v-card-title>{{ $t("dialogs.confirm.title") }}</v-card-title>
				<v-card-text v-if="text">
					{{ text }}
				</v-card-text>
				<v-card-actions>
					<v-btn
						color="primary"
						@click="$emit('cancel')"
						>{{ $t("actions.cancel") }}</v-btn
					>
					<v-btn
						color="accent"
						@click="$emit('confirm')"
						>{{ $t("actions.confirm") }}</v-btn
					>
				</v-card-actions>
			</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
	import CloseBtn from "../Containment/Btns/CloseBtn.vue";
	defineEmits(["confirm", "cancel"]);
	const props = defineProps<{
		modelValue: boolean;
		text?: string;
	}>();
</script>

<style></style>
