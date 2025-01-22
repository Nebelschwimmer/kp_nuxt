<template>
			<v-stepper v-model="step">
				<template #default="{ prev, next }">
					<v-stepper-header>
						<v-stepper-item
							value="1"
							:title="$t('stepper.general')"
							:complete="step === 1"
							:color="step === 1 ? 'success' : 'primary'">
						</v-stepper-item>
						<v-divider></v-divider>
						<v-stepper-item
							value="2"
							:title="$t('stepper.gallery')"
							:complete="step === 2"
							:color="step === 2 ? 'success' : 'primary'">
						</v-stepper-item>
						<v-divider></v-divider>
						<v-stepper-item
							value="3"
							:title="$t('stepper.avatar')"
							:complete="step === 3"
							:color="step === 3 ? 'success' : 'primary'">
						</v-stepper-item>
						<v-divider></v-divider>
						<v-stepper-item
							value="4"
							:title="$t('stepper.cover')">
						</v-stepper-item>
					</v-stepper-header>
					<v-stepper-window>
						<v-stepper-window-item value="1">
							<PersonForm
								:loading="loading"
								:person-form="personForm"
								:genders="genders"
								:specialties="specialties"
								@validate="isFormValid = $event"
								@form:submit="handleGeneralInfoSubmit" />
						</v-stepper-window-item>
						<v-stepper-window-item value="2">
							<GalleryUploader
								:upload-count="GALLERY_LIMIT"
								@files:upload="handlePhotoSubmit" />
						</v-stepper-window-item>
						<v-stepper-window-item value="3">
							<SingleImgSelector
								:gallery="personForm.photos"
								@img:select="handleAvatarSubmit" />
						</v-stepper-window-item>
						<v-stepper-window-item value="4">
							<SingleImgSelector
								:gallery="personForm.photos"
								@img:select="handleCoverSubmit" />
						</v-stepper-window-item>
					</v-stepper-window>
				</template>
			</v-stepper>
</template>

<script lang="ts" setup>
	import { usePersonStore } from "~/store/personStore";
	import PersonForm from "~/components/Forms/PersonForm.vue";
	import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
import SingleImgSelector from "~/components/Gallery/Partials/SingleImgSelector.vue";
	const { locale } = useI18n();
	const step = ref(0);
	const isFormValid = ref(false);
	const { loading, personForm, genders, specialties } =
		storeToRefs(usePersonStore());
	const nextStep = () => {
		step.value++;
	};
	const GALLERY_LIMIT = 8;
	const {
		fetchGenders,
		fetchSpecialties,
		addPerson,
		editPerson,
		uploadPhotos,
		clearPersonForm,
	} = usePersonStore();

	const handleGeneralInfoSubmit = async () => {
		if (await addPerson()) {
			nextStep();
		}
	};

	const handlePhotoSubmit = async (files: File[]) => {
		const id = personForm.value.id;
		if (id) {
			await uploadPhotos(files, id || 0);
			nextStep();
		}
	};
	const handleCoverSubmit = async (index: number) => {
		personForm.value.cover = personForm.value?.photos[index - 1] || "";
		await editPerson();
		navigateTo(`/persons/${personForm.value.id}`);
	};

	const handleAvatarSubmit = async (index: number) => {
		personForm.value.avatar = personForm.value?.photos[index - 1] || "";
		await editPerson();
		nextStep();
	};

	const fetchData = async () => {
		await Promise.allSettled([
			fetchGenders(locale.value),
			fetchSpecialties(locale.value),
		]);
	};

	onMounted(async () => {
		clearPersonForm();
		await fetchData();
	});

	definePageMeta({
		name: "newPerson",
		path: "/persons/new",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
