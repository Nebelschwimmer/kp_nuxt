<template>
	<v-img
		:src="preview as string"
		class="mx-auto"
		color="grey-lighten-3"
		:height="height"
		:aspect-ratio="1"
		cover>
		<template v-slot:placeholder>
			<v-sheet
				class="d-flex align-center justify-center fill-height"
				height="250"
				:border="displayBorder || false">
				<v-icon
					icon="mdi-film"
					size="x-large"
					color="grey-darken-1">
					<v-tooltip
						activator="parent"
						location="start"
						>{{ $t("pages.films.no_preview") }}</v-tooltip
					>
				</v-icon>
			</v-sheet>
		</template>
		<template v-slot:error>
			<v-img
				class="mx-auto"
				height="300"
				max-width="500"
				src="https://picsum.photos/500/300?image=232"></v-img>
		</template>
	</v-img>
</template>

<script lang="ts" setup>
	defineProps<{
		preview: string | null | undefined;
		height: number;
		displayBorder?: boolean;
	}>();
</script>

<style></style>
