<template>
  <v-card variant="text">
    <v-file-upload
      :title="$t('general.drag_and_drop')"
      :subtitle="$t('forms.person.photo_restrictions')"
      :browse-text="$t('general.browse_files')"
      :divider-text="$t('general.or')"
      scrim="primary"
      clearable
      v-model="photoFile"
      show-size
      accept="image/*"
      length="1"
    >
      <template #item="{ props: itemProps, file }">
        <v-file-upload-item
          v-bind="itemProps"
          lines="two"
          nav
          active-color="secondary"
          :title="file.name"
          :subtitle="$t('general.preview')"
          :value="file"
        >
          <template #prepend>
            <v-avatar size="100" rounded></v-avatar>
          </template>
          <template #append>
            <v-btn color="primary" slim icon @click="uploadPreview">
              <v-icon icon="mdi-upload"></v-icon>
              <v-tooltip activator="parent" location="bottom">{{
                $t("actions.upload")
              }}</v-tooltip>
            </v-btn>
          </template>
          <template #clear="{ props: clearProps }">
            <v-btn color="primary" v-bind="clearProps"></v-btn>
          </template>
        </v-file-upload-item>
      </template>
    </v-file-upload>
    <template #actions>
      <v-btn color="secondary" @click="$emit('skip')">{{
        $t("actions.skip")
      }}</v-btn>
      <ConfirmDialog
        v-model="showDialog"
        :text="$t('forms.film.preview_empty_warning')"
        @confirm="$emit('skip')"
        type="warning"
        @cancel="showDialog = false"
      />
    </template>
  </v-card>
</template>

<script lang="ts" setup>
const emit = defineEmits(["submit", "skip"]);
const { t } = useI18n();
const photoFile = ref<File>();
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
  emit("submit", photoFile.value);
};
</script>

<style></style>
