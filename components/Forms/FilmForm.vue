<template>
	<v-card>
		<v-card-text>
			<v-form
				ref="formRef"
				@submit.prevent>
				<v-row>
					<v-col
						cols="12"
						lg="6"
						md="12"
						sm="12">
						<v-text-field
							v-model="filmForm.name"
							name="name"
							:rules="nameRules"
							:label="$t('forms.film.name')"
							prepend-inner-icon="mdi-movie-play"
							/>
						<v-text-field
							v-model="filmForm.slogan"
							name="slogan"
							:label="$t('forms.film.slogan')"
							prepend-inner-icon="mdi-format-quote-close" />
						<v-combobox
							v-model.number="filmForm.releaseYear"
							name="releaseYear"
							:rules="releaseYearRules"
							prepend-inner-icon="mdi-calendar"
							:label="$t('forms.film.release_year')"
							:items="yearsOfReleaseItems"
							/>
						<v-select
							v-model="filmForm.genreIds"
							name="genreIds"
							multiple
							:items="genres"
							:rules="multipleSelectRules"
							:label="$t('forms.film.genres')"
							item-value="value"
							item-title="name"
							prepend-inner-icon="mdi-filmstrip"
							/>
						<v-select
							v-model.number="filmForm.age"
							name="age"
							:rules="ageRules"
							prepend-inner-icon="mdi-cake-variant"
							:label="$t('forms.film.age')"
							:items="ageItems"
							/>
						<v-text-field
							v-model="filmForm.duration"
							:label="$t('forms.film.duration')"
							type="time"
							name="duration"
							prepend-inner-icon="mdi-timer"
							:rules="durationRules"
							/>
					</v-col>
					<v-col
						cols="12"
						lg="6"
						md="12"
						sm="12">
						<v-select
							v-model="filmForm.actorIds"
							:loading="loading"
							name="actorIds"
							multiple
							:items="actors"
							item-value="id"
							item-title="name"
							:rules="multipleSelectRules"
							:label="$t('forms.film.actors')"
							prepend-inner-icon="mdi-account" />
						<v-select
							v-model.number="filmForm.directorId"
							name="directorId"
							:loading="loading"
							item-value="id"
							item-title="name"
							:items="directors"
							:rules="selectRules"
							:label="$t('forms.film.director')"
							prepend-inner-icon="mdi-account" />
						<v-select
							v-model.number="filmForm.producerId"
							name="producerId"
							item-value="id"
							:loading="loading"
							item-title="name"
							:items="directors"
							:rules="selectRules"
							:label="$t('forms.film.producer')"
							prepend-inner-icon="mdi-account" />
						<v-select
							v-model.number="filmForm.writerId"
							name="writerId"
							item-value="id"
							:loading="loading"
							item-title="name"
							:items="writers"
							:rules="selectRules"
							:label="$t('forms.film.writer')"
							prepend-inner-icon="mdi-account" />
						<v-select
							v-model.number="filmForm.composerId"
							name="composerId"
							item-value="id"
							:loading="loading"
							item-title="name"
							:rules="selectRules"
							:items="composers"
							:label="$t('forms.film.composer')"
							prepend-inner-icon="mdi-account" />
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<v-textarea
							:label="$t('forms.film.description')"
							name="description"
							density="compact"
							prepend-inner-icon="mdi-pencil"
							v-model="filmForm.description"
							variant="filled"
							auto-grow
							counter
							no-resize
							:rules="descriptionRules"
							/>
					</v-col>
				</v-row>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<SubmitBtn
				:loading="Boolean(loading)"
				@click="handleValidationAndSubmit" />
		</v-card-actions>
	</v-card>
</template>

<script lang="ts" setup>
	import SubmitBtn from "../Containment/Btns/SubmitBtn.vue";
	const { t } = useI18n();
	const formRef = ref<any>(null);
	const emit = defineEmits(["validate", "form:submit"]);

	defineProps<{
		filmForm: FilmForm;
		genres: Genre[];
		actors: Person[];
		producers: Person[];
		writers: Person[];
		composers: Person[];
		directors: Person[];
		loading?: boolean;
	}>();

	const isFormValid = ref(true);

	const currentYear = new Date().getFullYear();
	const startYear = 1900;
	const formFilled = ref(false);
	const releaseYearRules = [
		(v: number) => !!v || t("forms.rules.required"),
		(v: number) => typeof v === "number" || t("forms.rules.type_num"),
		(v: number) =>
			v >= startYear || t("forms.rules.min_year") + " " + startYear,
		(v: number) =>
			v <= currentYear || t("forms.rules.max_year") + " " + currentYear,
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
	const selectRules = [(v: string) => !!v || t("forms.rules.required")];
	const durationRules = [(v: string) => !!v || t("forms.rules.required")];
	const descriptionRules = [(v: string) => !!v || t("forms.rules.required")];
	const multipleSelectRules = [(v: string) => !!v || t("forms.rules.required")];
	const ageRules = [(v: number) => !!v || t("forms.rules.required")];
	const ageItems = [0, 3, 12, 16, 18];
	const validate = async () => {
		const { valid } = await formRef.value.validate();
		if (!valid) {
			isFormValid.value = false;
		} else {
			isFormValid.value = true;
		}
		emit("validate", valid);
};

	const handleValidationAndSubmit = async () => {
		await validate();
		if (isFormValid.value) {
			emit("form:submit");
		}
	}
</script>

<style lang="scss"></style>
