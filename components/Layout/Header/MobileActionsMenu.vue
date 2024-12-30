<template>
  <v-overlay :model-value="true">
    <v-card width="100dvw" :title="$t('nav.menu')" :prepend-icon="'mdi-menu'">
      <template #append>
        <CloseBtn @click="$emit('close-menu')" />
      </template>

      <v-list>
        <v-list-item
          :active="$route.name === 'index'"
          active-color="secondary"
          to="/"
          prepend-icon="mdi-home"
          :title="$t('nav.home')"
          @click="$emit('close-menu')"
        >
        </v-list-item>
        <v-list-item
          :active="$route.name === 'films'"
          active-color="secondary"
          to="/films"
          prepend-icon="mdi-filmstrip"
          :title="$t('nav.films')"
          @click="$emit('close-menu')"
        >
        </v-list-item>
        <v-list-group
          value="persons"
          prepend-icon="mdi-account"
          :active="$route.name === 'persons'"
          active-color="secondary"
          :title="$t('nav.persons')"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props"> {{ $t("nav.persons") }} </v-list-item>
          </template>
          <v-list-item
            to="/persons"
            prepend-icon="mdi-view-list"
            @click="$emit('close-menu')"
          >
            {{ $t("nav.all") }}
          </v-list-item>
          <v-list-item
            to="/persons/actors"
            exact
            prepend-icon="mdi-account"
            @click="$emit('close-menu')"
          >
            {{ $t("nav.actors") }}
          </v-list-item>
          <v-list-item
            to="/persons/directors"
            prepend-icon="mdi-account-tie"
            @click="$emit('close-menu')"
          >
            {{ $t("nav.directors") }}
          </v-list-item>
        </v-list-group>
        <v-divider></v-divider>
        <v-list-item>
          <v-select
            :v-model="selectedLanguage"
            variant="filled"
            :label="$t('nav.language')"
            :items="languageOptions"
            prepend-inner-icon="mdi-translate"
            @update:model-value="handleLanguageChange"
          />
        </v-list-item>
      </v-list>
    </v-card>
  </v-overlay>
</template>

<script lang="ts" setup>
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
const selectedLanguage = useI18n().locale;
const emit = defineEmits<{
  (e: "close-menu"): void;
  (e: "change-language", value: string): void;
}>();
defineProps<{
  languageOptions: { title: string; value: string }[];
}>();

const handleLanguageChange = (value: string) => {
  emit("change-language", value);
  emit("close-menu");
};
</script>

<style></style>
