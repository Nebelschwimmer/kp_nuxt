<template>
	<div>
		<v-hover v-if="!loading">
			<template #default="{ isHovering, props }">
				<v-card
					:title="headerTitle"
					:prepend-icon="headerIcon"
					v-bind="props"
					:class="['', { 'stained-glass': $vuetify.theme.global.current.dark }]"
					rounded="lg"
					border>
					<v-card-text>
						<v-fab
							:active="isHovering ? true : false"
							absolute
							size="small"
							:icon="!editMode ? 'mdi-pencil' : 'mdi-close'"
							:color="editMode ? 'error' : 'primary'"
							location="bottom end"
							v-if="editable"
							@click="$emit('click:edit')"></v-fab>
						<slot name="content"></slot>
					</v-card-text>
				</v-card>
			</template>
		</v-hover>
		<v-skeleton-loader
			v-else
			class="stained-glass"
			type="card"
			:min-height="skeletonHeight || 200"></v-skeleton-loader>
	</div>
</template>

<script lang="ts" setup>
	defineEmits(["click:edit"]);
	defineProps<{
		headerTitle?: string;
		loading: boolean;
		headerIcon?: string;
		editable?: boolean;
		editMode?: boolean;
		skeletonHeight?: number;
	}>();
</script>

<style></style>
