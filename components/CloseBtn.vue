<template>
  <div>
    <v-btn icon="mdi-close" @click="$emit('close')" density="compact" flat></v-btn>
  </div>
    </template>

<script lang="ts" setup>
defineEmits(["close"]);
</script>

<style>

</style>