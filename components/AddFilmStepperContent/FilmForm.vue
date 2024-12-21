<template>
	<BaseForm
		@validate="validate"
		:loading="loading">
		<template #form>
			<v-form ref="formRef">
				<v-text-field
					v-model="filmForm.name"
					name="name"
					:rules="nameRules"
					clearable
					:label="$t('forms.film.name')"
					prepend-icon="mdi-movie-play" />
				<v-combobox
					v-model.number="filmForm.releaseYear"
					name="releaseYear"
					:rules="releaseYearRules"
					:label="$t('forms.film.release_year')"
					:items="yearsOfReleaseItems"></v-combobox>
				<v-select
					v-model="filmForm.genreIds"
					name="genreIds"
					multiple
					:items="genres"
					:rules="multipleSelectRules"
					:label="$t('forms.film.genres')"
					:hint="$t('forms.film.genres_hint')"
					item-value="value"
					item-title="name"
					prepend-icon="mdi-filmstrip"></v-select>
				<v-select
					v-model="filmForm.actorIds"
					name="actorIds"
					multiple
					:items="actors"
					item-value="id"
					item-title="name"
					:rules="multipleSelectRules"
					:label="$t('forms.film.actors')"
					:hint="$t('forms.film.actors_hint')"
					prepend-icon="mdi-account"></v-select>
				<v-select
					v-model.number="filmForm.directorId"
					name="directorId"
					item-value="id"
					item-title="name"
					:items="directors"
					:rules="selectRules"
					:label="$t('forms.film.director')"
					:hint="$t('forms.film.director_hint')"
					prepend-icon="mdi-account"></v-select>
				<v-combobox
					v-model.number="filmForm.age"
					name="age"
					:rules="ageRules"
					:label="$t('forms.film.age')"
					:items="ageItems"></v-combobox>
				<v-text-field
					:label="$t('forms.film.duration')"
					type="time"
					name="duration"
					v-model="filmForm.duration"
					:rules="durationRules"
					clearable></v-text-field>
				<v-textarea
					:label="$t('forms.film.description')"
					name="description"
					v-model="filmForm.description"
					variant="outlined"
					clearable></v-textarea>
			</v-form>
		</template>
	</BaseForm>
</template>

<script lang="ts" setup>
	import BaseForm from "../Layout/Page/BaseForm.vue";
	const { t } = useI18n();
const formRef = ref<any>(null);
	const validationError = ref(false);
	const emit = defineEmits(["submit"]);
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
		loading: {
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

	const currentYear = new Date().getFullYear();
	const startYear = 1900;

	const releaseYearRules = [
		(v: number) => typeof v === "number" || t("forms.rules.type_num"),
		(v: number) => !!v || t("forms.rules.required"),
		(v: number) => v >= startYear || t("forms.rules.min_year", startYear),
		(v: number) => v <= currentYear || t("forms.rules.max_year", currentYear),
	];

	const yearsOfReleaseItems = Array.from(
		{ length: startYear - currentYear + 1 },
		(_, index) => startYear + index
	);
	const MAX_NAME_LENGHT = 50;
	const MIN_NAME_LENGHT = 2;
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
	const multipleSelectRules = [
		(v: string) => v.length > 0 || t("forms.rules.required"),
	];

	const ageItems = [0, 12, 16, 18];
	const ageRules = [
		(v: number) => typeof v === "number" || t("forms.rules.type_num"),
		(v: number) => !!v || t("forms.rules.required"),
	];

	const durationRules = [(v: string) => !!v || t("forms.rules.required")];

	const validate = async () => {
		const { valid } = await formRef.value.validate();
		if (valid) {
			emit("submit");
		}
	};
</script>

<style></style>
