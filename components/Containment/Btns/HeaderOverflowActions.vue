<template>
	<v-menu>
		<template v-slot:activator="{ props }">
			<v-btn
				icon="mdi-dots-vertical"
				variant="text"
				v-bind="props"></v-btn>
		</template>
		<v-list>
			<v-list-item>
				<template #append> <LanguageChangeBtn /></template>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts" setup>
	import LanguageChangeBtn from "./LanguageChangeBtn.vue";
</script>

<style></style>
