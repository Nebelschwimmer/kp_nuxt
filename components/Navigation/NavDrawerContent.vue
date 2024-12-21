<template>
  <v-list>
    <v-list-item to="/" exact> {{ $t("pages.home.title") }} </v-list-item>
    <v-list-item to="/films" exact> {{ $t("pages.films.title") }} </v-list-item>
    <v-list-group value="persons">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props"> {{ $t("nav.persons") }} </v-list-item>
      </template>
      <v-list-item to="/persons" exact>
        {{ $t("nav.all") }}
      </v-list-item>
      <v-list-item to="/persons/actors" exact>
        {{ $t("nav.actors") }}
      </v-list-item>
      <v-list-item to="/persons/directors" exact>
        {{ $t("nav.directors") }}
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script lang="ts" setup></script>

<style></style>
