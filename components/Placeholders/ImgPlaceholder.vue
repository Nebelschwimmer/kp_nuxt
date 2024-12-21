<template>
	<v-sheet
		height="100%"
		color="transparent"
		class="d-flex align-center justify-center flex-column base-card">
		<v-icon icon="mdi-image-off"></v-icon>
    <span v-if="displayTitle">{{ title || $t("general.no_img") }}</span>
	</v-sheet>
</template>

<script lang="ts" setup>
defineProps<{
	title?: string;
	displayTitle?: boolean;
}>();


</script>

<style></style>
