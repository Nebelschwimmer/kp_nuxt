<template>
	<v-toolbar
		:color="color"
		density="compact">
		<template #image>
			<v-img
				gradient="45deg, rgba(225, 225, 225, .3) 0%, rgba(0, 0, 0, .1) 50%, rgba(155, 155, 155, .3)"></v-img>
		</template>
		<template #prepend>
			<div class="d-flex items-center gap-2 align-center">
				<v-icon :icon="prependIcon"></v-icon>
				<NuxtLink
					:to="to"
					v-if="displayBackBtn">
					<v-btn
						icon
						flat
						@click="$router.back()">
						<v-icon>mdi-arrow-left</v-icon>
						<v-tooltip
							activator="parent"
							location="start"
							>{{ $t("actions.back") }}</v-tooltip
						>
					</v-btn>
				</NuxtLink>
			</div>
		</template>
		<v-toolbar-title>
			<v-breadcrumbs density="compact" class="text-body-1" :items="breadcrumbs || []"></v-breadcrumbs>
		</v-toolbar-title>
		<slot name="actions"></slot>
		<template
			v-if="appendIcon"
			#append>
			<v-icon :icon="appendIcon"></v-icon>
		</template>
	</v-toolbar>
</template>

<script lang="ts" setup>
	defineProps<{
		displayBackBtn?: boolean;
		displayActions?: boolean;
		to?: string;
		prependIcon?: string;
		appendIcon?: string;
		color?: string;
		breadcrumbs?: Breadcrumb[];
	}>();




</script>

<style lang="scss">
	.toolbar-gradient {
		background: linear-gradient(
			to right,
			rgba(255, 255, 255, 0.15) 0%,
			rgba(255, 255, 255, 0.15) 25%,
			rgba(255, 255, 255, 0.1) 25%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.05) 50%,
			rgba(255, 255, 255, 0.05) 75%
		);
	}
</style>
