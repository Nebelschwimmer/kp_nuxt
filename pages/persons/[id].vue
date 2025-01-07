<template>
  <DetailCard
    :title="person?.firstname + ' ' + person?.lastname || ''"
    :no-img-label="$t('pages.persons.no_photo') || ''"
    :details="computedPersonDetails"
    :bg-img="person?.photo || ''"
    :edit-link="`/persons/${person?.id}/edit`"
    :avatar="person?.photo || ''"
    :gallery-content="[]"
  >
  </DetailCard>
</template>

<script lang="ts" setup>
import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
import { usePersonStore } from "~/store/personStore";
import { storeToRefs } from "pinia";
const { person } = storeToRefs(usePersonStore());
const { fetchPersonById } = usePersonStore();
const { locale, t } = useI18n();



const computedPersonDetails = computed(() => {
  return [
    {
      name: "forms.person.firstname",
      value: person.value?.firstname || "",
      type: "info",
      icon: "mdi-account",
    },
    {
      name: "forms.person.lastname",
      value: person.value?.lastname || "",
      type: "info",
      icon: "mdi-account",
    },
    {
      name: "pages.persons.specialties",
      value: person.value?.specialtyNames.join(", ") || "",
      type: "info",
      icon: "mdi-account",
    },
  ];
});


onMounted(async () => {
  const personId = Number(useRoute().params.id);
  await fetchPersonById(personId, locale.value);
});


</script>

<style></style>
