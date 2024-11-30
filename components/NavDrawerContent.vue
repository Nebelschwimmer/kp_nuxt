<template>
	<v-list
		:items="drawerItems"
		density="compact">
		<v-list-subheader>{{ $t("nav.title") }}</v-list-subheader>
		<v-list-item
			v-for="(item, i) in drawerItems"
			:key="i"
			:value="item"
			color="primary"
			:to="item.to">
			<template v-slot:prepend>
				<v-icon :icon="item.icon"></v-icon>
			</template>

			<v-list-item-title v-text="item.text"></v-list-item-title>
		</v-list-item>
	</v-list>
</template>

<script lang="ts" setup>
	const { t } = useI18n();
	const drawerItems = [
		{
			text: t("nav.home"),
			value: 1,

			icon: "mdi-home",

			to: "/",
		},
		{
			text: t("nav.films"),
			value: 2,

			icon: "mdi-film",

			to: "/films",
		},
		{
			text: t("nav.actors"),
			value: 3,

			icon: "mdi-account-multiple",

			to: "/people",
		},
	];
</script>

<style></style>
