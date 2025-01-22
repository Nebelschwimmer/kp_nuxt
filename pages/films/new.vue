<template>
	<PageCard>
		<v-stepper
			v-model="step"
			v-if="
				actors.length &&
				directors.length &&
				producers.length &&
				writers.length &&
				composers.length
			">
			<template #default="{ prev, next }">
				<v-stepper-header>
					<v-stepper-item
						value="1"
						:title="$t('forms.film.stepper.first')"
						:complete="step > 1"
						:color="step > 1 ? 'success' : 'primary'">
					</v-stepper-item>
					<v-divider></v-divider>
					<v-divider></v-divider>
					<v-stepper-item
						value="2"
						:title="$t('forms.film.stepper.third')">
					</v-stepper-item>
				</v-stepper-header>
				<v-stepper-window>
					<v-stepper-window-item value="1">
						<FilmForm
							:film-form="filmForm"
							:genres="genres"
							:actors="actors"
							:directors="directors"
							:producers="producers"
							:writers="writers"
							:loading="loading"
							:composers="composers"
							@validate="isFormValid = $event"
							@form:submit="handleGeneralInfoSubmit" />
					</v-stepper-window-item>
					<v-stepper-window-item value="2">
						<GalleryUploader
							:upload-count="GALLERY_LIMIT"
							@files:upload="handleGallerySubmit" />
					</v-stepper-window-item>
				</v-stepper-window>
			</template>
		</v-stepper>
		<v-empty-state
			v-else
			:title="$t('empty_states.persons')"
			:text="$t('empty_states.no_persons_found')"
			class="mt-10"
			image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
			:action-text="$t('empty_states.actions.add')"
			@click:action="navigateTo('/persons/new')">
		</v-empty-state>
	</PageCard>
</template>

<script lang="ts" setup>
	import FilmForm from "~/components/Forms/FilmForm.vue";
import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
	import PageCard from "~/components/Containment/Cards/PageCard.vue";
	import { useFilmStore } from "~/store/filmStore";
	const step = ref(0);
	const GALLERY_LIMIT = 8;
	const isFormValid = ref(false);
	const { locale } = useI18n();
	const {
		genres,
		filmForm,
		loading,
		actors,
		composers,
		producers,
		writers,
		directors,
	} = storeToRefs(useFilmStore());
	const {
		addFilm,
		fetchGenres,
		fetchActors,
		fetchDirectors,
		fetchProducers,
		fetchWriters,
		fetchComposers,
		uploadGallery,
		clearFilmForm,
	} = useFilmStore();

	const fetchData = async () => {
		await Promise.allSettled([
			fetchGenres(locale.value),
			fetchActors(),
			fetchDirectors(),
			fetchProducers(),
			fetchWriters(),
			fetchComposers(),
		]);
	};

	const nextStep = () => {
		step.value++;
	};

	const handleGeneralInfoSubmit = async (event: any) => {
		await addFilm();
		nextStep();
	};

	const handleGallerySubmit = async (files: File[]) => {
		const id = filmForm.value.id;
		await uploadGallery(files, id || 0);
		navigateTo(`/films/${id}`);
	};

	onMounted(async () => {
		await fetchData();
		clearFilmForm();
	});

	definePageMeta({
		name: "newFilm",
		path: "/films/new",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
