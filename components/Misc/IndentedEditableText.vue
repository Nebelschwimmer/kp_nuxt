<template>
	<v-sheet
		v-if="!editMode"
		class="text-body-1 overflow-auto pa-2"
		rounded="lg"
		color="transparent"
		border="0"
		height="auto">
		<div
			v-if="text"
		>
			<p
				v-for="(paragraph, index) in truncatedText.split('\n')"
				:key="index"
				>{{ paragraph || "" }}
			</p>
		<div class="d-flex justify-center">
				<ExpandBtn
					v-if="text.length > 100"
					:expanded="expanded"
					@toggle:expanded="expanded = !expanded"></ExpandBtn>
		</div>
		</div>
		<v-skeleton-loader
			v-else
			type="text"></v-skeleton-loader>
	</v-sheet>
	<v-confirm-edit
		v-else
		v-model="editModeText"
		@save="$emit('sumbit:edit', editModeText)">
		<template #default="{ model: proxyModel, actions }">
			<v-card variant="outlined">
				<template #text>
					<v-textarea
						v-model="proxyModel.value"
						:messages="messages"
						auto-grow
						rows="5"></v-textarea>
				</template>
				<template #actions>
					<v-spacer></v-spacer>
					<component :is="actions"></component>
				</template>
			</v-card>
		</template>
	</v-confirm-edit>
</template>

<script lang="ts" setup>
	import ExpandBtn from "../Containment/Btns/ExpandBtn.vue";
	const props = defineProps<{
		editMode: boolean;
		text: string;
		messages: string;
	}>();
	const editModeText = ref(props.text);
	const emits = defineEmits(["sumbit:edit"]);
	const expanded = ref(false);
	const truncatedText = computed(() => {
		if (expanded.value) return props.text;
		return props.text.slice(0, 355) + "...";
	});
</script>

<style></style>
