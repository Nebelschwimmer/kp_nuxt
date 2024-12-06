<template>
	<v-container>
		<v-row>
			<v-col>
				<PageToolBar
					display-back-btn
					title="forms.film.add" />
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-stepper
					v-model="step"
					class="bg-surface w-75 mx-auto">
					<v-stepper-header>
						<v-stepper-item
							:complete="step > 0"
							:current="step === 0"
							:color="step > 0 ? 'success' : 'primary'"
							:title="$t('forms.film.stepper.first')"
							value="1">
						</v-stepper-item>
						<v-divider></v-divider>
						<v-stepper-item
							:complete="step > 1"
							:current="step === 1"
							:color="step > 1 ? 'success' : 'primary'"
							:title="$t('forms.film.stepper.fourth')"
							value="2"
							:subtitle="$t('forms.film.stepper.optional')">
						</v-stepper-item>
						<v-divider></v-divider>
						<v-stepper-item
							:complete="step > 2"
							:color="step > 1 ? 'success' : 'primary'"
							:current="step === 2"
							:title="$t('forms.film.stepper.fifth')"
							value="3"
							:subtitle="$t('forms.film.stepper.optional')">
						</v-stepper-item>
					</v-stepper-header>
					<v-stepper-window>
						<PageLoader v-if="dataLoading" class="w-full" />
						<v-stepper-window-item value="1">
							<FilmForm
								:disabled="step !== 0"
								:film-form="filmForm"
								:genres="genres"
								:actors="actors"
								:directors="directors"
								:loading="loading"
								:network-error="Boolean(networkError)"
								@submit="handleGeneralInfoSubmit" />
						</v-stepper-window-item>
						<v-stepper-window-item value="2"
							><PosterUpload
								:disabled="step !== 1"
								@skip="nextStep"
								@submit="handlePosterUploadSubmit"
						/></v-stepper-window-item>
						<v-stepper-window-item value="3"
							><GalleryUpload
						/></v-stepper-window-item>
					</v-stepper-window>
				</v-stepper>
			</v-col>
		</v-row>
		<PageAlert
			:show="Boolean(networkError)"
			type="error"
			:text="networkError?.message ?? 'error'"
			:title="$t('pages.network_error')"
			@close="networkError = null" />
	</v-container>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	import FilmForm from "~/components/AddFilmStepperContent/FilmForm.vue";
	import PosterUpload from "~/components/AddFilmStepperContent/PosterUpload.vue";
	import GalleryUpload from "~/components/AddFilmStepperContent/GalleryUpload.vue";
	import PageLoader from "~/components/Loaders/PageLoader.vue";
	const { genres, filmForm, film, actors, directors, loading, networkError } =
		storeToRefs(useFilmStore());
	const { fetchGenres, fetchActors, fetchDirectors, addFilm, uploadPreview } =
		useFilmStore();
	const step = ref(0);
	const dataLoading = ref(false);

	async function getData() {
		const { locale } = useI18n();
		dataLoading.value = true;
		await Promise.allSettled([
			fetchGenres(locale.value),
			fetchActors(),
			fetchDirectors(),
		]);
		dataLoading.value = false;
	}

	const handleGeneralInfoSubmit = async () => {
		if (await addFilm()) {
			nextStep();
		}
	};

	const handlePosterUploadSubmit = async (file: File) => {
		const id = film.value?.id || 0;
		if (await uploadPreview(file, id)) {
			nextStep();
		}
	};

	const nextStep = () => {
		step.value++;
	};

	(async function () {
		await getData();
	})();
</script>

<style></style>
