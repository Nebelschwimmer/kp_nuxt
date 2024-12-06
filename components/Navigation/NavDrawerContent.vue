<template>
  <div>
    <v-list density="compact">
      <v-list-subheader>{{ $t("nav.title") }}</v-list-subheader>
      <v-list-item color="primary" to="/">
        <v-list-item-title>{{ $t("nav.films") }}</v-list-item-title>
      </v-list-item>
      <v-list-item color="primary" to="/people">
        <v-list-item-title>{{ $t("nav.people") }}</v-list-item-title>
      </v-list-item>
      <v-list-item color="primary" to="/genres">
        <v-list-item-title>{{ $t("nav.genres") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
