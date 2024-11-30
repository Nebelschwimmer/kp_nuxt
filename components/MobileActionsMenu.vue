<template>
	<div class="text-center">
		<v-list
			class="text-center"
			elevation="12">
			<v-list-item>
				<template #prepend>
					<div class="ml-2 text-h6">{{ $t("menu.title") }} </div>
				</template>
				<template #append>
					<v-btn
						icon="mdi-close"
						density="compact"
						flat
						@click="$emit('close-menu')"></v-btn>
				</template>
			</v-list-item>
			<v-list-subheader>{{ $t("menu.settings") }}</v-list-subheader>
			<v-list-item>
				<v-select
					density="compact"
					:label="$t('menu.theme.title')"
					:items="themeOptions"
					prepend-icon="mdi-theme-light-dark"
					@update:model-value="$emit('change-theme')">
				</v-select>
			</v-list-item>
			<v-divider />
			<v-list-item>
				<v-select
					density="compact"
					:label="$t('nav.language')"
					:items="languageOptions"
					prepend-icon="mdi-translate"
					@update:model-value="$emit('change-language', $event)">
				</v-select>
			</v-list-item>
		</v-list>
	</div>
</template>

<script lang="ts" setup>
defineEmits<{
		(e: "close-menu"): void;
		(e: "change-theme"): void;
		(e: "change-language", value: string): void;
	}>();
	defineProps<{
		languageOptions: { title: string; value: string }[];
		themeOptions: { title: string; value: string; icon: string }[];
	}>();
</script>

<style></style>
