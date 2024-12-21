<template>
	<AddBasePage
		:toolbar-title="$t('forms.person.add')"
		:network-error="networkError ?? null"
		@alert:close="networkError = null"
		>
		<template #stepper>
			<v-stepper
				v-model="step"
				class="border p-2 bg-transparent">
				<v-stepper-header>
					<v-stepper-item
						:complete="step > 0"
						:current="step === 0"
						:color="step > 0 ? 'success' : 'primary'"
						:title="$t('forms.person.stepper.first')"
						value="1">
					</v-stepper-item>
					<v-divider></v-divider>
					<v-stepper-item
						:complete="step > 1"
						:current="step === 1"
						:color="step > 1 ? 'success' : 'primary'"
						:title="$t('forms.person.stepper.second')"
						value="2"
						:subtitle="$t('forms.person.stepper.optional')">
					</v-stepper-item>
				</v-stepper-header>
				<v-stepper-window>
					<v-stepper-window-item value="1">
						<PersonForm
							:person-form="personForm"
							:genders="genders"
							:specialties="specialties"
							:loading="loading"
							@submit="handleGeneralInfoSubmit" />
					</v-stepper-window-item>
					<v-stepper-window-item value="2"
						><PhotoUpload :disabled="step !== 1"
					/></v-stepper-window-item>
				</v-stepper-window>
			</v-stepper>
		</template>
	</AddBasePage>
</template>

<script lang="ts" setup>
	import PersonForm from "~/components/AddPersonStepperContent/PersonForm.vue";
	import PhotoUpload from "~/components/AddPersonStepperContent/PhotoUpload.vue";
	import AddBasePage from "~/components/Layout/Page/AddPageBase.vue";
	import { usePersonStore } from "~/store/personStore";
	const { networkError, personForm, genders, specialties, loading } =
		storeToRefs(usePersonStore());
	const { fetchGenders, fetchSpecialties, addPerson } = usePersonStore();

	const nextStep = () => {
		step.value++;
	};

	const handleGeneralInfoSubmit = async () => {
		if (await addPerson()) {
			nextStep();
		}
	};

	const getData = async () => {
		const { locale } = useI18n();
		await Promise.allSettled([fetchGenders(locale.value), fetchSpecialties(locale.value)]);
	};
	const step = ref(0);

	(async function () {
		await getData();
	})();
</script>

<style></style>
