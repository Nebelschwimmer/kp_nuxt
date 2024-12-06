<template>
	<v-container>
		<v-form
			ref="formRef"
			class="grid grid-rows-2 gap-2">
			<v-text-field
				v-model="filmForm.name"
				name="name"
				:rules="nameRules"
				clearable
				density="compact"
				variant="outlined"
				:label="$t('forms.film.name')"
				inner-icon="mdi-movie-play" />
			<v-combobox
				v-model.number="filmForm.releaseYear"
				name="releaseYear"
				:rules="releaseYearRules"
				density="compact"
				variant="outlined"
				:label="$t('forms.film.release_year')"
				:items="yearsOfReleases"></v-combobox>
			<v-select
				v-model="filmForm.genreIds"
				name="genreIds"
				multiple
				:items="genres"
				item-value="value"
				item-title="name"
				density="compact"
				variant="outlined"
				:rules="multiplSelectRules"
				:label="$t('forms.film.genres')"
				:hint="$t('forms.film.genres_hint')"
				icon="mdi-filmstrip"></v-select>
			<v-select
				v-model="filmForm.actorIds"
				name="actorIds"
				multiple
				:items="actors"
				item-value="id"
				item-title="name"
				density="compact"
				variant="outlined"
				:rules="multiplSelectRules"
				:label="$t('forms.film.actors')"
				:hint="$t('forms.film.actors_hint')"
				icon="mdi-account"></v-select>
			<v-select
				v-model.number="filmForm.directorId"
				name="directorId"
				item-value="id"
				item-title="name"
				:items="directors"
				:rules="selectRules"
				density="compact"
				variant="outlined"
				:label="$t('forms.film.director')"
				:hint="$t('forms.film.director_hint')"
				icon="mdi-account"></v-select>
			<v-textarea
				:label="$t('forms.film.description')"
				name="description"
				v-model="filmForm.description"
				variant="outlined"
				clearable></v-textarea>
			<v-btn
				@click="validate"
				color="primary"
				variant="tonal"
				:disabled="networkError">
				{{ $t("actions.submit") }}</v-btn
			>
		</v-form>
	</v-container>
</template>

<script lang="ts" setup>
	const { t } = useI18n();
	const formRef = ref<any>(null);
	const emit = defineEmits(["submit", "error:validation"]);
	defineProps({
		filmForm: {
			type: Object,
			required: true,
		},
		genres: {
			type: Array,
			required: true,
		},
		actors: {
			type: Array,
			required: true,
			default: () => [],
		},
		directors: {
			type: Array,
			required: true,
			default: () => [],
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		networkError: {
			type: Boolean,
			required: false,
			default: false,
		},
	});
	const MAX_NAME_LENGHT = 50;
	const MIN_NAME_LENGHT = 2;

	const currentYear = new Date().getFullYear();
	const startYear = 1900;

	const releaseYearRules = [
		(v: number) => typeof v === "number" || t("forms.rules.type_num"),
		(v: number) => !!v || t("forms.rules.required"),
		(v: number) => v >= startYear || t("forms.rules.min_year", startYear),
		(v: number) => v <= currentYear || t("forms.rules.max_year", currentYear),
	];

	const yearsOfReleases = Array.from(
		{ length: currentYear - startYear + 1 },
		(_, index) => startYear + index
	);
	const nameRules = [
		(v: string) => !!v || t("forms.rules.required"),
		(v: string) =>
			v.length <= MAX_NAME_LENGHT ||
			t("forms.rules.max_chars") + " " + MAX_NAME_LENGHT,
		(v: string) =>
			v.length >= MIN_NAME_LENGHT ||
			t("forms.rules.min_chars") + " " + MIN_NAME_LENGHT,
	];

	const selectRules = [(v: string) => !!v || t("forms.rules.required")];
	const multiplSelectRules = [
		(v: string) => v.length > 0 || t("forms.rules.required"),
	];
	const validate = async () => {
		const { valid } = await formRef.value.validate();
		valid ? emit("submit") : emit("error:validation");
	};
</script>

<style></style>
