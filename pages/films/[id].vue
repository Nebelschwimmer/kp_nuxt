<template>
	<div>
		<DetailCard
			:title="film?.name + ' (' + film?.releaseYear + ')' || ''"
			:loading="loading"
			:cover="film?.cover || ''">
			<template #text>
				<v-row>
					<v-col
						cols="12"
						lg="4"
						md="4"
						sm="12">
						<ListCard
							:edit-mode="generalInfoEdit"
							:header-title="$t('pages.films.details')"
							editable
							:loading="loading"
							header-icon="mdi-information"
							:skeleton-height="800"
							@click:edit="generalInfoEdit = !generalInfoEdit">
							>
							<template #content>
								<v-card :subtitle="computedFilmDetails.subheader">
									<v-list-item
										v-for="(detail, index) in computedFilmDetails.list"
										:key="index"
										:subtitle="$t(detail.name)"
										:prepend-icon="detail.icon"
										:to="detail.to">
										<v-list-item-title :class="{ 'text-primary': detail.to }">
											{{ detail.value || $t("general.no_data") }}
										</v-list-item-title>
									</v-list-item>
								</v-card>

								<v-card :subtitle="filmActors.subheader">
									<v-list-item
										v-for="(detail, index) in filmActors.list"
										:key="index"
										:title="detail.name"
										:value="index"
										:to="detail.to"
										base-color="primary">
										<template #prepend>
											<v-avatar>
												<v-img
													v-if="detail.avatar"
													:src="detail.avatar">
												</v-img>
												<v-icon
													v-else
													icon="mdi-account"></v-icon>
											</v-avatar>
										</template>
									</v-list-item>
								</v-card>

								<v-card :subtitle="computedTeamDetails.subheader">
									<v-list-item
										v-for="(detail, index) in computedTeamDetails.list"
										:key="index"
										rounded="lg"
										:subtitle="$t(detail.name)"
										:title="detail.value"
										:value="index"
										:prepend-icon="detail.icon"
										:to="detail.to"
										base-color="primary">
									</v-list-item>
								</v-card>
							</template>
						</ListCard>
					</v-col>

					<v-col
						cols="12"
						lg="8"
						md="8"
						sm="12">
						<v-row>
							<v-col>
								<ListCard
									:header-title="$t('pages.films.gallery')"
									header-icon="mdi-view-gallery"
									editable
									:loading="loading"
									:edit-mode="editGalleryMode"
									@click:edit="editGalleryMode = !editGalleryMode">
									>
									<template #content>
										<GalleryViewer
											:slider-arr="sliderGalleryArr || []"
											:gallery="film?.gallery || []"
											:entity-name="film?.name || ''"
											:loading="loading"
											@editor:open="editGalleryMode = true" />
									</template>
								</ListCard>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<ListCard
									:header-title="$t('pages.films.rating')"
									header-icon="mdi-star"
									:editable="false"
									:loading="loading">
									>
									<template #content>
										<div
											class="d-flex flex-column justify-center align-center ga-1">
											<ClientOnly fallback-tag="Loading..">
												<v-rating
													v-if="!isAssessing"
													:model-value="film?.rating || 0"
													readonly>
												</v-rating>
											</ClientOnly>
											<v-label>{{
												film?.assessments?.length +
													" " +
													$t("pages.films.assessments") ||
												$t("pages.films.no_assessments")
											}}</v-label>
											<v-btn
												color="primary"
												:disabled="!currentUser"
												@click="enableAssessing"
												>{{ $t("pages.films.assess") }}</v-btn
											>
											<v-rating
												v-if="isAssessing"
												v-model="rating">
											</v-rating>
											<v-btn
												color="primary"
												:disabled="!currentUser"
												@click="assessFilm"
												>{{ $t("pages.films.assess") }}</v-btn
											>
										</div>
									</template>
								</ListCard>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<ListCard
									:header-title="$t('pages.films.description')"
									editable
									:edit-mode="editDescriptionMode"
									header-icon="mdi-text"
									:loading="loading"
									@click:edit="editDescriptionMode = !editDescriptionMode">
									>
									<template #content>
										<IndentedEditableText
											:edit-mode="editDescriptionMode"
											:messages="$t('pages.films.edit_description')"
											:text="film?.description || ''"
											@sumbit:edit="submitDescriptionEdit" />
									</template>
								</ListCard>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</template>
			<template #toolbar-append>
				<v-badge
					:content="film?.rating"
					class="mr-2"
					color="accent">
					<v-icon
						color="yellow-darken-2"
						size="x-large">
						mdi-star</v-icon
					>
				</v-badge>
			</template>
		</DetailCard>
		<ConfirmDialog
			v-model="showConfirmDialog"
			type="error"
			:text="$t('forms.film.gallery_item_delete_confirm')"
			:loading="loading"
			@confirm="handleGalleryItemsDelete"></ConfirmDialog>
		<BaseDialog
			v-model:opened="generalInfoEdit"
			:max-width="1000"
			:title="$t('pages.films.edit') + ' ' + film?.name"
			:loading="loading"
			@close="generalInfoEdit = false">
			<template #text>
				<FilmForm
					:film-form="filmForm"
					:genres="genres"
					:actors="actors"
					:directors="directors"
					:producers="producers"
					:writers="writers"
					:composers="composers"
					:is-valid="isFormValid"
					@validate="isFormValid = $event"
					@form:submit="sumbitEdit" />
			</template>
		</BaseDialog>
		<BaseDialog
			v-model:opened="editGalleryMode"
			:loading="loading"
			:title="computedGalleryEditTitle"
			:max-width="1200"
			@close="editGalleryMode = false">
			<template #text>
				<FilmGalleryEdit
					v-model:selected="selectedImagesIndices"
					:film="film"
					:slider-arr="sliderGalleryArr || []"
					:upload-count="uploadCount"
					:edit-mode="editGalleryMode"
					:upload-disabled="uploadCount === GALLERY_SIZE"
					:remove-disabled="!film?.gallery.length"
					@cover:change="handleChangeCover"
					@update:selected="selectedImagesIndices = $event"
					@delete:selected="showConfirmDialog = true"
					@upload="handleGalleryUpload" />
			</template>
		</BaseDialog>
		<SuccessSnackbar
			v-model:show="showSnackbar"
			@close="showSnackbar = false" />
	</div>
</template>

<script lang="ts" setup>
	import { useFilmStore } from "~/store/filmStore";
	import { storeToRefs } from "pinia";
	import { useUserStore } from "~/store/userStore";
	import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
	import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
	import FilmGalleryEdit from "~/components/Gallery/FilmGalleryEdit.vue";
	import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
	import ListCard from "~/components/Containment/Cards/ListCard.vue";
	import FilmForm from "~/components/Forms/FilmForm.vue";
	import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
	import GalleryViewer from "~/components/Gallery/GalleryViewer.vue";
	import SuccessSnackbar from "~/components/Misc/SuccessSnackbar.vue";
	import { useIsFormDirty } from "vee-validate";
	const TIMEOUT = 5000;
	const editDescriptionMode = ref(false);
	const selectedImagesIndices = ref<number[]>([]);
	const showConfirmDialog = ref(false);
	const editGalleryMode = ref(false);
	const showSnackbar = ref(false);
	const generalInfoEdit = ref(false);
	const isFormValid = ref(true);
	const isAssessing = ref(false);
	const rating = ref(0);
	const comment = ref("");
	const { currentUser } = storeToRefs(useUserStore());
	const {
		film,
		genres,
		filmForm,
		actors,
		composers,
		producers,
		writers,
		directors,
		loading,
	} = storeToRefs(useFilmStore());
	const {
		editFilm,
		fetchFilmForm,
		fetchFilmById,
		fetchGenres,
		fetchActors,
		fetchDirectors,
		fetchProducers,
		fetchWriters,
		fetchComposers,
		uploadGallery,
		clearFilmForm,
		deleteGalleryItems,
		assessFilmById,
		GALLERY_SIZE,
	} = useFilmStore();
	const { locale, t } = useI18n();

	const imagesToDelete = computed(() => {
		return film.value?.gallery
			.filter((_, index: number) => selectedImagesIndices.value.includes(index))
			.map((imageName: string) => {
				let fileName = imageName ? imageName.split("/").at(-1) : "";

				return fileName ? fileName.split(".")[0] : "";
			});
	}) as ComputedRef<string[]>;

	const filmActors = computed(() => {
		let actorObj = <CardDetails>{};
		let actorsArr = <CardDetails[]>[];

		if (film.value?.actorNames && film.value?.actorNames.length) {
			film.value?.actorNames.forEach((name: string) => {
				const actorAvatar =
					film.value?.actorPhotos[
						film.value?.actorNames.indexOf(name as never)
					];
				const actorId =
					film.value?.actorIds[film.value?.actorNames.indexOf(name as never)];

				actorObj = {
					name: name,
					value: "",
					to: "/persons/" + actorId,
					icon: "mdi-account",
					avatar: actorAvatar || "",
				};
				actorsArr.push(actorObj);
			});
		}
		return {
			subheader: t("pages.films.starring"),
			list: actorsArr,
		};
	}) as ComputedRef<DetailList>;

	const computedFilmDetails = computed(() => {
		return {
			subheader: t("pages.general_info"),
			list: [
				{
					name: "forms.film.name",
					value: film.value?.name || "",
					icon: "mdi-movie",
				},
				{
					name: "forms.film.slogan",
					value: film.value?.slogan || "",
					icon: "mdi-format-quote-close",
				},
				{
					name: "forms.film.release_year",
					value: film.value?.releaseYear || "",
					icon: "mdi-calendar",
				},
				{
					name: "forms.film.duration",
					value: film.value?.duration || "",
					icon: "mdi-timer",
				},
				{
					name: "forms.film.genres",
					value: film.value?.genreNames
						? film.value?.genreNames.join(", ")
						: "",
					icon: "mdi-filmstrip",
				},
				{
					name: "forms.film.age",
					value: film.value?.age + "+" || "",
					icon: "mdi-account-supervisor",
				},
			],
		};
	}) as ComputedRef<DetailList>;

	const computedTeamDetails = computed(() => {
		return {
			subheader: t("pages.films.team"),
			list: [
				{
					name: "forms.film.director",
					value: film.value?.directorName || "",
					to: film.value?.directorId
						? `/persons/${film.value?.directorId}`
						: "",
					icon: "mdi-account-tie",
					avatar: film.value?.directorPhoto || "",
				},
				{
					name: "forms.film.producer",
					value: film.value?.producerName || "",
					to: film.value?.producerId
						? `/persons/${film.value?.producerId}`
						: "",
					icon: "mdi-account-tie",
					avatar: film.value?.producerPhoto || "",
				},
				{
					name: "forms.film.writer",
					value: film.value?.writerName || "",
					to: film.value?.writerId ? `/persons/${film.value?.writerId}` : "",
					icon: "mdi-account-tie",
					avatar: film.value?.writerPhoto || "",
				},
				{
					name: "forms.film.composer",
					value: film.value?.composerName || "",
					to: film.value?.composerId
						? `/persons/${film.value?.composerId}`
						: "",
					icon: "mdi-account-tie",
					avatar: film.value?.composerPhoto || "",
				},
			],
		};
	}) as ComputedRef<DetailList>;
	const computedGalleryEditTitle = computed(() => {
		return t("pages.films.edit_gallery");
	});
	const fetchData = async () => {
		const filmId = Number(useRoute().params.id);
		await Promise.allSettled([
			fetchGenres(locale.value),
			fetchActors(),
			fetchDirectors(),
			fetchProducers(),
			fetchWriters(),
			fetchComposers(),
			fetchFilmById(filmId, locale.value),
			fetchFilmForm(filmId, locale.value),
		]);
	};

	const sliderGalleryArr = computed(() => {
		const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i);

		return initialArr.map((item) => {
			return (film.value && film?.value.gallery[item]) || "";
		});
	}) as ComputedRef<string[]>;

	const uploadCount = computed(() => {
		return sliderGalleryArr.value.filter((item: string) => item === "").length;
	});

	const sumbitEdit = async () => {
		await editFilm();
		await fetchData();
		await nextTick(() => {
			showSnackbar.value = true;
			editDescriptionMode.value = !editDescriptionMode.value;
			generalInfoEdit.value = false;
		});
	};

	const handleGalleryItemsDelete = async () => {
		console.log(imagesToDelete.value);
		await deleteGalleryItems(imagesToDelete.value);
		await fetchData();
		await nextTick(() => {
			showSnackbar.value = true;
			showConfirmDialog.value = false;
			editGalleryMode.value = false;
		});
	};

	const handleGalleryUpload = async (files: File[]) => {
		const id = Number(useRoute().params.id);
		await uploadGallery(files, id);
		editGalleryMode.value = false;
		await fetchData();
		await nextTick(() => {
			showSnackbar.value = true;
		});
	};

	const handleChangeCover = async (index: number) => {
		filmForm.value.cover = film.value?.gallery[index - 1] || "";
		await editFilm();
		editGalleryMode.value = false;
		await fetchData();
		await nextTick(() => {
			showSnackbar.value = true;
		});
	};

	const submitDescriptionEdit = async (text: string) => {
		filmForm.value.description = text;
		await editFilm();
		await fetchData();
		editDescriptionMode.value = false;
	};

	const enableAssessing = () => {
		isAssessing.value = true;
	};

	const assessFilm = async () => {
		const id = Number(useRoute().params.id);
		const userId = currentUser.value?.id || 0;
		const locale = useI18n().locale.value;
		await assessFilmById(id, userId, rating.value, comment.value, locale);
		await fetchData();
		isAssessing.value = false;
		showSnackbar.value = true;
	};

	watch(
		locale,
		async (newVal) => {
			const filmId = Number(useRoute().params.id);
			await fetchFilmById(filmId, newVal);
		},
		{ immediate: true }
	);

	setTimeout(() => {
		if (showSnackbar.value) {
			showSnackbar.value = false;
		}
	}, TIMEOUT);

	onMounted(async () => {
		clearFilmForm();
		await fetchData();
	});

	definePageMeta({
		name: "filmDetails",
		path: "/films/:id",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
