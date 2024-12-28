<template>
	<v-dialog
			:model-value="modelValue"
			max-width="1200">
			<v-card>
				<v-container>
					<v-row>
						<v-spacer></v-spacer>
						<CLoseBtn @click="$emit('close')" />
					</v-row>
					<v-row>
						<v-col>
							<v-img
								:src="imgSrc"
								contain></v-img>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-dialog>
</template>

<script lang="ts" setup>
import CLoseBtn from "~/components/Containment/Btns/CloseBtn.vue";
defineEmits(["close"]);
defineProps<{
  modelValue: boolean;
  imgSrc: string;

}>();

</script>

<style>

</style>