<template>
  <div>
    Index {{ doubleCount }}
  </div>
</template>

<script lang="ts" setup>
  definePageMeta
  ({
    title: 'Home',
  })
import { useAppStore } from "~/store/appStore";
const { doubleCount } = useAppStore();
</script>

<style>


</style>