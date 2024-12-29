<template>
	<v-sheet
		height="100%"
		rounded="lg"
		min-height="100%"
		color="transparent"
		class="d-flex align-center justify-center flex-column w-100 base-card text-caption">
		<v-icon icon="mdi-image-off"></v-icon>
    <v-label v-if="displayTitle">{{ title ? title : $t("general.no_img") }}</v-label>
	</v-sheet>
</template>

<script lang="ts" setup>
defineProps<{
	title?: string;
	displayTitle?: boolean;
}>();


</script>

<style></style>
