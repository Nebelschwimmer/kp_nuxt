<template>

    <v-btn
      icon="mdi-close"
      @click="$emit('close')"
      flat
    ></v-btn>
</template>

<script lang="ts" setup>
defineEmits(["close"]);
</script>

<style></style>
