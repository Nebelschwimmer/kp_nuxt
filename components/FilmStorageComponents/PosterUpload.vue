<template>
	<v-card variant="outlined">
		<PageLoader
			overlay
			:showing="Boolean(loading)" />
		<v-banner
			icon="mdi-image"
			:color="poster ? 'success' : 'warning'"
			>
			<template #text>
				{{ $t("forms.film.preview_restrictions") }}
			</template>
			<template #actions>
				<v-btn @click="$refs.posterInputRef?.click()">
					{{ $t("actions.pick_file") }}
					<v-file-input
						ref="posterInputRef"
						v-model="posterFile"
						hide-input
						:label="$t('forms.film.preview')"
						accept="image/png, image/jpeg, image/webp"
						:placeholder="$t('actions.pick_file')"
						clearable
						clear-icon="mdi-close"
						@click:clear="clearPreviewImage"
						@update:model-value="setPreviewImage">
					</v-file-input>
				</v-btn>
			</template>
		</v-banner>
		<v-container>
			<v-row justify="center">
				<template v-if="editMode">
					<v-col>
						<v-card
							variant="text"
							:disabled="loading">
							<template #title>
								<span class="text-body-2">{{
									$t("general.uploaded_img")
								}}</span>
							</template>
							<template #text>
								<BaseImg
									:img-src="poster || ''"
									:img-options="{ ...posterOptions }">
								</BaseImg>
							</template>
							<template #actions>
								<v-spacer></v-spacer>
								<transition name="fade">
									<v-btn
										v-if="poster"
										color="error"
										variant="elevated"
										:disabled="!poster"
										prepend-icon=" mdi-delete"
										@click="deletePoster">
										{{ $t("actions.remove") }}
									</v-btn>
								</transition>
							</template>
						</v-card>
					</v-col>
					<v-divider
						vertical
						inset></v-divider>
				</template>
				<v-col>
					<v-card
						variant="text"
						:disabled="loading">
						<template #title>
							<span class="text-body-2"
								>{{ $t("forms.film.new_preview") }}
								<span class="text-decoration-underline">
									{{ previewImage && " (" + $t("general.preview") + ")" }}
								</span>
							</span>
						</template>
						<template #text>
							<DragAndDrop
								v-if="!previewImage"
								:height="500"
								@drop="setPreviewImageOnDrop" />
							<BaseImg
								v-else
								:img-src="previewImage || ''"
								:img-options="{ ...previewImgOptions }">
							</BaseImg>
						</template>
						<template #actions>
							<v-spacer></v-spacer>

							<v-btn
								color="warning"
								:disabled="!previewImage"
								@click="clearPreviewImage"
								prepend-icon="mdi-close"
								variant="elevated">
								{{ $t("actions.clear") }}
							</v-btn>
							<v-btn
								color="accent"
								:disabled="computedDisabledUploadBtn"
								prepend-icon="mdi-cloud-upload"
								variant="elevated"
								:loading="loading"
								@click="uploadPoster"
								>{{ $t("actions.upload") }}</v-btn
							>
						</template>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<template
			#actions
			v-if="!editMode">
			<v-btn
				color="warning"
				variant="tonal"
				@click="showDialog = true"
				>{{ $t("actions.skip") }}</v-btn
			>
		</template>

		<ConfirmDialog
			v-model="showDialog"
			:text="$t(dialogText)"
			@confirm="handleDialogConfirm"
			:type="dialogType"
			@cancel="showDialog = false" />
	</v-card>
</template>

<script lang="ts" setup>
	import BaseImg from "../Containment/Img/BaseImg.vue";
	import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
	import PageLoader from "../Loaders/PageLoader.vue";
	import DragAndDrop from "../Misc/DragAndDrop.vue";
	const emit = defineEmits([
		"submit",
		"skip",
		"poster:delete",
		"poster:replace",
		"error:validation",
	]);
	const { t } = useI18n();
	const posterFile = ref<File | null>();
	const posterInputRef = ref<any>(null);
	const showDialog = ref(false);
	const dialogType = ref("warning");
	const props = defineProps<{
		disabled?: boolean;
		poster?: string | null;
		loading?: boolean;
		editMode?: boolean;
		posterUploaded?: boolean;
	}>();
	const validationError = ref(false);
	const previewImage = ref<string | any>(null);
	const dialogText = ref("forms.film.preview_empty_warning");

	const setPreviewImage = async (): Promise<void> => {
		if (posterFile.value) {
			previewImage.value = URL.createObjectURL(posterFile.value);
		}
	};

	const setPreviewImageOnDrop = async (file: File): Promise<void> => {
		posterFile.value = file;
		if (!previewImage.value) {
			previewImage.value = URL.createObjectURL(file);
		}
	};

	const uploadPoster = (): void => {
		if (props.poster) {
			showDialog.value = true;
			dialogText.value = "forms.film.preview_replace_warning";
			dialogType.value = "warning";
			return;
		} else {
			emit("submit", posterFile.value);
			clearPreviewImage();
		}
	};

	const computedDisabledUploadBtn = computed(() => {
		return !posterFile.value || validationError.value;
	});
	const clearPreviewImage = (): void => {
		posterFile.value = null;
		previewImage.value = null;
	};

	const deletePoster = (): void => {
		showDialog.value = true;
		dialogText.value = "forms.film.preview_delete_confirm";
		clearPreviewImage();
	};

	const handleDialogConfirm = (): void => {
		if (!props.editMode && !props.poster) {
			emit("skip");
		} else if (props.poster && !posterFile.value) {
			emit("poster:delete");
		} else if (posterFile.value) {
			emit("poster:replace", posterFile.value);
		} else {
			return;
		}
		clearPreviewImage();
		showDialog.value = false;
	};

	const previewImgOptions = {
		shaded: false,
		height: 500,
		cover: false,
		clearable: true,
		placeholderOptions: {
			displayTitle: true,
		},
	} as ImgOptions;

	const posterOptions = {
		shaded: false,
		height: 500,
		cover: true,
		placeholderOptions: {
			displayTitle: true,
		},
	} as ImgOptions;
</script>
