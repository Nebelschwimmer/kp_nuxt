<template>
  <v-card >
    <v-card
      v-if="!isNew"
      :title="$t('forms.film.gallery_actual')"
    >
    <v-divider></v-divider>
      <v-card-text>
        <v-list
          v-if="gallery?.length"
          v-model:selected="selectedImg"
          select-strategy="leaf"
          density="compact"
        
          lines="one"
        >
          <v-list-item
            v-for="(img, index) in gallery"
            :key="img"
            class="my-2"
            rounded="lg"
            nav
            :value="img"
            :title="$t('general.img') + ' #' + (index + 1)"
          >
            <template v-slot:prepend="{ isSelected }">
              <v-list-item-action start>
                <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
              </v-list-item-action>
              <v-avatar rounded="lg" size="60">
                <BaseImg
                  :img-src="img"
                  :img-options="previewImgOptions"
                ></BaseImg>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
        <v-chip v-else prepend-icon="mdi-image-off" color="secondary">{{
          $t("pages.films.no_gallery")
        }}</v-chip>
      </v-card-text>
      <v-card-actions v-if="gallery?.length">
        <v-spacer></v-spacer>
        <v-btn
          prepend-icon="mdi-delete"
          color="error"
          :disabled="!selectedImg.length"
          @click="showDialog = true"
          >{{ $t("actions.delete_selected") }}</v-btn
        >
      </v-card-actions>
    </v-card>

    <FileUploader
      :files="galleryFiles"
      multiple
      @update:modelValue="galleryFiles = $event"
    />
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :loading="loading"
        :disabled="disabled || !galleryFiles.length"
        prepend-icon="mdi-cloud-upload"
        color="primary"
        
        @click="uploadGallery"
        >{{ $t("actions.upload") }}</v-btn
      >
    </v-card-actions>

    <ConfirmDialog
      v-model="showDialog"
      :text="$t('forms.film.gallery_item_delete_confirm')"
      @confirm="$emit('gallery-item:delete', selectedImg)"
      type="warning"
      @cancel="showDialog = false"
    ></ConfirmDialog>
  </v-card>
</template>

<script lang="ts" setup>
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
import BaseImg from "../Containment/Img/BaseImg.vue";
import FileUploader from "../Misc/FileUploader.vue";
const emit = defineEmits(["submit", "gallery-item:delete", "error:validation"]);

defineProps<{
  disabled?: boolean;
  loading?: boolean;
  gallery?: string[];
  isNew?: boolean;
}>();
const galleryFiles = ref<File[]>([]);
const showDialog = ref(false);
const { t } = useI18n();
const selectedImg = ref<string[]>([]);

const uploadGallery = async () => {
  emit("submit", galleryFiles.value);
};

const computedDialogText = computed(() => {
  return galleryFiles.value.length === 0
    ? t("forms.film.gallery_empty_warning")
    : "";
});

const previewImgOptions = {
  shaded: false,
  height: 250,
  cover: true,
  placeholderOptions: {
    displayTitle: false,
  },
};
</script>

<style></style>
