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
					prepend-inner-icon="mdi-movie-play" />

				<v-text-field
					v-model="filmForm.slogan"
					name="slogan"
					clearable
					:label="$t('forms.film.slogan')"
					prepend-inner-icon="mdi-format-quote-close" />

				<v-select
					v-model="filmForm.actorIds"
					name="actorIds"
					multiple
					:items="actors"
					item-value="id"
					item-title="name"
					:rules="multipleSelectRules"
					:label="$t('forms.film.actors')"
					prepend-inner-icon="mdi-account"></v-select>

				<v-combobox
					v-model.number="filmForm.releaseYear"
					name="releaseYear"
					:rules="releaseYearRules"
					clearable
					variant="outlined"
					density="comfortable"
					prepend-inner-icon="mdi-calendar"
					:label="$t('forms.film.release_year')"
					:items="yearsOfReleaseItems"></v-combobox>

				<v-select
					v-model="filmForm.genreIds"
					name="genreIds"
					multiple
					:items="genres"
					:rules="multipleSelectRules"
					:label="$t('forms.film.genres')"
					item-value="value"
					item-title="name"
					prepend-inner-icon="mdi-filmstrip"></v-select>

				<v-select
					v-model.number="filmForm.directorId"
					name="directorId"
					item-value="id"
					item-title="name"
					:items="directors"
					:rules="selectRules"
					:label="$t('forms.film.director')"
					prepend-inner-icon="mdi-account"></v-select>

				<v-select
					v-model.number="filmForm.producerId"
					name="producerId"
					item-value="id"
					item-title="name"
					:items="directors"
					:rules="selectRules"
					:label="$t('forms.film.producer')"
					prepend-inner-icon="mdi-account"></v-select>

				<v-select
					v-model.number="filmForm.writerId"
					name="writerId"
					item-value="id"
					item-title="name"
					:items="writers"
					:rules="selectRules"
					:label="$t('forms.film.writer')"
					prepend-inner-icon="mdi-account"></v-select>

				<v-select
					v-model.number="filmForm.composerId"
					name="composerId"
					item-value="id"
					item-title="name"
					:items="composers"
					:rules="selectRules"
					:label="$t('forms.film.composer')"
					prepend-inner-icon="mdi-account"></v-select>

				<v-select
					v-model.number="filmForm.age"
					name="age"
					:rules="ageRules"
					prepend-inner-icon="mdi-cake-variant"
					:label="$t('forms.film.age')"
					:items="ageItems"></v-select>

				<v-text-field
					v-model="filmForm.duration"
					:label="$t('forms.film.duration')"
					type="time"
					name="duration"
					prepend-inner-icon="mdi-timer"
					:rules="durationRules"
					clearable></v-text-field>

				<v-textarea
					:label="$t('forms.film.description')"
					name="description"
					density="comfortable"
					prepend-inner-icon="mdi-pencil"
					v-model="filmForm.description"
					variant="outlined"
					auto-grow
					no-resize
					clearable></v-textarea>
			</v-form>
		</template>
	</BaseForm>
</template>

<script lang="ts" setup>
	import BaseForm from "../Layout/Page/BaseForm.vue";
	const { t } = useI18n();
	const formRef = ref<any>(null);
	const emit = defineEmits(["submit", "error:validation"]);
	defineProps<{
		filmForm: FilmForm;
		genres: Genre[];
		actors: Person[];
		producers: Person[];
		writers: Person[];
		composers: Person[];
		directors: Person[];
		networkError: boolean;
		loading?: boolean;
	}>();

	const currentYear = new Date().getFullYear();
	const startYear = 1900;

	const releaseYearRules = [
		(v: number) => !!v || t("forms.rules.required"),
		(v: number) => typeof v === "number" || t("forms.rules.type_num"),
		(v: number) => v >= startYear || t("forms.rules.min_year", startYear),
		(v: number) => v <= currentYear || t("forms.rules.max_year", currentYear),
	];

	const yearsOfReleaseItems = Array.from(
		{ length: currentYear - startYear + 1 },
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

	const selectRules = [(v: string | null) => !!v || t("forms.rules.required")];
	const multipleSelectRules = [
		(v: string) => v?.length > 0 || t("forms.rules.required"),
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
		} else {
			emit("error:validation");
		}
	};
</script>

<style></style>
