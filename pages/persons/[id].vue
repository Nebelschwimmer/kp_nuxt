<template>
	<div>
		<DetailCard
			v-if="!loading"
			:title="person?.firstname + ' ' + person?.lastname"
			:cover="person?.cover || ''"
			:subtitle="person?.specialtyNames.join(', ')"
			:loading="loading">
			<template #avatar>
				<v-avatar size="260" border>
					<v-img :src="person?.avatar || ''" cover>
						<template #placeholder>
							<v-sheet height="100%">
								<div class="d-flex flex-column align-center justify-center fill-height">
								<span class="text-h5 text-lg-h3 font-weight-bold">	{{ personInitials }}</span>
								</div>
							</v-sheet>
						</template>
					</v-img>
				</v-avatar>
			</template>
			<template #text>
				<v-container>
					<v-row>
						<v-col
							cols="12"
							lg="3"
							md="6">
							<ListCard
								:loading="loading"
								:header-title="computedPersonDetails.subheader"
								header-icon="mdi-account"
								editable
								:edit-mode="generalInfoEdit"
								@click:edit="generalInfoEdit = !generalInfoEdit">
								<template #content>
									<v-card-text>
										<v-list-item
											v-for="(detail, index) in computedPersonDetails.list"
											:key="index"
											:subtitle="detail.name"
											:title="detail.value"
											:value="index"
											:prepend-icon="detail.icon">
										</v-list-item>
									</v-card-text>
								</template>
							</ListCard>
						</v-col>
						<v-col
							cols="12"
							lg="9"
							md="12">
							<ListCard
								:loading="loading"
								:header-title="$t('pages.persons.photos')"
								header-icon="mdi-image"
								editable
								:edit-mode="photoEditMode"
								@click:edit="photoEditMode = !photoEditMode">
								<template #content>
									<GalleryViewer
										:slider-arr="sliderGalleryArr || []"
										:gallery="person?.photos || []"
										:entity-name="personFullName"
										:loading="loading" 
										@editor:open="photoEditMode = true"
										/>
								</template>
							</ListCard>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<ListCard
								:header-title="$t('pages.persons.filmography')"
								:header-icon="'mdi-film'"
								:loading="loading"
								:editable="false">
								>
								<template #content>
									<v-container>
										<v-row>
											<v-col>
												<v-card
													v-if="person?.actedInFilms.length"
													:title="$t('pages.persons.featuredInFilms')"
													prepend-icon="mdi-format-list-bulleted"
													variant="elevated">
													<v-divider></v-divider>
													<v-table>
														<thead>
															<tr>
																<th style="width: 20%">
																	{{ $t("pages.films.release_year") }}
																</th>
																<th>
																	{{ $t("pages.films.name") }}
																</th>
																<th>
																	{{ $t("pages.persons.role") }}
																</th>
															</tr>
														</thead>
														<tbody>
															<tr v-for="film in person?.actedInFilms">
																<td>{{
																	film.releaseYear || $t("general.no_data")
																}}</td>
																<td>
																	<nuxt-link
																		:to="`/films/${film.id}`"
																		class="text-accent">
																		{{ film.name }}</nuxt-link
																	>
																</td>
																<td>{{
																	film.roleNames
																		? film.roleNames.join(", ")
																		: $t("general.no_data")
																}}</td>
															</tr>
														</tbody>
													</v-table>
												</v-card>
												<v-empty-state
													v-else
													:title="$t('empty_states.filmography')"
													icon="mdi-note-off"
													:action-text="$t('empty_states.actions.to_films')"
													@click:action="navigateTo('/films')">
												</v-empty-state>
											</v-col>
										</v-row>
									</v-container>
								</template>
							</ListCard>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<ListCard
								:loading="loading"
								:header-title="$t('pages.persons.bio')"
								header-icon="mdi-text"
								editable
								:edit-mode="bioEditMode"
								@click:edit="bioEditMode = !bioEditMode">
								<template #content>
									<IndentedEditableText
										:edit-mode="bioEditMode"
										:messages="$t('pages.persons.edit_bio')"
										:text="person?.bio || ''"
										@sumbit:edit="submitBioEdit" />
								</template>
							</ListCard>
						</v-col>
					</v-row>
				</v-container>
			</template>
		</DetailCard>
		<v-skeleton-loader
			v-else
			type="card, image"
			height="80vh"></v-skeleton-loader>
		<BaseDialog
			v-model:opened="generalInfoEdit"
			:max-width="1000"
			:title="$t('actions.edit_person') + ' ' + personFullName"
			:loading="loading"
			@close="generalInfoEdit = false">
			<template #text>
				<PersonForm
					:loading="loading"
					:person-form="personForm"
					:genders="genders"
					:specialties="specialties"
					@validate="isFormValid = $event"
					@form:submit="submitGeneralInfoEdit" />
			</template>
		</BaseDialog>
		<v-snackbar
			v-model="showSnackbar"
			color="success"
			prepend-icon="mdi-check"
			:timeout="4000">
			{{ $t("toast.messages.success.edit") }}
		</v-snackbar>
		<BaseDialog
			v-model:opened="photoEditMode"
			:loading="loading"
			:title="computedGalleryEditTitle"
			:max-width="1200"
			@close="photoEditMode = false">
			<template #text>
				<PersonGalleryEdit
					v-model:selected="selectedImagesIndices"
					:person="person"
					:slider-arr="sliderGalleryArr || []"
					:upload-count="uploadCount"
					:edit-mode="photoEditMode"
					:upload-disabled="uploadCount === GALLERY_SIZE"
					:remove-disabled="!person?.photos.length"
					@avatar:change="handleChangeAvatar"
					@update:selected="selectedImagesIndices = $event"
					@delete:selected="showConfirmDialog = true"
					@cover:change="handleCoverChange"
					@upload="handlePhotosUpload" />
			</template>
		</BaseDialog>
		<ConfirmDialog
			v-model="showConfirmDialog"
			type="error"
			:text="$t('forms.film.gallery_item_delete_confirm')"
			:loading="loading"
			@confirm="handlePhotosDelete"></ConfirmDialog>
	</div>
</template>

<script lang="ts" setup>
	import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
	import ListCard from "~/components/Containment/Cards/ListCard.vue";
	import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
	import { usePersonStore } from "~/store/personStore";
	import { storeToRefs } from "pinia";
	import BaseImg from "~/components/Containment/Img/BaseImg.vue";
	import PersonForm from "~/components/Forms/PersonForm.vue";
	import IndentedEditableText from "~/components/Misc/IndentedEditableText.vue";
	import GalleryViewer from "~/components/Gallery/GalleryViewer.vue";
	import PersonGalleryEdit from "~/components/Gallery/PersonGalleryEdit.vue";
	import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
	const isFormValid = ref(false);
	const showSnackbar = ref(false);
	const selectedImagesIndices = ref<number[]>([]);
	const showConfirmDialog = ref(false);
	const photoEditMode = ref(false);
	const { person, genders, specialties, personForm, loading } =
		storeToRefs(usePersonStore());
	const {
		fetchPersonById,
		editPerson,
		fetchGenders,
		fetchPersonForm,
		fetchSpecialties,
		uploadPhotos,
		GALLERY_SIZE,
	} = usePersonStore();
	const { locale, t } = useI18n();
	const generalInfoEdit = ref(false);
	const bioEditMode = ref(false);

	const personFullName = computed(() => {
		return `${person.value?.firstname} ${person.value?.lastname}`;
	});
	const computedGalleryEditTitle = computed(() => {
		return t("pages.films.edit_gallery") + " " + personFullName.value;
	});
	const computedPersonDetails = computed(() => {
		return {
			subheader: t("pages.general_info"),
			list: [
				{
					name: t("forms.person.firstname"),
					value: person.value?.firstname,
					icon: "mdi-account-circle",
				},
				{
					name: t("forms.person.lastname"),
					value: person.value?.lastname,
					icon: "mdi-account-circle",
				},
				{
					name: t("forms.person.specialties"),
					value: person.value?.specialtyNames.join(", ") || "",
					icon: "mdi-calendar",
				},
				{
					name: t("forms.person.gender"),
					value: person.value?.gender || "",
					icon: "mdi-gender-male-female",
				},
				{
					name: t("forms.person.birthday"),
					value: person.value?.birthday + ` (${person.value?.age})` || "",
					icon: "mdi-calendar",
				},
			],
		};
	}) as ComputedRef<DetailList>;

const personInitials = computed(() => {
	return person.value ? person.value?.firstname[0].toUpperCase() + person.value?.lastname[0].toUpperCase() : "";
});
	const sliderGalleryArr = computed(() => {
		const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i);

		return initialArr.map((item) => {
			return (person.value && person?.value.photos[item]) || "";
		});
	}) as ComputedRef<string[]>;

	const uploadCount = computed(() => {
		return sliderGalleryArr.value.filter((item: string) => item === "").length;
	});

	const submitGeneralInfoEdit = async () => {
		await editPerson();
		await fetchData();
		generalInfoEdit.value = false;
		showSnackbar.value = true;
	};

	const submitBioEdit = async (text: string) => {
		personForm.value.bio = text;
		await editPerson();
		await fetchData();
		bioEditMode.value = false;
		showSnackbar.value = true;
	};

	const handleChangeAvatar = async (index: number) => {
		personForm.value.avatar = person.value?.photos[index - 1] || "";
		await editPerson();
		photoEditMode.value = false;
		await fetchData();
		showSnackbar.value = true;
	};

	const handlePhotosUpload = async (files: File[]) => {
		const personId = Number(useRoute().params.id);
		console.log(personId);
		await uploadPhotos(files, personId);
		photoEditMode.value = false;
		await fetchData();
		showSnackbar.value = true;
	};

	const handleCoverChange = async (index: number) => {
		personForm.value.cover = person.value?.photos[index - 1] || "";
		await editPerson();
		photoEditMode.value = false;
		await fetchData();
		showSnackbar.value = true;
	};

	const handlePhotosDelete = async () => {};

	const fetchData = async () => {
		const personId = Number(useRoute().params.id);

		await Promise.allSettled([
			fetchPersonForm(personId),
			fetchPersonById(personId, locale.value),
			fetchGenders(locale.value),
			fetchSpecialties(locale.value),
		]);
	};

	onMounted(async () => {
		fetchData();
	});

	definePageMeta({
		name: "personDetails",
		path: "/persons/:id",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
