<template>
	<BasePage
    :loading="loading"
    :error="networkError"
    toolbar
    overlay
    :toolbar-options="toolbarOptions"
    @alert:close="networkError = null"
		>
		<template #content>
			<v-stepper
				v-model="step"
				class="border p-2 bg-transparent">
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
						:title="$t('forms.film.stepper.second')"
						value="2"
						:subtitle="$t('forms.film.stepper.optional')">
					</v-stepper-item>
					<v-divider></v-divider>
					<v-stepper-item
						:complete="step > 2"
						:color="step > 1 ? 'success' : 'primary'"
						:current="step === 2"
						:title="$t('forms.film.stepper.third')"
						value="3"
						:subtitle="$t('forms.film.stepper.optional')">
					</v-stepper-item>
				</v-stepper-header>
				<v-stepper-window>
					<v-stepper-window-item value="1">
						<FilmForm
							:disabled="step !== 0"
							:film-form="filmForm"
							:genres="genres"
							:actors="actors"
							:directors="directors"
							:producers="producers"
							:writers="writers"
							:loading="loading"
							:composers="composers"
							:network-error="Boolean(networkError)"
							@submit="handleGeneralInfoSubmit" />
					</v-stepper-window-item>
					<v-stepper-window-item value="2"
						><PosterUpload
							:disabled="step !== 1"
							:loading="loading"
							dislaySkipBtn
							@skip="nextStep"
							@submit="handlePosterUploadSubmit"
					/></v-stepper-window-item>
					<v-stepper-window-item value="3"
						><GalleryUpload @submit="handleGalleryUploadSubmit"
					/></v-stepper-window-item>
				</v-stepper-window>
			</v-stepper>
		</template>
	</BasePage>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	import FilmForm from "~/components/FilmStorageComponents/FilmForm.vue";
	import PosterUpload from "~/components/FilmStorageComponents/PosterUpload.vue";
	import GalleryUpload from "~/components/FilmStorageComponents/GalleryUpload.vue";
  import BasePage from "~/components/Layout/Page/BasePage.vue";
	const { genres, filmForm, film, actors, composers, producers, writers, directors, loading, networkError } =
		storeToRefs(useFilmStore());
	const {
		addFilm,
		fetchGenres,
		fetchActors,
		fetchDirectors,
		fetchProducers,
		fetchWriters,
		fetchComposers,
		uploadPreview,
		uploadGallery,
		clearFilmForm,
	} = useFilmStore();

	const step = ref(0);
	const dataLoading = ref(false);

	async function getData() {
		const { locale } = useI18n();
		dataLoading.value = true;
		await Promise.allSettled([
			fetchGenres(locale.value),
			fetchActors(),
			fetchDirectors(),
			fetchProducers(),
			fetchWriters(),
			fetchComposers(),
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

	const handleGalleryUploadSubmit = async (files: File[]) => {
		const id = film.value?.id || 0;
		if (await uploadGallery(files, id)) {
			nextStep();
		}
	};

	const nextStep = () => {
		step.value++;
	};

  const { t } = useI18n();

  const breadcrumbs = [
  {
    title: t("nav.home"),
    href: "/",
    icon: "mdi-home",
  },
  {
    title: t("nav.films"),
    href: "/films",
    icon: "mdi-filmstrip",
  },
  {
    title: t("pages.films.add"),
    href: "/films/add",
    icon: "mdi-filmstrip",
  },
  ] as Breadcrumb[];

  const toolbarOptions = reactive({
  displayBackBtn: true,
  prependIcon: "",
  color: "secondary",
  breadcrumbs: breadcrumbs,
});

	onMounted(async () => {
		clearFilmForm();
		await getData();
	})
</script>

<style></style>
