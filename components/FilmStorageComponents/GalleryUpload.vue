<template>
	<v-card variant="outlined">
		<v-container>
			<v-row>
				<v-col>
					<v-banner
						color="surface-variant"
						density="compact"
						:text="$t('forms.film.gallery_restrictions')">
					</v-banner>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					v-for="(item, index) in computedPreviewsArray"
					:key="index"
					cols="auto"
					xl="6"
					lg="6"
					md="8"
					sm="12">
					<v-card class="base-card">
						<template #title>
							<div class="d-flex justify-space-between">
								<span class="text-body-2"
									>{{ $t("general.img") + " #" + (index + 1) }}
									<span class="text-decoration-underline">
										{{
											item.isPreview && item.img
												? " (" + $t("general.preview") + ")"
												: ""
										}}
									</span>
								</span>
								<v-chip
									label
									:color="item.uploaded ? 'success' : 'secondary'"
									size="small"
									>{{
										item.img !== ""
											? $t("general.uploaded")
											: $t("general.available_for_upload")
									}}
								</v-chip>
							</div>
						</template>
						<template #text>
							<v-sheet
								rounded="lg"
								:border="item.img ? '' : 'dashed thin'"
								:class="[
									'd-flex flex-column ga-2 pa-2',
									{ 'cursor-pointer': !item.uploaded },
								]"
								@click="openPickerOnClick(index)">
								<BaseImg
									:img-src="item.img"
									:img-options="{
										...previewImgOptions,
										removable: item.img !== '',
										uploaded: item.img !== '',
									}"
									@remove="removeGalleryItem(index)">
								</BaseImg>
								<v-btn
									color="primary"
									:disabled="item.uploaded"
									@click="openPickerOnClick(index)">
									<span>{{ $t("actions.pick_file") }}</span>
									<v-file-input
										ref="galleryFilePickerRef"
										v-model="galleryFiles[index]"
										hide-input
										density="compact"
										:label="$t('forms.film.preview')"
										accept="image/png, image/jpeg, image/webp"
										:placeholder="$t('actions.pick_file')"
										clearable
										variant="filled"
										clear-icon="mdi-close"
										@click:clear="clearGalleryItem(index)"
										@update:model-value="setGalleryImage(index)">
									</v-file-input>
								</v-btn>
							</v-sheet>
						</template>
					</v-card>
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
	import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
	import BaseImg from "../Containment/Img/BaseImg.vue";
	const emit = defineEmits([
		"submit",
		"gallery-item:delete",
		"error:validation",
	]);
	interface GalleryItem {
		img: string;
		isPreview: boolean | undefined;
		uploaded: boolean;
	}
	const galleryItemFile = ref<File | null>();
	const props = defineProps<{
		disabled?: boolean;
		loading?: boolean;
		gallery?: string[];
	}>();
	const galleryFiles = ref<File[]>([]);
	const galleryPreviews = ref<GalleryItem[] | any>([]);
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

	const setGalleryImage = (index: number) => {
		const file = galleryFiles.value[index];
		if (file) {
			galleryPreviews.value[index] = {
				img: URL.createObjectURL(file),
				isPreview: true,
			};
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

	const computedPreviewsArray = computed(() => {
		return previewsPlaceholderArr.map((_, index) => {
			let image = galleryPreviews.value[index]?.img || "";
			let isPreview = galleryPreviews.value[index]?.isPreview;
			let uploaded = galleryPreviews.value[index]?.uploaded;
			return {
				img: image,
				isPreview: image ? isPreview : true,
				uploaded: uploaded,
			};
		});
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

	const removeGalleryItem = (index: number) => {
		emit("gallery-item:delete", index);
	};

	const openPickerOnClick = (index: number) => {
		if (!galleryPreviews.value[index]?.uploaded) {
			galleryFilePickerRef.value[index].click();
		}
	};

	const clearGalleryItem = (index: number) => {
		galleryPreviews.value[index] = {
			img: "",
			isPreview: false,
			uploaded: false,
		};
	};

	const uploadGalleryItem = (index: number) => {
		const file = galleryFiles.value[index];
		if (file) {
			galleryPreviews.value[index] = {
				img: URL.createObjectURL(file),
				isPreview: true,
				uploaded: true,
			};
		}
	};

	watch(
		() => galleryFiles.value,
		() => {
			validatePreviews(galleryFiles.value);
		}
	);

	const previewImgOptions = {
		shaded: false,
		height: 250,
		cover: true,
		placeholderOptions: {
			displayTitle: false,
		},
	};

	onMounted(() => {
		galleryPreviews.value = props.gallery?.map((img) => {
			return {
				img,
				isPreview: undefined,
				uploaded: true,
			} as GalleryItem;
		});
	});
</script>

<style></style>
