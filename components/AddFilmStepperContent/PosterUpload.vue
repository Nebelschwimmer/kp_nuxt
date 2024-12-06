<template>
	<v-container>
		<v-row>
			<v-col>
				<v-form ref="previewFormRef">
					<v-file-input
						v-model="previewFile"
						density="compact"
						:label="$t('forms.film.preview')"
						accept="image/png, image/jpeg, image/bmp"
						:placeholder="$t('actions.pick_file')"
						:rules="previewRules"
						clearable
						variant="outlined"
						clear-icon="mdi-close"
						@click:clear="clearPreviewImage"
						@update:model-value="setPreviewImage">
					</v-file-input>
				</v-form>
			</v-col>
			<v-col cols="auto">
				<v-btn
					color="primary"
					variant="tonal"
					:disabled="computedDisabledUploadBtn"
          @click="uploadPreview"
					>{{ $t("actions.upload") }}</v-btn
				>
			</v-col>
		</v-row>
		<v-row>
			<v-img
				:src="previewImage"
				height="400"
				color="grey-lighten-5"
				cover>
				<template #placeholder>
					<div
						class="d-flex align-center fill-height justify-center align-center text-center p-4">
						<v-icon
							icon="mdi-image"
							size="x-large"></v-icon>
					</div>
				</template>
			</v-img>
		</v-row>

		<v-row>
			<v-spacer></v-spacer>
			<v-col cols="auto">
				<v-btn
					color="secondary"
					variant="tonal"
					@click="$emit('skip')"
					>{{ $t("actions.skip") }}</v-btn
				>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
	const emit = defineEmits(["submit", "skip"]);
	const { t } = useI18n();
	const previewFile = ref(null);
	const previewFormRef = ref<any>(null);
	const previewImage = ref<string | any>(null);
	defineProps({
		disabled: {
			type: Boolean,
			required: true,
		},
	});
  const valdiationError = ref(false);

	const setPreviewImage = async () => {
		if (previewFile.value) {
      previewImage.value = URL.createObjectURL(previewFile.value);
      const { valid } = await previewFormRef.value.validate();
      valdiationError.value = !valid;
		}
	};

  const uploadPreview = async () => {
    const { valid } = await previewFormRef.value.validate();
      if (valid) {
        emit("submit", previewFile.value);
      } else {
        valdiationError.value = true;
      }
  }


	const computedDisabledUploadBtn = computed(() => {
		return !previewFile.value || valdiationError.value;
	});
	const clearPreviewImage = () => {
		previewFile.value = null;
		previewImage.value = null;
		valdiationError.value = false;
	};

	const previewRules = [
		(value: any) => {
			return (
				!value ||
				!value.length ||
				value[0].size < 1000000 ||
				t("forms.rules.preview_max_size")
			);
		},
	];
</script>

<style></style>
