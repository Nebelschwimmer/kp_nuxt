<template>
  <div>
    <v-list density="compact">
      <v-list-subheader>{{ $t("nav.title") }}</v-list-subheader>
      <v-list-item color="primary" to="/">
        <v-list-item-title>{{ $t("nav.home") }}</v-list-item-title>
      </v-list-item>
      <v-list-item color="primary" to="/actors">
        <v-list-item-title>{{ $t("nav.actors") }}</v-list-item-title>
      </v-list-item>
      <v-list-item color="primary" to="/directors">
        <v-list-item-title>{{ $t("nav.directors") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
