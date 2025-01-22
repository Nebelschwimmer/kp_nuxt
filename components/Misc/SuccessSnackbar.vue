<template>
	<v-snackbar
		:model-value="show"
		color="success"
    variant="tonal"
		>
		{{ $t("toast.messages.success.edit") }}
    <template #actions>
      <CloseBtn @close="$emit('close', false)" />
    </template>
	</v-snackbar>
</template>

<script lang="ts" setup>
import CloseBtn from '../Containment/Btns/CloseBtn.vue';
defineEmits(['close'])
defineProps<{
  show: boolean;
}>();

</script>

<style></style>
