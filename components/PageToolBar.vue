import { default } from '../i18n/locales/en-US';
<template>
	<v-toolbar>
		<NuxtLink :to="backLink" v-if="displayBackBtn">
			<v-btn
				icon
				flat>
				<v-icon>mdi-arrow-left</v-icon>
				<v-tooltip
					activator="parent"
					location="start"
					>{{ $t("actions.back") }}</v-tooltip
				>
			</v-btn>
		</NuxtLink>
		<v-toolbar-title
			v-if="title"
			class="font-bold d-flex items-center gap-2">
			<span>{{ $t(title) }}</span>
		</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <template v-if="displayActionBtns">
      <v-pagination :length="totalPages"></v-pagination>
      <slot name="actions"></slot>
    </template>
	</v-toolbar>
</template>

<script lang="ts" setup>
	defineProps({
		backLink: {
			type: String,
			required: false,
			default: "/",
		},
		title: {
			type: String,
			required: false,
		},
		displayBackBtn: {
			type: Boolean,
			required: false,
			default: false,
		},
		displayActionBtns: {
			type: Boolean,
			required: false,
			default: false,
    },
    totalPages: {
      type: Number,
      required: false,
      default: 1
    }
	});
</script>
