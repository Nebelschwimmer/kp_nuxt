<template>
	<v-card variant="text">
		<v-container>
			<v-row>
				<v-col>
					<v-alert
						:color="validationError ? 'error' : ''"
						variant="tonal"
						density="compact"
						max-width="600">
						<div> {{ $t("forms.person.photo_restrictions") }}</div>
					</v-alert>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-form ref="previewFormRef">
						<v-file-input
							v-model="photoFile"
							density="compact"
							:label="$t('forms.person.photo')"
							accept="image/png, image/jpeg, image/bmp"
							:placeholder="$t('actions.pick_file')"
							:rules="photoRules"
							clearable
							variant="outlined"
							clear-icon="mdi-close"
							@click:clear="clearPhoto"
							@update:model-value="setPhoto">
						</v-file-input>
					</v-form>
				</v-col>
			</v-row>

			<v-row>
				<v-col>
					<v-img
						:src="photo || ''"
						height="400"
						cover>
						<template #placeholder>
							<ImgPlaceholder />
						</template>
					</v-img>
				</v-col>
			</v-row>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="accent"
					:disabled="computedDisabledUploadBtn"
					@click="uploadPreview"
					>{{ $t("actions.upload") }}</v-btn
				>
				<v-btn
					color="warning"
					@click="showDialog = true"
					>{{ $t("actions.skip") }}</v-btn
				>
			</v-card-actions>
		</v-container>
		<ConfirmDialog
			v-model="showDialog"
			:text="$t('forms.film.preview_empty_warning')"
			@confirm="$emit('skip')"
			type="warning"
			@cancel="showDialog = false" />
	</v-card>
</template>

<script lang="ts" setup>
	import ImgPlaceholder from "../Placeholders/ImgPlaceholder.vue";
	const emit = defineEmits(["submit", "skip"]);
	const { t } = useI18n();
	const photoFile = ref<File | null>();
	const previewFormRef = ref<any>(null);
	const showDialog = ref(false);
	const photo = ref<string | any>(null);
	import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
	defineProps({
		disabled: {
			type: Boolean,
			required: true,
		},
	});
	const validationError = ref(false);

	const setPhoto = async () => {
		if (photoFile.value) {
			const { valid } = await previewFormRef.value.validate();
			if (valid) {
				validationError.value = false;
				photo.value = URL.createObjectURL(photoFile.value);
			} else {
				
				validationError.value = true;
			 }
		}
	};

	const uploadPreview = async () => {
		const { valid } = await previewFormRef.value.validate();
		if (valid) {
			emit("submit", photoFile.value);
		} else {
			console.log('sdfdsf')
			validationError.value = true;
		}
	};

	const computedDisabledUploadBtn = computed(() => {
		return !photoFile.value || validationError.value;
	});
	const clearPhoto = () => {
		photoFile.value = null;
		photo.value = null;
		validationError.value = false;
	};

	const photoRules = [
		(value: any) => {
			return (
				!value ||
				!value.length ||
				value[0].size < 2000000 ||
				t("forms.film.preview_max_size")
			);
		},
	];

	watch(
		photoFile,
		(newVal) => {
			if (newVal && newVal.size > 2000000) {
				validationError.value = true;
			}
		},
		{ immediate: true }
	);
</script>

<style></style>
