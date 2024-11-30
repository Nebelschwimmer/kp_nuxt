<template>
  <v-container class="w-33">
    <v-card :title="$t(computedTitle)" :prepend-icon="computedIcon">
      <template #append>
        <CloseBtn @close="onCloseModal" />
      </template>
      <v-card-item >
        <v-divider></v-divider>
        <v-card-text>
        <v-form validate-on="submit lazy" @submit.prevent="$emit('submit')">
          <FormInput
            v-model="filmForm.name"
            :rules="NameRules"
            :label="$t('forms.film.name')"
            inner-icon="mdi-movie-play"
          />
          <v-combobox
            v-model.number="filmForm.release_year"
            :rules="releaseYearRules"
            density="compact"
            variant="outlined"
            :label="$t('forms.film.release_year')"
            :items="yearsOfReleases"
          ></v-combobox>
          <FormSelect
            v-model="filmForm.genreId"
            :items="genres"
            :label="$t('forms.film.genre')"
            icon="mdi-filmstrip"
          ></FormSelect>
          <v-btn type="submit" color="primary" block>
            {{ $t("actions.submit") }}</v-btn
          >
        </v-form>
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const props = defineProps({
  filmForm: {
    type: Object,
    required: true,
  },
  genres: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(["close-modal", "submit"]);


const MAX_NAME_LENGHT = 50;
const MIN_NAME_LENGHT = 2;

const NameRules = [
  (v: string) => !!v || t("forms.rules.required"),
  (v: string) =>
    v.length <= MAX_NAME_LENGHT ||
    t("forms.rules.max_chars") + " " + MAX_NAME_LENGHT,
  (v: string) =>
    v.length >= MIN_NAME_LENGHT ||
    t("forms.rules.min_chars") + " " + MIN_NAME_LENGHT,
];

const currentYear = new Date().getFullYear();
const startYear = 1900;
const yearsOfReleases = Array.from(
  { length: currentYear - startYear + 1 },
  (_, index) => startYear + index
);
const releaseYearRules = [
  (v: number) => typeof v === "number" || t("forms.rules.type_num"),
  (v: number) => !!v || t("forms.rules.required"),
  (v: number) => v >= startYear || t("forms.rules.min_year", startYear),
  (v: number) => v <= currentYear || t("forms.rules.max_year", currentYear),
];
const onCloseModal = () => {
  emit("close-modal");
}


const computedIcon = computed(() => {
  if (props.filmForm.id) {
    return "mdi-edit";
  } else {
    return "mdi-plus";
  }
});

const computedTitle = computed(() => {
  if (props.filmForm.id) {
    return "forms.film.edit";
  } else {
    return "forms.film.add";
  }
});
</script>

<style></style>
