<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import { usePersonStore } from "~/store/personStore";

const { persons, loading, networkError } = storeToRefs(usePersonStore());
const { fetchPersons } = usePersonStore();

(async function () {
  await fetchPersons();
})();
</script>

<style></style>
