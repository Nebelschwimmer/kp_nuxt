<template>
	<v-select
		:items="items"
		:model-value="modelValue"
		:label="label"
		:multiple="multiple"
		:hint="hint"
		:loading="loading"
		variant="outlined"
		density="compact"
		:rules="[v => !!v || 'Item is required']"
		:item-title="itemTitle"
		:item-value="itemValue"
		@update:model-value="$emit('update:modelValue', $event)">
		<template #prepend-inner>
			<v-icon :icon="icon" />
		</template>
	</v-select>
</template>

<script lang="ts" setup>
const { t } = useI18n();
	defineProps({
		modelValue: {
			type: Object || Array,
			required: true,
		},
		items: {
			type: Array,
			required: true,
		},
		icon: {
			type: String,
			required: false,
		},
		label: {
			type: String,
			required: false,
		},
		multiple: {
			type: Boolean,
			required: false,
			default: false,
		},
		hint: {
			type: String,
			required: false,
			default: () => "",
		},
		loading: {
			type: Boolean,
			required: false,
			default: false,
		},
		itemValue: {
			type: String,
			required: false,
			default: "id",
		},
		itemTitle: {
			type: String,
			required: false,
			default: "name",
		},
	});
</script>

<style></style>
