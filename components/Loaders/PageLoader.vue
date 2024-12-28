<template>
	<v-overlay
		:model-value="showing"
		contained
    class="align-center justify-center">
		<v-progress-circular
			indeterminate
			size="64"
			color="accent"></v-progress-circular>
	</v-overlay>
</template>

<script lang="ts" setup>
	defineProps<{
		showing: boolean;
	}>();
</script>
<style></style>
