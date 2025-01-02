<template>
  <v-empty-state
    :title="$t('general.no_data')"
    :text="$t('empty_states.directors') + '...'"
    icon="mdi-account"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png"
  >
    <template v-slot:actions>
      <v-btn
        class="text-none"
        color="primary"
        rounded="lg"
        :text="$t('pages.persons.list')"
        to="/persons"
      ></v-btn>
    </template>
  </v-empty-state>
</template>

<script lang="ts" setup></script>

<style></style>
