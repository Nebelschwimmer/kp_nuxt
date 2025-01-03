<template>
  <div>
    <v-list
      v-if="gallery?.length"
      v-model:selected="selectedImg"
      v-model:opened="opened"
      select-strategy="leaf"
      density="compact"
      lines="one"
    >
      <v-list-group value="gallery">
        <v-fab
          class="ma-4"
          :active="Boolean(selectedImg.length)"
          icon="mdi-delete"
          location="top end"
          color="error"
          absolute
          size="64"
          offset
          appear
          @click="showDialog = true"
        >
        </v-fab>
        <template v-slot:activator="{ props }">
          <v-list-item prepend-icon="mdi-image-multiple" v-bind="props">
            <v-list-item-title>{{
              $t("forms.film.gallery_actual")
            }}</v-list-item-title>
          </v-list-item>
        </template>
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
      </v-list-group>
      <v-list-group value="upload">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-cloud-upload"
            :title="$t('actions.add_img')"
          >
          </v-list-item>
        </template>
        <v-list-item>
          <FileUploader
            :files="galleryFiles"
            multiple
            @update:modelValue="galleryFiles = $event"
          />

          <v-btn
            :disabled="disabled || !galleryFiles.length"
            prepend-icon="mdi-cloud-upload"
            color="primary"
            class="mt-4"
            @click="uploadGallery"
            >{{ $t("actions.upload") }}</v-btn
          >
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-empty-state
      v-else
      :title="$t('pages.films.no_gallery')"
      icon="mdi-image-off"
    >
      <template v-slot:actions>
        <v-container fluid>
          <v-row>
            <v-col>
              <FileUploader
                :files="galleryFiles"
                multiple
                @update:modelValue="galleryFiles = $event"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                :disabled="disabled || !galleryFiles.length"
                prepend-icon="mdi-cloud-upload"
                block
                color="primary"
                @click="uploadGallery"
                >{{ $t("actions.upload") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-empty-state>
    <v-card-actions v-if="gallery?.length">
      <v-spacer></v-spacer>
    </v-card-actions>
    <ConfirmDialog
      v-model="showDialog"
      :text="$t('forms.film.gallery_item_delete_confirm')"
      @confirm="$emit('gallery-item:delete', selectedImg)"
      type="warning"
      @cancel="showDialog = false"
    ></ConfirmDialog>
  </div>
</template>

<script lang="ts" setup>
import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
import BaseImg from "../Containment/Img/BaseImg.vue";
import FileUploader from "../Misc/FileUploader.vue";
const emit = defineEmits(["submit", "gallery-item:delete", "error:validation"]);
const showFileUploader = ref(false);
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
const opened = ref<string[]>(["gallery"]);
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
