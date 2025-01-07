<template>
  <v-stepper v-model="step" class="border p-2 bg-transparent">
    <v-stepper-header>
      <v-stepper-item
        :complete="step > 0"
        :current="step === 0"
        :color="step > 0 ? 'success' : 'primary'"
        :title="$t('forms.person.stepper.first')"
        value="1"
      >
      </v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item
        :complete="step > 1"
        :current="step === 1"
        :color="step > 1 ? 'success' : 'primary'"
        :title="$t('forms.person.stepper.second')"
        value="2"
        :subtitle="$t('forms.person.stepper.optional')"
      >
      </v-stepper-item>
    </v-stepper-header>
    <v-stepper-window>
      <v-stepper-window-item value="1">
        <PersonForm
          :person-form="personForm"
          :genders="genders"
          :specialties="specialties"
          :loading="loading"
          @submit="handleGeneralInfoSubmit"
        />
      </v-stepper-window-item>
      <v-stepper-window-item value="2"
        ><PhotoUpload
          :disabled="step !== 1"
          @skip="navigateTo('/persons')"
          @submit="handlePhotoUploadSubmit"
      /></v-stepper-window-item>
    </v-stepper-window>
  </v-stepper>
</template>

<script lang="ts" setup>
import PersonForm from "~/components/PersonStorageComponents/PersonForm.vue";
import PhotoUpload from "~/components/PersonStorageComponents/PhotoUpload.vue";
import { usePersonStore } from "~/store/personStore";
const {  personForm, genders, specialties, loading, person } =
  storeToRefs(usePersonStore());
const { fetchGenders, fetchSpecialties, addPerson, uploadPhoto } =
  usePersonStore();
const step = ref(0);

const nextStep = () => {
  step.value++;
};

const handleGeneralInfoSubmit = async () => {
  if (await addPerson()) {
    nextStep();
  }
};

const handlePhotoUploadSubmit = async (file: File) => {
  const id = person.value?.id || 0;
  if (await uploadPhoto(file, id)) {
    navigateTo("/persons");
  }
};

const getData = async () => {
  const { locale } = useI18n();
  await Promise.allSettled([
    fetchGenders(locale.value),
    fetchSpecialties(locale.value),
  ]);
};

(async function () {
  await getData();
})();

const { t } = useI18n();

const breadcrumbs = [
  {
    title: t("nav.home"),
    to: "/",
    icon: "mdi-home",
  },
  {
    title: t("nav.persons"),
    href: "/persons",
    icon: "mdi-account-group",
  },
  {
    title: t("forms.person.add"),
    href: "/persons/add",
    icon: "mdi-account-group",
  },
] as Breadcrumb[];

const toolbarOptions = reactive({
  displayBackBtn: true,
  breadcrumbs: breadcrumbs,
});
</script>

<style></style>
