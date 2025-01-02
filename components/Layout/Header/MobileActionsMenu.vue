<template>
  <v-dialog :model-value="true" fullscreen>
    <v-card width="100dvw" :title="$t('nav.menu')" :prepend-icon="'mdi-menu'">
      <template #append>
        <CloseBtn @click="$emit('close-menu')" />
      </template>

      <v-list lines="one" v-model:opened="opened" subheader>
        <v-list-subheader :title="$t('nav.title')"></v-list-subheader>
        <v-list-item
          :active="$route.name === 'index'"
          :color="$route.name === 'index' ? 'secondary' : ''"
          exact
          nav
          to="/"
          prepend-icon="mdi-home"
          :title="$t('nav.home')"
          @click="$emit('close-menu')"
        >
        </v-list-item>
        <v-list-item
          :active="$route.name === 'films'"
          :color="$route.name === 'films' ? 'secondary' : ''"
          exact
          nav
          to="/films"
          prepend-icon="mdi-filmstrip"
          :title="$t('nav.films')"
          @click="$emit('close-menu')"
        >
        </v-list-item>
        <v-list-group
          value="persons"
          prepend-icon="mdi-account-circle"
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
            nav
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
  </v-dialog>
</template>

<script lang="ts" setup>
import CloseBtn from "~/components/Containment/Btns/CloseBtn.vue";
const selectedLanguage = useI18n().locale;

const opened = ref(["persons"]);
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
