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
						<div> {{ $t("forms.film.gallery_restrictions") }}</div>
					</v-alert>
				</v-col>
			</v-row>

			<v-row>
				<v-col>
					<v-form ref="galleryFormRef">
						<v-file-input
							ref="galleryFilePickerRef"
							v-model="galleryFiles"
							density="compact"
							:label="$t('forms.film.gallery')"
							accept="image/png, image/jpeg, image/bmp"
							:hint="$t('actions.pick_file')"
							:rules="galleryRules"
							clearable
							multiple
							counter
							show-size
							variant="filled"
							max-files="5"
							max-width="600"
							clear-icon="mdi-close"
							@click:clear="clearGalleryImages"
							@update:model-value="setGalleryImages">
							<template v-slot:selection="{ fileNames }">
								<template
									v-for="fileName in fileNames"
									:key="fileName">
									<v-chip
										class="me-2 text-caption"
										color="accent"
										label>
										{{ fileName }}
									</v-chip>
								</template>
							</template>
						</v-file-input>
					</v-form>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					v-for="img in computedPreviewsArray"
					:key="img"
					cols="auto"
					md="4"
					sm="2">
					<v-hover :disabled="!img">
						<template v-slot:default="{ isHovering, props }">
							<v-card
								:variant="isHovering && img ? 'outlined' : 'plain'"
								class="base-card"
								v-bind="props">
								<v-img
									:src="img"
									cover
									height="150">
									<template #placeholder>
										<ImgPlaceholder />
									</template>
									<v-expand-transition>
										<div
											v-if="isHovering"
											class="d-flex transition-fast-in-fast-out v-card--reveal"
											style="height: 100%">
											<v-btn
												color="error"
												block
												density="compact"
												flat
												squared
												@click="removePreview(galleryPreviews.indexOf(img))">
												<v-icon icon="mdi-close"></v-icon>
											</v-btn>
										</div>
									</v-expand-transition>
								</v-img>
							</v-card>
						</template>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
		<v-card-actions>
			<v-btn
				color="primary"
				:disabled="validationError"
				@click="uploadGallery"
				>{{ $t("actions.upload") }}</v-btn
			>
			<v-btn
				color="warning"
				@click="clearGalleryImages">
				{{ $t("actions.clear") }}
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn
				color="accent"
				@click="showDialog = true"
				>{{ $t("actions.finish") }}</v-btn
			>
		</v-card-actions>
		<ConfirmDialog
			v-model="showDialog"
			:text="computedDialogText"
			@confirm="$router.push('/films')"
			:type="computedDialogType"
			@cancel="showDialog = false" />
	</v-card>
</template>

<script lang="ts" setup>
	import ImgPlaceholder from "../Placeholders/ImgPlaceholder.vue";
	import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
	const emit = defineEmits(["submit"]);
	const galleryFiles = ref<File[]>([]);
	const galleryPreviews = ref<string[]>([]);
	const galleryFormRef = ref<any>(null);
	const validationError = ref(false);
	const previewsPlaceholderArr = Array(6).fill(null);
	const galleryFilePickerRef = ref<any>(null);
	const showDialog = ref(false);
	const { t } = useI18n();
	const galleryRules = [
		(value: any) => {
			return (
				Boolean(!value) ||
				value.length <= 5 ||
				t("forms.film.gallery_max_count")
			);
		},
	] as any;

	const clearGalleryImages = () => {
		galleryFiles.value = [];
		galleryPreviews.value = [];
	};

	const setGalleryImages = (files: File[] | any) => {
		if (validatePreviews(files)) {
			galleryFiles.value = files;
			if (galleryFiles.value.length) {
				galleryFiles.value.forEach((file) => {
					galleryPreviews.value.push(URL.createObjectURL(file));
				});
			}
		}
	};
	const uploadGallery = async () => {
		const { valid } = await galleryFormRef.value.validate();
		if (valid) {
			emit("submit", galleryFiles.value);
		} else {
			validationError.value = true;
		}
	};

	const removePreview = (index: number) => {
		galleryPreviews.value.splice(index, 1);
		galleryFiles.value.splice(index, 1);
	};
	const computedPreviewsArray = computed(() => {
		return previewsPlaceholderArr.map(
			(_, index) => galleryPreviews.value[index] || ""
		);
	});

	const setValidationError = () => {
		validationError.value = true;
	};
	const clearValidationError = () => {
		validationError.value = false;
	};

	const calculateTotalFilesSize = (arr: File[]): number => {
		const totalSize = arr.reduce((acc, file) => {
			return acc + file.size;
		}, 0);
		return totalSize;
	};

	const validatePreviews = (arr: File[]): boolean => {
		if (arr && arr.length) {
			const totalSize = calculateTotalFilesSize(arr);
			if (totalSize > 10000000) {
				setValidationError();
				return false;
			}
		}
		if (arr.length > 5) {
			setValidationError();
			return false;
		}
		clearValidationError();
		return true;
	};

	const computedDialogType = computed(() => {
		return galleryFiles.value.length > 0 ? "info" : "warning";
	});

	const computedDialogText = computed(() => {
		return galleryFiles.value.length === 0
			? t("forms.film.gallery_empty_warning")
			: "";
	});

	watch(
		() => galleryFiles.value,
		() => {
			validatePreviews(galleryFiles.value);
		}
	);
</script>

<style></style>
